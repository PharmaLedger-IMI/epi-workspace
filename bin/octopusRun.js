const octopus = require("octopus/scripts");
const octopusActionsRegistry = require('octopus/ActionsRegistry');
const defaultActionsRegistry = octopusActionsRegistry.getRegistry();

const DEFAULT_PSK_BUNDLES_PATH = "./privatesky/psknode/bundles";
const path = require("path");
const fs = require("fs");

require(path.join(process.cwd(), DEFAULT_PSK_BUNDLES_PATH, "openDSU.js"));

const readAlias = (src, callback) => {
    fs.access(src, (err) => {
        if (err) {
            octopus.handleError("Seed file does not exist.", err);
            return;
        }

        fs.readFile(src, callback);
    });
}

const getReadSSIForAlias = (aliasSSI, callback) => {
    const openDSU = require("opendsu");
    const keySSISpace = openDSU.loadAPI("keyssi");
    aliasSSI = aliasSSI.toString();

    const scAPI = openDSU.loadAPI("sc");
    const dt = openDSU.loadAPI("dt");
    dt.initialiseBuildWallet((err) => {
        if (err) {
            return callback(err);
        }

        scAPI.getSharedEnclave((err, sharedEnclave) => {
            if (err) {
                octopus.handleError("Failed to get shared enclave", err);
                return;
            }

            sharedEnclave.getReadForKeySSI(aliasSSI, callback);
        })
    })
}

const copySeed = (action, dependency, callback) => {
    let src = action.src || dependency.src;
    if (!src) {
        throw "No source (src) attribute found on: " + JSON.stringify(dependency);
    }

    if (!action.target) {
        throw "No target attribute found on: " + JSON.stringify(action);
    }

    console.log("Start copying " + src + " to folder " + action.target);

    readAlias(src, (err, alias) => {
        if (err) {
            octopus.handleError("Seed file exists, but could not be read.", err);
            return;
        }

        getReadSSIForAlias(alias, (err, readSSI) => {
            if (err) {
                octopus.handleError("Failed to get read ssi for alias", err);
                return;
            }

            fs.writeFile(action.target, readSSI, callback);
        })
    })
}

defaultActionsRegistry.registerActionHandler("copySeed", copySeed);
require('../node_modules/octopus/scripts/run');
