currentDate=`date +'%m-%d-%Y'`
initialPWD=`pwd`
targetFolder=`date +'%m-%d-%Y-%H-%M'`
targetFolder="$initialPWD/generated-$targetFolder"

mkdir $targetFolder

cd ../opendsu-sdk/modules/apihub
zip -r "$targetFolder/Backend-$currentDate.zip" . -x ".git/*" "**/.git/**" "**/node_modules/**" "package-lock.json"
cd $initialPWD

cd ../gtin-resolver
zip -r "$targetFolder/GtinResolver-$currentDate.zip" . -x ".git/*" "**/.git/**" "**/node_modules/**" "package-lock.json"
cd $initialPWD

cd ../apihub-root/lightweight-pwa
zip -r "$targetFolder/LPWA-$currentDate.zip" . -x ".git/*" "**/.git/**" "**/node_modules/**" "package-lock.json"
cd $initialPWD

cd ../demiurge
zip -r "$targetFolder/Demiurge-$currentDate.zip" . -x ".git/*" "**/.git/**" "**/node_modules/**" "seed" "package-lock.json"
cd $initialPWD

cd ../dsu-fabric-ssapp
zip -r "$targetFolder/EnterpriseWallet-$currentDate.zip" . -x ".git/*" "**/.git/**" "**/node_modules/**" "seed" "package-lock.jsonn"
cd $initialPWD

cd $targetFolder
ls -alh

echo "==================================="
echo 'The above zip files were generated'
echo 'Location' $targetFolder
echo "==================================="