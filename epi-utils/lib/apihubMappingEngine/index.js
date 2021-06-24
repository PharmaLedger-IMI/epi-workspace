//TODO: FIX iT
function getEPIMappingEngineForAPIHUB(server) {
    return;
    let messagesPipe;
    let mappingEngines = {};
    const epiUtils = require("epi-utils");
    let LogService = epiUtils.loadApi("services").LogService;
    const gtinResolverBundle = "./../../../gtin-resolver/build/bundles/gtinResolver.js";
    require(gtinResolverBundle);
    const epiUtilsBundle = "./../../../epi-utils/build/bundles/epiUtils.js";
    require(epiUtilsBundle);
    const mappings = epiUtils.loadApi("mappings")


    function getMessagesPipe(domain) {
        if (mappingEngines[domain] === undefined) {
            let domainConfig = config.getDomainConfig(domain);
            let subdomain = domainConfig.bricksDomain || domain;

            const holderInfo = {domain: domain, subdomain: subdomain};
            const ServerDSUStorageImpl = epiUtils.loadApi("services").DSUStorage.createInstance();
            mappingEngines[domain] = mappings.getEPIMappingEngine(ServerDSUStorageImpl, {
                holderInfo: holderInfo,
                logService: new LogService(ServerDSUStorageImpl)
            });

            const MessagesPipe = require("epi-utils").getMessagesPipe();
            const MessageQueuingService = require("epi-utils").loadApi("services").getMessageQueuingServiceInstance();
            messagesPipe = new MessagesPipe(10, 2*1000, MessageQueuingService.getNextMessagesBlock);


            messagesPipe.onNewGroup(async (groupMessages) => {
                let undigestedMessages =  mappingEngines[domain].digestMessages(groupMessages);
                console.log("Undigested messages:", undigestedMessages.length)
            });
        }

        return mappingEngines[domain];
    }

    server.put("/mappingEngine/:domain",  function  (request, response, next) {
        console.log("EPI Mapping Engine called. WIP!");

        let domain = request.params.domain;

        let messagesPipe = getMessagesPipe(domain);

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

            response.statusCode = 200;
            response.end();

        })
    });
}

module.exports.getEPIMappingEngineForAPIHUB =  getEPIMappingEngineForAPIHUB;
