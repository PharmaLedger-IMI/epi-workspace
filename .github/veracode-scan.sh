if [ -z "$1" ];
then
    echo "This script needs one argument, the zip file (including the path) that needs to be scan!"
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
