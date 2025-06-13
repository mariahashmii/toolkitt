let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSel = document.querySelector("select");
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
        voiceSel.innerHTML = ""; // clear previous
        voices.forEach((voice, i) => {
            let option = new Option(voice.name + ' (' + voice.lang + ')', i);
            voiceSel.add(option);
        });
        speech.voice = voices[0];
    }
}
window.speechSynthesis.onvoiceschanged = loadVoices;
setTimeout(() => {
    if (!voices.length) loadVoices();
}, 500);

voiceSel.addEventListener("change", () => {
    speech.voice = voices[voiceSel.value];
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});
