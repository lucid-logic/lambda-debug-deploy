# lambda-debug-deploy

Template for locally debugging lambda functions and then deploying as a zip

Change `lambdafunction` in deploy.sh to your lambda function on AWS

To start the local server `npm run dev`

Connect on port 4000 by default.

To deploy run deploy.sh

Do not modify debugwrapper. Index.js is the entry point.

## AWS API Gateway Setup

### Option 1 from scratch

1. Create API and select `REST API` click build
2. Choose `REST` and `New API` Give the API a name, description and choose Regional. Create API
3. Resources, Actions Button, create Resource, enter path
4. Click newly created path, Actions, create Resource, tick proxy resource, tick Enable Gateway Cors, click Create Resource
5. Lambda Function Proxy, enter the lambda funtion name, Save and OK.
6. Click on ANY method, click actions and remove method
7. Click on Resources and then /{proxy+}. Actions Create method OPTIONS enter Lambda function
8. Click on Resources and then /{proxy+}. Actions Create method POST enter Lambda function
9. Click on OPTIONS, then integration request. Select Mock
10. Click on Resources and then /{proxy+}. Actions Enable Cors. Access-Control-Allow-Credentials `true`. Enable Cors and replace existing CORS headers
11. Actions Deploy. New Stage name (Prod), Deploy

###Option 2 Copy an existing API already set up (test_REST)
If you do this change the post to mock and then re add the lambda function
