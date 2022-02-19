import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
} from "@chakra-ui/react";
import { forwardRef, useEffect } from "react";

type ModalDialogProps = {
  data: {
    Header?: React.ReactNode;
    Footer?: React.ReactNode;
    hasNotOverlay?: Boolean;
    size:
      | "xs"
      | "sm"
      | "md"
      | "lg"
      | "xl"
      | "2xl"
      | "3xl"
      | "4xl"
      | "5xl"
      | "6xl"
      | "full";
    onClose?: () => void;
  };
  children: React.ReactNode;
};

type CurrentProps = {
  open?: () => void;
  close?: () => void;
};

const ModalDialog = forwardRef(
  (
    { data, children }: ModalDialogProps,
    ref: HTMLInputElement & { current: CurrentProps }
  ) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
      if (ref) {
        ref.current = {
          open: () => onOpen(),
          close: () => onClose(),
        };
      }
    }, [onOpen, onClose, ref]);

    useEffect(() => {
      if (!isOpen && data?.onClose) {
        data.onClose();
      }
    }, [isOpen && data?.onClose]);

    return (
      <>
        <Modal size={data?.size ?? "md"} isOpen={isOpen} onClose={onClose}>
          {!data?.hasNotOverlay && <ModalOverlay />}
          <ModalContent>
            {data?.Header && <ModalHeader>{data?.Header}</ModalHeader>}
            <ModalCloseButton onClick={() => onClose()} />
            {children && <ModalBody>{children}</ModalBody>}

            {data?.Footer && (
              <ModalFooter>
                <Flex align="center">
                  <Button mr={4} colorScheme="blue" onClick={onClose}>
                    Close
                  </Button>
                  {data?.Footer}
                </Flex>
              </ModalFooter>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
);

export default ModalDialog;
