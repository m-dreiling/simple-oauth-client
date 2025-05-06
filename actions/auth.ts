"use server";

import { revalidatePath } from "next/cache";
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
    sameSite: "lax",
  });

  // Redirect to the authorization endpoint
  const clientId = process.env.CLIENT_ID;
  const scope = ""; // + everything that is public anyway
  const redirectUri = process.env.REDIRECT_URI;
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&state=${state}&redirect_uri=${redirectUri}&prompt=consent`;
  redirect(authUrl);
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  cookieStore.delete("state"); // should be deleted in the callback route, but just in case
  revalidatePath("/"); // revalidate the root path to update everything including the header
}
