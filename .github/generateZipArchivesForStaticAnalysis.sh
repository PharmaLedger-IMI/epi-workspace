currentDate=`date +'%m-%d-%Y'`
initialPWD=`pwd`
targetFolder=`date +'%m-%d-%Y-%H-%M'`
targetFolder="$initialPWD/generated-$targetFolder"

mkdir $targetFolder
mkdir $targetFolder/backend

cp -r ../gtin-resolver/lib/apihubMappingEngine $targetFolder/backend/apihubMappingEngine
cp -r ../gtin-resolver/lib/apihubMappingEngineMessageResults $targetFolder/backend/apihubMappingEngineMessageResults
cp -r ../gtin-resolver/lib/gtinOwner $targetFolder/backend/gtinOwner
cp -r ../gtin-resolver/lib/leaflet-web-api $targetFolder/backend/leaflet-web-api
cp ../opendsu-sdk/psknode/bundles/openDSU.js $targetFolder/backend
cp ../opendsu-sdk/psknode/bundles/pskWebServer.js $targetFolder/backend

cd $targetFolder/backend
zip -r "$targetFolder/Backend-$currentDate.zip" .

cd .. && rm -rf backend
cd $initialPWD

cd ../gtin-resolver/lib
zip -r "$targetFolder/GtinResolver-$currentDate.zip" . -x "apihubMappingEngine/*" "apihubMappingEngineMessageResults/*" "gtinOwner/*" "leaflet-web-api/*" "utils/flags/*"
cd $initialPWD

cd ../apihub-root/lightweight-pwa
zip -r "$targetFolder/LPWA-$currentDate.zip" . -x ".git/*" "**/.git/**" "**/node_modules/**" "package-lock.json"
cd $initialPWD

cd ../demiurge
zip -r "$targetFolder/Demiurge-$currentDate.zip" . -x ".git/*" "**/.git/**" "**/node_modules/**" "seed" "package-lock.json"
cd $initialPWD

cd ../dsu-fabric-ssapp
zip -r "$targetFolder/EnterpriseWallet-$currentDate.zip" . -x ".git/*" "**/.git/**" "**/node_modules/**" "seed" "package-lock.json"
cd $initialPWD

cd $targetFolder
ls -alh

echo "==================================="
echo 'The above zip files were generated'
echo 'Location' $targetFolder
echo "==================================="