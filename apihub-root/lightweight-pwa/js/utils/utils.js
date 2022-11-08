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

function goToPage(pageName) {

  if (!pageName || typeof pageName !== "string" || pageName[0] !== "/" || window.location.hash) {
    pageName = "/error.html"
  }
  let pagePath = window.location.pathname.replace(/\/[^\/]*$/, pageName)
  window.location.href = (window.location.origin + pagePath);
}

export {
  convertFromISOtoYYYY_HM,
  goToPage
}
