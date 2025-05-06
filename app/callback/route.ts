import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // get the code and state from the query params
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");

  // check if we got a code and state
  if (!code || !state) {
    return new Response("Missing code or state", {
      status: 400,
    });
  }

  // check if the state is valid
  const cookieStore = await cookies();
  const stateCookie = cookieStore.get("state");

  if (!stateCookie?.value || state !== stateCookie.value) {
    return new Response("Invalid state", {
      status: 400,
    });
  }

  // use the code to get the access token in JSON format
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  const tokenUrl = "https://github.com/login/oauth/access_token";

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });

  if (!response.ok) {
    console.error("Failed to get access token:", response.statusText);
    return new Response("Failed to get access token", {
      status: 500,
    });
  }

  const data = await response.json();

  // check if we got an access token
  if (!data.access_token) {
    // the main reason for this is that the code is invalid, used, or expired
    return new Response("Error getting access token", {
      status: 400,
    });
  }
}
