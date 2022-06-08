import {goToPage} from "../utils/utils.js"

function ErrorController() {
  this.scanAgainHandler = function(){
    goToPage("scan.html")
  }
}

const errorController = new ErrorController();

window.errorController = errorController;
