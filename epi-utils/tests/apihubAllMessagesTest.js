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

assert.callback("ApiHub test message types and responses", async (finishTest) => {

  try {
    const endpoint = await utils.launchEndpoint();
    let mainNode = await utils.launchMainServer([
      {name: "endpoint", url: endpoint.url}
    ]);

    let {enclaveDB, subjectSSI} = await utils.preapareWallet();

    let messagesVerificationMap = {};

    /*create messages for product*/

    let prodMsg = getMockMessage("Product");
    let prodGoodMsg = utils.setEndpointMessages("endpoint", 1, prodMsg)[0];
    let prodWrongMsgType = utils.setEndpointMessages("endpoint", 1, prodMsg)[0];
    prodWrongMsgType.messageType = "Product Wrong message type";
    let prodWrongFieldType = utils.setEndpointMessages("endpoint", 1, prodMsg)[0];
    prodWrongFieldType.product.flagEnableAdverseEventReporting = "Wrong value";
    let prodMissingField = utils.setEndpointMessages("endpoint", 1, prodMsg)[0];
    delete prodMissingField.product.inventedName;

    messagesVerificationMap[prodGoodMsg.messageId] = async function (resultMessage, testMessageObj, enclaveDB) {
      let dbResult = null;
      let dsuJson = null;
      let compareMessage = {};
      assert.equal(resultMessage.response[0].responseType, 100);
      assert.equal(resultMessage.messageType, "ProductResponse");
      dbResult = await $$.promisify(enclaveDB.getRecord)(epiUtils.constants.PRODUCTS_TABLE, testMessageObj.product.productCode);
      assert.true(dbResult !== null);
      epiUtils.transformToMessage(dbResult, compareMessage, epiUtils.productDataSourceMapping);
      assert.true(compareMessage !== null);
      Object.keys(compareMessage).forEach(key => {
        if (typeof compareMessage[key] === "object") {
          assert.equal(JSON.stringify(compareMessage[key]), JSON.stringify(testMessageObj.product[key]));
        } else {
          assert.equal(compareMessage[key], testMessageObj.product[key]);
        }
      })
      let productDSU = await $$.promisify(resolver.loadDSU)(dbResult.keySSI);
      assert.true(productDSU !== null);
      // await $$.promisify(productDSU.load)();
      dsuJson = JSON.parse(await $$.promisify(productDSU.readFile)("product.json"));
      assert.true(dsuJson !== null);
      compareMessage = {};
      epiUtils.transformToMessage(dsuJson, compareMessage, epiUtils.productDataSourceMapping);
      assert.true(compareMessage !== null);
      Object.keys(compareMessage).forEach(key => {
        if (typeof compareMessage[key] === "object") {
          assert.equal(JSON.stringify(compareMessage[key]), JSON.stringify(testMessageObj.product[key]));
        } else {
          assert.equal(compareMessage[key], testMessageObj.product[key]);
        }
      })

    }
    messagesVerificationMap[prodWrongMsgType.messageId] = async function (resultMessage, testMessageObj, enclaveDB) {
      undigestedMessageVerification(resultMessage, "UnknownTypeResponse", 5, epiUtils.constants.PRODUCTS_TABLE, testMessageObj.product.productCode, enclaveDB);
    }
    messagesVerificationMap[prodWrongFieldType.messageId] = async function (resultMessage, testMessageObj, enclaveDB) {
      undigestedMessageVerification(resultMessage, "ProductResponse", 1, epiUtils.constants.PRODUCTS_TABLE, testMessageObj.product.productCode, enclaveDB);
    }
    messagesVerificationMap[prodMissingField.messageId] = async function (resultMessage, testMessageObj, enclaveDB) {
      undigestedMessageVerification(resultMessage, "ProductResponse", 1, epiUtils.constants.PRODUCTS_TABLE, testMessageObj.product.productCode, enclaveDB);
    }

    let productMessages = [prodGoodMsg, prodWrongMsgType, prodWrongFieldType, prodMissingField];

    /*create messages for batch*/

    let batchMsg = getMockMessage("Batch");
    let batchGoodMsg = utils.setEndpointMessages("endpoint", 1, batchMsg)[0];
    batchGoodMsg.batch.productCode = prodGoodMsg.product.productCode;
    let batchWrongMsgType = utils.setEndpointMessages("endpoint", 1, batchMsg)[0];
    batchWrongMsgType.messageType = "Batch Wrong message type";
    let batchWrongFieldType = utils.setEndpointMessages("endpoint", 1, batchMsg)[0];
    batchWrongFieldType.batch.flagEnableEXPVerification = "Wrong value";
    let batchWrongProductCode = utils.setEndpointMessages("endpoint", 1, batchMsg)[0];
    batchWrongProductCode.batch.productCode = "Wrong product code";
    let batchMissingField = utils.setEndpointMessages("endpoint", 1, batchMsg)[0];
    delete batchMissingField.batch.expiryDate;

    messagesVerificationMap[batchGoodMsg.messageId] = async function (resultMessage, testMessageObj, enclaveDB) {
      let dbResult = null;
      let dsuJson = null;
      let compareMessage = {};
      assert.equal(resultMessage.response[0].responseType, 100);
      assert.equal(resultMessage.messageType, "BatchResponse");
      dbResult = await $$.promisify(enclaveDB.getRecord)(epiUtils.constants.BATCHES_STORAGE_TABLE, testMessageObj.batch.batch);
      assert.true(dbResult !== null);
      epiUtils.transformToMessage(dbResult, compareMessage, epiUtils.batchDataSourceMapping);
      assert.true(compareMessage !== null);
      Object.keys(compareMessage).forEach(key => {
        if (typeof compareMessage[key] === "object") {
          assert.equal(JSON.stringify(compareMessage[key]), JSON.stringify(testMessageObj.batch[key]));
        } else {
          assert.equal(compareMessage[key], testMessageObj.batch[key]);
        }
      })
      let batchDSU = await $$.promisify(resolver.loadDSU)(dbResult.keySSI);
      assert.true(batchDSU !== null);
      dsuJson = JSON.parse(await $$.promisify(batchDSU.readFile)("batch.json"));
      assert.true(dsuJson !== null);
      compareMessage = {};
      epiUtils.transformToMessage(dsuJson, compareMessage, epiUtils.batchDataSourceMapping);
      assert.true(compareMessage !== null);

      Object.keys(compareMessage).forEach(key => {
        if (!key.includes("snValid") && !key.includes("snRecalled") && !key.includes("snDecom")) {
          if (typeof compareMessage[key] === "object") {
            assert.equal(JSON.stringify(compareMessage[key]), JSON.stringify(testMessageObj.batch[key]));
          } else {
            assert.equal(compareMessage[key], testMessageObj.batch[key]);
          }
        }
      })
    }
    messagesVerificationMap[batchWrongMsgType.messageId] = async function (resultMessage, testMessageObj, enclaveDB) {
      undigestedMessageVerification(resultMessage, "UnknownTypeResponse", 5, epiUtils.constants.BATCHES_STORAGE_TABLE, testMessageObj.batch.batch, enclaveDB);
    }
    messagesVerificationMap[batchWrongFieldType.messageId] = async function (resultMessage, testMessageObj, enclaveDB) {
      undigestedMessageVerification(resultMessage, "BatchResponse", 1, epiUtils.constants.BATCHES_STORAGE_TABLE, testMessageObj.batch.batch, enclaveDB);
    }
    messagesVerificationMap[batchMissingField.messageId] = async function (resultMessage, testMessageObj, enclaveDB) {
      undigestedMessageVerification(resultMessage, "BatchResponse", 1, epiUtils.constants.BATCHES_STORAGE_TABLE, testMessageObj.batch.batch, enclaveDB);
    }
    messagesVerificationMap[batchWrongProductCode.messageId] = async function (resultMessage, testMessageObj, enclaveDB) {
      undigestedMessageVerification(resultMessage, "BatchResponse", 7, epiUtils.constants.BATCHES_STORAGE_TABLE, testMessageObj.batch.batch, enclaveDB);
    }

    let batchMessages = [batchGoodMsg, batchWrongMsgType, batchWrongFieldType, batchMissingField, batchWrongProductCode];

    /*create messages for productPhoto*/

    let photoMsg = getMockMessage("ProductPhoto");
    let photoGoodMsg = utils.setEndpointMessages("endpoint", 1, photoMsg)[0];
    photoGoodMsg.productCode = prodGoodMsg.product.productCode;
    let photoWrongMsgType = utils.setEndpointMessages("endpoint", 1, photoMsg)[0];
    photoWrongMsgType.messageType = "ProductPhoto Wrong message type";
    let photoMissingField = utils.setEndpointMessages("endpoint", 1, photoMsg)[0];
    delete photoMissingField.imageData;
    let photoWrongProductCode = utils.setEndpointMessages("endpoint", 1, photoMsg)[0];
    photoWrongProductCode.productCode = "Wrong value";

    messagesVerificationMap[photoGoodMsg.messageId] = async function (resultMessage, testMessageObj, enclaveDB) {

      let dbResult = null;
      let dsuImgData = null;
      let compareMessage = {};
      assert.equal(resultMessage.response[0].responseType, 100);
      assert.equal(resultMessage.messageType, "ProductPhotoResponse");
      dbResult = await $$.promisify(enclaveDB.getRecord)(epiUtils.constants.PRODUCTS_TABLE, testMessageObj.productCode);
      assert.true(dbResult !== null);
      let productDSU = await $$.promisify(resolver.loadDSU)(dbResult.keySSI);
      assert.true(productDSU !== null);
      dsuImgData = epiUtils.arrayBufferToBase64(await $$.promisify(productDSU.readFile)("image.png"));
      assert.true(dsuImgData !== null);
      assert.equal(dsuImgData, testMessageObj.imageData);

    }
    messagesVerificationMap[photoWrongMsgType.messageId] = async function (resultMessage) {
      assert.equal(resultMessage.response[0].responseType, 5);
      assert.equal(resultMessage.messageType, "UnknownTypeResponse");
    }
    messagesVerificationMap[photoMissingField.messageId] = async function (resultMessage) {
      assert.equal(resultMessage.response[0].responseType, 10);
      assert.equal(resultMessage.messageType, "ProductPhotoResponse");
    }
    messagesVerificationMap[photoWrongProductCode.messageId] = async function (resultMessage) {
      assert.equal(resultMessage.response[0].responseType, 10);
      assert.equal(resultMessage.messageType, "ProductPhotoResponse");
    }

    let photoMessages = [photoGoodMsg, photoWrongMsgType, photoWrongProductCode, photoMissingField];

    /*create messages for VideoSource*/

    let videoMsg = getMockMessage("VideoSource");
    let videoGoodMsg = utils.setEndpointMessages("endpoint", 1, videoMsg)[0];
    videoGoodMsg.videos.productCode = prodGoodMsg.product.productCode;
    let videoWrongMsgType = utils.setEndpointMessages("endpoint", 1, videoMsg)[0];
    videoWrongMsgType.messageType = "VideoSource Wrong message type";
    let videoMissingField = utils.setEndpointMessages("endpoint", 1, videoMsg)[0];
    delete videoMissingField.videos.source;
    delete videoMissingField.videos.sources;
    let videoWrongProductCode = utils.setEndpointMessages("endpoint", 1, videoMsg)[0];
    videoWrongProductCode.videos.productCode = "Wrong value";

    messagesVerificationMap[videoGoodMsg.messageId] = async function (resultMessage, testMessageObj, enclaveDB) {

      let dbResult = null;
      let dsuJson = null;
      let compareMessage = {};
      assert.equal(resultMessage.response[0].responseType, 100);
      assert.equal(resultMessage.messageType, "VideoSourceResponse");
      dbResult = await $$.promisify(enclaveDB.getRecord)(epiUtils.constants.PRODUCTS_TABLE, testMessageObj.videos.productCode);
      assert.true(dbResult !== null);
      assert.true(dbResult.videos !== null && dbResult.videos.defaultSource !== null);
      assert.equal(dbResult.videos.defaultSource, testMessageObj.videos.source);

      let productDSU = await $$.promisify(resolver.loadDSU)(dbResult.keySSI);
      assert.true(productDSU !== null);
      // await $$.promisify(productDSU.load)();
      dsuJson = JSON.parse(await $$.promisify(productDSU.readFile)("product.json"));
      assert.true(dsuJson !== null);
      assert.true(dsuJson.videos !== null && dsuJson.videos.defaultSource !== null);
      assert.equal(dsuJson.videos.defaultSource, testMessageObj.videos.source);

    }
    messagesVerificationMap[videoWrongMsgType.messageId] = async function (resultMessage) {
      assert.equal(resultMessage.response[0].responseType, 5);
      assert.equal(resultMessage.messageType, "UnknownTypeResponse");
    }
    messagesVerificationMap[videoMissingField.messageId] = async function (resultMessage) {
      assert.equal(resultMessage.response[0].responseType, 9);
      assert.equal(resultMessage.messageType, "VideoSourceResponse");
    }
    messagesVerificationMap[videoWrongProductCode.messageId] = async function (resultMessage) {
      assert.equal(resultMessage.response[0].responseType, 9);
      assert.equal(resultMessage.messageType, "VideoSourceResponse");
    }

    let videoMessages = [videoGoodMsg, videoWrongMsgType, videoMissingField, videoWrongProductCode];

    let testMessages = [].concat(productMessages, batchMessages, photoMessages, videoMessages);

    await $$.promisify(doPut)(`${mainNode.url}/mappingEngine/${domain}/default`, JSON.stringify(testMessages), {headers: {token: subjectSSI.getIdentifier()}});

    let result = [];
    const awaitTimeout = delay => new Promise(resolve => setTimeout(resolve, delay));

    do {
      await awaitTimeout(2 * 1000);
      let response = await http.fetch(`${mainNode.url}/mappingEngine/${domain}/logs`);
      try {
        result = await response.json();

        let j = result.length - 1;
        for (let i = 0; i < result.length; i++) {
          let resultMessage = result[j];
          assert.equal(resultMessage.requestMessageId, testMessages[i].messageId);
          assert.true(resultMessage.response.length >= 1);
          if (typeof messagesVerificationMap[testMessages[i].messageId] === "function") {
            await messagesVerificationMap[testMessages[i].messageId](resultMessage, testMessages[i], enclaveDB);
          }
          j--;
        }
      } catch (err) {
        console.log("No results to parse, trying again ...");
      }

    } while (result.length < testMessages.length)

  } catch (e) {
    console.error("Error on put message ", e);
  } finally {
    finishTest();
  }
}, 5 * 60 * 1000);


function getMockMessage(messageType) {
  return messages.find(item => item.messageType === messageType);
}

async function undigestedMessageVerification(resultMessage, responseType, responseTypeValue, tableName, recordPk, enclaveDB) {
  assert.equal(resultMessage.response[0].responseType, responseTypeValue);
  assert.equal(resultMessage.messageType, responseType);
  let dbResult = null;
  try {
    dbResult = await $$.promisify(enclaveDB.getRecord)(tableName, recordPk);
  } catch (e) {
  }
  assert.true(dbResult === null);
}



