function Validator() {
  this.showErrorOnField = function (fieldId, fieldHelpId) {
    let field = document.getElementById(fieldId);
    field.style.border = "2px solid red";
    field.setAttribute("valid", false);
    let helpField = document.getElementById(fieldHelpId);
    if (helpField) {
      helpField.setAttribute('style', 'color:red !important; font-weight: bold;');
    }
  }

  this.removeErrorFromField = function (fieldId, fieldHelpId) {
    let field = document.getElementById(fieldId);
    field.style.border = "1px solid #ced4da";
    field.setAttribute("valid", true);
    let helpField = document.getElementById(fieldHelpId);
    if (helpField) {
      helpField.setAttribute('style', '#6c757d !important');
    }
  }

  this.manageHelpField = function (value, status, id) {
    !status ? this.showErrorOnField(id, id + '-help') :
      this.removeErrorFromField(id, id + '-help');
  }

  this.phone = function (event) {
    const phone = event.target.value;
    let phoneIsValid = LOADER_GLOBALS.PHONE_REGEX.test(phone);
    this.manageHelpField(phone, phoneIsValid, event.target.id);
    return phoneIsValid
  }

  this.email = function (event) {
    const email = event.target.value;
    let emailIsValid = email.length > 4 && LOADER_GLOBALS.EMAIL_REGEX.test(email);
    this.manageHelpField(email, emailIsValid, event.target.id);
    return emailIsValid
  }

  this.anyChar = function (event) {
    const fieldValue = event.target.value;
    let fieldValueIsValid = LOADER_GLOBALS.ANY_REGEX.test(fieldValue);
    this.manageHelpField(fieldValue, fieldValueIsValid, event.target.id);
    return fieldValueIsValid;
  }

  this.regexValidator = function (event, regexParam) {
    const fieldValue = event.target.value;
    let fieldValueIsValid = regexParam.test(fieldValue);
    this.manageHelpField(fieldValue, fieldValueIsValid, event.target.id);
    return fieldValueIsValid;
  }

  this.equalValueValidator = function (event, value) {
    const fieldValue = event.target.value;
    let fieldValueIsValid = fieldValue === value;
    this.manageHelpField(fieldValue, fieldValueIsValid, event.target.id);
    return fieldValueIsValid;
  }

  this.username = function (event) {
    const userName = event.target.value;
    let usernameIsValid = userName.length >= LOADER_GLOBALS.USERNAME_MIN_LENGTH && LOADER_GLOBALS.USERNAME_REGEX.test(userName);
    this.manageHelpField(userName, usernameIsValid, event.target.id);
    return usernameIsValid;
  }

  this.password = function (event) {
    const password = event.target.value;
    let passwordIsValid = password.length >= LOADER_GLOBALS.PASSWORD_MIN_LENGTH && LOADER_GLOBALS.PASSWORD_REGEX.test(password);
    this.manageHelpField(password, passwordIsValid, event.target.id);
    return passwordIsValid;
  }

  this.confirmPassword = function (event) {
    const password = document.getElementById("password").value;
    const confirmPassword = event.target.value;
    const confirmPasswordIsValid = password == confirmPassword;
    this.manageHelpField(confirmPassword, confirmPasswordIsValid, event.target.id);
    return confirmPassword;
  }

  this.validateForm = function (formFields){
    formFields.forEach((formField)=>{
      const element = document.getElementById(formField);
      if(element){
        element.dispatchEvent(new Event('input'));
      }
    });

    let hasInvalidField = !!formFields.find(field => document.getElementById(field).getAttribute('valid') === "false");
    return !hasInvalidField;
  }
}


let validator = new Validator();
window.validator = validator;
