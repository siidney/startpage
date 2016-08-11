// Handles the search query
class Search{
    constructor(){
        this.SEPARATOR = ':';

        // check for empty string
        // alert of ff about page
        // redirect to addresses
        if(this.isQuery(searchForm.q.value)){
            if(ffAboutPage.indexOf(document.searchForm.q.value) > -1){
                window.alert("Firefox about pages can only be accessed directly from the url bar.");
                return;
            }
            if(this.isURL(document.searchForm.q.value)){
                window.location = document.searchForm.q.value;
                return;
            }
            this.query = document.searchForm.q.value.split(this.SEPARATOR);

            this.processQuery();
        }
    }
    processQuery(){
        if(!this.checkLocalHost(this.query)){
            // check if this.query is just a search term
            if(this.query.length == 1){
                // search engine homepage - strip search this.query from url
                for(let i=0; i<searchKeys.length; ++i){
                    if(this.query[0] == searchEngines[searchKeys[i]][0].tag ||
                            this.query[0].toLowerCase() == searchKeys[i].toLowerCase()){

                        let url = document.createElement("a");
                        url.href = searchEngines[searchKeys[i]][0].url;

                        window.location = url.protocol + "//" + url.host;
                        return;
                    }
                }
                this.defaultSearch(this.query[0]);
            // search array for engine and redirect to url
            }else{
                // iterate through searchEngines and check for correct site tag
                for(let i=0; i<searchKeys.length; i++){
                    if(this.query[0] == searchEngines[searchKeys[i]][0].tag ||
                            this.query[0].toLowerCase() == searchKeys[i].toLowerCase()){
                        // rebuild this.query is needed
                        if(this.query.length > 2){
                            this.query = this.rebuildSearchQuery();
                        }
                        window.location = searchEngines[searchKeys[i]][0].url + encodeURIComponent(this.query[1]);
                        return;
                    }
                };
                // this.query[0] not correct tag
                this.defaultSearch(this.query);
            }
        }
    }
    // ensure this.query is valid
    // exists && contains more than just whitespace && has length > 0
    isQuery(q){
        return (q && (/\S/.test(q) && q.length > 0));
    }
    // check if string is url
    isURL(q){
        if(q.indexOf("://") > -1){
            for(let i=0; i<protocols.length; ++i){
                if(q.indexOf(protocols[i]) > -1){
                    return true;
                }
            };
        }
        return false;
    }
    // check if query is 192.168.x.x
    // TODO: Add other local IP addresses
    checkLocalHost(){
        if(this.query[0].indexOf("192.") > -1 || this.query[0].indexOf("localhost") > -1){
            let url = protocols[0] + this.query[0];

            if(this.query[1]){
                url += this.SEPARATOR + this.query[1];
            }

            window.location = url;
            return true;
        }

        return false;
    }
    // search with default engine
    defaultSearch(q){
        for(let i=0; i<searchKeys.length; i++){
            if(searchEngines[searchKeys[i]][0].default == "true"){
                // rebuild this.query if needed
                if(this.query.length > 1){
                    q = this.rebuildSearchQuery(true);
                }
                window.location = searchEngines[searchKeys[i]][0].url + encodeURIComponent(q);
                return;
            }
        }
        window.alert("ERROR: No default search engine set.\nPlease edit public/js/lists.js to set one.");
    }
    // if this.query.length > 2 there are : character's in search string
    // build a new this.query from this.query components, replace : chars and rebuild
    // this.query
    rebuildSearchQuery(defaultSearch = false){
        let tmp = "";
        let sArr = [];

        for(let i=this.query.length -1; i>=1; i--){
            sArr[i] = (i > 1) ? (this.SEPARATOR + this.query[i]) : this.query[i];
            this.query.pop();
        }
        // if no search engine specified this.query[0] is part of the query and
        // should not be ignored
        if(defaultSearch){
            sArr[0] = this.query[0] + this.SEPARATOR;
            return sArr.join("");
        }
        tmp = sArr.join("");
        this.query[1] = tmp;
        return this.query;
    }
}
