import ContainerController from "../../cardinal/controllers/base-controllers/ContainerController.js";
import constants from "./constants.js";

export default class GenerateDIDController extends ContainerController {
    constructor(element, history) {
        super(element, history);

        this.setModel({});
        const openDSU = require("opendsu");
        const w3cDID = openDSU.loadAPI("w3cdid");
        const scAPI = openDSU.loadAPI("sc")
        setTimeout(async ()=>{
            const userDetails = await this.getUserDetails();
            const vaultDomain = await $$.promisify(scAPI.getVaultDomain)();
            const identity = await $$.promisify(w3cDID.createIdentity)("name", vaultDomain, userDetails.username);
            this.model.identity = identity.getIdentifier();
        })
    }

    async getUserDetails() {
        try {
            const response = await fetch("/api-standard/user-details");
            return await response.json();
        } catch (err) {
            console.error(`Failed to get user's details`, err);
            return {};
        }
    }
}