import {setTextDirectionForLanguage} from "./utils/utils.js";
import constants from "./constants.js";

export const translations = {
  "en": {
    "app_version": "App version: ",
    "welcome": "Welcome to PharmaLedger",
    "scan_explain": "Find the DataMatrix Barcode on your medicine to scan and view information",
    "scan_button": "Scan DataMatrix",
    "cancel": "Cancel",
    "change_camera": "Change camera",
    "scan_again": "Scan Again",
    "product_not_found_title": "Not Recognized",
    "product_not_loaded_title": "Product information not available",
    "error_subtitle": "Unverified Product",
    "product_not_found": "This product cannot be found",
    "product_not_loaded": "Unfortunately, no product information has been loaded",
    "system_busy": "System is busy, please try again later.",
    "err_code": "Error code",
    "leaflet_expired_title": "Expired",
    "leaflet_expired_message": "<p> <b>This product has been identified as expired.</b> </p> ",
    "leaflet_incorrect_date_title": "Incorrect date",
    "leaflet_incorrect_date_subtitle": "Scanned date is incorrect",
    "leaflet_incorrect_date_message": "<b> This product's date is incorrect</b>.",
    "select_lang_title": "Language Unavailable",
    "scan_error_title": "Scan Error",
    "camera_error_message": "Something went wrong and the selected camera cannot be accessed properly. Please check your device camera settings or try to change camera from the menu",
    "leaflet_lang_select_message": "The leaflet is not available in your preferred language. You can choose from the available language list",
    "lang_proceed": "Proceed",
    "go_home": "Go Back Home",
    "onboarding_welcome": "Almost There! <br> Please read and agree to the terms and conditions",
    "disagree": "Disagree",
    "agree": "Agree",
    "disagree_extra_text": "\"PharmaLedger\" app will not work until you agree to the terms and conditions. Please read the terms and conditions.",
    "fwd_privacy": "Privacy policy",
    "fwd_terms": "Terms and Conditions",
    "fwd_help": "Help",
    "fwd_about": "About",
    "privacy_modal_title": "Privacy policy",
    "privacy_modal_subtitle": "Our Privacy and Security Principles",
    "privacy_content": "<h1><b>Privacy Notice</b></h1> <p>This privacy notice is applicable to the use of the PharmaLedger Association Electronic Product Information product. </p> <h2>Contacts</h2><p><b>a) Identity and contacts of the controller or joint controllers</b></p><p>The controller for your data is the PharmaLedger Association.</p> <p><b>b) Contacts of the data protection officer</b></p><p>The Data Protection Office of PharmaLedger Association is contactable at <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a> </p><h2>What Personal Data We Use</h2><p>We collect only the technical data required to deliver your electronic leaflet. This includes your IP address and technical identifiers of the device and browser you use to access our application.</p> <p><em>In detail, we collect the following data elements</em></p><ul><li><p><em>Mobile Device Access.</em> We may request access or permission to certain features from your mobile device, including your mobile device's camera, and other features. If you wish to change our access or permissions, you may do so in your device's settings.</p></li><li><p><em>Mobile Device Data.</em> We automatically collect device information (such as your mobile device ID, model, and manufacturer), operating system, version information and system configuration information, device and application identification numbers, browser type and version, hardware model Internet service provider and/or mobile carrier, and Internet Protocol (IP) address (or proxy server). If you are using our application(s), we may also collect information about the phone network associated with your mobile device, your mobile device’s operating system or platform, the type of mobile device you use, your mobile device’s unique device ID, and information about the features of our application(s) you accessed.</p></li></ul><h2>Why We Collect Your Personal Data</h2><p><b>Purposes </b></p><p>We collect your technical data for the purpose of providing you with an electronic product leaflet for your medication. </p><p>As such, we may rely on the following legal bases to process your personal information:</p><ul><li><p><b>Performance of a Contract.</b> We may process your personal information when we believe it is necessary to fulfill contractual obligations to you, including providing our Services or at your request prior to entering into a contract with you.</p></li><li><p><b>Legal Obligations.</b> We may process your information where we believe it is necessary for compliance with our legal obligations, such as to fulfill our obligations under healthcare regulation and public health legislation.</p></li></ul><h2>With Whom We Share Your Personal Data</h2><p>Member Companies and Third-Party Service Providers.</p><p>We share your data with third-party vendors, service providers, contractors, or agents ('third parties') who perform services for us or on our behalf and require access to such information to do that work. We have contracts in place with our third parties, which are designed to help safeguard your personal information. This means that they cannot do anything with your personal information unless we have instructed them to do it. They will also not share your personal information with any organization apart from us. They also commit to protect the data they hold on our behalf and to retain it for the period we instruct. The categories of third parties we may share personal information with are as follows:</p><ul><li><p>Drug Manufacturers (Member Companies)</p></li><li><p>Technical Service Providers</p></li></ul><h2>How Long We Store Your Personal Data</h2><p>The PharmaLedger Association only stores your technical data for as long as necessary to process your leaflet request for up to 30 days. </p><p>Your medicine manufacturer will also store your data for a defined period of time as determined by their data retention policies, for more information on this retention please get in touch with your drug manufacturer.</p><h2>If You Don’t Provide Us Your Personal Data</h2><p>If you choose not to provide your technical data to us we will be unable to fulfill your leaflet request.</p><h2>Your Rights</h2><p>If you have any requests related to your personal data under the GDPR, such as a request to access or delete your data, you may contact us at <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a>.</p><p>We will process such requests within 30 days</p><h2>Withdrawal of Consent</h2><p>If you have any requests related to your personal data under the GDPR, such as a request to access or delete your data, you may contact us at <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a>.</p><p>We will process such requests within 30 days</p><h2>Automated Decision-Making</h2><p>We do not utilize any automated decision-making in our provisioning of this service to you.</p><h2>International Transfer of Personal Data</h2><p>Where your drug manufacturer requires us to transfer your data outside of the European Union we utilize Standard Contractual Clauses to protect your data.</p><h2>How to Complain</h2><p>If you have any requests related to your personal data under the GDPR, such as a request to access or delete your data, you may contact us at <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a>.</p><p>We will process such requests within 30 days. Additionally you may contact your local supervisory authority if you feel that your rights are not being met.</p>",
    "terms_modal_title": "Terms and Conditions",
    "terms_modal_subtitle": "The terms and conditions that apply when using the PharmaLedger Application",
    "terms_content": "<h2>Terms and Conditions for the PharmaLedger Association's Electronic Product Information Website and Application </h2><p>By accessing or using the PharmaLedger Association's Electronic Product Information website and application (the \"Services\"), you agree to be bound by these terms and conditions (the \"Terms\"). You may not access or use the Services if you do not agree to these Terms. The Services are operated by the PharmaLedger Association (the \"Association\") and are intended for use by individuals seeking information about their medication. A multiparty network delivers the Services, and your drug manufacturer supplies the product information displayed through the Services. The Association acts as the data controller for this information. </p><h2>Use of the Services </h2><p>You agree to use the Services only for lawful purposes, and in a manner that does not infringe the rights of, or restrict or inhibit the use and enjoyment of the Services by any third party. Such restriction or inhibition includes, without limitation, conduct that is unlawful, or which may harass or cause distress or inconvenience to any person, and the transmission of obscene or offensive content or disruption of the normal flow of dialogue within the Services. </p><h2>Intellectual Property </h2><p>The content of the Services, including, but not limited to, text, graphics, images, and software, is the property of the Association or its licensors and member companies and is protected by copyright and other intellectual property laws. You may not use any content from the Services for any commercial purpose without the express written consent of the Association. </p><h2>Liability</h2><p>The Association makes no representations or warranties of any kind, express or implied, as to the operation of the Services or the information, content, materials, or products included in the Services. The Association will not be liable for any damages of any kind arising from the use of the Services, including, but not limited to, direct, indirect, incidental, punitive, and consequential damages. </p><h2>Governing Law </h2><p>These Terms and your use of the Services will be governed by and construed in accordance with the laws of Switzerland and any disputes will be resolved in the courts of Basel, Switzerland. </p><h2>Changes to the Terms </h2><p>The Association reserves the right to change these Terms at any time, and you are responsible for checking these Terms periodically for any changes. Your continued use of the Services after any changes to the Terms have been made will constitute your acceptance of the revised Terms.</p><p><br></p>",
    "about_modal_subtitle": "About",
    "about_modal_title": "Pharmaledger",
    "about_content": "<iframe style=\"width: 100%; height: 100%; margin-bottom: 24px; border: 0\" src=\"https://pharmaledger.org\"></iframe>",
    "help_modal_title": "Help",
    "help_modal_subtitle": "FAQs",
    "help_content": "<div><p><b>What is EPI?</b></p>" +
      "<p>" +
      "    <b>EPI</b> is an abbreviation for <b>electronic product information.</b> It is an electronic version of the paper" +
      "    Product Information leaflet you typically find inside a pharmaceutical product package. In some cases, the" +
      "    <b>EPI</b> may have replaced the paper leaflet" +
      "</p>" +
      "<p>" +
      "    <b>What is PharmaLedger?</b>" +
      "</p>" +
      "<p>The PharmaLedger Association (PLA) is a not-for-profit association based in Switzerland with the purpose to enable" +
      "    and foster a Digital Trust Ecosystem in healthcare through a standardized and trusted open-source platform. PLA" +
      "    promotes collaboration and accelerates innovation and adoption to achieve mutual benefits in the healthcare and life" +
      "    science domains for patients and other stakeholders. PLA was formed in 2022 to continue the work of the PharmaLedger" +
      "    project, a 3-year project funded by the European Commission and the pharmaceutical industry aimed at proving the" +
      "    value of blockchain solutions. Further information is available at https://pharmaledger.org/" +
      "</p>" +
      "<p><b>What is the DataMatrix?</b></p>" +
      "<p>It's a type of barcode on your product package. It is a black and white square box barcode and will look similar to" +
      "    this:<br>" +
      "    <img src=\"./images/barcode_example.png\">" +
      "</p>" +
      "<p>" +
      "    <b>How to use the App?</b>" +
      "</p>" +
      "<p>" +
      "    Follow the instructions on the landing page of the <b>App...</b> it shows a picture of where to find the" +
      "    <b>DataMatrix</b> on your" +
      "    Product Package. Once you have found the <b>DataMatrix</b>, click the button 'Scan <b>DataMatrix</b>'. Allow the" +
      "    application to" +
      "    use the camera so the <b>DataMatrix</b> can be scanned. Use the camera to focus on the <b>DataMatrix</b>. Once the" +
      "    pack is scanned" +
      "    successfully, the <b>EPI</b> will be displayed. You can click the '+' button to get more details" +
      "</p><p><b>Why does my DataMatrix scan not give a result?</b></p><p>" +
      "    There are several reasons why the <b>DataMatrix</b> on your package may not give an EPI. One of the reasons could be" +
      "    the" +
      "    focus for the camera. Please try to scan the code in a well lit place and code clearly visible on the screen. If you" +
      "    are struggling to keep your hand steady, you could try using a table to support your hands." +
      "</p></div>"
  },
  "de": {
    "app_version": "Version:",
    "welcome": "Willkommen bei PharmaLedger",
    "scan_explain": "Suchen und scannen Sie den DataMatrix Barcode auf Ihrem Arzneimittel, um die Packungsbeilage anzuzeigen.",
    "scan_button": "DataMatrix scannen",
    "cancel": "Abbrechen",
    "change_camera": "Kamera wechseln",
    "scan_again": "Erneut scannen",
    "product_not_found_title": "Nicht erkannt",
    "product_not_loaded_title": "Produktinformationen nicht gefunden",
    "error_subtitle": "",
    "product_not_found": "Dieses Produkt wurde nicht gefunden",
    "product_not_loaded": "Es wurden leider keine Produktinformationen zu diesem Arzneimittel zur Verfügung gestellt",
    "system_busy": "Das System ist beschäftigt, bitte versuchen Sie es später noch einmal.",
    "err_code": "Fehler",
    "leaflet_expired_title": "Abgelaufen",
    "leaflet_expired_message": "<p> <b>Das Verfallsdatum dieses Arzneimittels ist überschritten.</b> </p> ",
    "leaflet_incorrect_date_title": "",
    "leaflet_incorrect_date_subtitle": "",
    "leaflet_incorrect_date_message": "<b> </b>.",
    "select_lang_title": "Sprache nicht verfügbar",
    "scan_error_title": "Scan Fehler",
    "camera_error_message": "Auf die ausgewählte Kamera konnte nicht zugegriffen werden. Bitte überprüfen Sie die Kameraeinstellungen auf Ihrem Gerät oder versuchen Sie, die Kamera im Menü zu wechseln.",
    "leaflet_lang_select_message": "Die aktuelle Packungsbeilage ist in Ihrer Sprache nicht verfügbar.Sie können eine der verfügbaren Sprachen aus der Liste auswählen:",
    "lang_proceed": "Fortfahren",
    "go_home": "Zurück zum Startbildschirm",
    "onboarding_welcome": "Fast geschafft! Bitte lesen und akzeptieren Sie die Nutzerbedingungen.",
    "disagree": "Ablehnen",
    "agree": "Akzeptieren",
    "disagree_extra_text": "Die \"PharmaLedger\" App kann nur verwendet werden, wenn Sie den Geschäftsbedingungen zustimmen.",
    "fwd_privacy": "Datenschutzerklärung",
    "fwd_terms": "Allgemeine Geschäftsbedingungen ",
    "fwd_help": "Hilfe",
    "fwd_about": "Über",
    "privacy_modal_title": "Datenschutzerklärung",
    "privacy_modal_subtitle": "Unsere Datenschutz- und Sicherheitsgrundsätze",
    "privacy_content": "<h1><b>Privacy Notice</b></h1><p>Dieser Datenschutzhinweis gilt für die Nutzung des Produkts PharmaLedger Association Electronic Product Information. </p><h2>Kontaktdaten</h2><p>a) Identität und Kontaktdaten des für die Verarbeitung Verantwortlichen bzw. der gemeinsam für die Verarbeitung Verantwortlichen Für die Verarbeitung Ihrer Daten ist die PharmaLedger Association verantwortlich. </p> <p>b) Kontaktdaten des Datenschutzbeauftragten Das Datenschutzbüro der PharmaLedger Association ist erreichbar unter <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a> </p><h2>Welche persönlichen Daten wir verwenden</h2><p>Wir erheben nur die technischen Daten, die für die Zustellung Ihres elektronischen Prospekts erforderlich sind. Dazu gehören Ihre IP-Adresse und die technischen Kennungen des Geräts und des Browsers, die Sie für den Zugriff auf unsere Anwendung verwenden. </p> <p>Im Einzelnen erfassen wir die folgenden Elemente Ihrer Daten </p> <ul><li><p>Zugriff auf mobile Geräte. Wir dürfen Sie um Zugriff oder Erlaubnis für bestimmte Funktionen Ihres Mobilgeräts bitten, einschließlich der Kamera Ihres Mobilgeräts und anderer Funktionen. Wenn Sie unseren Zugriff oder unsere Berechtigungen ändern möchten, können Sie dies in den Einstellungen Ihres Geräts tun. </p></li></ul><ul><li><p>Daten über mobile Geräte. Wir erfassen automatisch Geräteinformationen (wie z.B. die ID, das Modell und den Hersteller Ihres mobilen Geräts), das Betriebssystem, Versionsinformationen und Systemkonfigurationsinformationen, Geräte- und Anwendungs-Identifikationsnummern, Browsertyp und -version, das Hardwaremodell, den Internet-Service-Provider und/oder Mobilfunkanbieter sowie die Internetprotokoll-(IP-)Adresse (oder den Proxy-Server). Wenn Sie unsere Anwendung(en) nutzen, können wir auch Informationen über das mit Ihrem Mobilgerät verbundene Telefonnetz, das Betriebssystem oder die Plattform Ihres Mobilgeräts, die Art des von Ihnen verwendeten Mobilgeräts, die eindeutige Geräte-ID Ihres Mobilgeräts und Informationen über die von Ihnen aufgerufenen Funktionen unserer Anwendung(en) erfassen. </p></li></ul><h2>Warum wir Ihre persönlichen Daten sammeln</h2><p>Verwendungszwecke</p><p>Wir erheben Ihre technischen Daten, um Ihnen eine elektronische Packungsbeilage für Ihr Medikament zukommen zu lassen. </p><p>In diesem Sinne stützen wir uns auf die folgenden Rechtsgrundlagen, um Ihre persönlichen Daten zu verarbeiten: </p> <ul><li><p>Erfüllung eines Vertrags. Wir sind berechtigt, Ihre personenbezogenen Daten zu verarbeiten, wenn wir der Meinung sind, dass dies notwendig ist, um vertragliche Verpflichtungen Ihnen gegenüber zu erfüllen, einschließlich der Bereitstellung unserer Dienstleistungen oder auf Ihren Wunsch hin, bevor wir einen Vertrag mit Ihnen abschließen. </p></li></ul><ul><li><p>Gesetzliche Verpflichtungen. Wir dürfen Ihre Daten verarbeiten, wenn wir der Meinung sind, dass dies zur Erfüllung unserer gesetzlichen Verpflichtungen notwendig ist, wie z.B. zur Erfüllung unserer Verpflichtungen im Rahmen der Gesundheitsvorschriften und der Gesetze zum öffentlichen Gesundheitswesen </p></li></ul><h2>Mit wem wir Ihre persönlichen Daten teilen</h2><p>Mitgliedsunternehmen und Drittanbieter von Dienstleistungen. </p><p>Wir teilen Ihre Daten mit Drittanbietern, Dienstleistern, Auftragnehmern oder Vertretern (\"Dritte\"), die Dienstleistungen für uns oder in unserem Namen erbringen und für diese Arbeit Zugang zu diesen Informationen benötigen. Wir haben Verträge mit unseren Drittparteien abgeschlossen, die dazu dienen, Ihre persönlichen Daten zu schützen. Das bedeutet, dass diese Dritten nichts mit Ihren persönlichen Daten tun können, es sei denn, wir haben sie dazu angewiesen. Außerdem werden diese Dritten Ihre persönlichen Daten nicht an andere Organisationen als uns weitergeben. Sie verpflichten sich außerdem, die Daten, die sie in unserem Auftrag speichern, zu schützen und sie für den von uns vorgegebenen Zeitraum aufzubewahren. Die Kategorien von Dritten, an die wir persönliche Daten weitergeben können, sind wie folgt: </p> <ul><li><p>Medikamentenhersteller (Mitgliedsunternehmen) </p></li></ul><ul><li><p>Anbieter von technischen Dienstleistungen </p></li></ul><h2>Wie lange wir Ihre persönlichen Daten speichern</h2><p>Die PharmaLedger Association speichert Ihre technischen Daten nur so lange, wie es für die Bearbeitung Ihrer Prospektanforderung erforderlich ist, d.h. bis zu 30 Tage. Ihr Arzneimittelhersteller speichert Ihre Daten ebenfalls für einen bestimmten Zeitraum, der in seinen Richtlinien zur Datenaufbewahrung festgelegt ist. Für weitere Informationen zu dieser Aufbewahrung setzen Sie sich bitte mit Ihrem Arzneimittelhersteller in Verbindung. </p><h2>Wenn Sie uns Ihre persönlichen Daten nicht zur Verfügung stellen</h2><p>Wenn Sie uns Ihre technischen Daten nicht zur Verfügung stellen, können wir Ihre Anfrage nach Broschüren nicht erfüllen. </p><h2>Ihre Rechte</h2><p>Wenn Sie im Rahmen der Datenschutz-Grundverordnung (\"DSGVO\") eine Anfrage bezüglich Ihrer persönlichen Daten haben, z.B. eine Anfrage auf Zugang oder Löschung Ihrer Daten, können Sie uns unter <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a> </p><p>Wir bearbeiten solche Anfragen innerhalb von 30 Tagen </p><h2>Widerruf der Einwilligung</h2><p>Wenn Sie im Rahmen der Datenschutz-Grundverordnung (\"DSGVO\") eine Anfrage bezüglich Ihrer persönlichen Daten haben, z.B. eine Anfrage auf Zugang oder Löschung Ihrer Daten, können Sie uns unter <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a> </p><p>Wir bearbeiten solche Anfragen innerhalb von 30 Tagen </p><h2>Automatisierte Entscheidungsfindung</h2><p>Wir verwenden keine automatisierte Entscheidungsfindung bei der Bereitstellung dieses Dienstes für Sie. </p><h2>Internationale Übermittlung von personenbezogenen Daten</h2><p>Wenn Ihr Arzneimittelhersteller es erforderlich macht, dass wir Ihre Daten außerhalb der Europäischen Union übermitteln, verwenden wir Standardvertragsklauseln, um Ihre Daten zu schützen. </p><h2>Beschwerdeverfahren</h2><p>Wenn Sie eine Anfrage bezüglich Ihrer persönlichen Daten im Rahmen der GDPR haben, wie z.B. eine Anfrage zum Zugriff oder zur Löschung Ihrer Daten, können Sie uns wie folgt kontaktieren <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a> </p><p>Wir bearbeiten solche Anfragen innerhalb von 30 Tagen. Außerdem können Sie sich an Ihre örtliche Aufsichtsbehörde wenden, wenn Sie der Meinung sind, dass Ihre Rechte nicht eingehalten werden </p>",
    "terms_modal_title": "Allgemeine Geschäftsbedingungen ",
    "terms_modal_subtitle": "Allgemeine Geschäftsbedingungen für die Benutzung der “PharmaLedger” App",
    "terms_content": "<h2>Allgemeine Geschäftsbedingungen für die Website und Anwendung der PharmaLedger Association für elektronische Produktinformationen</h2><p>Durch den Zugriff auf die Website und die Anwendung der PharmaLedger Association<br>für elektronische Produktinformationen (die \"Dienste\") erklären Sie sich mit diesen<br>Bedingungen einverstanden (die \"Bedingungen\"). Sie sind nicht berechtigt, auf die<br>Dienste zuzugreifen oder diese zu nutzen, wenn Sie diesen Bedingungen nicht<br>zustimmen. Die Dienste werden von der PharmaLedger Association (die \"Association\")<br>betrieben und sind für die Nutzung durch Personen bestimmt, die Informationen über<br>ihre Medikamente suchen. Die Dienste werden von einem Mehrparteiennetzwerk<br>bereitgestellt, und Ihr Arzneimittelhersteller liefert die Produktinformationen, die im<br>Rahmen der Dienste angezeigt werden. Die Association fungiert als<br>Datenverantwortlicher für diese Informationen.</p><h2>Nutzung der Dienste</h2><p>Sie verpflichten sich, die Dienste nur für rechtmäßige Zwecke und in einer Weise zu<br>nutzen, die die Rechte Dritter nicht verletzt oder die Nutzung der Dienste durch Dritte<br>einschränkt bzw. behindert. Eine solche Einschränkung oder Behinderung umfasst<br>unter anderem ein Verhalten, das rechtswidrig ist oder eine Person belästigt oder in<br>Bedrängnis bringt oder Unannehmlichkeiten verursacht, sowie die Übertragung<br>obszöner oder beleidigender Inhalte oder die Beeinträchtigung des normalen<br>Dialogflusses innerhalb der Dienste.</p><h2>Geistiges Eigentum</h2><p>Der Inhalt der Dienste, einschließlich, aber nicht beschränkt auf Texte, Grafiken, Bilder<br>und Software, ist das Eigentum der Association oder ihrer Lizenzgeber und<br>Mitgliedsunternehmen und ist durch das Urheberrecht und andere Gesetze zum Schutz<br>des geistigen Eigentums geschützt. Ohne die ausdrückliche schriftliche Zustimmung der<br>Association dürfen Sie keine Inhalte der Dienste für kommerzielle Zwecke nutzen.</p><h2>Haftung</h2><p>Die Association gibt keinerlei ausdrückliche oder stillschweigende Zusicherungen oder<br>Garantien in Bezug auf den Betrieb der Dienste oder die in den Diensten enthaltenen<br>Informationen, Inhalte, Materialien oder Produkte. Die Association haftet nicht für<br>Schäden jeglicher Art, die aus der Nutzung der Dienste entstehen, einschließlich, aber<br>nicht beschränkt auf direkte, indirekte, zufällige, strafende und Folgeschäden.</p><h2>Geltendes Recht</h2><p>Diese Bedingungen und Ihre Nutzung der Dienste unterliegen den Gesetzen der<br>Schweiz und werden in Übereinstimmung mit diesen ausgelegt. Alle Streitigkeiten<br>werden vor den Gerichten in Basel in der Schweiz, entschieden.</p><h2>Änderungen der Bedingungen</h2><p>Die Association behält sich das Recht vor, diese Bedingungen jederzeit zu ändern, und<br>Sie sind dafür verantwortlich, diese Bedingungen regelmäßig auf Änderungen zu<br>überprüfen. Wenn Sie die Dienste nach einer Änderung der Bedingungen weiterhin<br>nutzen, erklären Sie sich mit den geänderten Bedingungen einverstanden.</p>",
    "about_modal_subtitle": "Über",
    "about_modal_title": "PharmaLedger",
    "about_content": "<iframe style=\"width: 100%; height: 100%; margin-bottom: 24px; border: 0\" src=\"https://pharmaledger.org\"></iframe>",
    "help_modal_title": "Hilfe",
    "help_modal_subtitle": "Häufig gestellte Fragen",
    "help_content": "<div><p><b>Was ist EPI?</b></p>" +
      "<p>EPI steht für “Elektronische Produkt-Information”. Es ist die elektronische Version des Beipackzettels, welchen Sie in der Arzneimittelpackung vorfinden." +
      "</p>" +
      "<p><b>Was ist PharmaLedger?</b>" +
      "</p>" +
      "<p>Die PharmaLedger Association (PLA) ist eine gemeinnützige Vereinigung mit Sitz in der Schweiz. Ihr Ziel ist es, durch die Bereitstellung einer Open-Source-Plattform eine vertrauenswürdige digitale Umgebung im Gesundheitswesen zu schaffen. PLA fördert die Zusammenarbeit und beschleunigt Innovation und Transformation, um im Gesundheits- und Life-Science-Bereich gemeinsame Vorteile für Patienten und andere Interessengruppen zu erzielen. PLA wurde 2022 gegründet, um die Arbeit des PharmaLedger-Projekts fortzusetzen, welches drei Jahre lang von der Europäischen Kommission und der pharmazeutischen Industrie finanziert wurde, um den Wert von Blockchain-Technologie zu belegen. Weitere Informationen sind verfügbar unter: https://pharmaledger.org/ " +
      "</p>" +
      "<p><b>Was ist ein DataMatrix Barcode?</b></p>" +
      "<p>IEs ist ein schwarz-weisses Symbol auf Ihrer Produktverpackung, welches ungefähr so aussieht:<br>" +
      "    <img src=\"./images/barcode_example.png\">" +
      "</p>" +
      "<p>" +
      "    <b>Wie verwende ich die App?</b>" +
      "</p>" +
      "<p>Befolgen Sie die Anweisungen auf der Einstiegsseite der App… sie zeigt ein Bild von dem DataMatrix Barcode auf Ihrer Verpackung. Wenn Sie den DataMatrix Barcode gefunden haben, klicken Sie auf die Schaltfläche „DataMatrix scannen“. Erlauben Sie der App, die Kamera zu verwenden, damit der DataMatrix Barcode gescannt werden kann. Fokussieren Sie die Kamera auf den DataMatrix Barcode. Sobald der Barcode erfolgreich gescannt wurde, wird Ihr elektronischer Beipackzettel angezeigt. Sie können auf die Schaltfläche „+“ klicken, um weitere Details zu erhalten." +
      "</p><p><b>Warum kann mein DataMatrix Barcode nicht erfolgreich gescannt werden?</b></p><p>" +
      "Es gibt mehrere mögliche Gründe, warum nach dem Scan des DataMatrix Barcodes kein elektronischer Beipackzettel angezeigt wird. Ein möglicher Grund ist, dass der Barcode für die Kamera unleserlich oder unscharf ist. Bitte versuchen Sie, den Barcode an einem gut beleuchteten Ort zu scannen. Vermeiden Sie, das Bild vom Barcode zu verwackeln, indem Sie Ihre Hand z.B. auf einem Tisch abstützen." +
      "</p></div>"
  },
  "fr": {
    "app_version": "Version de l’application:",
    "welcome": "Bienvenue dans Pharmaledger",
    "scan_explain": "Trouvez le DataMatrix sur votre médicament pour le scanner et afficher les informations le concernant.",
    "scan_button": "Scanner Datamatrix",
    "cancel": "Annuler",
    "change_camera": "Changer d’appareil photo",
    "scan_again": "Rescanner",
    "product_not_found_title": "Non reconnu",
    "product_not_loaded_title": "Information sur le produit indisponible",
    "error_subtitle": "",
    "product_not_found": "Ce produit est introuvable",
    "product_not_loaded": "Malheureusement, aucune information sur le produit n’a été chargée.",
    "system_busy": "Le système est occupé, veuillez réessayer plus tard.",
    "err_code": "Code d’erreur",
    "leaflet_expired_title": "Perimé",
    "leaflet_expired_message": "<p> <b>Ce médicament a été identifié comme périmé.</b> </p> ",
    "leaflet_incorrect_date_title": "",
    "leaflet_incorrect_date_subtitle": "",
    "leaflet_incorrect_date_message": "<b> </b>.",
    "select_lang_title": "Langue indisponible",
    "scan_error_title": "Erreur de Scan",
    "camera_error_message": "Une erreur s’est produite. L’accès à la caméra sélectionnée ne fonctionne pas correctement. Veuillez vérifier les paramètres de l’appareil photo ou essayez de changer d’appareil photo à partir du menu.",
    "leaflet_lang_select_message": "Nous sommes désolés, mais la notice n’est actuellement pas disponible dans votre langue. Vous pouvez choisir parmi la liste des langues disponibles.",
    "lang_proceed": "Continuer",
    "go_home": "Retour à la page d'accueil ",
    "onboarding_welcome": "Nous y sommes presque ! Veuillez lire et accepter les termes et conditions",
    "disagree": "Refuser",
    "agree": "Accepter",
    "disagree_extra_text": "\"PharmaLedger\" ne fonctionnera pas tant que vous n'aurez pas accepté les termes et conditions. Veuillez lire les termes et conditions.",
    "fwd_privacy": "Politique de confidentialité",
    "fwd_terms": "Termes et conditions",
    "fwd_help": "Aide",
    "fwd_about": "À propos",
    "privacy_modal_title": "Politique de confidentialité",
    "privacy_modal_subtitle": "Nos principes de confidentialité et de sécurité",
    "privacy_content": "<h2>Privacy Notice</h2><p>Cet avis de confidentialité s’applique à l’utilisation du produit d’Information Électronique sur les Produits de la PharmaLedger Association.</p><h2>Contacts</h2><p><b>a) Identité et coordonnées du responsable ou des co-responsables du traitement</b></p><p>Le responsable du traitement de vos données est l’association PharmaLedger.</p><p><b>b) Contacts du délégué à la protection des données</b></p><p>Le bureau de protection des données de PharmaLedger Association est joignable à <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a>&nbsp;</p><h2>Quelles données personnelles nous utilisons</h2><p>Nous collectons uniquement les données techniques nécessaires à la livraison de votre dépliant électronique. Cela inclut votre adresse IP et les identifiants techniques de l’appareil et du navigateur que vous utilisez pour accéder à notre application.</p><p>En détail, nous collectons les éléments de données suivants</p><ul><li><p><em>Accès aux appareils mobiles</em>. Nous pouvons demander l’accès ou l’autorisation à certaines fonctionnalités de votre appareil mobile, y compris l’appareil photo de votre appareil mobile et d’autres fonctionnalités. Si vous souhaitez modifier notre accès ou nos autorisations, vous pouvez le faire dans les paramètres de votre appareil.</p></li><li><p><em>Données des appareils mobiles</em>. Nous recueillons automatiquement des informations sur l’appareil (telles que l’ID, le modèle et le fabricant de votre appareil mobile), le système d’exploitation, les informations de version et les informations de configuration du système, les numéros d’identification de l’appareil et de l’application, le type et la version du navigateur, le modèle de matériel du fournisseur de services Internet et/ou de l’opérateur mobile et l’adresse IP (Internet Protocol) (ou le serveur proxy). Si vous utilisez nos applications, nous pouvons également collecter des informations sur le réseau téléphonique associé à votre appareil mobile, le système d’exploitation ou la plate-forme de votre appareil mobile, le type d’appareil mobile que vous utilisez, l’identifiant unique de votre appareil mobile et des informations sur les fonctionnalités de nos applications auxquelles vous avez accédé.</p></li></ul><h2>Pourquoi nous collectons vos données personnelles</h2><p><b>Objectifs</b></p><p>Nous collectons vos données techniques dans le but de vous fournir une notice électronique de produit pour votre médicament.</p><p>A ce titre, nous pouvons nous appuyer sur les bases légales suivantes pour traiter vos informations personnelles :</p><ol><li><p><b>Exécution d’un contrat</b>. Nous pouvons traiter vos informations personnelles lorsque nous pensons que cela est nécessaire pour remplir des obligations contractuelles envers vous, y compris la fourniture de nos Services ou à votre demande avant de conclure un contrat avec vous.</p></li><li><p><b>Obligations légales</b>. Nous pouvons traiter vos informations lorsque nous pensons que cela est nécessaire pour nous conformer à nos obligations légales, par exemple pour remplir nos obligations en vertu de la réglementation sur les soins de santé et de la législation sur la santé publique.</p></li></ol><h2>Avec qui nous partageons vos données personnelles</h2><p>Sociétés membres et fournisseurs de services tiers.</p><p>Nous partageons vos données avec des fournisseurs tiers, des prestataires de services, des sous-traitants ou des agents (« tiers ») qui fournissent des services pour nous ou en notre nom et qui ont besoin d’accéder à ces informations pour effectuer ce travail. Nous avons des contrats en place avec nos tiers, qui sont conçus pour aider à protéger vos informations personnelles. Cela implique qu’ils ne peuvent rien faire avec vos informations personnelles à moins que nous ne leur ayons demandé de le faire. Ils ne partageront pas non plus vos informations personnelles avec une organisation autre que nous. Ils s’engagent également à protéger les données qu’ils détiennent en notre nom et à les conserver pendant la durée que nous leur demandons. Les catégories de tiers avec lesquels nous pouvons partager des informations personnelles sont les suivantes :</p><ul><li><p>Fabricants de médicaments (sociétés membres)</p></li><li><p>Prestataires de services techniques</p></li></ul><h2>Combien de temps conservons-nous vos données personnelles</h2><p>PharmaLedger Association ne garde vos données techniques que le temps nécessaire pour traiter votre demande de notice jusqu’à 30 jours.</p><p>Votre fabricant de médicaments gardera également vos données pendant une période définie, déterminée par leurs politiques de conservation des données. Pour plus d’informations, veuillez contacter votre fabricant de médicaments</p><h2>Si vous ne nous fournissez pas vos données personnelles</h2><p>Si vous choisissez de ne pas nous fournir vos données techniques, nous ne pourrons pas répondre à votre demande.</p><h2>Vos droits</h2><p>Si vous avez des demandes liées à vos données personnelles dans le cadre du RGPD, telles qu’une demande d’accès ou de suppression de vos données, vous pouvez nous contacter à <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a>&nbsp;</p><p>Nous traiterons ces demandes dans les 30 jours</p><h2>Retrait du consentement</h2><p>Si vous avez des demandes liées à vos données personnelles dans le cadre du RGPD, telles qu’une demande d’accès ou de suppression de vos données, vous pouvez nous contacter à <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a></p><p>Nous traiterons ces demandes dans les 30 jours&nbsp;</p><h2>Prise de décision automatisée</h2><p>Nous n’utilisons aucune prise de décision automatisée pour vous fournir ce service.</p><h2>Transfert international de données personnelles</h2><p>Lorsque votre fabricant de médicaments nous demande de transférer vos données en dehors de l’Union européenne, nous utilisons des clauses contractuelles types pour protéger vos données.</p><h2>Comment faire une réclamation</h2><p>Si vous avez des demandes liées à vos données personnelles dans le cadre du RGPD, telles qu’une demande d’accès ou de suppression de vos données, vous pouvez nous contacter à <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a>&nbsp;</p><p>Nous traiterons ces demandes dans les 30 jours. De plus, vous pouvez contacter votre autorité de contrôle locale si vous estimez que vos droits ne sont pas respectés.</p>",
    "terms_modal_title": "Termes et Conditions",
    "terms_modal_subtitle": "Les termes et conditions qui s'appliquent lors de l'utilisation de l'application PharmaLedger",
    "terms_content": "<h2>Termes et Conditions du Site Internet et de l’Application de Produit Electronique d’Information de l’Association PharmaLedger</h2><p>En accédant ou en utilisant le site internet ou l’application de Produit Electronique d’Information de l’Association PharmaLedger (les « Services »), vous acceptez d’être lié par ces termes et conditions (les « Termes »). Vous ne pouvez pas accéder ou utiliser les Services si vous n’acceptez pas ces Termes. Les Services sont opérés par l’Association PharmaLedger (l’’Association ») et sont prévus pour être utilisés par des individus cherchant des informations au sujet de leur médicament. Un réseau multi-parties livre les Services, et votre fabricant de dogue fournit les informations produit affichées par les Services. L’Association agit comme contrôleur de données pour ces informations.</p><h2>Utilisation des Services</h2><p>Vous acceptez d’utiliser les Services seulement dans un but légal, et d’une manière qui n’enfreint pas aux droits de, ni ne restreint ou contraint l’utilisation et l’appréciation des Services par tout tiers. De telles restrictions ou contrainte comprennent, sans limitation, une conduite qui est illégale, ou qui puisse harceler ou causer de la détresse ou une gêne à toute personne, et la transmission de contenu obscène ou offensif ou la perturbation du flux normal de dialogue au sein des Services.</p><h2>Propriété Intellectuelle</h2><p>Le contenu des Services, incluant mais non limités au texte, aux graphismes, aux images, et au logiciel, est la propriété de l’Association ou de ses concédants et sociétés membre et est protégé par les droits d’auteur et autres lois sur la propriété intellectuelle. Vous ne pouvez pas utiliser le contenu des Services dans un but commercial sans le consentement formel par écrit de l’Association</p><h2>Responsabilité</h2><p>L’Association ne fait aucune représentation ou garantie de quelque type qu’il soit, formelle ou sous-entendue, concernant son opération des Services ou des informations, contenus, matériaux, ou produits inclus dans les Services. L’Association ne sera pas responsable pour les dommages quels qu’ils soient faisant suite à l’utilisation des Services, comprenant mais non limité aux dommages directs, indirects, incidentels, punitifs ou conséquentiels</p><h2>Loi Gouvernante</h2><p>Ces Termes et votre utilisation des Services seront gouvernés par et interprétés conformément aux lois de Suisse et toute réclamation sera résolue dans les Tribunaux de Bâle, Suisse.</p><h2>Modifications des Termes</h2><p>L’Association se réserve le droit de modifier ces Termes à tout moment, et vous êtes responsable de vérifier ces Termes périodiquement pour tout changement. Votre utilisation continue des Services après toute modification des Termes constituera votre acceptation des Termes révisés</p>",
    "about_modal_subtitle": "À propos",
    "about_modal_title": "Pharmaledger",
    "about_content": "<iframe style=\"width: 100%; height: 100%; margin-bottom: 24px; border: 0\" src=\"https://pharmaledger.org\"></iframe>",
    "help_modal_title": "Aide",
    "help_modal_subtitle": "QFP",
    "help_content": "<div><p><b>Qu’est-ce que EPI?</b></p>" +
      "<p>" +
      "    <b>EPI</b>  est une abréviation <b>d’Information électronique sur le Produit.</b> Il s'agit d'une version électronique de l’information sur le produit en papier que vous trouverez généralement à l'intérieur de l’emballage d’un produit pharmaceutique. Dans certains cas <b>l’EPI</b> peut avoir remplacé la notice papier." +
      "</p>" +
      "<p>" +
      "    <b>Qu'est-ce que PharmaLedger?</b>" +
      "</p>" +
      "<p>L'Association PharmaLedger (PLA) est une association à but non lucratif basée en Suisse, dont l'objectif est de permettre et de favoriser un écosystème Numérique de Confiance dans le domaine des soins de santé par le biais d'une plateforme open-source standardisée et fiable. PLA encourage la collaboration et accélère l'innovation et l'adoption pour obtenir des avantages mutuels dans les domaines de la santé et des sciences de la vie pour les patients et les autres parties prenantes. PLA a été créé en 2022 pour poursuivre le travail du projet PharmaLedger, un projet de 3 ans financé par la Commission Européenne et l'industrie pharmaceutique visant à prouver la valeur des solutions blockchain. De plus amples informations sont disponibles sur le site https://pharmaledger.org/." +
      "</p>" +
      "<p><b>Qu'est-ce que le DataMatrix?</b></p>" +
      "<p>Il s’agit d’un type de barre-code figurant sur l’emballage de votre produit. C’est un code-barre noir et blanc de forme carrée qui ressemble à ceci:<br>" +
      "    <img src=\"./images/barcode_example.png\">" +
      "</p>" +
      "<p>" +
      "    <b>Comment utiliser l'application?</b>" +
      "</p>" +
      "<p>" +
      "    Suivez les instructions sur la page d’accueil de <b>l’application…</b> Elle montre une image où trouver le" +
      "    <b>DataMatrix</b> sur l’emballage de votre produit. Une fois que vous avez trouvé le <b>DataMatrix</b>, cliquez sur le bouton «Scanner <b>DataMatrix</b>». Autorisez à l'application d'utiliser l'appareil photo afin que le <b>DataMatrix</b> puisse être scannée. Utilisez l'appareil photo pour faire la mise au point sur le <b>DataMatrix</b>. Une fois le paquet scanné avec succès, <b>l'EPI</b> s'affiche.  Vous pouvez cliquer sur le bouton '+' pour obtenir plus de détails." +
      "</p><p><b>Pourquoi mon scan de DataMatrix ne donne-t-il pas de résultat?</b></p><p>" +
      "    Il y a plusieurs raisons pour lesquelles le <b>DataMatrix</b>  peut ne pas donner d’EPI. L’une de ces raisons peut être la mise au point de l’appareil photo. Essayer de scanner le code dans un endroit bien éclairé et le code doit être clairement visible à l’écran. Si vous avez du mal à garder votre main stable, vous pouvez vous servir d’une table pour la soutenir." +
      "</p></div>"
  },
  "nl": {
    "app_version": "App versie",
    "welcome": "Welkom bij PharmaLedger",
    "scan_explain": "Zoek de DataMatrix code op uw geneesmiddel om informatie te scannen en te bekijken",
    "scan_button": "DataMatrix code scannen",
    "cancel": "Annuleren",
    "change_camera": "Camera wijzigen",
    "scan_again": "Scan opnieuw",
    "product_not_found_title": "Onherkenbaar",
    "product_not_loaded_title": "Product informatie niet beschikbaar",
    "error_subtitle": "",
    "product_not_found": "Product niet gevonden",
    "product_not_loaded": "Helaas, er is geen productinformatie beschikbaar",
    "system_busy": "Systeem is bezet, probeer het later nog eens.",
    "err_code": "Foutmelding",
    "leaflet_expired_title": "Vervallen",
    "leaflet_expired_message": "<p> <b>Dit product is geïdentificeerd als vervallen (over datum).</b> </p> ",
    "leaflet_incorrect_date_title": "",
    "leaflet_incorrect_date_subtitle": "",
    "leaflet_incorrect_date_message": "<b> </b>.",
    "select_lang_title": "Taal niet beschikbaar",
    "scan_error_title": "Fout in scannen",
    "camera_error_message": "Er is iets fout gegaan en de geselecteerde camera kan niet juist worden geopend. Controleer de camera instellingen van uw toestel of probeer de camera in het menu aan te passen.",
    "leaflet_lang_select_message": "Sorry, maar er is geen bijsluiter voor de door jouw gekozen taal. Je hebt de keuze voor andere beschikbare talen in de lijst.",
    "lang_proceed": "Ga verder",
    "go_home": "Ga terug naar Home",
    "onboarding_welcome": "Je bent er bijna ! Lees en geef je akkoord met de algemene voorwaarden",
    "disagree": "Niet akkoord",
    "agree": "Akkoord",
    "disagree_extra_text": "De \"PharmaLedger\" App zal niet werken zonder je akkoord met de algemene voorwaarden. Lees de algemene voorwaarden",
    "fwd_privacy": "Privacybeleid",
    "fwd_terms": "Algemene voorwaarden",
    "fwd_help": "Help",
    "fwd_about": "Over",
    "privacy_modal_title": "Privacybeleid",
    "privacy_modal_subtitle": "Ons Privacy- en veiligheidsbeleid",
    "privacy_content": "<h1><b>Privacy Notice</b></h1><p>Deze privacyverklaring is van toepassing op het gebruik van het product PharmaLedger Association Electronic Product Information.</p><h2>Contactpersonen</h2><p><b>a) Identiteit en contacten van de verantwoordelijke voor de verwerking of gezamenlijke verantwoordelijken</b></p><p>De verantwoordelijke voor de verwerking van uw gegevens is de PharmaLedger Association.</p><p><b>b) Contacten van de functionaris voor gegevensbescherming</b></p><p>De gegevensbeschermingsdienst van PharmaLedger Association is bereikbaar op <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a>&nbsp;</p><h2>Welke persoonlijke gegevens we gebruiken</h2><p>Wij verzamelen alleen de technische gegevens die nodig zijn om uw elektronische folder te bezorgen. Dit omvat uw IP-adres en technische identificatiegegevens van het apparaat en de browser die u gebruikt om toegang te krijgen tot onze applicatie.</p><p><em>In detail verzamelen wij de volgende gegevens</em></p><ul><li><p>Toegang tot mobiele apparaten. Wij kunnen toegang of toestemming vragen voor bepaalde functies van uw mobiele apparaat, waaronder de camera van uw mobiele apparaat en andere functies. Als u onze toegang of toestemming wilt wijzigen, kunt u dit doen in de instellingen van uw apparaat.</p></li></ul><ul><li><p>Mobiele apparaatgegevens. Wij verzamelen automatisch apparaatgegevens (zoals uw mobiele apparaat ID, model en fabrikant), besturingssysteem, versiegegevens, systeemconfiguratiegegevens, apparaat- en applicatieidentificatienummers, browsertype en -versie, hardwaremodel Internet service provider, en/of mobiele provider, en Internet Protocol (IP) adres (of proxy server). Als u onze applicatie(s) gebruikt, kunnen wij ook informatie verzamelen over het telefoonnetwerk dat aan uw mobiele apparaat is gekoppeld, het besturingssysteem of platform van uw mobiele apparaat, het type mobiel apparaat dat u gebruikt, de unieke apparaat-ID van uw mobiele apparaat en informatie over de functies van onze applicatie(s) die u hebt geopend.</p></li></ul><h2>Waarom wij uw persoonsgegevens verzamelen</h2><p><b>Doeleinden</b></p><p>Wij verzamelen uw technische gegevens om u een elektronische productbijsluiter voor uw medicatie te verstrekken.</p><p>Als zodanig kunnen wij ons beroepen op de volgende rechtsgronden om uw persoonsgegevens te verwerken:</p><ul><li><p>Uitvoering van een contract. Wij kunnen uw persoonsgegevens verwerken wanneer wij van mening zijn dat dit noodzakelijk is om contractuele verplichtingen jegens u na te komen, waaronder het leveren van onze Diensten of op uw verzoek voorafgaand aan het aangaan van een contract met u.</p></li></ul><ul><li><p>Wettelijke verplichtingen. Wij kunnen uw gegevens verwerken wanneer wij van mening zijn dat dit noodzakelijk is om te voldoen aan onze wettelijke verplichtingen, zoals het nakomen van onze verplichtingen in het kader van regelgeving op het gebied van gezondheidszorg en wetgeving inzake volksgezondheid.</p></li></ul><h2>Met wie wij uw persoonlijke gegevens delen</h2><p>Ledenbedrijven en derden-dienstverleners.</p><p>Wij delen uw gegevens met derden verkopers, dienstverleners, aannemers of agenten (\"derden\") die diensten voor ons of namens ons uitvoeren en toegang tot dergelijke informatie nodig hebben om dat werk te doen. Wij hebben contracten afgesloten met onze derden, die bedoeld zijn om uw persoonsgegevens te helpen beschermen. Dit betekent dat zij niets met uw persoonsgegevens kunnen doen, tenzij wij hen daartoe opdracht hebben gegeven. Zij zullen uw persoonsgegevens ook niet delen met andere organisaties dan wij. Zij verbinden zich er ook toe de gegevens die zij namens ons bewaren te beschermen en te bewaren gedurende de periode die wij hen opdragen. De categorieën van derden waarmee wij persoonsgegevens kunnen delen zijn de volgende:</p><ul><li><p>Fabrikanten van geneesmiddelen (lidbedrijven)</p></li></ul><ul><li><p>Technische dienstverleners</p></li></ul><h2>Hoe lang we uw persoonlijke gegevens bewaren</h2><p>De PharmaLedger Association bewaart uw technische gegevens alleen zo lang als nodig is om uw bijsluiter aanvraag te verwerken tot 30 dagen.</p><p>Uw geneesmiddelenfabrikant bewaart uw gegevens ook gedurende een bepaalde periode zoals bepaald door hun beleid inzake gegevensbewaring, neem voor meer informatie over deze bewaring contact op met uw geneesmiddelenfabrikant.</p><h2>Als u ons uw persoonlijke gegevens niet verstrekt</h2><p>Als u ervoor kiest ons uw technische gegevens niet te verstrekken, kunnen wij niet aan uw folderverzoek voldoen.</p><h2>Uw rechten</h2><p>Als u verzoeken hebt met betrekking tot uw persoonlijke gegevens onder de GDPR, zoals een verzoek om toegang tot of verwijdering van uw gegevens, kunt u contact met ons opnemen via <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a>&nbsp;</p><p>Wij zullen dergelijke verzoeken binnen 30 dagen behandelen</p><h2>Intrekking van toestemming</h2><p>Als u verzoeken hebt met betrekking tot uw persoonlijke gegevens onder de GDPR, zoals een verzoek om toegang tot of verwijdering van uw gegevens, kunt u contact met ons opnemen via&nbsp;<a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a>&nbsp;</p><p>Wij zullen dergelijke verzoeken binnen 30 dagen behandelen</p><h2>Geautomatiseerde besluitvorming</h2><p>Wij maken geen gebruik van geautomatiseerde besluitvorming bij het verlenen van deze dienst aan u.</p><h2>Internationale overdracht van persoonsgegevens</h2><p>Wanneer uw geneesmiddelenfabrikant vereist dat wij uw gegevens buiten de Europese Unie overdragen, maken wij gebruik van standaardcontractbepalingen om uw gegevens te beschermen</p><h2>Hoe een klacht in te dienen</h2><p>Als u verzoeken hebt met betrekking tot uw persoonsgegevens onder de GDPR, zoals een verzoek om toegang tot of verwijdering van uw gegevens, kunt u contact met ons opnemen via <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a>&nbsp;</p><p>Wij zullen dergelijke verzoeken binnen 30 dagen behandelen. Daarnaast kunt u contact opnemen met uw lokale toezichthoudende autoriteit als u vindt dat uw rechten niet worden voldaan.</p>",
    "terms_modal_title": "Algemene voorwaarden",
    "terms_modal_subtitle": "De voorwaarden die van toepassing zijn bij het gebruik van de PharmaLedger Applicatie",
    "terms_content": "<h2>Gebruiksvoorwaarden voor de Pharmaledger Association’s Elektronische Product Informatie Website en Applicatie</h2><p>Door de PharmaLedger Association’s Elektronische Product Informatie website en applicatie (de “Diensten”) te bezoeken en te gebruiken, stemt u ermee in om gebonden te zijn aan deze gebruiksvoorwaarden (de “Voorwaarden”). U mag de Diensten niet bezoeken of gebruiken als u niet met deze Voorwaarden instemt. De Diensten worden beheerd door de PharmaLedger Association (de “Associatie”) en zijn bedoeld voor gebruik door individuen die op zoek zijn naar informatie over hun medicatie. Een meerpartijennetwerk levert de Diensten, en uw medicatiefabrikant voorziet de productinformatie getoond op de Diensten. De Associatie treedt op als de gegevensbeheerder van deze informatie.</p><h2>Gebruik van de Diensten</h2><p>U stemt ermee in om de Diensten enkel te gebruiken voor wettelijke doeleinden, en op een manier die geen inbreuk doet op de rechten van, of het gebruik en genot van de Diensten door enige andere derde partij beperkt of belemmert. Zulke beperking of belemmering omvat, zonder limitatie, gedrag dat onwettelijk is of dat intimiderend kan zijn of leed of ongemak kan veroorzaken aan enig welke persoon, alsook de transmissie van obscene of beledigende inhoud of storing van het normale verloop van dialoog binnen de Diensten</p><h2>Intellectuele Eigendom</h2><p>De inhoud van de Diensten, inclusief, maar niet beperkt tot, tekst, afbeeldingen en software, is het eigendom van de Associatie of haar licentieverstrekkers en deelnemende bedrijven en is beschermd door het auteursrecht en andere wetten in verband met intellectueel eigendom. U mag geen enkele inhoud van de Diensten gebruiken voor commerciële doeleinden zonder de expliciete geschreven toestemming van de Associatie.</p><h2>Aansprakelijkheid</h2><p>De Associatie biedt geen representaties of garanties van welke aard dan ook, expliciet of geïmpliceerd, voor de werking van de Diensten of de informatie, inhoud, materialen of producten die in de Diensten omvat zijn. De Associatie zal niet aansprakelijk zijn voor schade van welke aard dan ook die resulteren uit het gebruik van de Diensten, inclusief, maar niet beperkt tot, rechtstreekse, onrechtstreekse, incidentele, punitieve en voortvloeiende schade.</p><h2>Geldend Recht</h2><p>Deze Voorwaarden en uw gebruik van de Diensten vallen onder en zullen geïnterpreteerd worden door de wetten van Zwitserland en enige disputen zullen opgelost worden in de rechtbanken van Bazel, Zwitserland</p><h2>Aanpassingen van de Voorwaarden</h2><p>De Associatie behoudt zich het recht voor om deze Voorwaarden op ieder moment aan te passen, en u bent verantwoordelijk voor het periodisch nakijken van deze Voorwaarden op enige aanpassingen. Uw doorgaand gebruik van de Diensten nadat de Voorwaarden aangepast werden zal betekenen dat u de herziene Voorwaarden aanvaardt</p>",
    "about_modal_subtitle": "Over",
    "about_modal_title": "Pharmaledger",
    "about_content": "<iframe style=\"width: 100%; height: 100%; margin-bottom: 24px; border: 0\" src=\"https://pharmaledger.org\"></iframe>",
    "help_modal_title": "Help",
    "help_modal_subtitle": "FAQ’s",
    "help_content": "<div><p><b>Wat is EPI?</b></p>" +
      "<p>" +
      "EPI is een afkorting voor Elektronische Product Informatie. Het is een elektronische versie van de papieren productinformatiefolder of bijsluiter die u meestal in een farmaceutische product verpakking vindt. In sommige gevallen kan het EPI de papieren bijsluiter vervangen." +
      "</p>" +
      "<p>" +
      "    <b>Wat is PharmaLedger?</b>" +
      "</p>" +
      "<p>De PharmaLedger Association (PLA)is een vereniging zonder winstoogmerk, gevestigd in Zwitserland, met als doel een digitaal vertrouwd ecosysteem in de gezondheidszorg mogelijk te maken en te bevorderen via een gestandaardiseerd en vertrouwd open-source platform. PLA bevordert de samenwerking en versnelt de innovatie en adoptie om wederzijdse voordelen te halen in de gezondheidszorg voor patiënten en andere belanghebbenden. PLA werd in 2022 opgericht om het werk van het PharmaLedger-project voort te zetten, wat een 3-jarig project was gefinancierd door de Europese Commissie en de farmaceutische industrie om de voordelen van blockchain oplossingen aan te tonen. Meer informatie is beschikbaar op https://pharmaledger.org/" +
      "</p>" +
      "<p><b>Wat is een DataMatrix?</b></p>" +
      "<p>Het is een soort streepjescode op uw productverpakking. Het is een zwart-wit vierkant met streepjes in en ziet er ongeveer zo uit:<br>" +
      "    <img src=\"./images/barcode_example.png\">" +
      "</p>" +
      "<p>" +
      "    <b>Hoe gebruik je de App?</b>" +
      "</p>" +
      "<p>" +
      "Volg de instructies op de landingspagina van de App…het toont een afbeelding van waar u de DataMatrix op uw productpakket kunt vinden. Zodra u de DataMatrix hebt gevonden, klikt u op de knop “Scan DataMatrix”. Laat de applicatie de camera gebruiken zodat de DataMatrix kan worden gescand. Gebruik de camera om scherp te stellen op de DataMatrix. Zodra het product met succes is gescand, wordt de EPI weergegeven. U kunt op de knop ‘+’ klikken voor meer informatie." +
      "</p><p><b>Waarom geeft mijn DataMatrix scan geen resultaat?</b></p><p>" +
      "Er zijn verschillende redenen waarom de DataMatrix op uw verpakking mogelijk geen EPI geeft.Eén van de redenen zou de focus van de camera kunnen zijn. Probeer de code op een goed verlichte plaats te scannen en zorg ervoor dat dat de code duidelijk zichtbaar is op het scherm. Als u moeite heeft om uw hand stabiel te houden, kunt u proberen een tafel te gebruiken om uw handen te ondersteunen." +
      "</p></div>"
  },
  "ar": {
    "app_version": "نسخة التطبيق: ",
    "welcome": "مرحباً بك في فارما ليدجر",
    "scan_explain": "ابحث عن شفرة الباركود DataMatrix على دوائك للمسح وعرض المعلومات",
    "scan_button": "مسح DataMatrix",
    "cancel": "إلغاء",
    "change_camera": "تغيير الكاميرا",
    "scan_again": "المسح مجدداً",
    "product_not_found_title": "غير معروف",
    "product_not_loaded_title": "معلومات المنتج غير متاحة",
    "error_subtitle": "منتج غير موثوق",
    "product_not_found": "لا يمكن العثور على هذا المنتج",
    "product_not_loaded": "للأسف، لا توجد معلومات عن المنتج المطلوب",
    "system_busy": "النظام مشغول، يرجى المحاولة مرة أخرى لاحقًا.",
    "err_code": "كود الخطأ",
    "leaflet_expired_title": "منتهي الصلاحية",
    "leaflet_expired_message": "<p> <b>تم التعرف على هذا المنتج كمنتهي الصلاحية.</b> </p> ",
    "leaflet_incorrect_date_title": "تاريخ خاطئ",
    "leaflet_incorrect_date_subtitle": "تاريخ المسح غير صحيح",
    "leaflet_incorrect_date_message": "<b> تاريخ هذا المنتج غير صحيح</b>.",
    "select_lang_title": "اللغة غير متاحة",
    "scan_error_title": "خطأ في المسح",
    "camera_error_message": "حدث خطأ ما ولا يمكن الوصول إلى الكاميرا المحددة بشكل صحيح. يرجى التحقق من إعدادات كاميرا الجهاز أو محاولة تغيير الكاميرا من القائمة",
    "leaflet_lang_select_message": "الكتيب غير متاح باللغة التي تفضلها. يمكنك الاختيار من القائمة المتاحة للغات",
    "lang_proceed": "المتابعة",
    "go_home": "الرجوع إلى الصفحة الرئيسية",
    "onboarding_welcome": "قريباً جداً! <br> الرجاء قراءة الشروط والأحكام والموافقة عليها",
    "disagree": "غير موافق",
    "agree": "موافق",
    "disagree_extra_text": "لن يعمل تطبيق PharmaLedger حتى توافق على الشروط والأحكام. يرجى قراءة الشروط والأحكام.",
    "fwd_privacy": "سياسة الخصوصية",
    "fwd_terms": "الشروط والأحكام",
    "fwd_help": "المساعدة",
    "fwd_about": "نبذة عنا",
    "privacy_modal_title": "سياسة الخصوصية",
    "privacy_modal_subtitle": "مبادئ الخصوصية والأمان الخاصة بنا",
    "privacy_content": "<h1> <b> إشعار الخصوصية </b> </h1> <p> ينطبق إشعار الخصوصية هذا على استخدام منتج معلومات المنتج الإلكترونية لشركة PharmaLedger Association. </p> <h2> جهات الاتصال </h2> <p> <b> أ) الهوية وجهات الاتصال الخاصة بوحدة التحكم أو وحدات التحكم المشتركة </b> </p> <p> وحدة التحكم في بياناتك هي PharmaLedger Association. </p> <p> <b> ب) جهات الاتصال من مسؤول حماية البيانات </b> </p> <p> يمكن الاتصال بمكتب حماية البيانات لجمعية PharmaLedger على <a href=\"mailto:dpo@pharmaledger.org\"> dpo@pharmaledger.org </a> </p> <h2> ما البيانات الشخصية التي نستخدمها </h2> <p> نحن نجمع فقط البيانات الفنية المطلوبة لتسليم المنشور الإلكتروني الخاص بك. وهذا يشمل عنوان IP الخاص بك والمعرفات الفنية للجهاز والمتصفح الذي تستخدمه للوصول تطبيقنا. </p> <p> <em> بالتفصيل ، نجمع عناصر البيانات التالية </em> </p> <ul> <li> <p> <em> الوصول إلى الجهاز المحمول. </em> قد نطلب الوصول أو الإذن إلى ميزات معينة من جهازك المحمول ، بما في ذلك كاميرا جهازك المحمول ، وميزات أخرى. إذا كنت ترغب في تغيير وصولنا أو أذوناتنا ، فيمكنك القيام بذلك في إعدادات جهازك. </p> </li> <li> <p> <em> بيانات الجهاز المحمول. </em> نقوم تلقائيًا بجمع معلومات الجهاز ( مثل معرّف جهازك المحمول والطراز والشركة المصنعة) ونظام التشغيل ومعلومات الإصدار ومعلومات تكوين النظام وأرقام تعريف الجهاز والتطبيق ونوع المتصفح وإصداره ومزود خدمة الإنترنت و / أو شركة الجوال لطراز الجهاز وبروتوكول الإنترنت (IP) ) العنوان (أو الخادم الوكيل). إذا كنت تستخدم تطبيقنا (تطبيقاتنا) ، فقد نقوم أيضًا بجمع معلومات حول شبكة الهاتف المرتبطة بجهازك المحمول ، ونظام تشغيل جهازك المحمول أو النظام الأساسي له ، ونوع الجهاز المحمول الذي تستخدمه ، ومعرف الجهاز الفريد الخاص بجهازك المحمول ، والمعلومات حول ميزات تطبيقنا (تطبيقاتنا) التي قمت بالوصول إليها. </p> </li> </ul> <h2> لماذا نجمع بياناتك الشخصية </h2> <p> <b> الأغراض </b> </p> <p> نجمع بياناتك الفنية بغرض تزويدك بنشرة إلكترونية عن المنتج لدوائك. </p> <p> على هذا النحو ، قد نعتمد على الأسس القانونية التالية لمعالجة معلوماتك الشخصية: </p> <ul> <li> <p> <b> أداء العقد. </b> نحن قد تعالج معلوماتك الشخصية عندما نعتقد أنه من الضروري الوفاء بالالتزامات التعاقدية تجاهك ، بما في ذلك تقديم خدماتنا أو بناءً على طلبك قبل الدخول في عقد معك. </p> </li> <li> <p> < ب> الالتزامات القانونية. </b> قد نعالج معلوماتك عندما نعتقد أنها ضرورية للامتثال لالتزاماتنا القانونية ، مثل الوفاء بالتزاماتنا بموجب لوائح الرعاية الصحية وتشريعات الصحة العامة. </p> </li> </ul> <h2> مع من نشارك بياناتك الشخصية </h2> <p> الشركات الأعضاء ومقدمي الخدمات من الأطراف الثالثة. </p> <p> نشارك بياناتك مع البائعين الخارجيين ومقدمي الخدمات والمقاولين ، أو الوكلاء (,الأطراف الثالثة) الذين يؤدون خدمات لنا أو بالنيابة عنا ويطلبون الوصول إلى هذه المعلومات للقيام بهذا العمل. لدينا عقود سارية مع أطراف أخرى ، وهي مصممة للمساعدة في حماية معلوماتك الشخصية. هذا يعني أنه لا يمكنهم فعل أي شيء بمعلوماتك الشخصية ما لم نطلب منهم القيام بذلك. كما أنهم لن يشاركوا معلوماتك الشخصية مع أي منظمة غيرنا. يلتزمون أيضًا بحماية البيانات التي يحتفظون بها نيابة عنا والاحتفاظ بها للفترة التي نصدر تعليمات بها. فئات الجهات الخارجية التي قد نشارك المعلومات الشخصية معها هي كما يلي: </p> <ul> <li> <p> الشركات المصنعة للأدوية (الشركات الأعضاء) </p> </li> <li> <p> الخدمة الفنية الموفرون </p> </li> </ul> <h2> المدة التي نخزن فيها بياناتك الشخصية </h2> <p> تقوم جمعية PharmaLedger بتخزين بياناتك الفنية فقط طالما كان ذلك ضروريًا لمعالجة طلب المنشور الخاص بك إلى 30 يومًا. </p> <p> ستخزن الشركة المصنعة للأدوية أيضًا بياناتك لفترة زمنية محددة وفقًا لما تحدده سياسات الاحتفاظ بالبيانات الخاصة بها ، لمزيد من المعلومات حول هذا الاستبقاء ، يرجى الاتصال بالشركة المصنعة للأدوية. </p> <h2 > إذا لم تقدم لنا بياناتك الشخصية </h2> <p> إذا اخترت عدم تقديم بياناتك الفنية إلينا ، فلن نتمكن من تلبية طلب المنشور الخاص بك. </p> <h2> حقوقك </h2> <p> إذا كان لديك أي طلبات تتعلق ببياناتك الشخصية بموجب اللائحة العامة لحماية البيانات ، مثل طلب الوصول إلى بياناتك أو حذفها ، فيمكنك الاتصال بنا على <a href = mailto: dpo@pharmaledger.org > dpo@pharmaledger.org </a>. </p> <p> سنعالج هذه الطلبات في غضون 30 يومًا </p> <h2> سحب الموافقة </h2> <p> إذا كان لديك أي طلبات تتعلق بياناتك الشخصية بموجب اللائحة العامة لحماية البيانات ، مثل طلب الوصول إلى بياناتك أو حذفها ، يمكنك الاتصال بنا على <a href=\"mailto:dpo@pharmaledger.org\"> dpo@pharmaledger.org </a>. </p> <p> سنعالج مثل هذه الطلبات في غضون 30 يومًا </p> <h2> اتخاذ القرار الآلي </h2> <p> نحن لا نستخدم أي عملية صنع قرار مؤتمتة في توفير هذه الخدمة لك. </p> <h2> النقل الدولي للبيانات الشخصية </h2> <p> حيث تطلب منا الشركة المصنعة للأدوية نقل بياناتك",
    "terms_modal_title": "الشروط والأحكام",
    "terms_modal_subtitle": "الشروط والأحكام التي تنطبق عند استخدام تطبيق PharmaLedger",
    "terms_content": "<h2> الشروط والأحكام الخاصة بموقع وتطبيق معلومات المنتج الإلكترونية لجمعية PharmaLedger </h2> <p> من خلال الوصول إلى موقع ويب معلومات المنتج الإلكترونية والتطبيق الخاص برابطة PharmaLedger ( \" الخدمات ) ، أنت توافق على الالتزام بهذه الشروط والأحكام ( \"الشروط \"). لا يجوز لك الوصول إلى الخدمات أو استخدامها إذا كنت لا توافق على هذه الشروط. يتم تشغيل الخدمات بواسطة PharmaLedger Association (the \"Association \" وهي مخصصة للاستخدام من قبل الأفراد الذين يسعون للحصول على معلومات حول أدويتهم. توفر شبكة متعددة الأطراف الخدمات ، وتوفر الشركة المصنعة للأدوية معلومات المنتج المعروضة من خلال الخدمات. تعمل الجمعية كمراقب بيانات لـ هذه المعلومات. </p> <h2> استخدام الخدمات </h2> <p> أنت توافق على استخدام الخدمات للأغراض المشروعة فقط وبطريقة لا تنتهك حقوق ، أو تقييد أو منع استخدام الخدمات والتمتع بها من قبل أي طرف ثالث. يتضمن هذا التقييد أو المنع ، على سبيل المثال لا الحصر ، السلوك غير القانوني ، أو الذي قد يضايق أو يسبب ضائقة أو إزعاجًا لأي شخص ، ونقل محتوى فاحش أو مسيء أو تعطيل التدفق الطبيعي للحوار داخل الخدمات. </p> <h2> الملكية الفكرية </h2> <p> يعد محتوى الخدمات ، بما في ذلك ، على سبيل المثال لا الحصر ، النصوص والرسومات والصور والبرامج ملكًا لـ الجمعية أو المرخصين لها والشركات الأعضاء ومحمية بموجب حقوق النشر وقوانين الملكية الفكرية الأخرى. لا يجوز لك استخدام أي محتوى من الخدمات لأي غرض تجاري دون موافقة خطية صريحة من المؤسسة. </p> <h2> المسؤولية </h2> <p> لا تقدم المؤسسة أي تعهدات أو ضمانات من أي نوع ، صريحة أو ضمنية ، فيما يتعلق بتشغيل الخدمات أو المعلومات أو المحتوى أو المواد أو المنتجات المدرجة في الخدمات. لن تكون المؤسسة مسؤولة عن أي أضرار من أي نوع تنشأ عن استخدام الخدمات ، بما في ذلك ، على سبيل المثال لا الحصر ، الأضرار المباشرة وغير المباشرة والعرضية والعقابية والتبعية. </p> <h2> القانون الحاكم </h2> <p> ستخضع هذه الشروط واستخدامك للخدمات لقوانين سويسرا ويتم تفسيرها وفقًا لها وسيتم حل أي نزاعات في محاكم بازل ، سويسرا. </p> <h2> التغييرات على الشروط </h2> <p> تحتفظ المؤسسة بالحق في تغيير هذه الشروط في أي وقت ، وأنت مسؤول عن التحقق من هذه الشروط بشكل دوري لمعرفة أي تغييرات . استمرار استخدامك للخدمات بعد إجراء أي تغييرات على الشروط سيشكل موافقتك على الشروط المعدلة. </p> <p> <br> </p> ",
    "about_modal_subtitle": "حول",
    "about_modal_title": "Pharmaledger",
    "about_content": "<iframe style=\"width: 100%; height: 100%; margin-bottom: 24px; border: 0\" src=\"https://pharmaledger.org\"></iframe>",
    "help_modal_title": "مساعدة",
    "help_modal_subtitle": "FAQs",
    "help_content": "<div> <p> <b> ما هو EPI؟ </b> </p> <p> <b> EPI </b> هو اختصار لـ <b> معلومات المنتج الإلكترونية. </b> إنها نسخة إلكترونية من نشرة معلومات المنتج الورقية التي تجدها عادةً داخل عبوة منتج صيدلاني. في بعض الحالات ، قد يكون <b> EPI </b> قد حل محل النشرة الورقية </p> <p> <b> ما هو PharmaLedger؟ </b> </p> <p> جمعية PharmaLedger (PLA) هي جمعية غير هادفة للربح مقرها في سويسرا بهدف تمكين وتعزيز نظام الثقة الرقمية في الرعاية الصحية من خلال معيار و نظام أساسي مفتوح المصدر موثوق به. يعزز PLA التعاون ويسرع الابتكار والاعتماد لتحقيق المنافع المتبادلة في مجالات الرعاية الصحية وعلوم الحياة للمرضى وأصحاب المصلحة الآخرين. تم تشكيل PLA في عام 2022 لمواصلة عمل مشروع PharmaLedger ، وهو مشروع مدته 3 سنوات بتمويل من المفوضية الأوروبية وصناعة المستحضرات الصيدلانية بهدف إثبات قيمة حلول blockchain. يتوفر مزيد من المعلومات على https://pharmaledger.org/</p><p><b> ما هي DataMatrix؟ </b> </p> <p> إنه نوع من الباركود على عبوة المنتج الخاص بك. إنه رمز شريطي مربع أبيض وأسود وسيبدو مشابهًا لما يلي: <br> <img src =\"./images/barcode_example.png\"> </p> <p> <b> كيفية استخدام التطبيق ؟ </b> </p> <p> اتبع الإرشادات الموجودة على الصفحة المقصودة لـ <b> التطبيق ... </b> فهي تعرض صورة لمكان العثور على <b> DataMatrix </b> على حزمة المنتج الخاص بك. بمجرد العثور على <b> DataMatrix </b> ، انقر فوق الزر فحص <b> DataMatrix </b>. اسمح للتطبيق باستخدام الكاميرا حتى يمكن فحص <b> DataMatrix </b>. استخدم الكاميرا للتركيز على <b> DataMatrix </b>. بمجرد فحص الحزمة بنجاح ، سيتم عرض <b> EPI </b>. يمكنك النقر فوق الزر \"+\" للحصول على مزيد من التفاصيل </p> <p> <b> لماذا لا يعطي مسح DataMatrix الخاص بي نتيجة؟ </b> </p> <p> هناك عدة أسباب وراء ذلك قد لا تقدم <b> DataMatrix </b> على الحزمة الخاصة بك EPI. قد يكون أحد الأسباب هو التركيز على الكاميرا. يرجى محاولة مسح الرمز ضوئيًا في مكان جيد الإضاءة والرمز مرئي بوضوح على الشاشة. إذا كنت تكافح من أجل إبقاء يدك ثابتة ، فيمكنك محاولة استخدام طاولة لدعم يديك. </p> </div>"
  },
  "zh": {
    "app_version": "应用程序版本: ",
    "welcome": "欢迎来到 PharmaLedger",
    "scan_explain": "找到药品上的DataMatrix条形码，扫描并查看信息",
    "scan_button": "扫描DataMatrix",
    "cancel": "取消",
    "change_camera": "改变相机",
    "scan_again": "再次扫描",
    "product_not_found_title": "未被识别",
    "product_not_loaded_title": "产品信息不可用",
    "error_subtitle": "未验证的产品",
    "product_not_found": "此产品无法找到",
    "product_not_loaded": "很遗憾，没有加载产品信息",
    "system_busy": "系统繁忙，请稍后再试。",
    "err_code": "错误代码",
    "leaflet_expired_title": "过期",
    "leaflet_expired_message": "<p> <b>该产品已被认定为过期.</b> </p> ",
    "leaflet_incorrect_date_title": "日期不正确",
    "leaflet_incorrect_date_subtitle": "扫描的日期不正确",
    "leaflet_incorrect_date_message": "<b> 此产品的日期不正确</b>.",
    "select_lang_title": "语言不可用",
    "scan_error_title": "扫描错误",
    "camera_error_message": "出了点问题，所选摄像头无法正常访问。请检查你的设备相机设置或尝试从菜单中改变相机。",
    "leaflet_lang_select_message": "传单没有您喜欢的语言版本。你可以从可用的语言列表中选择",
    "lang_proceed": "继续",
    "go_home": "返回首页",
    "onboarding_welcome": "快到了! <br> 请阅读并同意有关条款和条件",
    "disagree": "不同意",
    "agree": "同意",
    "disagree_extra_text": "PharmaLedger\"应用程序在您同意条款和条件之前将无法使用。请阅读条款和条件。",
    "fwd_privacy": "隐私政策",
    "fwd_terms": "条款和条件",
    "fwd_help": "帮助",
    "fwd_about": "关于",
    "privacy_modal_title": "隐私政策",
    "privacy_modal_subtitle": "我们的隐私和安全原则",
    "privacy_content": "我们的隐私和安全原则 隐私声明</b></h1> <p>本隐私声明适用于 PharmaLedger 协会电子产品信息产品的使用。</p> <h2>联系方式</h2><p><b>a) 控制器或联合控制器的身份和联系方式</b></p><p>您的数据的控制器是 PharmaLedger 协会。</p> <p><b>b) 数据保护官的联系方式</b></p><p>PharmaLedger 协会的数据保护官可通过<a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a>进行联系。</p><h2>我们使用哪些个人数据</h2><p>我们仅收集提供您电子说明书所需的技术数据。这包括您的 IP 地址以及您用于访问我们的应用程序的设备和浏览器的技术标识符。</p> <p><em>具体而言，我们收集以下数据元素</em></p><ul><li><p><em>移动设备访问。</em>我们可能会请求从您的移动设备访问或权限，包括您的移动设备相机和其他功能。如果您希望更改我们的访问或权限，您可以在设备设置中进行操作。</p></li><li><p><em>移动设备数据。</em>我们会自动收集设备信息（例如您的移动设备 ID、型号和制造商）、操作系统、版本信息和系统配置信息、设备和应用程序识别号码、浏览器类型和版本、硬件模型、互联网服务提供商和/或移动运营商以及互联网协议（IP）地址（或代理服务器）。如果您正在使用我们的应用程序，我们还可能收集与您的移动设备相关联的电话网络信息、您的移动设备操作系统或平台、您使用的移动设备类型、您的移动设备唯一设备 ID 以及您访问的我们的应用程序的功能的信息。</p></li></ul><h2>我们为什么收集您的个人数据</h2><p><b>目的</b></p><p>我们收集您的技术数据，以便为您的药品提供电子产品说明书。</p><p>因此，我们可能依赖以下法律依据处理您的个人信息:</p><ul><li><p><b>合同履行。</b>我们可能会在认为必要的情况下处理您的个人信息，包括提供我们的服务或在与您签订合同之前根据您的请求处理您的信息。法律义务。我们可能会处理您的信息，因为我们认为这是必要的，以遵守我们的法律义务，例如履行我们在医疗保健法规和公共卫生立法下的义务。与谁分享您的个人数据。我们与第三方供应商、服务提供商、承包商或代理商（\"第三方\"）共享您的数据，他们为我们或代表我们执行服务，并需要访问此类信息才能完成工作。我们与第三方签订了合同，旨在帮助保护您的个人信息。这意味着，除非我们已指示他们这样做，否则他们不能处理您的个人信息。他们也不会与我们之外的任何组织共享您的个人信息。他们还承诺保护我们持有的数据，并按照我们的指示保留数据。我们可能与以下第三方类别共享个人信息:药品制造商（成员公司）技术服务提供商我们仅在必要的时间内存储您的技术数据，以处理您的传单请求，最多可存储30天。如果您选择不向我们提供技术数据，则我们将无法满足您的传单请求。如果您对GDPR下的个人数据有任何请求，例如请求访问或删除您的数据，则可以通过邮件dpo@pharmaledger.org与我们联系。我们将在30天内处理此类请求。我们在为您提供此服务时不使用任何自动化决策。 </p><h2>个人数据的国际传输</h2><p>如果您的药品制造商要求我们将您的数据转移到欧盟以外的地区，我们会使用标准合同条款来保护您的数据。</p><h2>如何投诉</h2><p>如果您有任何关于GDPR的个人数据请求，例如请求访问或删除您的数据，您可以通过<a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a>联系我们。</p><p>我们将在30天内处理此类请求。此外，如果您认为您的权利没有得到保障，您也可以联系您所在地区的监管机构。</p>",
    "terms_modal_title": "条款和条件",
    "terms_modal_subtitle": "使用 PharmaLedger 应用程序时适用的条款和条件",
    "terms_content": "<p>PharmaLedger协会电子产品信息网站和应用的条款和条件</p><p>通过访问或使用PharmaLedger协会的电子产品信息网站和应用程序（以下简称\"服务\"），即表示您同意受这些条款和条件（以下简称\"条款\"）的约束。如果您不同意这些条款，则不能访问或使用本服务。该服务由PharmaLedger协会（以下简称\"协会\"）运营，并旨在供有关其药物的信息的个人使用。多方网络提供服务，并且药品制造商通过服务提供产品信息。协会是此信息的数据控制器。</p><h2>使用服务</h2><p>您同意仅出于合法目的使用本服务，不会侵犯任何第三方的权利或限制或阻止第三方对本服务的使用和享受。此类限制或阻止包括但不限于非法行为，或可能骚扰或给任何人带来烦恼或不便的行为，以及传输淫秽或攻击性内容或干扰服务内对话的正常流程。</p><h2>知识产权</h2><p>服务的内容，包括但不限于文本，图形，图像和软件，是协会或其许可人和成员公司的财产，受版权和其他知识产权法律的保护。未经协会明确书面同意，您不得将服务中的任何内容用于任何商业用途。</p><h2>责任</h2><p>协会不作任何明示或暗示的保证，不保证服务的运作或服务中包含的信息，内容，材料或产品的准确性或适用性。协会对因使用服务而产生的任何损害，包括但不限于直接，间接，偶然，惩罚性和后果性损害，概不负责。</p><h2>管辖法律</h2><p>这些条款以及您使用本服务将受瑞士法律管辖并解释，并且任何争议将在瑞士巴塞尔的法院解决。</p><h2>条款更改</h2><p>协会保留随时更改这些条款的权利，您负责定期检查这些条款是否有变更。任何更改后您继续使用服务将表示您接受修改后的条款。</p><p><br></p>",
    "about_modal_subtitle": "关于",
    "about_modal_title": "Pharmaledger",
    "about_content": "<iframe style=\"width: 100%; height: 100%; margin-bottom: 24px; border: 0\" src=\"https://pharmaledger.org\"></iframe>",
    "help_modal_title": "帮助",
    "help_modal_subtitle": "常见问题解答",
    "help_content": "<div><p><b>EPI是什么？</b></p><p><b>EPI</b>是电子产品说明书的缩写。它是药品包装内通常包含的纸质说明书的电子版。在某些情况下，<b>EPI</b>可能已经取代了纸质说明书。</p><p><b>PharmaLedger是什么？</b></p><p>PharmaLedger协会（PLA）是一个位于瑞士的非盈利性协会，旨在通过标准化和可信的开源平台，在医疗保健领域实现数字信任生态系统的建立和发展。PLA促进协作，加速创新和采用，为患者和其他利益相关者在医疗保健和生命科学领域实现共同利益。PLA成立于2022年，旨在继续PharmaLedger项目的工作，该项目是由欧洲委员会和制药行业资助的为期3年的项目，旨在证明区块链解决方案的价值。更多信息可在 https://pharmaledger.org/ 获得。</p><p><b>DataMatrix是什么？</b></p><p>它是产品包装上的一种条形码。它是一个黑白方块形的条形码，看起来类似于这个:<br> <img src=\"./images/barcode_example.png\"></p><p><b>如何使用应用程序？</b></p><p>按照<b>应用程序</b>的首页面上的说明……它会显示在您的产品包装上找到<b>DataMatrix</b>的图片。一旦您找到了<b>DataMatrix</b>，点击\"扫描<b>DataMatrix</b>\"按钮。允许应用程序使用相机扫描<b>DataMatrix</b>。使用相机对焦于<b>DataMatrix</b>上。扫描包装成功后，将显示<b>EPI</b>。您可以点击\"详情\"按钮以获取更多详细信息。</p><p><b>为什么我的DataMatrix扫描没有结果？</b></p><p>您的包装上的<b>DataMatrix</b>可能无法提供<b>EPI</b>的原因有很多。其中一个原因可能是相机的对焦。请在光线充足的地方尝试扫描代码，并使代码在屏幕上清晰可见。如果您难以保持手稳定，可以尝试使用桌子来支撑双手。</p></div>"
  },
  "es": {
    "app_version": "Versión de la aplicación: ",
    "welcome": "Bienvenido a PharmaLedger",
    "scan_explain": "Encuentre el código de barras DataMatrix en su medicamento para escanear y ver información",
    "scan_button": "Escanear DataMatrix",
    "cancel": "Cancelar",
    "change_camera": "Cambiar cámara",
    "scan_again": "Escanear de nuevo",
    "product_not_found_title": "No Reconocido",
    "product_not_loaded_title": "Información del producto no disponible",
    "error_subtitle": "Producto no verificado",
    "product_not_found": "No se puede encontrar este producto",
    "product_not_loaded": "Desafortunadamente, no se ha cargado información del producto",
    "system_busy": "El sistema está ocupado, inténtalo de nuevo más tarde.",
    "err_code": "Código de error",
    "leaflet_expired_title": "Caducado",
    "leaflet_expired_message": "<p> <b>Este producto ha sido identificado como caducado.</b> </p> ",
    "leaflet_incorrect_date_title": "Fecha incorrecta",
    "leaflet_incorrect_date_subtitle": "La fecha escaneada es incorrecta",
    "leaflet_incorrect_date_message": "<b> La fecha de este producto es incorrecta</b>.",
    "select_lang_title": "Idioma no disponible",
    "scan_error_title": "Error de escaneo",
    "camera_error_message": "Algo salió mal y no se puede acceder correctamente a la cámara seleccionada. Verifique la configuración de la cámara de su dispositivo o intente cambiar la cámara desde el menú",
    "leaflet_lang_select_message": "El folleto no está disponible en su idioma preferido. Puede elegir de la lista de idiomas disponibles",
    "lang_proceed": "Continuar",
    "go_home": "Volver a casa",
    "onboarding_welcome": "¡Casi llegamos! <br> Lea y acepte los términos y condiciones",
    "disagree": "Discrepar",
    "agree": "Aceptar",
    "disagree_extra_text": "La aplicación \"PharmaLedger\" no funcionará hasta que acepte los términos y condiciones. Lea los términos y condiciones.",
    "fwd_privacy": "Política de privacidad",
    "fwd_terms": "Términos y Condiciones",
    "fwd_help": "Ayuda",
    "fwd_about": "Acerca de",
    "privacy_modal_title": "Política de privacidad",
    "privacy_modal_subtitle": "Nuestros Principios de Privacidad y Seguridad",
    "privacy_content": "<h1><b>Aviso de privacidad</b></h1> <p>Este aviso de privacidad se aplica al uso del producto de información electrónica de productos de PharmaLedger Association. </p> <h2>Contactos</h2><p><b>a) Identidad y contactos del responsable o corresponsables</b></p><p>El responsable del tratamiento de sus datos es la Asociación PharmaLedger.</p> <p><b >b) Contactos del oficial de protección de datos</b></p><p>La Oficina de Protección de Datos de la Asociación PharmaLedger se puede contactar en <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger. org</a> </p><h2>Qué datos personales utilizamos</h2><p>Recopilamos solo los datos técnicos necesarios para entregar su folleto electrónico.Esto incluye su dirección IP e identificadores técnicos del dispositivo y el navegador. utiliza para acceder a nuestra aplicación.</p> <p><em>En detalle, recopilamos los siguientes elementos de datos</em></p><ul><li><p><em>Acceso a dispositivos móviles. </em> Podemos solicitar acceso o permiso para ciertas funciones de su dispositivo móvil, incluida la cámara de su dispositivo móvil y otras funciones. Si desea cambiar nuestro acceso o permisos, puede hacerlo en la configuración de su dispositivo.</p></li><li><p><em>Datos del dispositivo móvil.</em> Recopilamos automáticamente información del dispositivo ( como el ID, el modelo y el fabricante de su dispositivo móvil), el sistema operativo, la información de la versión y la información de configuración del sistema, los números de identificación de la aplicación y el dispositivo, el tipo y la versión del navegador, el modelo de hardware, el proveedor de servicios de Internet y/o el operador de telefonía móvil, y el Protocolo de Internet (IP ) dirección (o servidor proxy). Si está utilizando nuestra(s) aplicación(es), también podemos recopilar información sobre la red telefónica asociada con su dispositivo móvil, el sistema operativo o la plataforma de su dispositivo móvil, el tipo de dispositivo móvil que utiliza, la identificación de dispositivo única de su dispositivo móvil e información sobre las funciones de nuestras aplicaciones a las que accedió.</p></li></ul><h2>Por qué recopilamos sus datos personales</h2><p><b>Propósitos </b></p><p>Recopilamos sus datos técnicos con el fin de proporcionarle un prospecto electrónico de su medicamento. </p><p>Como tal, podemos basarnos en las siguientes bases legales para procesar su información personal:</p><ul><li><p><b>Ejecución de un contrato.</b> podemos procesar su información personal cuando creamos que es necesario para cumplir con las obligaciones contractuales con usted, incluida la prestación de nuestros Servicios o cuando lo solicite antes de celebrar un contrato con usted.</p></li><li><p>< b>Obligaciones legales.</b> Podemos procesar su información cuando creamos que es necesario para cumplir con nuestras obligaciones legales, por ejemplo, para cumplir con nuestras obligaciones en virtud de la normativa sanitaria y la legislación de salud pública.</p></li></ul><h2>Con quién compartimos sus datos personales</h2><p>Empresas miembro y proveedores de servicios externos.</p><p>Compartimos sus datos con proveedores externos, proveedores de servicios, contratistas , o un gents ('terceros') que realizan servicios para nosotros o en nuestro nombre y requieren acceso a dicha información para realizar ese trabajo. Tenemos contratos vigentes con nuestros terceros, que están diseñados para ayudar a proteger su información personal. Esto significa que no pueden hacer nada con su información personal a menos que les hayamos dado instrucciones para hacerlo. Tampoco compartirán su información personal con ninguna organización aparte de nosotros. También se comprometen a proteger los datos que tienen en nuestro nombre y a conservarlos durante el período que le indiquemos. Las categorías de terceros con los que podemos compartir información personal son las siguientes:</p><ul><li><p>Fabricantes de medicamentos (empresas miembro)</p></li><li><p>Servicio técnico Proveedores</p></li></ul><h2>Cuánto tiempo almacenamos sus datos personales</h2><p>La Asociación PharmaLedger solo almacena sus datos técnicos durante el tiempo que sea necesario para procesar su solicitud de folleto hasta a 30 días. </p><p>El fabricante de su medicamento también almacenará sus datos durante un período de tiempo definido según lo determinen sus políticas de retención de datos. Para obtener más información sobre esta retención, comuníquese con el fabricante de su medicamento.</p><h2 >Si no nos proporciona sus datos personales</h2><p>Si decide no proporcionarnos sus datos técnicos, no podremos cumplir con su solicitud de folleto.</p><h2>Sus derechos</h2><p>Si tiene alguna solicitud relacionada con sus datos personales en virtud del RGPD, como una solicitud para acceder o eliminar sus datos, puede contactarnos en <a href=\"mailto:dpo@pharmaledger.org\" >dpo@pharmaledger.org</a>.</p><p>Procesaremos dichas solicitudes dentro de los 30 días</p><h2>Retiro del consentimiento</h2><p>Si tiene alguna solicitud relacionada con sus datos personales bajo el RGPD, como una solicitud para acceder o eliminar sus datos, puede contactarnos en <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a>.</p><p>Procesaremos dichas solicitudes dentro de los 30 días</p><h2>Toma de decisiones automatizada</h2><p>No utilizamos ninguna toma de decisiones automatizada en la provisión de este servicio para usted. </p><h2>Transferencia internacional de datos personales</h2><p>Cuando el fabricante de su medicamento nos exige que transfiramos sus datos fuera de la Unión Europea, utilizamos cláusulas contractuales estándar para proteger sus datos.</p><h2 >Cómo presentar una queja</h2><p>Si tiene alguna solicitud relacionada con sus datos personales en virtud del RGPD, como una solicitud para acceder o eliminar sus datos, puede contactarnos en <a href=\"mailto:dpo @pharmaledger.org\">dpo@pharmaledger.org</a>.</p><p>Procesaremos dichas solicitudes dentro de los 30 días. Además, puede ponerse en contacto con la autoridad supervisora local si cree que no se están respetando sus derechos.</p>",
    "terms_modal_title": "Términos y Condiciones",
    "terms_modal_subtitle": "Los términos y condiciones que se aplican al usar la aplicación PharmaLedger",
    "terms_content": "<h2>Términos y condiciones para el sitio web y la aplicación de información electrónica de productos de PharmaLedger Association </h2><p>Al acceder o utilizar el sitio web y la aplicación de información electrónica de productos de PharmaLedger Association (la \"Servicios\"), usted acepta estar sujeto a estos términos y condiciones (los \"Términos\"). No puede acceder o utilizar los Servicios si no está de acuerdo con estos Términos. Los Servicios son operados por PharmaLedger Asociación (la \"Asociación\") y están destinados a personas que buscan información sobre sus medicamentos. Una red de múltiples partes brinda los Servicios, y el fabricante de su medicamento proporciona la información del producto que se muestra a través de los Servicios. La Asociación actúa como controlador de datos para esta información. </p><h2>Uso de los Servicios </h2><p>Usted acepta usar los Servicios solo para fines lícitos y de una manera que no infrinja los derechos de , o restringir o inhibir el uso y disfrute de los Servicios por parte de terceros. Dicha restricción o inhibición incluye, sin limitación, conducta que sea ilegal o que pueda acosar o causar angustia o molestias a cualquier persona, y la transmisión de contenido obsceno u ofensivo o la interrupción del flujo normal de diálogo dentro de los Servicios. </p><h2>Propiedad intelectual </h2><p>El contenido de los Servicios, incluidos, entre otros, textos, gráficos, imágenes y software, es propiedad de la Association o sus licenciantes y empresas miembros y está protegida por derechos de autor y otras leyes de propiedad intelectual. No puede usar ningún contenido de los Servicios para ningún propósito comercial sin el consentimiento expreso por escrito de la Asociación. </p><h2>Responsabilidad</h2><p>La Asociación no hace representaciones ni garantías de ningún tipo, expresas o implícitas, en cuanto a la operación de los Servicios o la información, contenido, materiales o productos incluidos en los Servicios. La Asociación no será responsable de ningún daño de ningún tipo que surja del uso de los Servicios, incluidos, entre otros, daños directos, indirectos, incidentales, punitivos y consecuentes. </p><h2>Legislación aplicable </h2><p>Estas Condiciones y su, e de los Servicios se regirá e interpretará de acuerdo con las leyes de Suiza y cualquier disputa se resolverá en los tribunales de Basilea, Suiza. </p><h2>Cambios a los Términos </h2><p>La Asociación se reserva el derecho de cambiar estos Términos en cualquier momento, y usted es responsable de revisar estos Términos periódicamente para ver si hay cambios. . Su uso continuado de los Servicios después de que se hayan realizado cambios en los Términos constituirá su aceptación de los Términos revisados.</p><p><br></p>",
    "about_modal_subtitle": "Acerca de",
    "about_modal_title": "Pharmaledger",
    "about_content": "<iframe style=\"width: 100%; height: 100%; margin-bottom: 24px; border: 0\" src=\"https://pharmaledger.org\"></iframe>",
    "help_modal_title": "Ayuda",
    "help_modal_subtitle": "Preguntas frecuentes",
    "help_content": "<div><p><b>¿Qué es EPI?</b></p><p><b>EPI</b> es una abreviatura de <b>información electrónica de productos</b>. b> Es una versión electrónica del folleto de información del producto en papel que normalmente se encuentra dentro de un paquete de productos farmacéuticos. En algunos casos, el <b>EPI</b> puede haber reemplazado al folleto en papel </p> <p> <b >¿Qué es PharmaLedger?</b></p><p>La Asociación PharmaLedger (PLA) es una asociación sin fines de lucro con sede en Suiza con el propósito de habilitar y fomentar un Ecosistema de Confianza Digital en el cuidado de la salud a través de un sistema estandarizado y plataforma confiable de código abierto PLA promueve la colaboración y acelera la innovación y la adopción para lograr beneficios mutuos en los dominios de la salud y las ciencias de la vida para pacientes y otras partes interesadas PLA se formó en 2022 para continuar el trabajo del proyecto PharmaLedger, un proyecto de 3 años financiado por la Comisión Europea y la industria farmacéutica con el objetivo de demostrar el valor de las soluciones blockchain. Más información está disponible en https://pharmaledger.org/ </p> <p><b>¿Qué es DataMatrix?</b> </p> <p>Es un tipo de código de barras en el paquete de su producto. Es un código de barras de cuadro cuadrado en blanco y negro y se verá similar a esto:<br> <img src=\"./images/barcode_example.png\"></p> <p> <b>Cómo usar la aplicación ?</b></p><p>Siga las instrucciones en la página de destino de la <b>aplicación...</b> muestra una imagen de dónde encontrar el <b>DataMatrix</b> en su paquete de productos. Una vez que haya encontrado el <b>DataMatrix</b>, haga clic en el botón 'Escanear <b>DataMatrix</b>'. Permita que la aplicación use la cámara para que se pueda escanear <b>DataMatrix</b>. Usa la cámara para enfocar el <b>DataMatrix</b>. Una vez que el paquete se escanea con éxito, se mostrará el <b>EPI</b>. Puede hacer clic en el botón '' para obtener más detalles. </p><p><b>¿Por qué mi exploración de DataMatrix no da ningún resultado?</b></p><p> Hay varias razones por las que <b Es posible que >DataMatrix</b> en su paquete no proporcione un EPI. Una de las razones podría ser el enfoque de la cámara. Intente escanear el código en un lugar bien iluminado y el código claramente visible en la pantalla. Si tiene dificultades para mantener su mano firme, puede intentar usar una mesa para apoyar sus manos. </p></div>"
  },
  "pt": {
    "app_version": "Versão do aplicativo: ",
    "welcome": "Bem-vindo ao PharmaLedger",
    "scan_explain": "Encontre o código de barras DataMatrix em seu medicamento para escanear e visualizar informações",
    "scan_button": "Escanear DataMatrix",
    "cancel": "Cancelar",
    "change_camera": "Alterar câmera",
    "scan_again": "Verificar novamente",
    "product_not_found_title": "Não Reconhecido",
    "product_not_loaded_title": "Informações do produto não disponíveis",
    "error_subtitle": "Produto não verificado",
    "product_not_found": "Este produto não pode ser encontrado",
    "product_not_loaded": "Infelizmente, nenhuma informação do produto foi carregada",
    "system_busy": "Sistema ocupado, tente novamente mais tarde.",
    "err_code": "Código de erro",
    "leaflet_expired_title": "Expirado",
    "leaflet_expired_message": "<p> <b>Este produto foi identificado como expirado.</b> </p> ",
    "leaflet_incorrect_date_title": "Data incorreta",
    "leaflet_incorrect_date_subtitle": "A data digitalizada está incorreta",
    "leaflet_incorrect_date_message": "<b> A data deste produto está incorreta</b>.",
    "select_lang_title": "Idioma indisponível",
    "scan_error_title": "Erro ao escanear",
    "camera_error_message": "Algo deu errado e a câmera selecionada não pode ser acessada corretamente. Por favor, verifique as configurações da câmera do seu dispositivo ou tente mudar a câmera no menu",
    "leaflet_lang_select_message": "O folheto não está disponível em seu idioma preferido. Você pode escolher na lista de idiomas disponíveis",
    "lang_proceed": "Continuar",
    "go_home": "Voltar para casa",
    "onboarding_welcome": "Quase lá! <br> Leia e concorde com os termos e condições",
    "disagree": "Discordo",
    "agree": "Concordo",
    "disagree_extra_text": "O aplicativo \"PharmaLedger\" não funcionará até que você concorde com os termos e condições. Leia os termos e condições.",
    "fwd_privacy": "Política de privacidade",
    "fwd_terms": "Termos e Condições",
    "fwd_help": "Ajuda",
    "fwd_about": "Sobre",
    "privacy_modal_title": "Política de privacidade",
    "privacy_modal_subtitle": "Nossos Princípios de Privacidade e Segurança",
    "privacy_content": "<h1><b>Aviso de privacidade</b></h1> <p>Este aviso de privacidade é aplicável ao uso do produto Electronic Product Information da PharmaLedger Association. </p> <h2>Contatos</h2><p><b>a) Identidade e contactos do responsável pelo tratamento ou dos responsáveis conjuntos</b></p><p>O responsável pelo tratamento dos seus dados é a Associação PharmaLedger.</p> <p><b >b) Contactos do responsável pela proteção de dados</b></p><p>O Gabinete de Proteção de Dados da PharmaLedger Association pode ser contactado em <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger. org</a> </p><h2>Quais dados pessoais usamos</h2><p>Coletamos apenas os dados técnicos necessários para entregar seu folheto eletrônico. Isso inclui seu endereço IP e identificadores técnicos do dispositivo e navegador você usa para acessar nosso aplicativo.</p> <p><em>Em detalhes, coletamos os seguintes elementos de dados</em></p><ul><li><p><em>Acesso a dispositivos móveis. </em> Podemos solicitar acesso ou permissão a determinados recursos do seu dispositivo móvel, incluindo a câmera do seu dispositivo móvel e outros recursos. Se você deseja alterar nosso acesso ou permissões, pode fazê-lo nas configurações do seu dispositivo.</p></li><li><p><em>Dados do dispositivo móvel.</em> Coletamos informações do dispositivo automaticamente ( como ID, modelo e fabricante do seu dispositivo móvel), sistema operacional, informações de versão e informações de configuração do sistema, números de identificação do dispositivo e do aplicativo, tipo e versão do navegador, modelo de hardware provedor de serviços de Internet e/ou operadora de celular e Protocolo de Internet (IP ) endereço (ou servidor proxy). Se você estiver usando nosso(s) aplicativo(s), também poderemos coletar informações sobre a rede telefônica associada ao seu dispositivo móvel, o sistema operacional ou a plataforma do seu dispositivo móvel, o tipo de dispositivo móvel que você usa, o ID exclusivo do dispositivo móvel e informações sobre os recursos de nosso(s) aplicativo(s) que você acessou.</p></li></ul><h2>Por que coletamos seus dados pessoais</h2><p><b>Finalidades </b></p><p>Recolhemos os seus dados técnicos com o objetivo de lhe fornecer uma bula eletrónica do seu medicamento. </p><p>Como tal, podemos contar com as seguintes bases legais para processar suas informações pessoais:</p><ul><li><p><b>Desempenho de um Contrato.</b> Nós pode processar suas informações pessoais quando acreditarmos ser necessário cumprir obrigações contratuais com você, incluindo fornecer nossos Serviços ou a seu pedido antes de firmar um contrato com você.</p></li><li><p>< b>Obrigações legais.</b> Podemos processar suas informações onde acreditamos ser necessário para o cumprimento de nossas obrigações legais, como cumprir nossas obrigações sob regulamentação de saúde e legislação de saúde pública.</p></li></ul><h2>Com quem compartilhamos seus dados pessoais</h2><p>Empresas associadas e provedores de serviços terceirizados.</p><p>Compartilhamos seus dados com fornecedores terceirizados, provedores de serviços e contratados , ou um agentes ('terceiros') que prestam serviços para nós ou em nosso nome e requerem acesso a tais informações para fazer esse trabalho. Temos contratos em vigor com nossos terceiros, que são projetados para ajudar a proteger suas informações pessoais. Isso significa que eles não podem fazer nada com suas informações pessoais, a menos que os instruímos a fazê-lo. Eles também não compartilharão suas informações pessoais com nenhuma organização além de nós. Também se comprometem a proteger os dados que detêm em nosso nome e a conservá-los durante o período que instruímos. As categorias de terceiros com as quais podemos compartilhar informações pessoais são as seguintes:</p><ul><li><p>Fabricantes de medicamentos (empresas associadas)</p></li><li><p>Serviço técnico Provedores</p></li></ul><h2>Por quanto tempo armazenamos seus dados pessoais</h2><p>A PharmaLedger Association armazena apenas seus dados técnicos pelo tempo necessário para processar sua solicitação de folheto por até a 30 dias. </p><p>O fabricante do seu medicamento também armazenará seus dados por um período de tempo definido, conforme determinado por suas políticas de retenção de dados. Para obter mais informações sobre essa retenção, entre em contato com o fabricante do medicamento.</p><h2 >Se você não nos fornecer seus dados pessoais</h2><p>Se você optar por não nos fornecer seus dados técnicos, não poderemos atender à sua solicitação de folheto.</p><h2>Seus direitos</h2><p>Se você tiver alguma solicitação relacionada aos seus dados pessoais sob o GDPR, como uma solicitação para acessar ou excluir seus dados, entre em contato conosco em <a href=\"mailto:dpo@pharmaledger.org\" >dpo@pharmaledger.org</a>.</p><p>Processaremos tais solicitações dentro de 30 dias</p><h2>Retirada do consentimento</h2><p>Se você tiver quaisquer solicitações relacionadas a seus dados pessoais sob o GDPR, como uma solicitação para acessar ou excluir seus dados, você pode entrar em contato conosco em <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a>.</p><p>Processaremos tais solicitações dentro de 30 dias</p><h2>Tomada de decisão automatizada</h2><p>Não utilizamos nenhuma tomada de decisão automatizada em nosso fornecimento deste serviço a você. </p><h2>Transferência internacional de dados pessoais</h2><p>Onde o fabricante do seu medicamento exige que transfiramos seus dados para fora da União Europeia, utilizamos cláusulas contratuais padrão para proteger seus dados.</p><h2 >Como reclamar</h2><p>Se você tiver alguma solicitação relacionada aos seus dados pessoais sob o GDPR, como uma solicitação para acessar ou excluir seus dados, entre em contato conosco em <a href=\"mailto:dpo @pharmaledger.org\">dpo@pharmaledger.org</a>.</p><p>Processaremos essas solicitações em até 30 dias. Além disso, você pode entrar em contato com a autoridade supervisora local se achar que seus direitos não estão sendo respeitados.</p>",
    "terms_modal_title": "Termos e Condições",
    "terms_modal_subtitle": "Os termos e condições que se aplicam ao usar o aplicativo PharmaLedger",
    "terms_content": "<h2>Termos e condições para o site e aplicativo de informações eletrônicas sobre produtos da PharmaLedger Association </h2><p>Acessando ou usando o site e o aplicativo Electronic Product Information da PharmaLedger Association (o \"Serviços\"), você concorda em cumprir estes termos e condições (os \"Termos\"). Você não pode acessar ou usar os Serviços se não concordar com estes Termos. Os Serviços são operados pelo PharmaLedger Association (a \"Associação\") e destinam-se ao uso por indivíduos que buscam informações sobre seus medicamentos. Uma rede multipartidária fornece os Serviços, e o fabricante do medicamento fornece as informações do produto exibidas por meio dos Serviços. A Associação atua como controladora de dados para estas informações. </p><h2>Uso dos Serviços </h2><p>Você concorda em usar os Serviços apenas para fins legais e de maneira que não infrinja os direitos de , ou restringir ou inibir o uso e aproveitamento dos Serviços por terceiros. Tal restrição ou inibição inclui, sem limitação, conduta que seja ilegal ou que possa assediar ou causar desconforto ou inconveniência a qualquer pessoa, e a transmissão de conteúdo obsceno ou ofensivo ou interrupção do fluxo normal de diálogo dentro dos Serviços. </p><h2>Propriedade intelectual </h2><p>O conteúdo dos Serviços, incluindo, entre outros, texto, gráficos, imagens e software, é propriedade do Association ou seus licenciadores e empresas membros e é protegido por direitos autorais e outras leis de propriedade intelectual. Você não pode usar nenhum conteúdo dos Serviços para fins comerciais sem o consentimento expresso por escrito da Associação. </p><h2>Responsabilidade</h2><p>A Associação não faz representações ou garantias de qualquer tipo, expressas ou implícitas, quanto à operação dos Serviços ou às informações, conteúdo, materiais ou produtos incluídos nos Serviços. A Associação não será responsável por quaisquer danos de qualquer tipo decorrentes do uso dos Serviços, incluindo, entre outros, danos diretos, indiretos, incidentais, punitivos e consequentes. </p><h2>Lei Aplicável </h2><p>Estes Termos e sua Todos os Serviços serão regidos e interpretados de acordo com as leis da Suíça e quaisquer disputas serão resolvidas nos tribunais de Basel, Suíça. </p><h2>Alterações nos Termos </h2><p>A Associação reserva-se o direito de alterar estes Termos a qualquer momento, e você é responsável por verificar estes Termos periodicamente quanto a quaisquer alterações . Seu uso continuado dos Serviços após qualquer alteração nos Termos constituirá sua aceitação dos Termos revisados.</p><p><br></p>",
    "about_modal_subtitle": "Sobre",
    "about_modal_title": "Pharmaledger",
    "about_content": "<iframe style=\"width: 100%; height: 100%; margin-bottom: 24px; border: 0\" src=\"https://pharmaledger.org\"></iframe>",
    "help_modal_title": "Ajuda",
    "help_modal_subtitle": "Perguntas frequentes",
    "help_content": "<div><p><b>O que é EPI?</b></p><p><b>EPI</b> é uma abreviação de <b>informações eletrônicas do produto.</b> b> É uma versão eletrônica do folheto de informações do produto em papel que você normalmente encontra dentro de um pacote de produto farmacêutico. Em alguns casos, o<b>EPI</b> pode ter substituído o folheto de papel </p> <p> <b >O que é PharmaLedger?</b></p><p>A PharmaLedger Association (PLA) é uma associação sem fins lucrativos com sede na Suíça com o objetivo de permitir e promover um ecossistema de confiança digital na área da saúde por meio de um sistema padronizado e plataforma confiável de código aberto. A PLA promove a colaboração e acelera a inovação e a adoção para obter benefícios mútuos nos domínios da saúde e das ciências da vida para pacientes e outras partes interessadas. A PLA foi formada em 2022 para continuar o trabalho do projeto PharmaLedger, um projeto de 3 anos financiado pela Comissão Europeia e pela indústria farmacêutica com o objetivo de provar o valor das soluções blockchain. Mais informações estão disponíveis em https://pharmaledger.org/ </p> <p><b>O que é o DataMatrix?</b> </p> <p>É um tipo de código de barras na embalagem do seu produto. É um código de barras quadrado preto e branco e será semelhante a este:<br> <img src=\"./images/barcode_example.png\"></p> <p> <b>Como usar o aplicativo ?</b></p><p>Siga as instruções na página inicial do <b>App...</b> mostra uma imagem de onde encontrar o<b>DataMatrix</b> em seu pacote de produtos. Depois de encontrar o <b>DataMatrix</b>, clique no botão 'Scan <b>DataMatrix</b>'. Permita que o aplicativo use a câmera para que o <b>DataMatrix</b> possa ser digitalizado. Use a câmera para focar no <b>DataMatrix</b>. Depois que o pacote for digitalizado com sucesso, o <b>EPI</b> será exibido. Você pode clicar no botão '' para obter mais detalhes </p><p><b>Por que minha varredura DataMatrix não dá resultado?</b></p><p> Existem várias razões pelas quais o <b >DataMatrix</b> em seu pacote pode não fornecer um EPI. Um dos motivos pode ser o foco da câmera. Por favor, tente escanear o código em um local bem iluminado e código bem visível na tela. Se você está lutando para manter a mão firme, pode tentar usar uma mesa para apoiá-la. </p></div>"
  },
  "ko": {
    "app_version": "앱 버전: ",
    "welcome": "파르마레저에 오신 것을 환영합니다",
    "scan_explain": "의약품에 있는 데이터 매트릭스 바코드를 찾아 스캔하여 정보를 확인하세요",
    "scan_button": "데이터 매트릭스 스캔",
    "cancel": "취소",
    "change_camera": "카메라 변경",
    "scan_again": "다시 스캔",
    "product_not_found_title": "인식되지 않음",
    "product_not_loaded_title": "제품 정보를 불러올 수 없음",
    "error_subtitle": "인증되지 않은 제품",
    "product_not_found": "이 제품을 찾을 수 없습니다",
    "product_not_loaded": "죄송합니다, 제품 정보를 불러오지 못했습니다",
    "system_busy": "시스템이 바쁩니다. 나중에 다시 시도해주세요.",
    "err_code": "오류 코드",
    "leaflet_expired_title": "만료됨",
    "leaflet_expired_message": "<p> <b>이 제품은 만료된 제품입니다.</b> </p> ",
    "leaflet_incorrect_date_title": "잘못된 날짜",
    "leaflet_incorrect_date_subtitle": "스캔한 날짜가 잘못되었습니다",
    "leaflet_incorrect_date_message": "<b>이 제품의 날짜가 잘못되었습니다</b>.",
    "select_lang_title": "사용 불가 언어",
    "scan_error_title": "스캔 오류",
    "camera_error_message": "문제가 발생하여 선택한 카메라에 올바르게 접근할 수 없습니다. 장치 카메라 설정을 확인하거나 메뉴에서 카메라를 변경해주세요.",
    "leaflet_lang_select_message": "선호하는 언어로는 지도가 제공되지 않습니다. 이용 가능한 언어 목록에서 선택해주세요.",
    "lang_proceed": "진행",
    "go_home": "홈으로 돌아가기",
    "onboarding_welcome": "거의 다 왔습니다! <br> 약관을 읽고 동의해주세요.",
    "disagree": "동의하지 않음",
    "agree": "동의함",
    "disagree_extra_text": "앱 \"PharmaLedger\"은 약관에 동의하지 않으면 작동하지 않습니다. 약관을 반드시 읽어주세요.",
    "fwd_privacy": "개인정보 처리방침",
    "fwd_terms": "이용약관",
    "fwd_help": "도움말",
    "fwd_about": "소개",
    "privacy_modal_title": "개인정보 처리방침",
    "privacy_modal_subtitle": "개인정보 보호와 보안 원칙",
    "privacy_content": "<h1><b>개인정보 공지</b></h1> <p>이 개인정보 공지는 PharmaLedger 협회 전자 제품 정보 제품의 사용에 적용됩니다.</p><h2>연락처</h2><p><b>a) 정보 주체 또는 공동 정보 주체의 식별 및 연락처</b></p><p>귀하의 데이터를 처리하는 담당자는 PharmaLedger 협회입니다.</p><p><b>b) 개인정보 보호책임자 연락처</b></p><p>PharmaLedger 협회의 개인정보 보호책임자는 <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a>로 연락할 수 있습니다.</p><h2>수집하는 개인정보</h2><p>전자 지도를 제공하기 위해 필요한 기술적인 데이터만 수집합니다. 이에는 귀하가 저희 어플리케이션에 접근하는 데 사용하는 기기 및 브라우저의 IP 주소와 기술 식별자가 포함됩니다.</p><p><em>자세히 말하면, 저희는 다음과 같은 데이터 요소를 수집합니다.</em></p><ul><li><p><em>모바일 기기 액세스.</em> 귀하의 모바일 기기의 카메라 등 특정 기능에 대한 액세스 또는 권한을 요청할 수 있습니다. 액세스 또는 권한을 변경하려면 귀하의 기기 설정에서 변경할 수 있습니다.</p></li><li><p><em>모바일 기기 데이터.</em> 운영체제, 버전 정보 및 시스템 구성 정보, 기기 및 어플리케이션 식별 번호, 브라우저 유형 및 버전, 하드웨어 모델, 인터넷 서비스 제공자 및/또는 모바일 통신사, 인터넷 프로토콜(IP) 주소(또는 프록시 서버) 등의 기기 정보(귀하의 모바일 기기 ID, 모델 및 제조사)를 자동으로 수집합니다. 당신이 저희 어플리케이션을 사용하고 있다면, 저희는 귀하의 모바일 기기에 연결된 전화망 정보, 모바일 기기의 운영 체제 또는 플랫폼, 귀하가 사용하는 모바일 기기의 종류, 귀하의 모바일 기기 고유 ID, 그리고 귀하가 접근한 어플리케이션 기능에 관한 정보를 수집할 수도 있습니다.</p></li></ul><h2>귀하의 개인정보를 수집하는 이유</h2><p><b>목적</b></p><p>귀하의 기술적 데이터를 수집하는 것은 귀하의 약물에 대한 전자 제품 삽입지를 제공하기 위한 목적으로 수행됩니다.</p><p>따라서 저희는 다음과 같은 법적 근거를 사용하여 귀하의 개인정보를 처리할 수 있습니다:</p><ul><li><p><b>계약의 이행.</b> 계약 상의 의무를 이행하기 위해, 예를 들어, 귀하에게 서비스를 제공하거나 계약 체결 전 귀하의 요청에 따라 귀하의 개인 정보를 처리할 수 있습니다.</p></li><li><p><b>법적 의무.</b> 귀하의 정보를 처리하는 것이, 예를 들어, 의료 규정 및 공공 건강 법령을 준수하기 위해 필요한 경우에는 귀하의 개인 정보를 처리할 수 있습니다.</p></li></ul><h2>귀하의 개인정보를 누구와 공유하는가</h2><p>회원 회사 및 제 3자 서비스 제공업체.</p><p>저희는 귀하의 정보를 저희나 저희를 대신하여 서비스를 수행하는 제 3자 공급업체, 서비스 제공자, 계약자 또는 대리인('제 3자')와 공유할 수 있습니다. 제 3자들은 이러한 정보에 액세스하여 작업을 수행하는 것이 필요한 경우가 있습니다.저희는 제3자와 계약을 맺어 귀하의 개인정보를 보호하는 데 도움이되도록 하고 있습니다. 이는 우리가 그들에게 지시하지 않는 한 그들이 귀하의 개인정보를 사용할 수 없음을 의미합니다. 그들은 또한 우리 이외의 조직과 귀하의 개인정보를 공유하지 않도록 약속하며, 우리를 대신하여 보유하고 있는 데이터를 보호하고 지시하는 기간 동안 보유하도록 약속합니다. 저희가 개인정보를 공유할 수 있는 제3자의 범주는 다음과 같습니다:</p><ul><li><p>의약품 제조업체 (회원사)</p></li><li><p>기술 서비스 제공업체</p></li></ul><h2>개인정보 보관 기간</h2><p>PharmaLedger 협회는 기술 데이터를 최대 30일까지 처리하기 위해 필요한 기간 동안만 보관합니다. </p><p>귀하의 약 제조업체는 데이터 보존 정책에 따라 귀하의 데이터를 정의된 기간 동안 보관합니다. 이 보존에 대한 자세한 정보는 약 제조업체에 문의하시기 바랍니다.</p><h2>개인정보 제공 안 함 시</h2><p>귀하가 기술 데이터를 제공하지 않으시면, 저희는 귀하의 리플렛 요청을 처리할 수 없습니다.</p><h2>귀하의 권리</h2><p>GDPR에 따른 귀하의 개인정보와 관련된 요청(데이터 접근 또는 삭제 요청 등)이 있으면 <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a>로 문의하실 수 있습니다.</p><p>이러한 요청은 30일 이내에 처리됩니다.</p><h2>동의 철회</h2><p>GDPR에 따른 귀하의 개인정보와 관련된 요청(데이터 접근 또는 삭제 요청 등)이 있으면 <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a>로 문의하실 수 있습니다.</p><p>이러한 요청은 30일 이내에 처리됩니다.</p><h2>자동화된 의사결정</h2><p>본 서비스의 제공에 있어 자동화된 의사결정은 사용하지 않습니다.</p><h2>개인정보의 국제이전</h2><p>귀하의 의약품 제조업체가 유럽 연합 이외의 지역으로 귀하의 데이터 이전을 요청하는 경우, 우리는 표준 계약 조건을 활용하여 귀하의 데이터를 보호합니다.</p><h2>불만 제기 방법</h2><p>GDPR에 따른 귀하의 개인정보와 관련된 요청(데이터 접근 또는 삭제 요청 등)이 있으면 <a href=\"mailto:dpo@pharmaledger.org\">dpo@pharmaledger.org</a>로 문의하실 수 있습니다.</p><p>이러한 요청은 30일 이내에 처리됩니다. 또한, 권리가 충족되지 않는 것으로 판단되는 경우 귀하의 지역 감독기관에 문의하실 수 있습니다.</p>",
    "terms_modal_title": "약관",
    "terms_modal_subtitle": "PharmaLedger 어플리케이션을 사용할 때 적용되는 약관",
    "terms_content": "<h2>PharmaLedger 협회의 전자 제품 정보 웹사이트와 어플리케이션에 대한 약관 및 조건</h2><p>PharmaLedger 협회의 전자 제품 정보 웹사이트와 어플리케이션(이하 '서비스')에 접속하거나 이를 이용함으로써, 귀하는 본 약관 및 조건(이하 '약관')에 동의하는 것입니다. 귀하는 본 약관에 동의하지 않으면 서비스에 접속하거나 이를 이용할 수 없습니다. 서비스는 PharmaLedger 협회(이하 '협회')가 운영하며, 약물 정보를 찾는 개인들이 이를 이용할 목적으로 제공됩니다. 다중 당사자 네트워크가 서비스를 제공하며, 약물 제조업체가 서비스를 통해 제공되는 제품 정보를 제공합니다. 협회는 이 정보의 데이터 컨트롤러로 작동합니다. </p><h2>서비스 이용</h2><p>귀하는 합법적인 목적으로만 서비스를 이용하며, 어떠한 제3자의 권리를 침해하지 않는 방식으로 서비스를 이용하시기로 동의합니다. 이러한 제한 또는 억제는 불법적인 행동, 혹은 어떠한 개인에게 괴롭힘 혹은 불편함을 초래할 수 있는 행동을 포함하며, obscenities나 offensive한 콘텐츠를 전송하거나, 서비스 내의 정상적인 대화 흐름을 방해하는 행동을 포함합니다. </p><h2>지적 재산권</h2><p>서비스의 콘텐츠, 텍스트, 그래픽, 이미지 및 소프트웨어 등은 협회 또는 그의 라이선서 및 회원 회사의 소유이며, 저작권 및 기타 지적 재산권 법으로 보호됩니다. </p><h2>지적 재산권</h2><p>텍스트, 그래픽, 이미지 및 소프트웨어를 포함한 서비스의 콘텐츠는 협회 또는 협회의 라이선서 및 회원 회사의 자산이며, 저작권 및 기타 지적 재산권법으로 보호됩니다. 협회의 명시적 서면 동의 없이는 서비스에서 콘텐츠를 상업적 용도로 사용할 수 없습니다. </p><h2>책임제한 </h2><p>협회는 서비스의 운영 또는 서비스에 포함된 정보, 콘텐츠, 자료 또는 제품에 대해 명시적 또는 묵시적으로 어떤 종류의 보증도 하지 않습니다. 협회는 직접적, 간접적, 부수적, 징벌적 및 결과적 손해를 포함한 서비스 사용으로 인해 발생하는 어떤 종류의 손해에 대해서도 책임을 지지 않습니다. </p><h2>법률과 관할 법원 </h2><p>이용약관과 서비스 사용은 스위스 법률에 따라 해석되고 규정되며, 모든 분쟁은 스위스 바젤 지방법원에서 해결됩니다. </p><h2>약관 변경 </h2><p>협회는 언제든지 이 약관을 변경할 권리를 보유하며, 사용자는 주기적으로 이 약관의 변경 사항을 확인할 책임이 있습니다. 약관 변경 사항이 있더라도 서비스를 계속 사용하는 경우 변경된 약관의 적용을 받는 것으로 간주됩니다. </p><p><br></p>",
    "about_modal_subtitle": "소개",
    "about_modal_title": "Pharmaledger",
    "about_content": "<iframe style=\"width: 100%; height: 100%; margin-bottom: 24px; border: 0\" src=\"https://pharmaledger.org\"></iframe>",
    "help_modal_title": "도움말",
    "help_modal_subtitle": "FAQ",
    "help_content": "<div><p><b>EPI란 무엇인가요?</b></p><p><b>EPI</b>는 전자 제품 정보(Electronic Product Information)의 약자로, 일반적으로 제약 제품 패키지 내부에 있는 종이 제품 정보 리플릿의 전자 버전입니다. 일부 경우에는 종이 리플릿 대신 <b>EPI</b>가 대체될 수 있습니다.</p><p><b>PharmaLedger란 무엇인가요?</b></p><p>PharmaLedger Association (PLA)은 스위스에 본부를 둔 비영리 단체로, 표준화되고 신뢰성 있는 오픈 소스 플랫폼을 통해 헬스케어의 디지털 신뢰 생태계를 가능하게하고 육성하는 것을 목적으로 합니다.PLA는 환자와 다른 이해관계자들을 위한 헬스케어 및 생명 과학 분야에서 상호 이익을 달성하기 위해 협력과 혁신, 채택을 촉진합니다. PLA는 유럽 연합과 제약 산업이 공동 출자한 3년간의 블록체인 솔루션 가치 검증 프로젝트인 PharmaLedger 프로젝트를 이어받기 위해 2022년에 결성되었습니다. 추가 정보는 https://pharmaledger.org/에서 제공됩니다.</p><p><b>DataMatrix란 무엇인가요?</b></p><p>제품 포장지에 있는 바코드 유형 중 하나입니다. 검정색과 흰색의 정사각형 박스 모양의 바코드이며 이와 유사한 모양일 것입니다: <br><img src=\"./images/barcode_example.png\"></p><p><b>어떻게 앱을 사용하나요?</b></p><p><b>앱</b>의 랜딩 페이지에서 지시 사항을 따르세요... 제품 포장지에서 <b>DataMatrix</b>의 위치를 보여주는 사진이 표시됩니다. <b>DataMatrix</b>를 찾았다면, 'DataMatrix 스캔' 버튼을 클릭하세요. 애플리케이션이 카메라를 사용하도록 허용하여 <b>DataMatrix</b>를 스캔할 수 있도록 합니다. 카메라를 <b>DataMatrix</b>에 초점을 맞추어 성공적으로 패키지를 스캔하면, <b>EPI</b>가 표시됩니다. 더 많은 세부 정보를 보려면 '더 보기' 버튼을 클릭하세요.</p><p><b>DataMatrix 스캔 결과가 나오지 않는 이유는 무엇인가요?</b></p><p> 패키지의 <b>DataMatrix</b>에서 EPI가 나오지 않는 이유는 몇 가지가 있습니다. 그 중 하나는 카메라 초점입니다. 코드가 명확하게 보이는 잘 밝은 곳에서 코드를 스캔하려고 노력해보세요. 손을 잘 떨어뜨리는 것이 어렵다면, 손을 받쳐줄 수 있는 테이블을 사용해보세요.</p></div>"
  }
}

export function changeLanguage(newLang) {
  let languages = Object.keys(translations);
  if (languages.find(lang => lang === newLang)) {
    localStorage.setItem(constants.APP_LANG, newLang)
    translate();
  }
}

function setDefaultLanguage() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let appLang = urlParams.get("lang") || localStorage.getItem(constants.APP_LANG) || window.navigator.language.slice(0, 2);
  appLang = translations[appLang] ? appLang : "en"
  localStorage.setItem(constants.APP_LANG, appLang);
  setTextDirectionForLanguage(appLang);
}

export function translate() {
  setDefaultLanguage();
  let matches = document.querySelectorAll("[translate]");
  matches.forEach((item) => {
    item.innerHTML = translations[localStorage.getItem(constants.APP_LANG)][item.getAttribute('translate')];
  });
}

export function getTranslation(key) {
  setDefaultLanguage();
  return translations[localStorage.getItem(constants.APP_LANG)][key];
}

