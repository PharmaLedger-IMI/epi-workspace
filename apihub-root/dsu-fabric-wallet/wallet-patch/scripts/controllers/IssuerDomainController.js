import ContainerController from "../../cardinal/controllers/base-controllers/ContainerController.js";
import constants from "./constants.js";

export default class IssuerDomainController extends ContainerController {
    constructor(element, history) {
        super(element, history);

        this.setModel({
            domain: "epi",
            subdomain: "",
            wip: false
        });

        this.on("openFeedback", (e) => {
            this.feedbackEmitter = e.detail;
        });

        this.on("generate-identity", (event) => {
            this.model.wip = true;
            const opendsu = require("opendsu");
            const keyssiSpace = opendsu.loadApi("keyssi");
            //TODO: temporary fix to prevent cache mechanism intercepting vault domain anchoring processes
            const vault_domain_name = "vault.nvs";
            const seedSSI = keyssiSpace.createTemplateSeedSSI(vault_domain_name);
            seedSSI.initialize(vault_domain_name, (err) => {
                if (err) {
                    return this.showError(err, "Could not initialize the issuer SSI");
                }
                const SHARED_DB = "sharedDB"; //reused in DSU-FABRIC
                let opendsu = require("opendsu");
                let db = opendsu.loadAPI("db");
                this.mydb = db.getWalletDB(seedSSI, SHARED_DB);
                this.mydb.insertRecord("system", "created", {created: "true"});
                this.mydb.on("initialised",  (dsu) => {
                    console.log("Shared DB got created:", seedSSI.getIdentifier(true), dsu);
                    this.DSUStorage.getObject(constants.ISSUER_FILE_PATH, (err, issuer) => {
                        if (err || typeof issuer === "undefined") {
                            issuer = {};
                        }

                        issuer.domain = this.model.domain;
                        issuer.subdomain = this.model.subdomain;
                        issuer.ssi = seedSSI.getIdentifier();

                        this.DSUStorage.setObject(constants.ISSUER_FILE_PATH, issuer, (err) => {
                            if (err) {
                                return this.showError(err);
                            }
                            this.model.wip = false;
                            this.History.navigateToPageByTag("issuer");
                        });
                    });
                })
            });
        });
    }

    showError(err, title, type) {
        let errMessage;
        title = title ? title : 'Validation Error';
        type = type ? type : 'alert-danger';

        if (err instanceof Error) {
            errMessage = err.message;
        } else if (typeof err === 'object') {
            errMessage = err.toString();
        } else {
            errMessage = err;
        }
        this.feedbackEmitter(errMessage, title, type);
    }
}
