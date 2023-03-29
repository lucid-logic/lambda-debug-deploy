import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

export default {
  write: async function (tableName, item) {
    return new Promise((resolve, reject) => {
      const dynamodb = new DynamoDB();
      const dynamodbDoc = DynamoDBDocument.from(dynamodb);

      const params = {
        TableName: tableName,
        Item: item,
      };

      dynamodbDoc.put(params, function (err, data) {
        if (err) {
          console.log("Error", err);
          return resolve(err);
        }
        console.log("Success", data);
        return resolve(data);
      });
    });
  },
};
