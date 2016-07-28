// Handles the search query
class Search{
    constructor(){
        this.PROTOEXT = "http://";     // external protocol
        this.PROTOINT = "file";        // internal protocol
        this.SEPARATOR = ':';

        this.query = document.searchForm.q.value.split(this.SEPARATOR);

        this.processQuery();
    }
    processQuery(){
        if(!this.checkLocalHost(this.query) && this.isQuery(this.query[0])){
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
                // external url
                if(this.isURL(this.query[0])){
                    window.location = this.PROTOEXT + this.query[0];
                    return
                }
                this.defaultSearch(this.query[0]);
            // search array for engine and redirect to url
            }else{
                if(this.query.length == 2){
                    // check if firefox about page
                    if(this.query[0] == "about"){
                        let ffQuery = this.query[0] + this.SEPARATOR + this.query[1];
                        if(ffAboutPage.indexOf(ffQuery) > -1){
                            window.alert("Firefox about pages can only be accessed directly from the url bar.");
                            return;
                        }
                    }
                    // local file system
                    if(this.query[0] == this.PROTOINT){
                        window.location = this.query[0] + this.SEPARATOR + this.query[1];
                        return;
                    }
                }
                // iterate through searchEngines and check for correct site tag
                for(let i=0; i<searchKeys.length; i++){
                    if(this.query[0] == searchEngines[searchKeys[i]][0].tag ||
                            this.query[0].toLowerCase() == searchKeys[i].toLowerCase()){
                        // rebuild this.query is needed
                        if(this.query.length > 2){
                            this.query = rebuildSearchQuery();
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
    // check if string is valid url
    isURL(q){
        if(q.indexOf(".") == -1){
            return false;
        }
        let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // this.query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return pattern.test(q);
    }
    // check if query is 192.168.x.x
    // TODO: Add other local IP addresses
    checkLocalHost(){
        if(this.query[0].indexOf("192.") > -1 || this.query[0].indexOf("localhost") > -1){
            let url = this.PROTOEXT + this.query[0];

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
