import { Stack, Text, useColorMode } from "@chakra-ui/react";
import _ from "lodash";
import React, { useCallback, useEffect } from "react";
import RichTextEditor, { EditorValue } from "react-rte";
import { toolbarConfig } from "../../constants";
import { InjectWrapper } from "./styles";

interface EditorProps {
  onValueChange: (value: String) => void;
  title?: string;
  initialValue?: string;
}

export const Editor: React.FC<EditorProps> = ({
  onValueChange,
  title,
  initialValue = "",
}) => {
  const { colorMode } = useColorMode();
  const [value, setValue] = React.useState<EditorValue>(
    initialValue
      ? RichTextEditor.createValueFromString(initialValue, "html")
      : RichTextEditor.createEmptyValue()
  );
  const memoizedChage = useCallback(
    _.debounce((value) => {
      onValueChange(value.toString("html"));
    }, 500),
    []
  );

  useEffect(() => {
    memoizedChage(value);
  }, [value]);

  return (
    <InjectWrapper colorMode={colorMode}>
      <Stack w="100%" gap={1}>
        {title && <Text size="sm">{title}</Text>}
        <RichTextEditor
          toolbarConfig={toolbarConfig}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          value={value}
        />
      </Stack>
    </InjectWrapper>
  );
};

export default Editor;
