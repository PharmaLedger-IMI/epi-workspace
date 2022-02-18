require('../../privatesky/psknode/bundles/testsRuntime');
require('../../gtin-resolver/build/bundles/gtinResolver');
const testIntegration = require("../../privatesky/psknode/tests/util/tir");
const epiUtils = require("../lib/utils")
const domain = "default";
const dc = require("double-check");
const {assert, createTestFolder} = dc;


async function launchEndpoint() {
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
        },
        "enable": ["mq", "enclave"]
      }
    }],
    serverConfig: {
      "activeComponents": [
        "bdns",
        "bricksLedger",
        "bricksFabric",
        "bricking",
        "anchoring",
        "epi-mapping-engine-results",
        "mq"
      ],
      "componentsConfig": {
        "epi-mapping-engine-results": {
          "module": require("path").join(__dirname, "../"),
          "function": "getEPIMappingEngineMessageResults"
        }
      },
    }
  };
  apihubConfig.rootFolder = await $$.promisify(createTestFolder)('enclaveBuffering' + Math.floor(Math.random() * 10000));
  return await $$.promisify(testIntegration.launchConfigurableApiHubTestNode)(apihubConfig);
}

assert.callback("child", async () => {
  const result = await launchEndpoint();
  process.send(result, (err) => {
    if (err) {
      throw err;
    }
  })
}, 10 * 60 * 1000)

