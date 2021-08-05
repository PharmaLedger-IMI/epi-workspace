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

	async function getMessagePipe(domain, wltSSI, callback) {
		let domainConfig, subdomain, walletSSI;
		domainConfig = apiHub.getDomainConfig(domain);
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
			subdomain = domainConfig.bricksDomain || domain;
			const holderInfo = {domain: domain, subdomain: subdomain};
			const ServerDSUStorageImpl = epiUtils.loadApi("services").DSUStorage.getInstance(walletSSI);
			return ServerDSUStorageImpl.enableDirectAccess((err) => {
				if(err){
					return callback(err);
				}
				try {
					const logService = new LogService(ServerDSUStorageImpl);
					const mappingEngine = mappings.getEPIMappingEngine(ServerDSUStorageImpl, {
						holderInfo: holderInfo,
						logService: logService
					})
					const MessageQueuingService = require("epi-utils").loadApi("services").getMessageQueuingServiceInstance();
					messagesPipe[walletSSI] = new MessagesPipe(MAX_GROUP_SIZE, GROUPING_TIMEOUT, MessageQueuingService.getNextMessagesBlock);
					messagesPipe[walletSSI].onNewGroup(async (groupMessages) => {
						console.log(`[MAPPING ENGINE]: ${groupMessages.length} new messages arrived. Processing...`)
						try {
							let undigestedMessages = await mappingEngine.digestMessages(groupMessages);
							console.log("[MAPPING ENGINE]:Undigested messages:", undigestedMessages.length);
						} catch (e) {
							console.log(e);
						}
					});
				} catch (err) {
					callback(err);
				}
				callback(undefined, messagesPipe[walletSSI]);
			});
		}

		callback(undefined, messagesPipe[walletSSI]);
	}

	server.put("/mappingEngine/:domain", function (request, response, next) {

		let domainName = request.params.domain;
		const walletSSI = request.headers.token
		console.log(`EPI Mapping Engine called for domain:  ${domainName}, and walletSSI : ${walletSSI}`);

		let data = [];
		request.on('data', (chunk) => {
			data.push(chunk);
		});

		request.on('end', async () => {

			try {
				let body = Buffer.concat(data).toString();
				let messages = JSON.parse(body);

				getMessagePipe(domainName, walletSSI, (err, messagesPipe) => {
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

	});
}

module.exports.getEPIMappingEngineForAPIHUB = getEPIMappingEngineForAPIHUB;
