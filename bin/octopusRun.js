const octopus = require("octopus/scripts");
const octopusActionsRegistry = require('octopus/ActionsRegistry');
const defaultActionsRegistry = octopusActionsRegistry.getRegistry();

const DEFAULT_PSK_BUNDLES_PATH = "./../privatesky/psknode/bundles";
const path = require("path");
const fs = require("fs");

require(path.join(process.cwd(), DEFAULT_PSK_BUNDLES_PATH));

const DEFAULT_SEED_PATH = './seed';

const readAlias = (callback) => {
    const seedPath = path.join(process.cwd(), DEFAULT_SEED_PATH);
    fs.access(seedPath, (err) => {
        if (err) {
            octopus.handleError("Seed file does not exist.", err);
            return;
        }

        fs.readFile(seedPath, callback);
    });
}

const getReadSSIForAlias = (alias, callback) => {
    const openDSU = require("opendsu");
    const keySSISpace = openDSU.loadAPI("keyssi");
    alias = alias.toString();
    const aliasSSI = keySSISpace.createAliasSSI(alias);
    const scAPI = openDSU.loadAPI("sc");
    scAPI.getSharedEnclave((err, sharedEnclave) => {
        if (err) {
            octopus.handleError("Failed to get shared enclave", err);
            return;
        }

        sharedEnclave.getReadForKeySSI(undefined, aliasSSI, callback);
    })
}

const copySeed = (target, callback) => {
    readAlias((err, alias) => {
        if (err) {
            octopus.handleError("Seed file exists, but could not be read.", err);
            return;
        }

        getReadSSIForAlias(alias, (err, readSSI) => {
            if (err) {
                octopus.handleError("Failed to get read ssi for alias", err);
                return;
            }

            fs.writeFile(target, readSSI, callback);
        })
    })
}

defaultActionsRegistry.registerActionHandler("copySeed", copySeed);
require('../node_modules/octopus/scripts/run');
