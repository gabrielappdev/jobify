import React, {
  cloneElement,
  JSXElementConstructor,
  ReactElement,
} from "react";
import { bgColor, color } from "helpers";
import {
  Container,
  LayoutProps,
  SpacerProps,
  useColorMode,
} from "@chakra-ui/react";

type SectionProps = {
  minW?: LayoutProps["minW"];
  padding?: SpacerProps["padding"];
  children: ReactElement<any, string | JSXElementConstructor<any>>;
};

const Section = ({
  minW = "120ch",
  children,
  padding = "32px 0",
}: SectionProps) => {
  const { colorMode } = useColorMode();
  return (
    <Container
      as="section"
      color={color[colorMode]}
      bg={bgColor[colorMode]}
      minW={minW}
      padding={padding}
    >
      {children}
    </Container>
  );
};

export default Section;
