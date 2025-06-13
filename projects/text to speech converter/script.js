let speech=new SpeechSynthesisUtterance();
let voices=[];
let voiceSel=document.querySelector("select");
window.speechSynthesis.onvoiceschanged=()=>{
    voices=window.speechSynthesis.getVoices();
    speech.voice=voices[0];
    voices.forEach((voice,i)=>(voiceSel.options[i]=new Option(voice.name,i)));
};
voiceSel.addEventListener("change",()=>{
    speech.voice=voices[voiceSel.value];
});
document.querySelector("button").addEventListener("click",()=>{
    speech.text=document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
})