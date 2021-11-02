import oauthConfig from "./external-volume/config/oauthConfig.js";
const openDSU = require("opendsu");
const oauth = openDSU.loadAPI("oauth");
const storage = oauth.getStorage();
const constants = oauth.constants;
let accessToken = storage.get(constants.ACCESS_TOKEN);
if(oauthConfig && oauthConfig.oauthEnabled){
    if (!accessToken) {
        const sso = oauth.createOIDC(oauthConfig);
        await sso.reconcile();
        accessToken = storage.get(constants.ACCESS_TOKEN);
        document.cookie = `authorization=${accessToken}`;
    }
}
export default {}