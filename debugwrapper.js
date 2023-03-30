import bodyParser from "body-parser";
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
import { v4 as uuidv4 } from "uuid";

//Point this to the Lambda function entry point
import { handler } from "./index.js";

import express from "express";

import cors from "cors";

const processRequest = (req, res, next) => {
  const event = {
    path: req.path,
    headers: req.headers,
    body: req.body,
    queryStringParameters: req.query,
  };

  const context = {
    awsRequestId: uuidv4(),
  };

  handler(event, context).then((response) => {
    const body = JSON.parse(response.body);
    res.status(response.statusCode).json(body);
    res.end();
  });
};

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(jsonParser, processRequest);

app.listen(4001);

console.log("Listening on 4001");
