if [ -z $1 ] ;then
  echo "Failed to execute due to missing backupIdentifier argument"
  echo "Usage example: ./restoreBackup.sh backupIdentifier"
  exit 1
fi
DOMAIN="local.epi"
rm -rf ../apihub-root/external-volume/domains/$DOMAIN/brick-storage
cp -r ../apihub-root/external-volume/domains/$DOMAIN/brick-storage-backup-$1 ../apihub-root/external-volume/domains/$DOMAIN/brick-storage
rm -rf ../apihub-root/external-volume/domains/vault
cp -r ../apihub-root/external-volume/domains/vault-backup-$1 ../apihub-root/external-volume/domains/vault
