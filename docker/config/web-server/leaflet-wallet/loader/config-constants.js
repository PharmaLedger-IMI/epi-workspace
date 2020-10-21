let APP_CONFIG = {
	THEME: "app",
	LABELS_DICTIONARY: {
		APP_NAME: "ePI",
		APP_DESCRIPTION: "electronic Product Information",
		NEW_DOSSIER: "New Wallet",
		RESTORE_DOSSIER: "Restore Wallet",
		WALLET_AUTHORIZATION: "Wallet Authorization",
		PIN: "PIN",
		COMPLETE: "Complete",
		SET_UP_PIN: "Set up a Personal Identifier(PIN)",
		EASY_TO_REMEMBER_PIN: "Setup a easy to remember PIN",
		CONFIRM_PIN: "Confirm PIN",
		CONFIRM_PIN_IDENTICAL: "PINs should be identical.",
		ENTER_PIN: "Enter PIN",
		SET_PIN: "Set PIN",
		OPEN_WALLET: "Open Wallet",
		LOST_PIN: "Lost PIN?",
		SEED: "Seed",
		ENTER_WALLET_SEED: "Enter Wallet Seed",
		SEED_KEEP_SECRET: "Please keep secret this seed",
		SEED_PRINT: "You can print it on a piece of paper.",
		RESTORE: "Restore",
		WALLET_RESTORED_SUCCESSFULLY: "Your wallet has been successfully restored.",
		CHANGE_WALLET: "Change wallet"
	},
	APP_PATHS: {
		LANDING_PAGE: "/",
		NEW_WALLET: "/new",
		RESTORE_WALLET: "/restore"
	},
	NEW_OR_RESTORE_CONTAINER_ID: "restore-new-container",
	PIN_CONTAINER_ID: "pin-container",
	EDFS_ENDPOINT: "http://localhost:8080",
	MODE: 'secure',
	PIN_MIN_LENGTH: 4,
	NEW_DOSSIER_MORE_INFORMATION: `<div class="jumbotron p-0 m-0" align="center">
  <h1 class="display-6">Welcome to your ePI SSApp!</h1>
  <p class="lead">After completing the following wizard you will gain access to ePI SSApp.</p>
  <p class="m-0">In order to access your private SSApp you have to set up a password.</p>
  <hr/>
</div>`
};

export default APP_CONFIG;
