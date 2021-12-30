import React, { JSXElementConstructor, ReactElement, useMemo } from "react";
import { bgColor, color } from "helpers";
import {
  Container,
  LayoutProps,
  SpacerProps,
  theme,
  useColorMode,
  useMediaQuery,
} from "@chakra-ui/react";
import useIsTouchDevice from "hooks/useDeviceDetect";

type SectionProps = {
  minW?: LayoutProps["minW"];
  padding?: SpacerProps["padding"];
  children: ReactElement<any, string | JSXElementConstructor<any>>;
};

const Section = ({ minW = "120ch", children }: SectionProps) => {
  const { colorMode } = useColorMode();
  const isMobile = useIsTouchDevice();
  const maxW = useMemo(() => {
    return isMobile ? "100%" : "120ch";
  }, [isMobile]);
  return (
    <Container
      as="section"
      color={color[colorMode]}
      bg={bgColor[colorMode]}
      minW={minW}
      maxW={maxW as SpacerProps["maxW"]}
      py={8}
      borderY={`1px solid ${theme.colors.gray[100]}`}
    >
      {children}
    </Container>
  );
};

export default Section;
