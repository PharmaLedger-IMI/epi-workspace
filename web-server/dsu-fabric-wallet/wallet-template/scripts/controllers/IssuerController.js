import ContainerController from "../../cardinal/controllers/base-controllers/ContainerController.js";
import constants from "./constants.js";

export default class IssuerController extends ContainerController {
    constructor(element, history) {
        super(element, history);

        this.setModel({displayCredential: false});

        this.DSUStorage.getObject(constants.ISSUER_FILE_PATH, (err, issuer)=>{
            if(err){
                return this.History.navigateToPageByTag("issuer-enter-domain");
            }
            this.model.issuer = issuer;
            this.model.title = `Identity of a new user in domain [${issuer.domain}]`;
        });

        this.on('openFeedback', (e) => {
            this.feedbackEmitter = e.detail;
        });

        this.on("generate-credential", (event)=>{
            let userIdentity = this.model.userIdentity;
            let opendsu = require("opendsu");
            let crypto = opendsu.loadApi("crypto");

            crypto.createCredential(this.model.issuer.ssi, userIdentity, (err, credential)=>{
                if(err){
                    return this.showError(err, "Failed to create credential.");
                }
                this.model.credential = credential;
                this.model.displayCredential = true;
            });

        }, {capture: true});
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