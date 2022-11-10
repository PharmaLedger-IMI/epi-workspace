import {constants} from "../constants.js"

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function convertFromISOtoYYYY_HM(dateString, useFullMonthName, separator) {
  const splitDate = dateString.split('-');
  const month = parseInt(splitDate[1]);
  let separatorString = "-";
  if (typeof separator !== "undefined") {
    separatorString = separator;
  }
  if (useFullMonthName) {
    return `${splitDate[2]} ${separatorString} ${monthNames[month - 1]} ${separatorString} ${splitDate[0]}`;
  }
  return `${splitDate[2]} ${separatorString} ${monthNames[month - 1].slice(0, 3)} ${separatorString} ${splitDate[0]}`;
}

function validateGTIN(gtinValue) {
  const gtinMultiplicationArray = [3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3];

  if (isNaN(gtinValue)) {
    return {
      isValid: false,
      message: "GTIN should be a numeric value",
      errorCode: constants.errorCodes.gtin_wrong_chars
    };
  }
  let gtinDigits = gtinValue.split("");

  // TO DO this check is to cover all types of gtin. For the moment we support just 14 digits length. TO update also in leaflet-ssapp
  /*
  if (gtinDigits.length !== 8 && gtinDigits.length !== 12 && gtinDigits.length !== 13 && gtinDigits.length !== 14) {

    return {isValid: false, message: "GTIN length should be 8, 12, 13 or 14"};
  }
  */

  if (gtinDigits.length !== 14) {
    return {isValid: false, message: "GTIN length should be 14", errorCode: constants.errorCodes.gtin_wrong_length};
  }
  let j = gtinMultiplicationArray.length - 1;
  let reszultSum = 0;
  for (let i = gtinDigits.length - 2; i >= 0; i--) {
    reszultSum = reszultSum + gtinDigits[i] * gtinMultiplicationArray[j];
    j--;
  }
  let validDigit = Math.floor((reszultSum + 10) / 10) * 10 - reszultSum;
  if (validDigit === 10) {
    validDigit = 0;
  }
  if (gtinDigits[gtinDigits.length - 1] != validDigit) {
    return {
      isValid: false,
      message: "Invalid GTIN. Last digit should be " + validDigit,
      errorCode: constants.errorCodes.gtin_wrong_digit
    };
  }

  return {isValid: true, message: "GTIN is valid"};
}

function goToPage(pageName) {

  if (!pageName || typeof pageName !== "string" || pageName[0] !== "/" || window.location.hash) {
    pageName = `/error.html?errorCode=${constants.errorCodes.url_redirect_error}`
  }
  let pagePath = window.location.pathname.replace(/\/[^\/]*$/, pageName)
  window.location.href = (window.location.origin + pagePath);
}

function goToErrorPage(errorCode) {
  let errCode = errorCode || "010";
  goToPage(`/error.html?errorCode=${errCode}`)
}

export {
  convertFromISOtoYYYY_HM,
  goToPage,
  validateGTIN,
  goToErrorPage
}
