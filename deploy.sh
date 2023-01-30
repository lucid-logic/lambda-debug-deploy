#!/bin/bash

rm -fr node_modules
rm -fr package-lock.json
npm install --production
zip -j -r func.zip *  -x "*.git*" -x "deploy.sh" -x "app.js"

aws lambda update-function-code --function-name ziptest --zip-file fileb://func.zip

rm func.zip
npm install