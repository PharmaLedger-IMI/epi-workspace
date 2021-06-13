function getEPIMappingEngineForAPIHUB(server) {
    let mappingEngineInitialized = false;

    const initializeApiHubMappingEngine = ()=>{
        const gtinResolverBundle = "./../../../gtin-resolver/build/bundles/gtinResolver.js";
        require(gtinResolverBundle);
        const epiUtilsBundle = "./../../../epi-utils/build/bundles/epiUtils.js";
        require(epiUtilsBundle);
        const epiUtils = require("epi-utils");

        const MessagesPipe = require("epi-utils").getMessagesPipe();
        const MessageQueuingService = require("epi-utils").loadApi("services").getMessageQueuingServiceInstance();
        let messagesPipe = new MessagesPipe(10, 2*1000, MessageQueuingService.getNextMessagesBlock);


        const ServerDSUStorageImpl = epiUtils.loadApi("services").DSUStorage.getInstance();
        const mappings = epiUtils.loadApi("mappings")

        const holderInfo = {domain: "epi", subdomain: "default"};
        let LogService = epiUtils.loadApi("services").LogService;

        const mappingEngine = mappings.getEPIMappingEngine(ServerDSUStorageImpl, {
            holderInfo: holderInfo,
            logService: new LogService(ServerDSUStorageImpl)
        });

        messagesPipe.onNewGroup(async (groupMessages) => {
            let undigestedMessages = await mappingEngine.digestMessages(groupMessages);
            console.log("Undigested messages:", undigestedMessages.length)
        });
    }

    server.put("/mappingEngine/:domain",  function  (request, response, next) {
        console.log("EPI Mapping Engine called. WIP!");

        if(!mappingEngineInitialized){
            try {
                initializeApiHubMappingEngine();
                mappingEngineInitialized = true;
            }
            catch (e) {
                console.error("MappingEngine initialization failed", e);
                response.statusCode = 500;
                return response.end();
            }
        }

        let data = [];
        request.on('data', (chunk) => {
            data.push(chunk);
        });

        request.on('end',()=>{

            try {
                let messages = JSON.parse(data.toString());
                messagesPipe.addInQueue(messages);
            }
            catch (e){
                console.error(e);
            }
        })

        response.statusCode = 200;
        response.end();
    });
}

module.exports.getEPIMappingEngineForAPIHUB =  getEPIMappingEngineForAPIHUB;
