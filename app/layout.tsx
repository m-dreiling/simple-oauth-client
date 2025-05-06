import { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "@/components/ui/header";
import Provider from "@/components/ui/provider";
import { Container } from "@chakra-ui/react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Simple OAuth 2.0 Client",
  description: "A simple OAuth 2.0 client to demonstrate the OAuth 2.0 flow.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head />
      <body suppressHydrationWarning>
        <Provider>
          <Header />
          <Container as="main" py={3}>
            {children}
          </Container>
        </Provider>
      </body>
    </html>
  );
}
