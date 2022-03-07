require('../../privatesky/psknode/bundles/testsRuntime');
require('../../gtin-resolver/build/bundles/gtinResolver');
const testIntegration = require("../../privatesky/psknode/tests/util/tir");
const childProcess = require("child_process");
const messages = require("./assets/messageTypes.json");
const opendsu = require('opendsu');
const epiUtils = require("../lib/utils")
const dc = require("double-check");
const {assert} = dc;
const http = opendsu.loadApi("http");
const doPut = $$.promisify(http.doPut);
const utils = require("./utils");
const gtinResolver = require("gtin-resolver");
const domain = "epi";
const subdomain = "default";
const resolver = require("opendsu").loadApi("resolver");
const apiHubUrl = "http://a52a1211217f34a4ca4e992612edc7fd-689124333.eu-central-1.elb.amazonaws.com/mappingEngine";
const headerToken = "65FmT6jYpmQXhAkCPpZszsN8xnAAEa93g3JKN2dh6dVnraH4tQFr6k5Zw2snJ6VTaLtGXFT7tR941rKEDfmFRMEYe53XrVAq"
const awaitTimeout = delay => new Promise(resolve => setTimeout(resolve, delay));
const TIMEOUT = 1 * 60 * 1000;
const numberOfLeafletsToSend = 20;
const leafletLanguages = ["bg", "zh", "hr", "cs", "da", "nl", "en", "et", "fi", "fr", "ka", "de", "el", "he", "hi", "hu", "id", "it", "ja", "ko", "lt", "lv", "mk", "no", "pa", "pl", "pt", "ro", "ru", "sr", "sk", "es", "sv", "th", "tr", "uk", "vi"];

assert.callback("ApiHub leaflet upload performance test", async (finishTest) => {
  try {

    const system = opendsu.loadAPI("system");
    system.setEnvironmentVariable(opendsu.constants.BDNS_ROOT_HOSTS, "http://a52a1211217f34a4ca4e992612edc7fd-689124333.eu-central-1.elb.amazonaws.com");
    let prodMsg = getMockMessage("Product");
    let prodGoodMsg = utils.setEndpointMessages("endpoint", 1, prodMsg)[0];
    let leafletMsg = getMockMessage("leaflet");
    leafletMsg.productCode = prodGoodMsg.product.productCode;
    let leafletMessages = [];
    leafletLanguages.forEach(lang => {
      let clone = JSON.parse(JSON.stringify(leafletMsg));
      clone.language = lang;
      leafletMessages.push(clone);
    })

    // create new product
    await $$.promisify(doPut)(`${apiHubUrl}/${domain}/${subdomain}`, JSON.stringify([prodGoodMsg]), {headers: {token: headerToken}});
    await awaitTimeout(30 * 1000); // wait for product dsu to be created

    // send leafletes for created  product

    await $$.promisify(doPut)(`${apiHubUrl}/${domain}/${subdomain}`, JSON.stringify(leafletMessages), {headers: {token: headerToken}});
    await awaitTimeout(TIMEOUT); // wait for amount of time before checking results
    const gtinSSI = gtinResolver.createGTIN_SSI(domain, subdomain, prodGoodMsg.product.productCode);
    let wallet = await $$.promisify(resolver.loadDSU)(gtinSSI);
    let leaflets = await $$.promisify(wallet.listFolders)("/product/leaflet");
    console.log(`Number of dsu leaflets is: ${leaflets.length}`);
    assert.true(leaflets.length > 15);
    for (const leafletLanguageCode of leaflets) {
      let leafletFiles = await $$.promisify(wallet.listFiles)("/product/leaflet/" + leafletLanguageCode);
      assert.true(leafletFiles.length === 47);
    }

  } catch (e) {
    console.error("Error on put message ", e);
  } finally {
    finishTest();
  }
}, 8 * 60 * 1000);

function getMockMessage(messageType) {
  return messages.find(item => item.messageType === messageType);
}
