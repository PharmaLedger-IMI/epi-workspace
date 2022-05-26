import XMLDisplayService from "../services/XMLDisplayService/XMLDisplayService.js"
import environment from "../../environment.js";
import {goToPage} from "../utils/utils.js";
import {translations} from "../translations.js";

function LeafletController() {

  this.leafletLang = window.currentLanguage || "en";

  this.getLeaflet = function () {
    let leafletApiUrl = environment.leafletWebApiUrl + "/" + environment.epiDomain;

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let gtin = urlParams.get("gtin");
    let batch = urlParams.get("batch");
    let expiry = urlParams.get("expiry");
    let fetchUrl = `${leafletApiUrl}?leaflet_type=leaflet&lang=${this.leafletLang}&gtin=${gtin}&expiry=${expiry}`;
    fetchUrl = batch ? `${fetchUrl}&batch=${batch}` : `${fetchUrl}`
    let header = new Headers();
    header.append("epiProtocolVersion", environment.epiProtocolVersion || 1);
    header.append("getProductData", true);
    const myRequest = new Request(fetchUrl, {
      method: "GET",
      headers: header
    });
    fetch(myRequest)
      .then(response => {
        response.json().then(result => {
          console.log(result);
          if (result.resultStatus === "xml_found") {
            showXML(result);
            if (result.expired) {
              showExpired();
            }
          }
          if (result.resultStatus === "no_xml_for_lang") {
            showAvailableLanguages(result)
          }
        }).catch((err) => {
          goToPage("error.html")
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        goToPage("error.html")
      });
  };
  this.handleLeafletAccordion = function () {
    let accordionItems = document.querySelectorAll(".leaflet-accordion-item");
    accordionItems.forEach(accItem => {
      accItem.addEventListener("click", (evt) => {
        evt.target.classList.toggle("active");
      })
    })
  }

  this.getLangLeaflet = function (event) {
    let lang = event.target.getAttribute("lang-value");
    this.leafletLang = lang;
    this.getLeaflet();
  }

  this.scanAgainHandler = function () {
    goToPage("scan.html")
  }

  this.closeModal = function () {
    document.querySelector("#warning-modal").setAttribute('style', 'display:none !important');
  }

  let showExpired = function () {
    document.querySelector("#warning-modal").setAttribute('style', 'display:flex !important');

  }
  let self = this;

  let showXML = function (result) {
    document.querySelector(".product-name").innerText = result.productData.name;
    document.querySelector(".product-description").innerText = result.productData.description;
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
  }

  let showAvailableLanguages = function (result) {
    document.querySelector(".product-name").innerText = translations[window.currentLanguage]["select_lang_title"];
    document.querySelector(".product-description").innerText = translations[window.currentLanguage]["select_lang_subtitle"];
    let langList = `<div class="select-lang-text">${translations[window.currentLanguage]["select_lang_text"]}</div><ul class="languages-list">`;
    result.availableLanguages.forEach(lang => {
      langList = langList + `<li> <div class="lang-item" lang-value="${lang.value}" onclick="leafletController.getLangLeaflet(event)">
              ${lang.label} - (${lang.nativeName})</div></li>`
    })
    langList = langList + "</ul>"
    document.querySelector("#leaflet-content").innerHTML = langList;
  }
}

const leafletController = new LeafletController();
leafletController.getLeaflet(leafletController.leafletLang);
window.leafletController = leafletController;



