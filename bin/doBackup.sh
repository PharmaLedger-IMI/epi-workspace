if [ -z $1 ] ;then
  echo "Failed to execute due to missing backupIdentifier argument"
  echo "Usage example: ./doBackup.sh backupIdentifier"
  exit 1
fi
DOMAIN="local.epi"
cp -r ../apihub-root/external-volume/domains/$DOMAIN/brick-storage ../apihub-root/external-volume/domains/$DOMAIN/brick-storage-backup-$1
cp -r ../apihub-root/external-volume/domains/vault ../apihub-root/external-volume/domains/vault-backup-$1
