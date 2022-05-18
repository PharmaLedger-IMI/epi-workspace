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
function goToPage(urlFragment) {
  let url = window.location.href.replace(/\/[^\/]*$/, '/' + urlFragment);
  window.location.replace(url);
}

export {
  convertFromISOtoYYYY_HM,
  goToPage
}
