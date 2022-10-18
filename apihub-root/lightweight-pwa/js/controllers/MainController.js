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
      document.querySelector(".welcome-container").innerHTML = `<span>${welcomeText}</span>`;
      document.querySelector(".terms-content-container").innerHTML = `
      <div class="terms-container">
        <span class="extra-text" translate="disagree_extra_text"></span>
        <iframe style="width: 100%; height: 100%; margin-bottom: 24px; border: 0" src="https://app.termly.io/document/terms-of-use-for-website/76a94ec4-766a-4a6a-b7fe-c68834af6811"></iframe>  
        <div class="terms-buttons-container">
          <div class="terms-button disagree" onclick="mainController.submitTerms(false)">${getTranslation("disagree")}</div>
          <div class="terms-button agree" onclick="mainController.submitTerms(true)">${getTranslation("agree")}</div>
        </div>
      </div>`;
      document.querySelector(".content-container").classList.add("hiddenElement");
      document.querySelector(".explain-container").classList.add("hiddenElement");
      document.querySelector(".scan-button-container").classList.add("hiddenElement");
    } else {
      let welcomeText = getTranslation("welcome");
      document.querySelector(".terms-content-container").classList.add("hiddenElement");
      document.querySelector(".welcome-container").innerHTML = `<span>${welcomeText}</span>`;
      document.querySelector(".content-container").innerHTML = `<div class="icon-div"></div>`;
      document.querySelector(".more-options-link").innerHTML = `<span> ${environment.appBuildVersion} </span>`;
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
    let contentElement = modal.querySelector(".modal-content");
    contentElement.className = "modal-content";
    contentElement.classList.add(key);
    contentElement.innerHTML = getTranslation(contentKey);
  }

}

const mainController = new MainController();
mainController.checkOnboarding();

window.mainController = mainController;
