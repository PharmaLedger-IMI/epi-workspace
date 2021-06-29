require('../../privatesky/psknode/bundles/testsRuntime');
const assert = require('double-check').assert;
const opendsu = require('opendsu');
const httpSpace = opendsu.loadApi('http');
const fs = require("fs");
const messages = require("./assets/messages.json");
const productImagePath = "./assets/product_image.jpg"
const epiUtils = require("../lib/utils")
const TIMEOUT = 20 * 1000;
const domain = "epi";
const productsIndexesPath = "/apps/dsu-fabric-ssapp/sharedDB/data/sharedDB/products/records";
const domainConfigPath = `../../apihub-root/external-volume/config/domains/${domain}.json`;
let imageMessageTemplate = {
    messageType: "ProductPhoto",
    senderId: "Test Environment Node",
}

const testMessages = [];
let imageData;


function printProgress(secondsRemaining){
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write("Testing will start in " + secondsRemaining + ' seconds');
}


assert.callback(
    '[ApiHub Mapping Test]',
    (endTest) => {

        console.log("Reading configuration...")
        fs.readFile(domainConfigPath, (err, config) => {
            if (err) {
                throw e;
            }
            let domainConfig = JSON.parse(config.toString());
            let walletKeySSI = domainConfig.mappingEngineWalletSSI;

            if (!walletKeySSI) {
                throw  new Error("Wallet keySSI not found");
            }

            console.log("Reading image file...")
            fs.readFile(productImagePath, (err, data) => {
                imageData = data;
                imageMessageTemplate.imageData = epiUtils.arrayBufferToBase64(data);

                for (let i = 0; i < messages.length; i++) {
                    let message = messages[i];
                    testMessages.push(message)
                    if (message.messageType === "Product") {
                        let imageMessage = JSON.parse(JSON.stringify(imageMessageTemplate));
                        imageMessage.productCode = message.product.productCode;
                        testMessages.push(imageMessage);
                    }
                }
                console.log("Calling apihub mapping engine...")
                httpSpace.doPut(
                    `http://localhost:8080/mappingEngine/${domain}`,
                    JSON.stringify(testMessages),
                    async (err, data) => {
                        if (err) {
                            console.log(err)
                            assert.true(false, 'Unexpected error');
                            throw err;
                        }

                        let seconds = TIMEOUT/1000;
                        let intervalId = setInterval(()=>{
                            seconds--;
                            printProgress(seconds);
                        },1000);

                        setTimeout(() => {
                            clearInterval(intervalId);
                            process.stdout.clearLine();
                            process.stdout.cursorTo(0);
                            console.log("Starting testing...")
                            const resolver = require("opendsu").loadAPI("resolver");
                            resolver.loadDSU(walletKeySSI, (err, walletDSU) => {
                                if (err) {
                                    throw new Error("Could not load wallet dsu");
                                }

                                let promises = [];

                                messages.filter(message => message.messageType === "Product").forEach(message => {

                                    promises.push(new Promise((resolve) => {
                                        walletDSU.readFile(productsIndexesPath + "/" + message.product.productCode, (err, data) => {
                                            if (err) {
                                                throw err;
                                            }
                                            let productMetadata = JSON.parse(data);

                                            resolver.loadDSU(productMetadata.keySSI, (err, productDSU) => {
                                                productDSU.readFile("/image.png", (err, data) => {
                                                    if (err) {
                                                        throw err;
                                                    }
                                                    assert.equal(Buffer.compare(data, imageData), 0, "image buffers are not equal")
                                                    resolve();
                                                })
                                            })
                                        })
                                    }))
                                })

                                Promise.allSettled(promises).then(() => {
                                    endTest();
                                }).catch(err => {
                                    throw err;
                                })

                                if (err) {
                                    throw err;
                                }

                            })

                        }, TIMEOUT);

                    }
                );
            });
        })
    }, 120 * 1000)




