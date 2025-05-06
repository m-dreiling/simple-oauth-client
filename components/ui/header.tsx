import Link from "next/link";
import { FaUserLock } from "react-icons/fa";

import { signIn } from "@/actions/actions";
import { Box, Container, Flex, Link as ChakraLink } from "@chakra-ui/react";

import LoginButton from "./login-button";

export default async function Header() {
  return (
    <Box
      as="header"
      width="100%"
      position="sticky"
      top={0}
      zIndex={1}
      bg="bg"
      borderBottomWidth={1}
      _print={{ display: "none" }}
    >
      <Container>
        <Flex alignItems="center" justify="space-between" py={3}>
          <ChakraLink
            asChild
            title="Go to home page"
            fontSize="2xl"
            fontWeight="bold"
          >
            <Link href="/" draggable={false}>
              <FaUserLock />
              Simple OAuth Client
            </Link>
          </ChakraLink>
          <form action={signIn}>
            <LoginButton />
          </form>
        </Flex>
      </Container>
    </Box>
  );
}
