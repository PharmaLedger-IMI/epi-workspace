import ContainerController from "../../cardinal/controllers/base-controllers/ContainerController.js";
import constants from "./constants.js";

export default class HolderController extends ContainerController {
    constructor(element, history) {
        super(element, history);


        this.setModel({displayCredentialArea: true});
        this.model.domain = "epi";

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
                        this.showError(err);
                    }
                    this.model.displayCredentialArea = false;
                });
            } else {
                this.showError("Invalid credential");
            }
        }, {capture: true});
    }
}