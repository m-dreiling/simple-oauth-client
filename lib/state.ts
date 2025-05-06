import "server-only";

import { JWTPayload, jwtVerify, SignJWT } from "jose";

const secretKey = process.env.STATE_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export type StatePayload = {
  state: string;
};

export async function encryptState(payload: StatePayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(encodedKey);
}

export async function decryptState(
  session: string | undefined = ""
): Promise<(JWTPayload & StatePayload) | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as JWTPayload & StatePayload;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return null; // Treat any error as invalid session
  }
}
