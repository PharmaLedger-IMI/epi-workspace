require("../opendsu-sdk/psknode/bundles/openDSU");
const openDSU = require("opendsu");
const w3cDID = openDSU.loadAPI("w3cdid");
const crypto = openDSU.loadAPI("crypto");
const path = require("path");
const fs = require("fs");
const PRIVATE_KEY_PATH = path.resolve("./privateKey");

function createKeyDIDDocument(callback) {
    w3cDID.createIdentity("key", (err, didDocument) => {
        if (err) {
            return callback(err);
        }
        didDocument.getPublicKey("raw", (err, pubKey) => {
            if (err) {
                return callback(err);
            }

            console.log("Successfully created did:", didDocument.getIdentifier());
            savePrivateKey(didDocument.getPrivateKeys()[0], callback);
        });
    });
}

function savePrivateKey(rawPrivateKey, callback) {
    const pemPrivateKey = crypto.convertPrivateKey(rawPrivateKey, "pem");
    fs.writeFile(PRIVATE_KEY_PATH, pemPrivateKey, (err => {
        if (err) {
            return callback(err);
        }

        console.log("Private key saved in file", PRIVATE_KEY_PATH);
        callback();
    }));
}

createKeyDIDDocument((err) => {
    if (err) {
        return console.log(err)
    }
})
