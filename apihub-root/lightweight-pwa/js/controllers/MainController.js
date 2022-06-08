import {goToPage} from "../utils/utils.js"

function MainController() {
  this.scanHandler = async function () {
    goToPage("scan.html")
  }
}

const mainController = new MainController();

window.mainController = mainController;
