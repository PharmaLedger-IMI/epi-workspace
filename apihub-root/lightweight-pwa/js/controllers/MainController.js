import {goToPage} from "../utils/utils.js"
import {getTranslation, translate} from "../translations.js";
import environment from "../../environment.js";
import constants from "../constants.js";


document.getElementsByTagName("body").onload = translate();

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
    let menuContainer = document.querySelector(".app-menu-container");
    menuContainer.classList.toggle("hidden");
    document.querySelector(".scan-button-container .scan-button").setAttribute("tabindex", "-1");
    let liElements = menuContainer.querySelectorAll('li');
    liElements.forEach(function (li) {
      li.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          li.click();
        }
      });
    });
    if (menuContainer.classList.contains("hidden")) {
      document.querySelector(".scan-button-container .scan-button").setAttribute("tabindex", "2");
    }
  }

  this.checkOnboarding = function () {
    let usrAgreedTerms = getCookie("usr_agreed_terms");
    if (!usrAgreedTerms) {
      let welcomeText = getTranslation("onboarding_welcome");
      document.querySelector(".welcome-container").innerHTML = `<h1>${welcomeText}</h1>`;
      document.querySelector(".content-container").classList.add("hiddenElement");
      document.querySelector(".explain-container").classList.add("hiddenElement");
      document.querySelector(".scan-button-container").classList.add("hiddenElement");
    } else {
      let welcomeText = getTranslation("welcome");
      document.querySelector(".terms-content-container").classList.add("hiddenElement");
      document.querySelector(".welcome-container").innerHTML = `<h1>${welcomeText}</h1>`;
      document.querySelector(".content-container").innerHTML = `<div class="icon-div"></div>`;
    }
    document.querySelector("#app_version_number").innerHTML = `${environment.appBuildVersion}`;
  }

  this.submitTerms = function (status) {
    if (status) {
      setCookie("usr_agreed_terms", true);
    }
    location.reload();
  }
  this.scanHandler = async function () {
    goToPage("/scan.html")
  }

  this.goHome = function () {
    goToPage("/index.html")
  }

  this.closeModal = function () {
    document.querySelector("#settings-modal").setAttribute('style', 'display:none !important');
    document.querySelector(".page-container").setAttribute('style', 'display:flex !important');
  }

  this.showModal = function (key) {
    this.toggleMenu();
    /*    if (key === "about") {
          window.open("https://Pharmaledger.eu").focus();
          return;
        }*/

    let modal = document.querySelector("#settings-modal");

    modal.setAttribute('style', 'display:flex !important');
    document.querySelector(".page-container").setAttribute('style', 'display:none !important');
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

  let addEventListeners = () => {
    document.getElementById("hamburger-menu-button").addEventListener("click", this.toggleMenu)
    document.querySelectorAll(".app-menu-container li.forward-to-page").forEach(item => {
      item.addEventListener("click", (event) => {
        this.showModal(event.currentTarget.getAttribute("modal-name"))
      })
    })
    document.getElementById("disagree-button").addEventListener("click", () => {
      this.submitTerms(false)
    })
    document.getElementById("agree-button").addEventListener("click", () => {
      this.submitTerms(true)
    })
    document.getElementById("scan-button").addEventListener("click", this.scanHandler)
    document.getElementById("close-modal-button").addEventListener("click", this.closeModal)
    document.getElementById("go-home-button").addEventListener("click", this.goHome)


  }
  addEventListeners();
}


const mainController = new MainController();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let epiDomain = urlParams.get("setdomain") || localStorage.getItem(constants.EPI_DOMAIN) || environment.epiDomain;
localStorage.setItem(constants.EPI_DOMAIN, epiDomain);

mainController.checkOnboarding();

window.mainController = mainController;

