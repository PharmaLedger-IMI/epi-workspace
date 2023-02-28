if [ -z $1 ] ;then
  echo "Failed to execute due to missing backupIdentifier argument"
  echo "Usage example: ./doBackup.sh backupIdentifier"
  exit 1
fi

cp -r ../apihub-root/external-volume/domains/epi/brick-storage external-volume/domains/epi/brick-storage-backup-$1
cp -r ../apihub-root/external-volume/domains/vault external-volume/domains/vault-backup-$1
