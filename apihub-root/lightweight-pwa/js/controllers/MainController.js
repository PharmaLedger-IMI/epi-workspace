import {goToPage} from "../utils/utils.js"
import {getTranslation} from "../translations.js";
import environment from "../../environment.js";

function MainController() {

  let getCookie = function (cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    exdays = exdays || 365;
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  this.toggleMenu = function () {
    document.querySelector(".app-menu-container").classList.toggle("hidden")
  }

  this.checkOnboarding = function () {
    let usrAgreedTerms = getCookie("usr_agreed_terms");
    if (!usrAgreedTerms) {
      let welcomeText = getTranslation("onboarding_welcome");
      let termsText = getTranslation("terms_content");
      document.querySelector(".welcome-container").innerHTML = `
      <span>${welcomeText}</span>
      <div class="terms-container">
        <span>${termsText}</span>
        <div class="terms-buttons-container">
          <div class="terms-button disagree" onclick="mainController.submitTerms(false)">${getTranslation("disagree")}</div>
          <div class="terms-button agree" onclick="mainController.submitTerms(true)">${getTranslation("agree")}</div>
        </div>
      </div>`;
      document.querySelector(".content-container").classList.add("hiddenElement");
      document.querySelector(".explain-container").classList.add("hiddenElement");
      document.querySelector(".scan-button-container").classList.add("hiddenElement");
      document.querySelector(".bottom-container").classList.add("hiddenElement");
    } else {
      let welcomeText = getTranslation("welcome");
      document.querySelector(".welcome-container").innerHTML = `<span>${welcomeText}</span>`;
      document.querySelector(".content-container").innerHTML = `<div class="icon-div"></div>`;
      document.querySelector(".more-options-link").innerHTML = `<span> ePI ${environment.appBuildVersion} </span>`;
    }
  }

  this.submitTerms = function (status) {
    if (status) {
      setCookie("usr_agreed_terms", true);
    }
    location.reload();
  }
  this.scanHandler = async function () {
    goToPage("scan.html")
  }

  this.closeModal = function () {
    document.querySelector("#settings-modal").setAttribute('style', 'display:none !important');
  }
  this.showModal = function (key) {
    this.toggleMenu();
    if (key === "about") {
      window.open("https://Pharmaledger.eu", "_blank").focus();
      return;
    }

    let modal = document.querySelector("#settings-modal");
    modal.setAttribute('style', 'display:flex !important');
    let titleKey = key + "_modal_title";
    let subtitleKey = key + "_modal_subtitle";
    let contentKey = key + "_content";
    modal.querySelector(".modal-title").innerHTML = getTranslation(titleKey);
    modal.querySelector(".modal-subtitle").innerHTML = getTranslation(subtitleKey);
    modal.querySelector(".modal-content").innerHTML = getTranslation(contentKey);
  }

}

const mainController = new MainController();
mainController.checkOnboarding();

window.mainController = mainController;
