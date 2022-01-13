import { Button, Flex, Image, Stack, Text, theme } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useFilePicker } from "use-file-picker";

export type FileContent = {
  lastModified: number;
  name: string;
  content: string;
};

type UploadButtonProps = {
  accept: string | string[];
  maxHeight: number;
  maxWidth: number;
  title: String;
  icon?: React.ReactElement;
  onChange: (FileContent) => void;
  resetLogoRef?: React.Ref<HTMLButtonElement>;
};

const toBase64 = (arr) => {
  arr = new Uint8Array(arr);
  return btoa(arr.reduce((data, byte) => data + String.fromCharCode(byte), ""));
};

const UploadButton = ({
  accept,
  maxHeight,
  maxWidth,
  onChange,
  icon,
  title,
  resetLogoRef,
}: UploadButtonProps) => {
  const [openFileSelector, { filesContent, clear, errors, plainFiles }] =
    useFilePicker({
      accept: accept,
      readAs: "ArrayBuffer",
      imageSizeRestrictions: {
        maxHeight,
        maxWidth,
      },
    });

  useEffect(() => {
    onChange(plainFiles);
  }, [plainFiles]);

  const previews = useMemo(() => {
    if (accept.includes("image")) {
      const files = filesContent.map((file) => ({
        content: `data:image/png;base64,${toBase64(file?.content)}`,
        name: file.name,
      }));
      return files;
    }
    return filesContent;
  }, [filesContent, accept]);

  return (
    <Stack>
      <Text fontSize="sm" color="blue.300">
        Max dimensions of 200px x 200px
      </Text>
      <Flex align="center">
        <Button
          onClick={openFileSelector}
          colorScheme="blue"
          leftIcon={icon || null}
          w="max-content"
        >
          {title}
        </Button>
        {filesContent[0]?.content && (
          <Button ref={resetLogoRef} colorScheme="gray" ml={4} onClick={clear}>
            Reset
          </Button>
        )}
      </Flex>
      {errors[0] && Object.values(errors[0]).some((value) => value) && (
        <Stack>
          <Text fontSize="sm" color="red.500">
            {errors[0]?.imageHeightTooBig &&
              `File height is bigger than ${maxHeight}px!`}
          </Text>
          <Text fontSize="sm" color="red.500">
            {errors[0]?.imageWidthTooBig &&
              `File width is bigger than ${maxWidth}px!`}
          </Text>
          <Text fontSize="sm" color="red.500">
            {errors[0]?.fileSizeTooSmall && "File size is too small!"}
          </Text>
          <Text fontSize="sm" color="red.500">
            {errors[0]?.fileSizeToolarge && "File size is too large!"}
          </Text>
          <Text fontSize="sm" color="red.500">
            {errors[0]?.readerError && "Problem occured while reading file!"}
          </Text>
          <Text fontSize="sm" color="red.500">
            {errors[0]?.maxLimitExceeded && "Too many files"}
          </Text>
          <Text fontSize="sm" color="red.500">
            {errors[0]?.minLimitNotReached && "Not enought files"}
          </Text>
        </Stack>
      )}
      {previews?.length > 0 &&
        previews.map((preview, index) => (
          <Stack>
            <Text fontSize="sm">Preview</Text>
            <Image
              borderRadius="4px"
              objectFit="cover"
              boxSize="200px"
              src={preview.content}
              alt={preview.name}
            />
          </Stack>
        ))}
    </Stack>
  );
};

export default UploadButton;
