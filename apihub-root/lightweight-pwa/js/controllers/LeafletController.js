import XMLDisplayService from "../services/XMLDisplayService/XMLDisplayService.js"
import {goToPage} from "../utils/utils.js";
import LeafletService from "../services/LeafletService.js";

function LeafletController() {

  this.leafletLang = window.currentLanguage || "en";
  let leafletService = new LeafletService();

  this.getLeaflet = function () {
    document.querySelector(".loader").setAttribute('style', 'display:block');

    leafletService.setLeafletLanguage(this.leafletLang);
    leafletService.getLeafletResult().then((result) => {
      if (result.resultStatus === "xml_found") {
        try {
          showXML(result);
          if (result.dateStatus === "expired_date") {
            showExpired();
          }
          if (result.dateStatus === "incorrect_date") {
            showIncorrectDate();
          }
        } catch (e) {
          goToPage("error.html")
        }
      }
      if (result.resultStatus === "no_xml_for_lang") {
        showAvailableLanguages(result)
      }
    }).catch(err => {
      goToPage("error.html")
    })
  };

  this.handleLeafletAccordion = function () {
    let accordionItems = document.querySelectorAll("div.leaflet-accordion-item");
    accordionItems.forEach((accItem, index) => {
      accItem.addEventListener("click", (evt) => {
        accItem.classList.toggle("active");
        accItem.querySelector(".leaflet-accordion-item-content").addEventListener("click", (event) => {
          event.stopImmediatePropagation();
          event.stopPropagation();
        })
      })
    })
  }

  this.getLangLeaflet = function () {
    let lang = document.querySelector("input[name='languages']:checked").value
    this.leafletLang = lang;
    this.getLeaflet();
    document.querySelector("#leaflet-lang-select").setAttribute('style', 'display:none !important');
  }

  this.scanAgainHandler = function () {
    goToPage("scan.html")
  }

  this.goHome = function () {
    goToPage("index.html")
  }

  this.closeModal = function (modalId) {
    document.querySelector("#" + modalId).setAttribute('style', 'display:none !important');
    if (modalId === "leaflet-lang-select") {
      goToPage("index.html");
    }
  }

  let showExpired = function () {
    document.querySelector("#expired-modal").setAttribute('style', 'display:flex !important');
  }
  let showIncorrectDate = function () {
    document.querySelector("#incorrect-date-modal").setAttribute('style', 'display:flex !important');
  }


  let self = this;

  let showXML = function (result) {
    document.querySelector(".product-name").innerText = result.productData.name;
    document.querySelector(".product-description").innerText = result.productData.description;
    document.querySelector(".leaflet-title-icon").classList.remove("hiddenElement");
    let xmlService = new XMLDisplayService("#leaflet-content");
    let resultDocument = xmlService.getHTMLFromXML(result.pathBase, result.xmlContent);
    let leafletImages = resultDocument.querySelectorAll("img");
    for (let image of leafletImages) {
      image.setAttribute("src", result.leafletImages[image.getAttribute("src")]);
    }
    let sectionsElements = resultDocument.querySelectorAll(".leaflet-accordion-item");
    let htmlContent = "";
    sectionsElements.forEach(section => {
      htmlContent = htmlContent + section.outerHTML;
    })
    document.querySelector("#leaflet-content").innerHTML = htmlContent;
    let leafletLinks = document.querySelectorAll(".leaflet-link");
    xmlService.activateLeafletInnerLinks(leafletLinks);
    self.handleLeafletAccordion();
    document.querySelector(".loader").setAttribute('style', 'display:none');
  }

  let showAvailableLanguages = function (result) {
    // document.querySelector(".product-name").innerText = translations[window.currentLanguage]["select_lang_title"];
    // document.querySelector(".product-description").innerText = translations[window.currentLanguage]["select_lang_subtitle"];
    // let langList = `<div class="select-lang-text">${translations[window.currentLanguage]["select_lang_text"]}</div><select class="languages-list">`;
    document.querySelector("#leaflet-lang-select").setAttribute('style', 'display:flex !important');
    document.querySelector(".loader").setAttribute('style', 'display:none');
    if (result.availableLanguages.length >= 1) {
      document.querySelector(".proceed-button.no-leaflet").setAttribute('style', 'display:none');
      document.querySelector(".text-section.no-leaflet").setAttribute('style', 'display:none');
      let languagesContainer = document.querySelector(".languages-container");
      result.availableLanguages.forEach((lang, index) => {
        let langRadio = `<div class="flag-label-wrapper"><img src="./images/flags/${lang.value}.png" class="language-flag"/><span for="${lang.value}"> ${lang.label} - (${lang.nativeName})</span> </div><input type="radio" name="languages" ${index === 0 ? "checked" : ""} value="${lang.value}" id="${lang.value}">`;
        let radioFragment = document.createElement('div');
        radioFragment.classList.add("language-item-container");
        radioFragment.innerHTML = langRadio;
        languagesContainer.appendChild(radioFragment);
      })
    } else {
      document.querySelector(".proceed-button.has-leaflets").setAttribute('style', 'display:none');
      document.querySelector(".text-section.has-leaflets").setAttribute('style', 'display:none');
    }
  }
}

const leafletController = new LeafletController();
leafletController.getLeaflet(leafletController.leafletLang);
window.leafletController = leafletController;



