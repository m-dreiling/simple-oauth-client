"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn() {
  // Generate a random state
  const state = crypto.randomUUID();

  // Set the state as a cookie
  const cookieStore = await cookies();
  cookieStore.set("state", state, {
    httpOnly: true,
    secure: true,
    maxAge: 10 * 60, // 10 minutes
  });

  // Redirect to the authorization endpoint
  const clientId = process.env.CLIENT_ID;
  const scope = "user:read user:email";
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&state=${state}`;
  redirect(authUrl);
}
