import Link from "next/link";
import { FaUserLock } from "react-icons/fa6";

import AuthButton from "@/components/ui/auth-button";
import {
  Box,
  Container,
  Flex,
  Icon,
  Link as ChakraLink,
  Span,
  VStack,
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
    >
      <Container>
        <Flex alignItems="center" justify="space-between" gap={3} py={3}>
          <ChakraLink asChild title="Go to home page">
            <Link href="/" draggable={false}>
              <Icon fontSize="2xl" fontWeight="bold">
                <FaUserLock />
              </Icon>
              <VStack gap={0} align="start" ml={2} hideBelow="sm">
                <Span
                  hideBelow="sm"
                  lineHeight="shorter"
                  fontSize="2xl"
                  fontWeight="bold"
                >
                  Simple OAuth 2.0 Client
                </Span>
                <Span lineHeight="shorter" color="fg.muted" fontSize="xs">
                  &copy; {new Date().getFullYear()} Manuel Dreiling
                </Span>
              </VStack>
            </Link>
          </ChakraLink>
          <AuthButton />
        </Flex>
      </Container>
    </Box>
  );
}
