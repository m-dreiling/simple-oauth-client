import { FaXmark } from 'react-icons/fa6';

import {
  Button,
  ConditionalValue,
  Dialog,
  Icon,
  Portal,
  Span,
} from '@chakra-ui/react';

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
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          type="submit"
          loadingText={loadingText}
          spinnerPlacement="start"
          variant={variant}
          colorPalette={colorPalette}
        >
          <Icon>{icon}</Icon>
          <Span>{text}</Span>
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Not implemented!</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>This feature is not implemented yet.</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button>
                  <Icon>
                    <FaXmark />
                  </Icon>
                  <Span>Close</Span>
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
