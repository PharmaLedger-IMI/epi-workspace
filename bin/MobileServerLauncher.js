require("../privatesky/psknode/bundles/pskWebServer");

const TAG = "MOBILE-API-HUB";
const path = require("swarmutils").path;
const API_HUB = require('psk-apihub');

//set the path to a folder that contains a "server.json" in order to customize the configuration
//process.env.PSK_CONFIG_LOCATION = "../web-server/external-volume/config";

let config = API_HUB.getServerConfig();

const listeningPort = Number.parseInt(config.port);
const rootFolder = path.resolve(config.storage);

API_HUB.createInstance(listeningPort, rootFolder, (err) => {
    if (err) {
        console.error(err);
    }
    console.log(`\n[${TAG}] listening on port :${listeningPort} and ready to receive requests.\n`);
});