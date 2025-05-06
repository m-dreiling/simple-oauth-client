import "server-only";

import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export type SessionPayload = {
  id: string;
  name: string;
  avatarUrl: string;
  location: string;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(
  session: string | undefined = ""
): Promise<(JWTPayload & SessionPayload) | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as JWTPayload & SessionPayload;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return null; // Treat any error as invalid session
  }
}

export async function createSession(payload: SessionPayload) {
  const session = await encrypt(payload);
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60, // 7 days
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    return null;
  }

  return decrypt(session.value);
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
