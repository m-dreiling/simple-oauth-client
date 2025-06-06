import { FaUserSecret } from "react-icons/fa6";

import { EmptyState, Icon, VStack } from "@chakra-ui/react";

export default function LoginHint() {
  return (
    <EmptyState.Root size="lg">
      <EmptyState.Content>
        <EmptyState.Indicator>
          <Icon>
            <FaUserSecret />
          </Icon>
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>You are not logged in</EmptyState.Title>
          <EmptyState.Description>
            Please log in to access this application.
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
