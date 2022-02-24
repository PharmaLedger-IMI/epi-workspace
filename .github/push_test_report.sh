#!/bin/sh

setup_git() {
  echo ${GIT_TOKEN}
  git clone https://${GIT_TOKEN}@github.com/PharmaLedger-IMI/epi-workspace.git ../results > /dev/null 2>&1
  ls -al
  cd ../results
  ls -al
  git config user.email "psk.build.track@gmail.com"
  git config user.name "PSK Build Tracker"
  git checkout test_reports
}

commit_test_report() {
  git pull --all
  cp ../epi-workspace/testReport.html testReport.html
  ls -al
  git add -f testReport.html
  git commit --message "Github Actions build: $GITHUB_RUN_NUMBER"
}

push_to_github() {
  git push origin test_reports
  cd .. && rm -rf results
}

setup_git
commit_test_report
push_to_github
