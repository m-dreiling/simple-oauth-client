"use client";

import { useSearchParams } from "next/navigation";
import { FaUserSlash } from "react-icons/fa6";

import { EmptyState, Icon, VStack } from "@chakra-ui/react";

enum Error {
  AccessDenied = "AccessDenied",
  InvalidRequest = "InvalidRequest",
}

const errorMap = {
  [Error.AccessDenied]:
    "Access denied. You need to authorize this application to proceed.",
  [Error.InvalidRequest]: "Invalid request. Please try again.",
};

export default function AuthErrorPage() {
  const search = useSearchParams();
  const error = search.get("error") as Error;

  return (
    <EmptyState.Root size="lg">
      <EmptyState.Content>
        <EmptyState.Indicator>
          <Icon>
            <FaUserSlash />
          </Icon>
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title>There was a problem during login</EmptyState.Title>
          <EmptyState.Description>
            {errorMap[error] || "An unknown error occurred."}
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
