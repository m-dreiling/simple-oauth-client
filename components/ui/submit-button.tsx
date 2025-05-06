"use client";

import { useFormStatus } from "react-dom";

import { Button, ConditionalValue, Icon, Span } from "@chakra-ui/react";

export default function SubmitButton({
  icon,
  text,
  loadingText,
  variant,
  colorPalette,
}: Readonly<{
  icon: React.ReactNode;
  text: string;
  loadingText: string;
  variant: ConditionalValue<
    "outline" | "solid" | "subtle" | "surface" | "ghost" | "plain" | undefined
  >;
  colorPalette?: ConditionalValue<"red">;
}>) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      loading={pending}
      loadingText={loadingText}
      spinnerPlacement="start"
      variant={variant}
      colorPalette={colorPalette}
    >
      <Icon>{icon}</Icon>
      <Span>{text}</Span>
    </Button>
  );
}
