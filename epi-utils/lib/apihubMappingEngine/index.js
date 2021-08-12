const MAX_GROUP_SIZE = 10;
const GROUPING_TIMEOUT = 5 * 1000; //5 seconds
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

  async function getMessagePipe(domain, subdomainName, wltSSI, callback) {
    let domainConfig, subdomain, walletSSI, messagesEndpoint;
    domainConfig = apiHub.getDomainConfig(domain);
    let getBaseUrl = require("opendsu").loadApi("system").getBaseURL();

    /*
     if walletSSI not provided in request header get it form config
    */
    if (!wltSSI) {
      if (!domainConfig) {
        return callback(new Error(`Domain configuration ${domain} not found`));
      }

      if (!domainConfig.mappingEngineWalletSSI) {
        return callback(new Error(`mappingEngineWalletSSI is not set in the domain with name ${domain} configuration`));
      }
    }

    walletSSI = wltSSI || domainConfig.mappingEngineWalletSSI;
    if (messagesPipe[walletSSI] === undefined) {
      let subdomain = domainConfig.bricksDomain || subdomainName;
      messagesEndpoint = domainConfig.messagesEndpoint || `${getBaseUrl()}/mappingEngine/${domain}/${subdomain}/saveResult`
      const holderInfo = {domain: domain, subdomain: subdomain};
      const ServerDSUStorageImpl = epiUtils.loadApi("services").DSUStorage.getInstance(walletSSI);
      try {
        return ServerDSUStorageImpl.enableDirectAccess((err) => {
          if (err) {
            return callback(err);
          }
          const logService = new LogService(ServerDSUStorageImpl);
          const mappingEngine = mappings.getEPIMappingEngine(ServerDSUStorageImpl, {
            holderInfo: holderInfo,
            logService: logService
          })
          const MessageQueuingService = require("epi-utils").loadApi("services").getMessageQueuingServiceInstance();
          messagesPipe[walletSSI] = new MessagesPipe(MAX_GROUP_SIZE, GROUPING_TIMEOUT, MessageQueuingService.getNextMessagesBlock);
          messagesPipe[walletSSI].onNewGroup(async (groupMessages) => {
            console.log(`[MAPPING ENGINE]: ${groupMessages.length} new messages arrived. Processing...`);

            let messagesToPersist = groupMessages.map(msg => {
              let response = mappings.buildResponse(0.2);
              response.setReceiverId(msg.senderId);
              response.setSenderId(msg.receiverId);
              response.setMessageType(msg.messageType);
              response.setRequestData(msg);
              return response;
            });
            try {
              let undigestedMessages = await mappingEngine.digestMessages(groupMessages);
              console.log("[MAPPING ENGINE]:Undigested messages:", undigestedMessages.length);

              messagesToPersist.forEach(item => {
                let index = undigestedMessages.findIndex(elem => elem.message.messageId === item.requestMessageId)

                if (index >= 0) {
                  let messageErrors = [];
                  let undigestedMessage = undigestedMessages[index];
                  if (undigestedMessage.error && undigestedMessage.error.otherErrors && undigestedMessage.error.otherErrors.details.length) {
                    undigestedMessage.error.otherErrors.details.forEach((element, index) => {
                      item.addErrorResponse(element.errorType, element.errorMessage, element.errorDetails, element.errorField);
                    })
                  }
                } else {
                  item.addSuccessResponse();
                }
              })

            } catch (e) {
              console.log(e);
            }

            const httpSpace = require("opendsu").loadApi('http');
            messagesToPersist.forEach(item => {
              httpSpace.doPut(messagesEndpoint, JSON.stringify(item), (err, data) => {
                if (err) {
                  console.log("Could not persist message ", item);
                }
              })
            })

          });

          callback(undefined, messagesPipe[walletSSI]);
        });
      } catch (err) {
        return callback(err);
      }

    }

    callback(undefined, messagesPipe[walletSSI]);
  }

  function putMessage(request, response) {

    let domainName = request.params.domain;
    let subdomainName = request.params.subdomain;
    const walletSSI = request.headers.token;

    console.log(`EPI Mapping Engine called for domain:  ${domainName}, and walletSSI : ${walletSSI}`);

    let data = [];
    request.on('data', (chunk) => {
      data.push(chunk);
    });

    request.on('end', async () => {

      try {
        let body = Buffer.concat(data).toString();
        let messages = JSON.parse(body);

        getMessagePipe(domainName, subdomainName, walletSSI, (err, messagesPipe) => {
          if (err) {
            console.log(err);
            err.debug_message === "Invalid credentials" ? response.statusCode = 403 : response.statusCode = 500;
            return response.end();

          }
          if (!messagesPipe) {
            response.statusCode = 403;
            return response.end();
          }
          messagesPipe.addInQueue(messages);
          response.statusCode = 200;
          response.end();
        });

      } catch (err) {
        console.error(err);
        err.debug_message === "Invalid credentials" ? response.statusCode = 403 : response.statusCode = 500;
        response.end();
      }
    })

  }

  server.put("/mappingEngine/:domain", putMessage);
  server.put("/mappingEngine/:domain/:subdomain", putMessage);

}

module.exports.getEPIMappingEngineForAPIHUB = getEPIMappingEngineForAPIHUB;
