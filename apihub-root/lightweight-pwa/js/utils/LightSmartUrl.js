function SmartUrl(bdnsEntry){
    if(bdnsEntry.concatWith){
        //bdnsEntry is already a SmartUrl instance
        return bdnsEntry;
    }

    let url = typeof bdnsEntry === "string" ? bdnsEntry : bdnsEntry.url;

    function getOptions(options){
        let opts = options || {};
        if(!opts.headers){
            opts.headers = {};
        }
        if(url !== bdnsEntry && bdnsEntry.headers){
            Object.assign(opts.headers, bdnsEntry.headers);
        }
        return opts;
    }

    this.fetch = (options)=>{
        return fetch(url, getOptions(options));
    }

    this.getRequest = (options)=>{
        return new Request(url, getOptions(options));
    }

    function concatUrls(base, path){
        let returnUrl = base;
        if(returnUrl.endsWith("/") && path.startsWith("/")){
            returnUrl = returnUrl.slice(0, returnUrl.length-1);
        }
        returnUrl += path;
        return returnUrl;
    }

    this.concatWith = (path) => {
        return new SmartUrl(bdnsEntry === url ? concatUrls(url, path) :{url: concatUrls(url, path), headers:bdnsEntry.headers});
    }
}

export default SmartUrl;