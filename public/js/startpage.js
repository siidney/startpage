/*
 * TIME AND DATE
 */
let elTime = document.getElementById("time");
let searchEngineList = document.getElementById("searchEngineList");


function getTime(){
    if(elTime !== null){
        let currentTime = new Date();
        let hour    = currentTime.getHours();
        let min     = currentTime.getMinutes();
        let sec     = currentTime.getSeconds();
        let time    = ((hour < 10) ? "0" : "") + hour;
        time += ((min < 10) ? ":0" : ":") + min;
        time += ((sec < 10) ? ":0" : ":") + sec;

        elTime.innerHTML = time;
    }
}
/*
 * SEARCH BOX
 */
// run the search
function runQuery(){
    new Search();
}
/*
 * SEARCH ENGINE LIST
 */
// create search engine list
function populateSearchList(){
    // iterate over list and add names to list
    for(let i=0; i<searchKeys.length; i++){
        let linode = document.createElement("LI");
        let anode = document.createElement("A");
        let textnode = document.createTextNode(searchKeys[i]);

        anode.appendChild(textnode);
        linode.appendChild(anode);
        searchEngineList.appendChild(linode);
    }
}
// show or hide search engine list from button
document.getElementById("list-search").addEventListener("click", function(e){
    if(searchEngineList.classList.contains("hide")){
        showHideList("show");
    }else{
        showHideList("hide");
    }
});
function showHideList(action){
    if(action == "show"){
        searchEngineList.classList.remove("hide");
        searchEngineList.classList.add("show");
        searchEngineList.style.display = "block";
    }else{
        searchEngineList.classList.remove("show");
        searchEngineList.classList.add("hide");
        searchEngineList.style.display = "none";
    }
}
/*
 * BOOKMARKS LISTS
 */
// create the lists
function populateBookmarkList(){
    let container = document.getElementById("bookmarks");

    // iterate over list and add items as list to container
    for(let i=0; i<bookmarkkeys.length; i++){
        let ulnode = document.createElement("UL");
        let linode = document.createElement("LI");
        let textnode = document.createTextNode(bookmarkkeys[i]);

        linode.appendChild(textnode);
        ulnode.appendChild(linode);
        ulnode.setAttribute("id", "bl-" + i);

        for(let j=0; j<bookmarks[bookmarkkeys[i]].length; j++){
            linode = document.createElement("LI");
            let anode = document.createElement("A");
            anode.setAttribute("href", bookmarks[bookmarkkeys[i]][j].url);
            textnode = document.createTextNode(bookmarks[bookmarkkeys[i]][j].sitename);

            anode.appendChild(textnode);
            linode.appendChild(anode);
            ulnode.appendChild(linode);
        }
        container.appendChild(ulnode);
    }
}
/*
 * EVENT LISTENERS
 */
searchEngineList.addEventListener("click", function(e){
    if(e.target.tagName == "A"){
        document.searchForm.q.value = searchEngines[searchKeys[searchKeys.indexOf(e.target.innerHTML)]][0].tag + ":";
        document.searchForm.q.focus();
        showHideList("hide");
    }
});
searchEngineList.addEventListener("mouseover", function(e){
    if(e.target.tagName == "A"){
        document.searchForm.q.value = searchEngines[searchKeys[searchKeys.indexOf(e.target.innerHTML)]][0].tag + ":";
    }
});
searchEngineList.addEventListener("mouseleave", function(e){
    if(document.searchForm.q == document.activeElement){
        return;
    }else{
        document.searchForm.q.value = "";
        showHideList("hide");
    }
});

if(searchEngineList !== null){
    populateSearchList();
}
populateBookmarkList();

if(elTime !== null){
    getTime();  // initial get time to avoid 1s delay
    setInterval(getTime, 1000);
}
