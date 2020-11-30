import ContainerController from "../../cardinal/controllers/base-controllers/ContainerController.js";
import { getWalletTemplateServiceInstance } from "../services/WalletTemplateService.js";

const APPS_FOLDER = "/apps";

export default class UserProfileController extends ContainerController {
    constructor(element, history) {
        super(element, history);

        this.model = this.setModel({});
        this.walletTemplateService = getWalletTemplateServiceInstance();
        this.walletTemplateService.getUserDetails((err, userDetails) => {
            if (err) {
                return console.error(err);
            }
            userDetails.avatar = "assets/images/user.png";
            this.model.setChainValue("userDetails", userDetails);
        });

        setInterval(()=>{
            let elements = document.getElementsByClassName("is-mobile");
            if(elements.length > 0){
                this.model.renderer = "mobile-profile-renderer";
            }else{
                this.model.renderer = "psk-user-profile-renderer";
            }
        }, 500)
    }
}