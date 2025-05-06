import { FaLocationDot } from "react-icons/fa6";

import { Avatar, Heading, HStack, Icon, Span, VStack } from "@chakra-ui/react";

export default function UserInfo({
  name,
  avatarUrl,
  location,
}: Readonly<{
  name: string;
  avatarUrl: string;
  location: string;
}>) {
  return (
    <VStack gap={3}>
      <Heading as="h1" size="2xl">
        You are logged in as:
      </Heading>
      <HStack gap={3}>
        <Avatar.Root size="xl" aria-label="User Avatar">
          <Avatar.Fallback name={name} aria-hidden />
          <Avatar.Image src={avatarUrl} aria-hidden />
        </Avatar.Root>
        <VStack align="start" gap={1}>
          <Span fontSize="lg" fontWeight="bold" lineHeight="shorter">
            {name}
          </Span>
          <HStack color="fg.muted" gap={1}>
            <Icon>
              <FaLocationDot />
            </Icon>
            <Span aria-label="Location" lineHeight="shorter">
              {location}
            </Span>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
}
