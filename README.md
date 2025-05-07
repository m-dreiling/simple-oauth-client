# Simple OAuth2.0 client

&copy; 2025 Manuel Dreiling

## Required environment variables

```
CLIENT_ID=
CLIENT_SECRET=
REDIRECT_URI=http://localhost:3000/callback # Change if needed
SESSION_SECRET=
STATE_SECRET=
```

For the secret generation, you can use the following command:

```bash
openssl rand -base64 32
```

To get the `CLIENT_ID` and `CLIENT_SECRET`, you need to create an OAuth2.0 application in the [GitHub developer console](https://github.com/settings/developers).

## Run the app

### Testing

```bash
npm install
npm run dev
```

## Test the app

1. Open your browser and go to [localhost:3000](http://localhost:3000)
