initialPWD=`pwd`
if [ -n "$1" ]
then
  currentDate=``
  targetFolder=``
else
  currentDate="-"`date +'%m-%d-%Y'`
  targetFolder="-"`date +'%m-%d-%Y-%H-%M'`
fi

targetFolder="$initialPWD/generated$targetFolder"
echo $targetFolder

mkdir $targetFolder

mkdir $targetFolder/trust-loader
git clone http://github.com/opendsu/trust-loader $targetFolder/trust-loader
cd $targetFolder/trust-loader
rm -rf .git
zip -r "$targetFolder/TrustLoader$currentDate.zip" .
cd .. && rm -rf trust-loader
cd $initialPWD

mkdir $targetFolder/octopus
git clone http://github.com/opendsu/octopus $targetFolder/octopus
cd $targetFolder/octopus
rm -rf .git
rm package_lock.json
zip -r "$targetFolder/Octopus$currentDate.zip" .
cd .. && rm -rf octopus

cd $initialPWD

mkdir $targetFolder/common-browser-libs
cp ../opendsu-sdk/psknode/bundles/iframeBoot.js $targetFolder/common-browser-libs

cd $targetFolder/common-browser-libs
zip -r "$targetFolder/CommonBrowserLibs$currentDate.zip" .

cd .. && rm -rf common-browser-libs
cd $initialPWD

mkdir $targetFolder/backend
cp -r ../gtin-resolver/lib/apihubMappingEngine $targetFolder/backend/apihubMappingEngine
cp -r ../gtin-resolver/lib/apihubMappingEngineMessageResults $targetFolder/backend/apihubMappingEngineMessageResults
cp -r ../gtin-resolver/lib/gtinOwner $targetFolder/backend/gtinOwner
cp -r ../gtin-resolver/lib/leaflet-web-api $targetFolder/backend/leaflet-web-api
cp ../opendsu-sdk/psknode/bundles/openDSU.js $targetFolder/backend
cp ../opendsu-sdk/psknode/bundles/pskWebServer.js $targetFolder/backend

cd $targetFolder/backend
zip -r "$targetFolder/Backend$currentDate.zip" .

cd .. && rm -rf backend
cd $initialPWD

cd ../gtin-resolver/lib
zip -r "$targetFolder/GtinResolver$currentDate.zip" . -x "apihubMappingEngine/*" "apihubMappingEngineMessageResults/*" "gtinOwner/*" "leaflet-web-api/*" "utils/flags/*"
cd $initialPWD

cd ../apihub-root/lightweight-pwa
zip -r "$targetFolder/LPWA$currentDate.zip" . -x ".git/*" "**/.git/**" "**/node_modules/**" "package-lock.json"
cd $initialPWD

cd ../demiurge
zip -r "$targetFolder/Demiurge$currentDate.zip" . -x ".git/*" "**/.git/**" "**/node_modules/**" "seed" "package-lock.json"
cd $initialPWD

cd ../dsu-fabric-ssapp
zip -r "$targetFolder/EnterpriseWallet$currentDate.zip" . -x ".git/*" "**/.git/**" "**/node_modules/**" "seed" "package-lock.json"
cd $initialPWD

cd $targetFolder
ls -alh

echo "==================================="
echo 'The above zip files were generated'
echo 'Location' $targetFolder
echo "==================================="
