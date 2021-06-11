function getEPIMappingEngineForAPIHUB(server) {


    server.put("/mappingEngine/:domain", function (request, response, next) {
        console.log("EPI Mapping Engine called. Not Implemented yet!");

        //body contains an array of messages




        const gtinResolverBundle = "./../../../gtin-resolver/build/bundles/gtinResolver.js";
        require(gtinResolverBundle);
        const epiUtilsBundle = "./../../../epi-utils/build/bundles/epiUtils.js";
        require(epiUtilsBundle);
        const epiUtils = require("epi-utils");


        //TODO: Implement DSUStorage and after uncomment the next to lines of code to get access to the Mapping Engine

        let data = [];
        request.on('data', (chunk) => {
            data.push(chunk);
        });

        request.on('end',()=>{
            console.log(data.toString());
        })


        const ServerDSUStorageImpl = epiUtils.loadApi("services").DSUStorage.getInstance();
        const mappings = epiUtils.loadApi("mappings")

        const holderInfo = {domain: "epi", subdomain: "default"};
        let LogService = epiUtils.loadApi("services").LogService;
        const mappingEngine = mappings.getEPIMappingEngine(ServerDSUStorageImpl, {
            holderInfo: holderInfo,
            logService: new LogService(ServerDSUStorageImpl)
        });



        //mappingEngine.digestMessages(groupMessages);


        response.statusCode = 200;
        response.end();
    });
}

module.exports.getEPIMappingEngineForAPIHUB =  getEPIMappingEngineForAPIHUB;