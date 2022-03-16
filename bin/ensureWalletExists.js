require("../privatesky/psknode/bundles/openDSU");
const openDSU = require("opendsu");
const scAPI = openDSU.loadAPI("sc");
const enclaveAPI = openDSU.loadAPI("enclave");
const config = openDSU.loadAPI("config");

const ensureWalletExists = async () => {
    let sharedEnclaveSSI;
    try {
        sharedEnclaveSSI = await $$.promisify(config.getEnv)(openDSU.constants.SHARED_ENCLAVE.KEY_SSI);
    } catch (e) {
        throw e;
    }
    if (typeof sharedEnclaveSSI === "undefined") {
        const sharedEnclave = enclaveAPI.initialiseWalletDBEnclave();
        sharedEnclave.on("initialised", async () => {
            try {
                await $$.promisify(scAPI.setSharedEnclave)(sharedEnclave);
            } catch (e) {
                throw createOpenDSUErrorWrapper("Failed to set shared enclave", e);
            }
        })
    }
}

ensureWalletExists();