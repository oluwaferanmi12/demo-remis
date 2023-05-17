import { extractCookie } from "./getTokenFromCookie";
import jwt_decode from "jwt-decode";

export const validateCookie = (req_payload: any) => {
  //   console.log("dakdfdf", req_payload);
  const cookies = req_payload?.headers?.cookie
    ? req_payload.headers.cookie
    : "";
  if (!cookies) {
    return null;
  }
  let cookieExtract = extractCookie(cookies as string);
  if (!cookieExtract) {
    return null;
  }
  // try to decode the cookie sent

  let jwtDecoded: { ext: number };
  try {
    jwtDecoded = jwt_decode(cookieExtract);
  } catch (error) {
    return null;
  }

  if (Math.floor(Date.now() / 1000) >= jwtDecoded.ext) {
    return null;
  }

  return cookies;

  //   return
  // do the validation to see if the token has not expired
};
