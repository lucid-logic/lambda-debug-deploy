import dynamoDb from "./aws/dynamo.js";
import { verifyIDToken } from "./aws/cognitoauth.js";

const tableName = "dynamoDbTable";

export const handler = async (event, context) => {
  //Get the Cognito user if there is one
  const authUser = verifyIDToken(event);

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": "Authorization",
  };
  if (event.httpMethod.toUpperCase() == "OPTIONS") {
    console.log("OPTIONS");
    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify({ message: "ok" }),
    };
    console.log(response);
    return response;
  }

  var result = { statusCode: 500, body: "Not implemented" };
  console.log(event.path);
  switch (event.path) {
    case "/path/function1":
      result = await functiona(event, context);
      break;
    case "/path/function2":
      result = await functionb(event, context);
      break;
    default:
      result = { statusCode: 500, body: event.path + " Not implemented" };
  }

  return {
    statusCode: result.statusCode,
    //  Uncomment below to enable CORS requests
    headers: headers,
    body: JSON.stringify(result.body),
  };
};

async function functiona(event, context) {
  return { statusCode: 200, body: { guid: context.awsRequestId } };
}

async function functionb(event, context) {
  return { statusCode: 200, body: { guid: context.awsRequestId } };
}
