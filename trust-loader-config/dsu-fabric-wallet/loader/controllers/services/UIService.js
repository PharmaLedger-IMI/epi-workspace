import NavigatorUtils from "./NavigatorUtils.js";

const SpinnerHTML = "<div class=\"loader-container\">\n" +
  "<div class=\"sk-cube-grid\">\n" +
  "    <div class=\"sk-cube sk-cube1\"></div>\n" +
  "    <div class=\"sk-cube sk-cube2\"></div>\n" +
  "    <div class=\"sk-cube sk-cube3\"></div>\n" +
  "    <div class=\"sk-cube sk-cube4\"></div>\n" +
  "    <div class=\"sk-cube sk-cube5\"></div>\n" +
  "    <div class=\"sk-cube sk-cube6\"></div>\n" +
  "    <div class=\"sk-cube sk-cube7\"></div>\n" +
  "    <div class=\"sk-cube sk-cube8\"></div>\n" +
  "    <div class=\"sk-cube sk-cube9\"></div>\n" +
  "</div>\n" +
  '<div class="loading-status"></div>' +
  "</div>";

const RELOAD_SECTION_TIMEOUT_MS = 10 * 1000;
const RELOAD_SECTION_HTML = `
    <p>
      The application is taking longer than expected to load. <br/>
      If you have network issues please use the following to refresh the application.
    </p>
    <button>Refresh</button>
`;

function Spinner(view) {

  let attachedSpinner = null;
  let reloadSectionTimeout = null;
  let lastStatusMessage = null;

  this.attachToView = function () {
    if (attachedSpinner) {
      return;
    }
    let element = document.createElement("div");
    element.classList.add('loader-parent-container');
    attachedSpinner = view.appendChild(element);
    attachedSpinner.innerHTML = SpinnerHTML;

    reloadSectionTimeout = setTimeout(() => {
      if (!attachedSpinner) {
        // the spinner has been removed already
        return;
      }
      if ("contains" in document.body && !document.body.contains(attachedSpinner)) {
        // the spinner has been replaced by something else
        return;
      }

      let reloadSectionElement = document.createElement("div");
      reloadSectionElement.className = "reload-section";
      const reloadSection = attachedSpinner.querySelector(".loader-container").appendChild(reloadSectionElement);
      reloadSection.innerHTML = RELOAD_SECTION_HTML;

      reloadSection.querySelector("button").addEventListener("click", () => {
        console.log("Unregistering all service workers...");

        NavigatorUtils.unregisterAllServiceWorkers(() => {
          console.log("Clearing caches...");

          NavigatorUtils.clearCaches(() => {
            window.location.reload();
          });
        });

        console.log("Clearing localStorage");
        localStorage.clear();
      });
    }, RELOAD_SECTION_TIMEOUT_MS);
  };

  this.removeFromView = function () {
    if (attachedSpinner) {
      attachedSpinner.remove();
      attachedSpinner = null;
    }
    if (reloadSectionTimeout) {
      clearTimeout(reloadSectionTimeout);
    }
  }

  this.setStatusText = function (text) {
    try {
      lastStatusMessage = text;
      const parent = attachedSpinner.querySelector('.loader-container');
      let loadingStatus = parent.querySelector('.loading-status');
      loadingStatus.innerHTML = text || '';
    } catch (e) {
      console.log("//TODO: pay attention, not critical but should be refactored.");
    }

  }

  this.getLastStatusMessage = function () {
    return lastStatusMessage;
  }
}

/*
Add a form element based on configuration object ex:
{
  id: "name",
  type:"text",
  help: "use just text",
  placeholder: "insert your name",
  fieldLabel: "Label for the field",
  validator: "a validator to use on filed",
  inputType: "simpleInput | labeldInput | helperInput"
  }
* */
function createFormElement(fieldOptions, controllerOptions) {
  const id = fieldOptions.fieldId || new Date().getTime().toString();
  const type = fieldOptions.type || "text";
  const help = fieldOptions.fieldHelp || "";
  const placeholder = fieldOptions.placeholder || "";
  const fieldLabel = fieldOptions.fieldLabel || "";
  const validator = fieldOptions.validator ? "validator." + fieldOptions.validator + "(event)" : "";
  const readonly = controllerOptions.readonly ? "readonly" : "";
  const inputValue = controllerOptions.value || "";
  let element = document.createElement("div");
  element.classList.add('form-group', 'mb-1');

  let inputField = `<input class="form-control" id="${id}" oninput="${validator}" ${readonly} type="${type}" value="${inputValue}" placeholder="${placeholder}"/>`;

  if (type === "password") {
    inputField = `<div class="d-flex password-wrapper">
                    <input class="form-control" id="${id}" oninput="${validator}" type="${type}" placeholder="${placeholder}"/>
                    <span class="fa fa-fw fa-eye field-icon toggle-password" input-id="${id}"></span>
                  </div>`
  }
  switch (controllerOptions.inputType) {
    case "simpleInput":
      element.innerHTML = inputField;
      break
    case "labeldInput":
      element.innerHTML = `<label class="register-detail-label" for="${id}" id="${id}-label">${fieldLabel}</label>
                        ${inputField}`;
      break
    case "helperInput":
      element.innerHTML = `<label class="register-detail-label" for="${id}" id="${id}-label">${fieldLabel}</label>
                        ${inputField}
                        <small class="form-text text-muted" id="${id}-help">${help}</small>`
      break
  }
  return element;
}

/*
* show error on form submit
* */
function showFormError(formElement, message) {
  let element = document.createElement("div");
  element.classList.add("row", "ml-1");
  element.id = "custom-form-error-message";
  element.innerHTML = `<label class="error" id="register-details-error">${message}</label>`
  formElement.append(element);
}

/*
* remove form error
* */
function removeFormError() {
  let element = document.getElementById("custom-form-error-message");
  element.remove()
}

/*
* show/hide content of a password input
* */
function toggleViewPassword(event) {
  const inputId = event.target.getAttribute("input-id");
  event.target.classList.toggle("fa-eye-slash");
  let inputField = document.getElementById(inputId);
  if (inputField.getAttribute("type") === "password") {
    inputField.setAttribute("type", "text");
  } else {
    inputField.setAttribute("type", "password");
  }
}

function prepareView(page_labels) {
  try {
    page_labels.forEach(page_label => {
      let labelAttribute = "innerHTML";
      if (page_label.attribute) {
        labelAttribute = page_label.attribute;
      }
      let labelIdentifier = Object.keys(page_label).find((prop) => {
        return prop !== "attribute";
      });
      document.querySelector(labelIdentifier)[labelAttribute] = page_label[labelIdentifier]
    })
  } catch (e) {
    console.log(e);
  }
}

function prepareViewContent() {
  const domElements = document.querySelectorAll('[data-model]');
  for (let i = 0; i < domElements.length; i++) {
    domElements[i].innerHTML = LOADER_GLOBALS.LABELS_DICTIONARY[domElements[i].getAttribute("data-model")];
  }
}

export {
  Spinner,
  prepareView,
  prepareViewContent,
  createFormElement,
  toggleViewPassword,
  showFormError,
  removeFormError
};

