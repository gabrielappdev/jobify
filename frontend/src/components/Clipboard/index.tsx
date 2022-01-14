import React, { useState, useEffect } from "react";
import { IconButton, Tooltip, Flex, useClipboard } from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import _ from "lodash";

type ClipboardProps = {
  children: React.ReactElement;
  value: string;
  buttonSize?: "sm" | "md" | "lg";
  dismissInverval?: number;
};

const Clipboard = ({
  children,
  value,
  buttonSize = "md",
  dismissInterval = 500,
}) => {
  const { onCopy, hasCopied } = useClipboard(value);
  const [colorScheme, setColorScheme] = useState("gray");

  const handleContentCopy = () => {
    onCopy();
  };

  useEffect(() => {
    if (hasCopied) {
      setColorScheme("blue");
      _.debounce(() => {
        setColorScheme("gray");
      }, dismissInterval)();
    }
  }, [dismissInterval, hasCopied]);

  return (
    <Flex align="Center">
      {children}
      <Tooltip hasArrow label="Copied!" isOpen={colorScheme === "blue"}>
        <IconButton
          ml={2}
          size={buttonSize}
          icon={<CopyIcon />}
          aria-label="Copy content to clipboard"
          colorScheme={colorScheme}
          onClick={handleContentCopy}
          variant="outline"
          isRound
          border="none"
        />
      </Tooltip>
    </Flex>
  );
};

export default Clipboard;
