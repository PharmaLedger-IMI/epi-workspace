function SmartUrl(bdnsEntry){
    if(bdnsEntry.concatWith){
        //bdnsEntry is already a SmartUrl instance
        return bdnsEntry;
    }

    let url = typeof bdnsEntry === "string" ? bdnsEntry : bdnsEntry.url;

    function getOptions(options){
        let opts = options || this.opts || {};
        if(!opts.headers){
            opts.headers = {};
        }
        if(url !== bdnsEntry && bdnsEntry.headers){
            Object.assign(opts.headers, bdnsEntry.headers);
        }
        this.opts = opts;
        return opts;
    }

    this.fetch = (options)=>{
        return fetch(url, getOptions.call(this, options));
    }

    this.getRequest = (options)=>{
        let request = new Request(url, getOptions.call(this, options));
        request.smartUrl = this;
        return request;
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
        return new SmartUrl(bdnsEntry === url ? concatUrls(url, path) : {url: concatUrls(url, path), headers : bdnsEntry.headers});
    }
}

export default SmartUrl;