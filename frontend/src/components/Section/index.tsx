import {
  Container,
  LayoutProps,
  SpacerProps,
  useColorMode,
} from "@chakra-ui/react";
import { bgColor, color } from "helpers";
import useIsTouchDevice from "hooks/useDeviceDetect";
import { JSXElementConstructor, ReactElement, useMemo } from "react";

type SectionProps = {
  minW?: LayoutProps["minW"];
  padding?: SpacerProps["padding"];
  inheritBg?: boolean;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
};

const Section = ({
  minW = "120ch",
  padding = "",
  inheritBg = false,
  children,
}: SectionProps) => {
  const { colorMode } = useColorMode();
  const isMobile = useIsTouchDevice();
  const maxW = useMemo(() => {
    return isMobile ? "100%" : "140ch";
  }, [isMobile]);
  return (
    <Container
      as="section"
      color={color[colorMode]}
      bg={inheritBg ? "inherit" : bgColor[colorMode]}
      minW={minW}
      maxW={maxW as SpacerProps["maxW"]}
      py={8}
      padding={padding}
    >
      {children}
    </Container>
  );
};

export default Section;
