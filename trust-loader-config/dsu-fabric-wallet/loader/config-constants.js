let LOADER_GLOBALS = {
  THEME: "app",
  REGISTRATION_FIELDS: [
    {
      visible: true,
      fieldId: "fullname",
      validator: "anyChar",
      type: "text",
      fieldLabel: "Full name",
      placeholder: "Your full name",
      fieldHelp: "Your full name Ex. Jhon Smith"
    },
    {
      visible: true,
      fieldId: "company",
      type: "text",
      validator: "anyChar",
      fieldLabel: "Company Name",
      placeholder: "Enter your company name",
      fieldHelp: "Company name is optional"
    },
    {
      visible: true,
      fieldId: "email",
      validator: "email",
      type: "email",
      fieldLabel: "Email",
      placeholder: "Enter your email",
      fieldHelp: "Enter a valid email address"
    },
    {
      visible: true,
      fieldId: "phone",
      validator: "phone",
      type: "text",
      fieldLabel: "Phone number",
      placeholder: "Enter your phone number",
      fieldHelp: "Only numbers"
    },
    {
      visible: true,
      fieldId: "username",
      validator: "username",
      type: "text",
      fieldLabel: "Username",
      placeholder: "Enter your username",
      fieldHelp: "Username should have at least 6 characters"
    },
    {
      visible: true,
      fieldId: "password",
      type: "password",
      validator: "password",
      fieldLabel: "Password",
      placeholder: "Enter your password",
      fieldHelp: "Password min. 12 chars including 1xUpper char, 1xDigit, 1xSpecial char"
    },
    {
      visible: true,
      fieldId: "confirm-password",
      type: "password",
      validator: "confirmPassword",
      fieldLabel: "Confirm Password",
      placeholder: "Confirm your password",
      fieldHelp: "Passwords should be identical"
    }
  ],
  SHOW_ACTION_BUTTON: true,
  ACTION_BUTTON_OPTIONS: {
    option1: {
      label: "Logout",
      action: function () {
        localStorage.removeItem(LOADER_GLOBALS.LOCALSTORAGE_CREDENTIALS_KEY);
        const basePath = window.location.href.split("loader")[0];
        window.location.replace(basePath + "loader/?login");
      }
    },
    option2: {
      label: "Change password",
      action: function () {
        console.log('opt2 click', window.location.href);
        const basePath = window.location.href.split("loader")[0];
        window.location.replace(basePath + "loader/changePassword.html");
      }
    }
  },
  LABELS_DICTIONARY: {
    APP_NAME: "DSU Fabric",
    APP_DESCRIPTION: "The \"backend\" application for EPI",
    NEW_WALLET: "New Account",
    ACCESS_WALLET: "Access Account",
    RECOVER_WALLET: "Recover Wallet",
    WALLET_AUTHORIZATION: "Authorization",
    REGISTER_DETAILS: "Register details",
    COMPLETE: "Complete",
    INVALID_CREDENTIALS: "Invalid credentials",

    /* USER_FULL_NAME_LABEL: "Enter your full name",
     USER_FULL_NAME_HELP: "User full name",
     USER_FULL_NAME_PLACEHOLDER: "Ex. Jhon Doe",

     SET_UP_USERNAME: "Enter your username",
     SET_UP_USERNAME_HELP: "Username should have at least 6 characters",
     ENTER_USERNAME: "Username",

     PHONE_LABEL: "Phone number",
     PHONE_HELP: "Only numbers",
     PHONE: "Enter your phone number",

     SET_UP_EMAIL: "Enter your email",
     SET_UP_EMAIL_HELP: "Enter a valid email address",
     ENTER_EMAIL: "Email",

    SET_UP_COMPANY: "Enter your company name",
    SET_UP_COMPANY_HELP: "Company name is optional",
    ENTER_COMPANY: "Company Name",
*/
    /*    SET_UP_PASSWORD: "Enter your password",
        SET_UP_PASSWORD_HELP: "Password min. 12 chars including 1xUpper char, 1xDigit, 1xSpecial char",
        ENTER_PASSWORD: "Password",

        SET_UP_CONFIRM_PASSWORD: "Confirm your password",
        SET_UP_CONFIRM_PASSWORD_HELP: "Passwords should be identical",
        ENTER_CONFIRM_PASSWORD: "Confirm password",*/

    BACK_BUTTON_MESSAGE: "Back",
    REGISTER_BUTTON_MESSAGE: "Register",
    REGISTER_SUCCESSFULLY: "Register successfully",

    CHANGE_PASSWORD: "Change your password",
    RECOVER_WALLET_LABEL: "Enter Recovery Key",
    RECOVER_WALLET_HELP: "Key that you saved on registration",
    OLD_PASSWORD_LABEL: "Your old password",
    OLD_PASSWORD_HELP: "This is the password you want to change",
    NEW_PASSWORD_LABEL: "Enter new password",
    NEW_PASSWORD_HELP: "Password min. 12 chars including 1xUpper char, 1xDigit, 1xSpecial char",
    CONFIRM_NEW_PASSWORD_LABEL: "Confirm your new password",
    CONFIRM_NEW_PASSWORD_HELP: "Passwords should be identical",

    ENTER_CREDENTIALS: "Enter your credentials",
    OPEN_WALLET: "Enter",
    SEED: "Seed",
    ENTER_WALLET_SEED: "Enter Wallet Seed",
    SEED_PRINT: "You can print it on a piece of paper.",
    RESTORE: "Restore",
    WALLET_RESTORED_SUCCESSFULLY: "Your wallet has been successfully restored.",
    CHANGE_WALLET: "Change wallet",
    PINCODE_HELP: "Min. 4 characters"
  },
  APP_PATHS: {
    LANDING_PAGE: "/",
    NEW_WALLET: "/newWallet.html",
    RESTORE_WALLET: "/restore",
    CHANGE_PASSWORD: "/changePassword.html"
  },
  NEW_OR_RESTORE_CONTAINER_ID: "restore-new-container",
  CHANGE_PASSWORD_CONTAINER: "change-credentials-container",
  PASSWORD_CONTAINER_ID: "credentials-container",
  MODE: 'secure',
  PINCODE_REGEX: /^.{4,}$/,
  PASSWORD_MIN_LENGTH: 12,
  USERNAME_MIN_LENGTH: 6,
  USERNAME_REGEX: /^[a-zA-Z]([A-Za-z0-9]+[\\._]{0,1}[A-Za-z0-9]+){2,10}$/,
  PHONE_REGEX: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
  EMAIL_REGEX: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  ANY_REGEX: /^[a-z0-9 ]+$/i,
  PASSWORD_REGEX: /^(?=.*[A-Z])(?=.*[`~:;\'\"\.,<>/\?\!@#$%\^&\*\(\)\[\]\{\}|\\\-_\=\+])(?=.*[0-9])(?=.*[a-z].*[a-z].*[a-z]).*$/,
  NEW_WALLET_MORE_INFORMATION: `<div class="jumbotron p-0 m-0" align="center">
  <h1 class="display-6">Welcome to EPI backend app!</h1>
  <p class="lead">After completing the following wizard you will gain access to EPI backend app.</p>
  <p class="m-0">In order to gain access you have to set up your credentials.</p>
  <hr/>
</div>`
};

export default LOADER_GLOBALS;
