"use client";

import { useFormStatus } from "react-dom";

import { FaGithub } from "react-icons/fa";

import { Button } from "@chakra-ui/react";

export default function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      loading={pending}
      loadingText="Redirecting..."
      spinnerPlacement="start"
    >
      <FaGithub />
      Login with GitHub
    </Button>
  );
}
