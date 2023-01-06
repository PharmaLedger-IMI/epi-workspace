currentDate=`date +'%m-%d-%Y'`
initialPWD=`pwd`

cd ../opendsu-sdk/modules/apihub
zip -r "$initialPWD/Backend-$currentDate.zip" . -x "**/.git/**" "**/node_modules/**" "package-lock.json"
cd $initialPWD

cd ../gtin-resolver
zip -r "$initialPWD/GtinResolver-$currentDate.zip" . -x "**/.git/**" "**/node_modules/**" "package-lock.json"
cd $initialPWD

cd ../apihub-root/lightweight-pwa
zip -r "$initialPWD/LPWA-$currentDate.zip" . -x "**/.git/**" "**/node_modules/**" "package-lock.json"
cd $initialPWD

cd ../demiurge
zip -r "$initialPWD/Demiurge-$currentDate.zip" . -x "**/.git/**" "**/node_modules/**" "seed" "package-lock.json"
cd $initialPWD

cd ../dsu-fabric-ssapp
zip -r "$initialPWD/EnterpriseWallet-$currentDate.zip" . -x "**/.git/**" "**/node_modules/**" "seed" "package-lock.jsonn"
cd $initialPWD