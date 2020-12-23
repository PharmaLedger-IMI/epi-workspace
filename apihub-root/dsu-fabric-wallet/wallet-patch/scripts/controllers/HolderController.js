import ContainerController from "../../cardinal/controllers/base-controllers/ContainerController.js";
import constants from "./constants.js";

let crypto = require("opendsu").loadApi("crypto");

function getReadableSSI(ssi) {
    return crypto.getReadableSSI(ssi) || ssi;
}

export default class HolderController extends ContainerController {
    constructor(element, history) {
        super(element, history);


        this.setModel({ displayCredentialArea: true, isInvalidCredential: false });
        this.model.domain = "epi";

        const setCredential = credential => {
            this.model.credential = credential;
            this.model.isInvalidCredential = false;

            crypto.parseJWTSegments(this.model.credential, (parseError, jwtContent) => {
                if (parseError) {
                    this.model.isInvalidCredential = true;
                    return console.log('Error parsing user credential', parseError);
                }
                console.log('Parsed credential', jwtContent);
                const { header, body } = jwtContent;
                this.model.readableCredential = JSON.stringify({ header, body }, null, 4);

                const readableContainer = this.element.querySelector('#readableContainer');
                let readableCredentialElement = readableContainer.querySelector('#readableCredential');
                if (readableCredentialElement) {
                    readableCredentialElement.remove();
                }

                readableCredentialElement = document.createElement('psk-code');
                readableCredentialElement.id = "readableCredential";
                readableCredentialElement.title = "Human readable Credential";
                readableCredentialElement.language = "json";
                readableCredentialElement.innerHTML = this.model.readableCredential;
                readableContainer.appendChild(readableCredentialElement);
            });
        }

        this.DSUStorage.getObject(constants.HOLDER_FILE_PATH, (err, holder) => {

            if (err || !holder || !holder.domain || !holder.ssi) {
                return this.History.navigateToPageByTag("holder-enter-domain");
            }
            this.model.holderSSI = holder.ssi;
            this.model.domain = holder.domain;

            this.model.readableHolderSSI = getReadableSSI(holder.ssi);

            this.DSUStorage.getObject(constants.CREDENTIAL_FILE_PATH, (err, credential) => {

                console.log("Got:", err, credential);
                if (err || !credential) {
                    return;
                } else {
                    this.model.displayCredentialArea = false;
                    setCredential(credential.credential);
                }
            });
        });

        this.on('openFeedback', (e) => {
            this.feedbackEmitter = e.detail;
        });

        this.on("save-credential", (event) => {
            if (this.model.credential) {
                this.DSUStorage.setObject(constants.CREDENTIAL_FILE_PATH, { credential: this.model.credential }, (err, credential) => {
                    if (err) {
                        this.showError(err);
                    }
                    this.model.displayCredentialArea = false;
                    setCredential(this.model.credential);
                });
            } else {
                this.showError("Invalid credential");
            }
        }, { capture: true });
    }
}