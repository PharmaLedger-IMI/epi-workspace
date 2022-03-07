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
const domain = "default";
const resolver = require("opendsu").loadApi("resolver");
const leafletLanguages = ["bg", "zh", "hr", "cs", "da", "nl", "en", "et", "fi", "fr", "ka", "de", "el", "he", "hi", "hu", "id", "it", "ja", "ko", "lt", "lv", "mk", "no", "pa", "pl", "pt", "ro", "ru", "sr", "sk", "es", "sv", "th", "tr", "uk", "vi"];

assert.callback("ApiHub leaflet upload performance test", async (finishTest) => {
  try {
    const endpoint = await utils.launchEndpoint();
    let mainNode = await utils.launchMainServer([
      {name: "endpoint", url: endpoint.url}
    ]);

    let {enclaveDB, subjectSSI} = await utils.preapareWallet();

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


    const awaitTimeout = delay => new Promise(resolve => setTimeout(resolve, delay));

    // create new product
    await $$.promisify(doPut)(`${mainNode.url}/mappingEngine/${domain}/default`, JSON.stringify([prodGoodMsg]), {headers: {token: subjectSSI.getIdentifier()}});
    let result = [];
    do {
      await awaitTimeout(2 * 1000);
      let response = await http.fetch(`${mainNode.url}/mappingEngine/${domain}/logs`);
      try {
        result = await response.json();
      } catch (err) {
        console.log("No results to parse, trying again ...");
      }
    } while (result.length < 1);

    assert.equal(result[0].requestMessageId, prodGoodMsg.messageId);

    // send leafletes for created  product
    await $$.promisify(doPut)(`${mainNode.url}/mappingEngine/${domain}/default`, JSON.stringify(leafletMessages), {headers: {token: subjectSSI.getIdentifier()}});
    await awaitTimeout(3 * 60 * 1000);
    let dbResult = null;
    dbResult = await $$.promisify(enclaveDB.getRecord)(epiUtils.constants.PRODUCTS_TABLE, prodGoodMsg.product.productCode);
    assert.true(dbResult !== null);
    let productDSU = await $$.promisify(resolver.loadDSU)(dbResult.keySSI);
    assert.true(productDSU !== null);
    let leafletData = null;
    let leaflets = await $$.promisify(productDSU.listFolders)("/leaflet");
    console.log(`Number of dsu leaflets is: ${leaflets.length}`);
    assert.true(leaflets.length > 3);
    for (const leafletLanguageCode of leaflets) {
      let leafletFiles = await $$.promisify(productDSU.listFiles)("/leaflet/" + leafletLanguageCode);
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
