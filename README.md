# lambda-debug-deploy

Template for locally debugging lambda functions and then deploying as a zip

Change `lambdafunction` in deploy.sh to your lambda function on AWS

To start the local server `npm run dev`

Connect on port 4000 by default.

To deploy run deploy.sh

Do not modify debugwrapper. Index.js is the entry point.
