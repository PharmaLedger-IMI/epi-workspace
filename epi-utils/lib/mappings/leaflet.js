function verifyIfLeafletMessage(message) {
    return ["leaflet", "smpc"].includes(message.messageType)
        && Object.keys(message).some(key => ['productCode', 'batchCode'].includes(key))
        && typeof message.delete === "undefined"
}

async function processLeafletMessage(message) {
    const leafletUtils = require("./utils/leaflet-utils");
    const mappingLogService = require("./logs").createInstance(this.storageService);
    const hostDSU = await leafletUtils.getHostDSU.bind(this)(message);

    let language = message.language;
    let type = message.messageType

    let basePath = `/${type}/${language}`
    let xmlFilePath = `${basePath}/${type}.xml`;
    let base64ToArrayBuffer = require("./../utils").base64ToArrayBuffer;
    let base64XMLFileContent = base64ToArrayBuffer(message.xmlFileContent);

    try {
        await hostDSU.writeFile(xmlFilePath, $$.Buffer.from(base64XMLFileContent));

        for (let i = 0; i < message.otherFilesContent.length; i++) {
            let file = message.otherFilesContent[i];
            let filePath = `${basePath}/${file.filename}`;
            await hostDSU.writeFile(filePath, $$.Buffer.from(base64ToArrayBuffer(file.fileContent)));
        }
        await mappingLogService.logSuccessMapping(message, "updated leaflet");
    } catch (e) {
        console.log("Error writing files in DSU", e);
    }
}

require("opendsu").loadApi("m2dsu").defineMapping(verifyIfLeafletMessage, processLeafletMessage);
