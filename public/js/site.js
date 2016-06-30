/*
 * TIME AND DATE
 */
function getTime(){
    let currentTime = new Date();
    let hour    = currentTime.getHours();
    let min     = currentTime.getMinutes();
    let sec     = currentTime.getSeconds();
    let time    = ((hour < 10) ? "0" : "") + hour;
    time += ((min < 10) ? ":0" : ":") + min;
    time += ((sec < 10) ? ":0" : ":") + sec;

    document.getElementById("time").innerHTML = time;
}
/*
 * SEARCH BOX
 */
function searchForm(){
    const query = document.searchForm.q.value.split(":");

    if(isQuery(query[0])){
        // check if is just search term or local address
        if(query.length == 1 || isLocalHost(query[0])){
            // local url
            if(isLocalHost(query[0])){
                let url = "http://" + query[0];

                // check for port on local url
                if(query[1]){
                    url += ':' + query[1];
                }
                window.location=url;
                return;
            }
            // search engine url
            for(let i=0; i<searchKeys.length; ++i){
                if(query[0] == searchEngines[searchKeys[i]][0].tag ||
                        query[0].toLowerCase() == searchKeys[i].toLowerCase()){

                    let url = document.createElement("a");
                    url.href = searchEngines[searchKeys[i]][0].url;

                    window.location = url.protocol + "//" + url.host;
                    return;
                }
            }
            // external url
            if(isURL(query[0])){
                window.location="http://" + query[0];
                return
            }
            defaultSearch(query[0]);
        // search array for engine and redirect to url
        }else{
            if(query.length == 2){
                // check if firefox about page
                if(query[0] == "about"){
                    let ffQuery = query[0] + ":" + query[1];
                    if(ffAboutPage.indexOf(ffQuery) > -1){
                        window.alert("Firefox about pages can only be accessed directly from the url bar.");
                        return;
                    }
                }
                // local file system
                if(query[0] == "file"){
                    window.location = query[0] + ":" + query[1];
                    return;
                }
            }
            // iterate through searchEngines and check for correct site tag
            for(let i=0; i<searchKeys.length; i++){
                if(query[0] == searchEngines[searchKeys[i]][0].tag ||
                        query[0].toLowerCase() == searchKeys[i].toLowerCase()){
                    // rebuild query is needed
                    if(query.length > 2){
                        query = rebuildSearchQuery();
                    }
                    window.location=searchEngines[searchKeys[i]][0].url + encodeURIComponent(query[1]);
                    return;
                }
            };
            // query[0] not correct tag
            defaultSearch(query);
        }
    }
    // ensure query is valid
    // exists && contains more than just whitespace && has length > 0
    function isQuery(q){
        return (q && (/\S/.test(q) && q.length > 0));
    }
    // check if string is valid url
    function isURL(q){
        if(q.indexOf(".") == -1){
            return false;
        }
        let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(q);
    }
    // check if query is 192.168.x.x
    // TODO: Add other local ip addresses
    function isLocalHost(q){
        if(q.indexOf(".") == -1){
            return false;
        }
        return query[0].indexOf("192.") > -1;
    }
    // search with default engine
    function defaultSearch(q){
        for(let i=0; i<searchKeys.length; i++){
            if(searchEngines[searchKeys[i]][0].default == "true"){
                // rebuild query if needed
                if(query.length > 1){
                    q = rebuildSearchQuery(true);
                }
                window.location=searchEngines[searchKeys[i]][0].url + encodeURIComponent(q);
                return;
            }
        }
        window.alert("ERROR: No default search engine set.\nPlease edit public/js/lists.js to set.");
    }
    // if query.length > 2 mean there are : character's in search string
    // build a new query from query components, replace : chars and rebuild
    // query
    function rebuildSearchQuery(defaultSearch = false){
        let tmp = "";
        let separator = ":";
        let sArr = [];

        for(let i=query.length -1; i>=1; i--){
            sArr[i] = (i > 1) ? (separator + query[i]) : query[i];
            query.pop();
        }
        // if no search engine specified query[0] is part of the query and
        // should not be ignored
        if(defaultSearch){
            sArr[0] = query[0] + separator;
            return sArr.join("");
        }
        tmp = sArr.join("");
        query[1] = tmp;
        return query;
    }
}
// create search engine list
function populateSearchList(){
    let list = document.getElementById("searchEngineList");

    // iterate over list and add names to list
    for(let i=0; i<searchKeys.length; i++){
        let linode = document.createElement("LI");
        let anode = document.createElement("A");
        let textnode = document.createTextNode(searchKeys[i]);

        anode.appendChild(textnode);
        linode.appendChild(anode);
        list.appendChild(linode);
    };
}
/*
 * SEARCH ENGINE LIST
 */
// show or hide search engine list from button
document.getElementById("list-search").addEventListener("click", function(e){
    let searchEngineList = document.getElementById("searchEngineList");

    if(searchEngineList.classList.contains("hide")){
        showHideList("show");
    }else{
        showHideList("hide");
    }
});
function showHideList(action){
    let searchEngineList = document.getElementById("searchEngineList");
    if(action == "show"){
        searchEngineList.classList.remove("hide");
        searchEngineList.classList.add("show");
    }else{
        searchEngineList.classList.remove("show");
        searchEngineList.classList.add("hide");
    }
}
/*
 * EVENT LISTENERS
 */
document.getElementById("searchEngineList").addEventListener("click", function(e){
    if(e.target.tagName == "A"){
        document.searchForm.q.value = searchEngines[searchKeys[searchKeys.indexOf(e.target.innerHTML)]][0].tag + ":";
        document.searchForm.q.focus();
        showHideList("hide");
    }
});
document.getElementById("searchEngineList").addEventListener("mouseover", function(e){
    if(e.target.tagName == "A"){
        document.searchForm.q.value = searchEngines[searchKeys[searchKeys.indexOf(e.target.innerHTML)]][0].tag + ":";
    }
});
document.getElementById("searchEngineList").addEventListener("mouseleave", function(e){
    if(document.searchForm.q == document.activeElement){
        return;
    }else{
        document.searchForm.q.value = "";
        showHideList("hide");
    }
});
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

populateSearchList();
populateBookmarkList();
getTime();  // initial get time to avoid 1s delay
setInterval(getTime, 1000);
