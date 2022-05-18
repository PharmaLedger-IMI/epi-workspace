import ScanService, {SCANNER_STATUS} from "../services/ScanService.js";
import {goToPage} from "../utils/utils.js"
import interpretGS1scan from "../utils/interpretGS1scan/interpretGS1scan.js";

function MainController() {
  this.scanHandler = async function () {
    goToPage("scan.html")
  }
}

const mainController = new MainController();

window.mainController = mainController;
