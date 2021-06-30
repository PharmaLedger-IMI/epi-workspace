function verifyIfDeleteLeafletMessage(message) {
    return ["leaflet", "smpc"].includes(message.messageType)
        && Object.keys(message).some(key => ['productCode', 'batchCode'].includes(key))
        && typeof message.delete !== "undefined"
}

async function processDeleteLeafletMessage(message) {
    const leafletUtils = require("./utils/leaflet-utils");
    const mappingLogService = require("./logs").createInstance(this.storageService);
    const hostDSU = await leafletUtils.getHostDSU.bind(this)(message);
    let language = message.language;
    let type = message.messageType;
    let basePath = `/${type}/${language}`

    try {
        await hostDSU.delete(basePath,{ignoreError:true});
    }
    catch (e){
        console.log(e);
    }

    await mappingLogService.logSuccessMapping(message, "deleted leaflet");

}

require("opendsu").loadApi("m2dsu").defineMapping(verifyIfDeleteLeafletMessage, processDeleteLeafletMessage);
