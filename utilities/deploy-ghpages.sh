#!/bin/bash

echo -e "CURRENT_BRANCH: ${TRAVIS_BRANCH}\n"
echo -e "PULL_REQUEST: ${TRAVIS_PULL_REQUEST}\n"

if [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  if [ "$TRAVIS_BRANCH" == "master" ]; then

    cd public
    echo "www.ng-next.com" > CNAME
    git init
    git config user.name "Andreas Grimm"
    git config user.email "schaeferitsolutions@gmail.com"
    git add .
    git commit -m "Deployed to Github Pages"
    git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
  fi
fi
