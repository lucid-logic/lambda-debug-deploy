#!/bin/bash

rm -fr node_modules
rm -fr package-lock.json
npm install --production
zip -r func.zip *  -x "*.git*" -x "deploy.sh" -x "app.js" -x "README.md" -x "debugwrapper.js"

aws lambda update-function-code --function-name lambdafunction --zip-file fileb://func.zip

rm func.zip
npm install