import { Flex, useColorMode, FlexProps } from "@chakra-ui/react";
import { bgColor, color } from "helpers";

const Container = (props: FlexProps) => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  );
};

export default Container;
