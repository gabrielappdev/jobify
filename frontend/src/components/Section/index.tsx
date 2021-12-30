import React, { JSXElementConstructor, ReactElement } from "react";
import { bgColor, color } from "helpers";
import {
  Container,
  LayoutProps,
  SpacerProps,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";

type SectionProps = {
  minW?: LayoutProps["minW"];
  maxW?: LayoutProps["minW"];
  padding?: SpacerProps["padding"];
  children: ReactElement<any, string | JSXElementConstructor<any>>;
};

const Section = ({
  minW = "120ch",
  maxW = "120ch",
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
      maxW={maxW}
      py={8}
    >
      {children}
    </Container>
  );
};

export default Section;
