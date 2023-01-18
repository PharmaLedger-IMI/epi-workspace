if [ -z "$1" ];
then
    echo "This script needs one argument, the zip file (including the path) that needs to be scan!"
    exit 1
fi

if [ -z "$VERACODE_API_ID" ] || [ -z $VERACODE_API_KEY ];
then
    echo "VERACODE_API_ID or VERACODE_API_KEY env vars are not set."
    echo "VERACODE_API_ID=$VERACODE_API_ID"
    echo "VERACODE_API_KEY=$VERACODE_API_KEY"
    echo "Both env vars are mandatory!"
    exit 1
fi

if [ -d ~/Downloads/pipeline-scan-LATEST ];
then
    echo "Veracode pipeline scan tool available, skipping the installation process."
else
    echo "Veracode pipeline scan tool not available. Proceeding with the installation..." 
    curl --show-error --fail -O --output-dir ~/Downloads https://downloads.veracode.com/securityscan/pipeline-scan-LATEST.zip
    unzip -o ~/Downloads/pipeline-scan-LATEST.zip -d ~/Downloads/pipeline-scan-LATEST
fi

java -jar ~/Downloads/pipeline-scan-LATEST/pipeline-scan.jar --verbose true --veracode_api_id "$VERACODE_API_ID" --veracode_api_key "$VERACODE_API_KEY" --file $1
