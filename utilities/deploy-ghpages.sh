#!/bin/bash

cd public
echo "www.ng-next.com" > CNAME
git init
git config user.name "Andreas Grimm"
git config user.email "schaeferitsolutions@gmail.com"
git add .
git commit -m "Deployed to Github Pages"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
