"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { encryptState } from "@/lib/state";

export async function signIn() {
  // Generate a random state
  const state = crypto.randomUUID();

  // Encrypt the state because it will be sent to the client
  // and then sent back to us by GitHub
  const encryptedState = await encryptState({ state });

  // Set the state as a cookie
  const cookieStore = await cookies();
  cookieStore.set("state", encryptedState, {
    httpOnly: true,
    secure: true,
    maxAge: 10 * 60, // 10 minutes
    sameSite: "lax",
  });

  // Redirect to the authorization endpoint
  const clientId = process.env.CLIENT_ID;
  const scope = ""; // + everything that is public anyway
  const redirectUri = process.env.REDIRECT_URI;
  // the prompt=consent is used to force the authorization screen to show up every time for the purpose of this demo
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&state=${state}&redirect_uri=${redirectUri}&prompt=consent`;
  redirect(authUrl);
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  cookieStore.delete("state"); // should be deleted in the callback route, but just in case
  revalidatePath("/"); // revalidate the root path to update everything including the header
}
