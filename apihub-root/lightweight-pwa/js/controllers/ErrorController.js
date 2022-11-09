import {goToPage} from "../utils/utils.js"
import {constants} from "../constants.js"
import {getTranslation} from "../translations.js";

function ErrorController() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let errorTextKey = urlParams.get("errorCode") || "defaultError";
  document.querySelector(".page-content .error-text").innerHTML = getTranslation(constants.errorCodes[errorTextKey]);


  this.scanAgainHandler = function () {
    goToPage("/scan.html")
  }
}


const errorController = new ErrorController();

window.errorController = errorController;
