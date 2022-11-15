import {goToPage} from "../utils/utils.js"
import {getTranslation} from "../translations.js";

function ErrorController() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let errorCode = urlParams.get("errorCode") || "010";
  switch (errorCode) {
    case "001":
    case "002":
    case "003":
    case "004":
    case "005":
    case "006":
    case "007":
    case "008":
    case "009":
    case "010":
      document.querySelector(".page-content .error-text").innerHTML = `<p> <b>${getTranslation("product_not_found")} </b></p> <p>${getTranslation("err_code")} ${errorCode}</p>`;
      break;
    case "011":
      document.querySelector(".page-content .error-text").innerHTML = `<p> <b>${getTranslation("product_not_loaded")} </b></p> <p>${getTranslation("err_code")} ${errorCode}</p>`;
      break;
  }


  this.scanAgainHandler = function () {
    goToPage("/scan.html")
  }
}


const errorController = new ErrorController();

window.errorController = errorController;
