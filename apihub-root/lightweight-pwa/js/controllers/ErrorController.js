import {goToPage} from "../utils/utils.js"
import {getTranslation, translate} from "../translations.js";

document.getElementsByTagName("body").onload = translate();

function ErrorController() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let errorCode = urlParams.get("errorCode") || "010";
  switch (errorCode) {
    case "001":
    case "002":
    case "003":
    case "005":
    case "006":
    case "008":
    case "009":
    case "010":
    case "099":
      document.querySelector(".modal-title.header-title").innerHTML = getTranslation("product_not_found_title");
      document.querySelector(".page-content .error-text").innerHTML = `<p> <b>${getTranslation("product_not_found")} </b></p> <p>${getTranslation("err_code")} ${errorCode}</p>`;
      break;
    case "011":
      document.querySelector(".modal-title.header-title").innerHTML = getTranslation("product_not_loaded_title");
      document.querySelector(".page-content .error-text").innerHTML = `<p> <b>${getTranslation("product_not_loaded")} </b></p>`;
      break;
    case "004":
    case "007":
    case "012":
      document.querySelector(".modal-title.header-title").innerHTML = getTranslation("product_not_loaded_title");
      document.querySelector(".page-content .error-text").innerHTML = `<p> <b>${getTranslation("system_busy")} </b></p>`;
      break;
  }
  if (document.querySelector(".modal-title.header-title").innerText.length > 22) {
    document.querySelector(".modal-title.header-title").style.fontSize = "3vh";
    document.querySelector(".modal-icon").style.height = "7vh";
  }

  this.scanAgainHandler = function () {
    goToPage("/scan.html")
  }

  this.goHomeHandler = function () {
    goToPage("/index.html")
  }

  let scanAgainButton = document.getElementById("scan-again-button");
  scanAgainButton.addEventListener("click", this.scanAgainHandler);
  scanAgainButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      this.scanAgainHandler();
    }
  });
}

const errorController = new ErrorController();
window.errorController = errorController;
