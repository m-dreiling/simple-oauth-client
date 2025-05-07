import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

import { decryptState } from "@/lib/state";

export async function GET(request: NextRequest) {
  // get the code and state from the query params
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");

  // check if we got a code and state
  if (!code || !state) {
    // check for errors
    const error = request.nextUrl.searchParams.get("error");

    if (error) {
      // check if the error is access denied
      // this is the case when the user denies the authorization
      if (error === "access_denied") {
        redirect("/auth-error?error=AccessDenied");
      }
    }

    // if we don't have a code or state, redirect to the auth error page
    redirect("/auth-error?error=InvalidRequest");
  }

  // check if the state is valid
  const cookieStore = await cookies();
  const stateCookie = cookieStore.get("state");

  // check if we have a state cookie
  if (!stateCookie?.value) {
    // if we don't have a state cookie, redirect to the auth error page
    redirect("/auth-error?error=InvalidRequest");
  }

  // delete the state cookie
  cookieStore.delete("state");

  // decrypt the state cookie
  // using a encrypted state cookie to prevents users from brute forcing the code when they can set the state
  const decryptedState = await decryptState(stateCookie.value);

  // check if the state cookie is valid
  if (
    !decryptedState ||
    !decryptedState?.state ||
    decryptedState.state !== state
  ) {
    // if the state cookie is invalid, redirect to the auth error page
    redirect("/auth-error?error=InvalidRequest");
  }

  // use the code to get the access token in JSON format
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  const tokenUrl = "https://github.com/login/oauth/access_token";

  // error handling omitted for brevity
  const data = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: process.env.REDIRECT_URI,
    }),
  }).then(async (res) => await res.json());

  // only return one half of the token for the demo
  data.access_token = data.access_token.substring(
    0,
    data.access_token.length / 2
  );

  // return the access token
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
