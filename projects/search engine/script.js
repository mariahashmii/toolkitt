const accessKey="4ZXAUd7KN4kSbXYd-Zf8532w8I8zaeKFoKpQBGnaxvA";
const searchForm=document.getElementById("Search-form");
const searchbox=document.getElementById("searchBox");
const searchresult=document.getElementById("search-result");
const showmorebtn=document.getElementById("show-more-btn");

let keyword="";
let page=1;
async function searchImages() {
    keyword=searchbox.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
const response=await fetch(url); 
const data= await response.json();
const results=data.results;
 if (page === 1) {
        searchresult.innerHTML = "";
    }
results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchresult.appendChild(imageLink);
    });
    showmorebtn.style.display="block";
}
async function searchWeb() {
    keyword = searchbox.value;
    const url = `https://api.duckduckgo.com/?q=${keyword}&format=json&no_redirect=1`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    searchresult.innerHTML = ""; // Clear previous

    if (data.RelatedTopics.length === 0) {
        searchresult.innerHTML = "<p>No results found.</p>";
        return;
    }

    data.RelatedTopics.slice(0, 10).forEach(topic => {
        if (topic.Text && topic.FirstURL) {
            const link = document.createElement("a");
            link.href = topic.FirstURL;
            link.target = "_blank";
            link.textContent = topic.Text;
            link.style.display = "block";
            link.style.margin = "10px 0";
            searchresult.appendChild(link);
        }
    });
}

const searchType = document.getElementById("searchType");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;

    if (searchType.value === "image") {
        searchImages();
    } else {
        showmorebtn.style.display = "none";
        searchWeb();
    }
});

showmorebtn.addEventListener("click",()=>{
    page++;
    searchImages();
})