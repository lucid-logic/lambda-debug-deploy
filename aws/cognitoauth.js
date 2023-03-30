import jwt from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import { COGNITO_JWK } from "../aws-settings.js";

export const verifyIDToken = (event) => {
  const eventHeaders = Object.fromEntries(
    Object.entries(event.headers).map(([k, v]) => [k.toLowerCase(), v])
  );
  if (
    !eventHeaders["authorization"] ||
    eventHeaders["authorization"].split(" ")[0] !== "Bearer"
  ) {
    return null;
  }
  const token = eventHeaders["authorization"].split(" ")[1];

  try {
    var pem = jwkToPem(COGNITO_JWK);

    var verified = jwt.verify(token, pem, { algorithms: ["RS256"] });
  } catch (err) {
    console.log(err);
    return null;
  }
  return { verified };
};
