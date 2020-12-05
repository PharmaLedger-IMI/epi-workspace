import ContainerController from "../../cardinal/controllers/base-controllers/ContainerController.js";
import constants from "./constants.js";

export default class HolderController extends ContainerController {
    constructor(element, history) {
        super(element, history);

        this.setModel({displayCredentialArea: true});


        this.DSUStorage.getObject(constants.HOLDER_FILE_PATH, (err, holder)=>{

            if(err || !holder || !holder.domain || !holder.ssi ){
                return this.History.navigateToPageByTag("holder-enter-domain");
            }
            this.model.holderSSI = holder.ssi;
            this.model.domain    = holder.domain;

            this.DSUStorage.getObject(constants.CREDENTIAL_FILE_PATH, (err, credential)=>{

                console.log("Got:", err, credential);
                if(err || !credential){
                 return;
                } else {
                    this.model.displayCredentialArea = false;
                }
            });
        });

        this.on('openFeedback', (e) => {
            this.feedbackEmitter = e.detail;
        });

        this.on("save-credential", (event)=>{
            if(this.model.credential){
                this.DSUStorage.setObject(constants.CREDENTIAL_FILE_PATH, {credential: this.model.credential}, (err, credential)=>{
                    if(err){
                        showError(err);
                    }
                    this.model.displayCredentialArea = false;
                });
            } else {
                showError("Invalid credential");
            }
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