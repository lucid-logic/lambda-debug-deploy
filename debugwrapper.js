const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
const { v4: uuidv4 } = require("uuid");

//Point this to the Lambda function entry point
const layoutHandler = require("./index.js");

const express = require("express");

const cors = require("cors");

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

  layoutHandler.handler(event, context).then((response) => {
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

app.listen(3000);

console.log("Listening on 3000");
