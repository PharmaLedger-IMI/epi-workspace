import ContainerController from "../../cardinal/controllers/base-controllers/ContainerController.js";
const opendu = require("opendsu");

export default class IssuerController extends ContainerController {
    constructor(element, history) {
        super(element, history);
        this.setModel({});
        this.on("generate-identity", (event) => {
            const keyssiSpace = opendu.loadApi("keyssi");
            const seedSSI = keyssiSpace.buildSeedSSI(DEFAULT_DOMAIN);
            seedSSI.initialize(this.model.domain, (err)=>{
                if (err) {
                    throw err;
                }

                this.model.seedSSI = seedSSI.getIdentifier();
            })
        });
    }
}