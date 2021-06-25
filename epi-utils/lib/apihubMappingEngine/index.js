const MAX_GROUP_SIZE = 10;
const GROUPING_TIMEOUT = 5*1000; //5 seconds
function getEPIMappingEngineForAPIHUB(server) {
    let messagesPipe = {};
    const gtinResolverBundle = "./../../../gtin-resolver/build/bundles/gtinResolver.js";
    require(gtinResolverBundle);
    const epiUtilsBundle = "./../../../epi-utils/build/bundles/epiUtils.js";
    require(epiUtilsBundle);
    const apiHub = require("apihub");

    const epiUtils = require("epi-utils");
    let LogService = epiUtils.loadApi("services").LogService;
    const mappings = epiUtils.loadApi("mappings")
    const MessagesPipe = epiUtils.getMessagesPipe();

    function getMessagePipe(domain, callback) {
        if (messagesPipe[domain] === undefined) {

            let domainConfig,subdomain, walletSSI;
            domainConfig = apiHub.getDomainConfig(domain);

            if(!domainConfig){
                return callback(new Error(`Domain configuration ${domain} not found`));
            }

            if(!domainConfig.mappingEngineWalletSSI) {
                return callback(new Error(`mappingEngineWalletSSI is not set in the domain with name ${domain} configuration`));
            }

            walletSSI = domainConfig.mappingEngineWalletSSI;
            subdomain = domainConfig.bricksDomain || domain;

            const holderInfo = {domain: domain, subdomain: subdomain};
            const ServerDSUStorageImpl = epiUtils.loadApi("services").DSUStorage.getInstance(walletSSI);
            let mappingEngine = mappings.getEPIMappingEngine(ServerDSUStorageImpl, {
                holderInfo: holderInfo,
                logService: new LogService(ServerDSUStorageImpl)
            });


            const MessageQueuingService = require("epi-utils").loadApi("services").getMessageQueuingServiceInstance();
            messagesPipe[domain] = new MessagesPipe(MAX_GROUP_SIZE, GROUPING_TIMEOUT, MessageQueuingService.getNextMessagesBlock);

            messagesPipe[domain].onNewGroup(async (groupMessages) => {
                console.log(`[MAPPING ENGINE]: ${groupMessages.length} new messages arrived. Processing...`)
                let undigestedMessages = await mappingEngine.digestMessages(groupMessages);
                console.log("[MAPPING ENGINE]:Undigested messages:", undigestedMessages.length)
            });
        }

        callback(undefined, messagesPipe[domain]);
    }

    server.put("/mappingEngine/:domain", function (request, response, next) {

        let domainName = request.params.domain;

        console.log("EPI Mapping Engine called for domain: ", domainName);

            let data = [];
            request.on('data', (chunk) => {
                data.push(chunk);
            });

            request.on('end', () => {

                try {
                    let messages = JSON.parse(data.toString());

                    getMessagePipe(domainName,(err, messagesPipe)=>{
                        if(err){
                            console.log(err);
                            response.statusCode = 500;
                            return response.end();

                        }
                        messagesPipe.addInQueue(messages);
                        response.statusCode = 200;
                        response.end();
                    });

                } catch (e) {
                    console.error(e);
                    response.statusCode = 500;
                    response.end();
                }
            })

    });
}

module.exports.getEPIMappingEngineForAPIHUB = getEPIMappingEngineForAPIHUB;
