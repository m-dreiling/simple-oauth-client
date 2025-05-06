import Link from "next/link";
import { FaUserLock } from "react-icons/fa";

import AuthButton from "@/components/ui/auth-button";
import {
  Box,
  Container,
  Flex,
  Icon,
  Link as ChakraLink,
  Span,
} from "@chakra-ui/react";

export default function Header() {
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
        <Flex alignItems="center" justify="space-between" gap={3} py={3}>
          <ChakraLink
            asChild
            title="Go to home page"
            fontSize="2xl"
            fontWeight="bold"
          >
            <Link href="/" draggable={false}>
              <Icon>
                <FaUserLock />
              </Icon>
              <Span hideBelow="sm">Simple OAuth 2.0 Client</Span>
            </Link>
          </ChakraLink>
          <AuthButton />
        </Flex>
      </Container>
    </Box>
  );
}
