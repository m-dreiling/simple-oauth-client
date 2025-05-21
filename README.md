# Simple OAuth2.0 client

&copy; 2025 Manuel Dreiling

> [!IMPORTANT]
>
> This project was created for a quick demo during a presentation. It has served its purpose and is not further maintained. It is not recommended to use this code in production.

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

### GitHub CodeSpaces

To run the app in GitHub CodeSpaces, you need to set the GitHub URL as the `REDIRECT_URI` and as an allowed origin in `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
    serverActions: {
      allowedOrigins: ["https://something.github.dev", "localhost:3000"],
    },
  },
};

export default nextConfig;
```

## Test the app

1. Open your browser and go to [localhost:3000](http://localhost:3000)
