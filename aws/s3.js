import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export default {
  send: async function (command) {
    const client = new S3Client({ region: "ap-southeast-2" });

    await client.send(new PutObjectCommand(command));
  },
};
