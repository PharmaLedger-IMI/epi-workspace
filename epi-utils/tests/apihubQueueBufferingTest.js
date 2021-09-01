require('../../privatesky/psknode/bundles/testsRuntime');
require('../../gtin-resolver/build/bundles/gtinResolver');
const testIntegration = require("../../privatesky/psknode/tests/util/tir");
const opendsu = require('opendsu');
const fs = require("fs");
const messages = require("./assets/messages.json");
const epiUtils = require("../lib/utils")
const dc = require("double-check");
const enclaveDB = require("default-enclave");

const {assert, createTestFolder} = dc;
const http = opendsu.loadApi("http");
const doPut = $$.promisify(http.doPut);

const domain = "default";
const endpoint1NrOfMsgs = 15;
const endpoint2NrOfMsgs = 12;

async function launchMainServer(endpointsURL) {
  let apihubConfig = {
    domains: [{
      name: domain,
      config: {
        "anchoring": {
          "type": "FS",
          "option": {
            "enableBricksLedger": false
          },
          "commands": {
            "addAnchor": "anchor"
          }
        }
      }
    }],
    serverConfig: {
      "activeComponents": [
        "bdns",
        "bricksLedger",
        "bricksFabric",
        "bricking",
        "anchoring",
        "epi-mapping-engine",
        "epi-mapping-engine-results"
      ],
      "componentsConfig": {
        "epi-mapping-engine": {
          "module": require("path").join(__dirname, "../"),
          "function": "getEPIMappingEngineForAPIHUB"
        },
        "epi-mapping-engine-results": {
          "module": require("path").join(__dirname, "../"),
          "function": "getEPIMappingEngineMessageResults"
        }
      },
    }
  };
  let configDomain = apihubConfig.domains.find(item => item.name === domain);
  configDomain.config.messagesEndPoints = [];
  endpointsURL.forEach(endpoint => {
    configDomain.config.messagesEndPoints.push({
      "endPointId": endpoint.name,
      "endPointURL": `${endpoint.url}/mappingEngine/${domain}/default/saveResult`
    })
  })
  apihubConfig.rootFolder = await $$.promisify(createTestFolder)('enclaveBuffering' + Math.floor(Math.random() * 10000));
  return await $$.promisify(testIntegration.launchConfigurableApiHubTestNode)(apihubConfig);

}

async function launchEndpoint() {
  return new Promise((resolve, reject) => {
    const childProcess = require("child_process");
    const childEndpoint = childProcess.fork("./apihubQueueBufferingChild.js", [], {stdio: [0, 1, 2, "ipc"]});
    childEndpoint.on("error", reject)
    childEndpoint.on("message", resolve);
  })
}

function setEndpointMessages(endpoint, nrOfMessages, message) {
  let resultArr = [];
  for (let i = 0; i < nrOfMessages; i++) {
    let clone = JSON.parse(JSON.stringify(message));
    clone.senderId = endpoint;
    clone.product.productCode = "" + Math.floor(Math.random() * 100000000000000);
    clone.messageId = "" + Math.floor(Math.random() * 10000000);
    resultArr.push(clone);
  }
  return resultArr;
}

assert.callback("ApiHub message bauffering with enclave queue", async (finishTest) => {
  const endpoint1 = await launchEndpoint();
  const endpoint2 = await launchEndpoint();
  let mainNode = await launchMainServer([
    {name: "endpoint1", url: endpoint1.url},
    {name: "endpoint2", url: endpoint2.url}
  ])

  let keySSI = require("opendsu").loadApi("keyssi");
  let resolver = require("opendsu").loadApi("resolver");
  let crypto = require("opendsu").loadApi("crypto");
  try {
    const issuerDSU = await $$.promisify(resolver.createSeedDSU)(domain, {})
    const issuerSSI = await $$.promisify(issuerDSU.getKeySSIAsString)();
    const activeWallet = await $$.promisify(resolver.createSeedDSU)(domain, {})
    const subjectSSI = await $$.promisify(activeWallet.getKeySSIAsObject)();
    const token = await $$.promisify(crypto.createCredential)(issuerSSI, subjectSSI.derive())
    await $$.promisify(activeWallet.writeFile)("/myKeys/credential.json", JSON.stringify({credential: token}))

    let message = messages.find(item => item.messageType === "Product");


    let testMessages = [...setEndpointMessages("endpoint1", endpoint1NrOfMsgs, message), ...setEndpointMessages("endpoint2", endpoint2NrOfMsgs, message)]


    const putResult = await $$.promisify(doPut)(`${mainNode.url}/mappingEngine/${domain}/default`, JSON.stringify(testMessages), {headers: {token: subjectSSI.getIdentifier()}});
    let queuePath = require("path").resolve(mainNode.rootFolder);
    queuePath = require("path").join(queuePath, "messageQueueDB");

    setTimeout(async () => {
      try {
        let enclaveQueue = new enclaveDB(queuePath + "/queue.db");
        let queueSize = await $$.promisify(enclaveQueue.queueSize)("", subjectSSI.getIdentifier());
        assert.equal(queueSize, endpoint1NrOfMsgs + endpoint2NrOfMsgs);
        mainNode = await $$.promisify(testIntegration.restart)();
      } catch (e) {
        throw e
      }
    }, 200)

    let interval = setInterval(async () => {
      let enclaveQueue = new enclaveDB(queuePath + "/queue.db");
      let queueSize = await $$.promisify(enclaveQueue.queueSize)("", subjectSSI.getIdentifier());
      if (queueSize === 0) {
        clearInterval(interval);
        setTimeout(async () => {
          let response1 = await http.fetch(`${endpoint1.url}/mappingEngine/${domain}/logs`);
          let result1 = await response1.json();
          assert.equal(result1.length, endpoint1NrOfMsgs);
          let response2 = await http.fetch(`${endpoint2.url}/mappingEngine/${domain}/logs`);
          let result2 = await response2.json();
          assert.equal(result2.length, endpoint2NrOfMsgs);
          finishTest();
        }, 2000)
      }
    }, 1000)

  } catch
    (e) {
    console.log("Error on put message ", e);
  }
}, 240 * 1000)
