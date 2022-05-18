import XMLDisplayService from "../services/XMLDisplayService/XMLDisplayService.js"
import environment from "../../environment.js";
import {goToPage} from "../utils/utils.js"

function LeafletController() {
  this.getLeaflet = function () {
    let leafletApiUrl = environment.leafletWebApiUrl + "/" + environment.epiDomain;
    let userLanguage = window.navigator.language.slice(0, 2);
    let leafletLang = userLanguage || "en";
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let gtin = urlParams.get("gtin");
    let batch = urlParams.get("batch");
    let fetchUrl = batch ? `${leafletApiUrl}?leaflet_type=leaflet&lang=${leafletLang}&gtin=${gtin}&batch=${batch}` : `${leafletApiUrl}?leaflet_type=leaflet&lang=${leafletLang}&gtin=${gtin}`

    fetch(fetchUrl)
      .then(response => {
        console.log("------- response", response);
        response.json().then(result => {
          console.log(result);
          let xmlService = new XMLDisplayService("#leaflet-content");
          let resultDocument = xmlService.getHTMLFromXML(result.pathBase, result.xmlContent);
          let leafletImages = resultDocument.querySelectorAll("img");
          for (let image of leafletImages) {
            image.setAttribute("src", result.leafletImages[image.getAttribute("src")]);
          }
          let sectionsElements = resultDocument.querySelectorAll(".leaflet-accordion-item");
          let htmlContent = "";
          sectionsElements.forEach(section => {
            htmlContent = htmlContent + section.innerHTML;
          })
          document.querySelector("#leaflet-content").innerHTML = htmlContent;
          let leafletLinks = document.querySelectorAll(".leaflet-link");
          xmlService.activateLeafletInnerLinks(leafletLinks);
          this.handleLeafletAccordion();
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
    let accordionItems = document.querySelectorAll(".leaflet-accordion-item-content");
    accordionItems.forEach(accItem => {
      accItem.addEventListener("click", (evt) => {
        evt.target.classList.toggle("active");
      })
    })
  }
}

const leafletController = new LeafletController();
leafletController.getLeaflet();



