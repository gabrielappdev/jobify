import { Box, Container, theme, useColorMode } from "@chakra-ui/react";
import { navigationBgColor } from "../../helpers";

type GenericPageHeroProps = {
  children: React.ReactNode;
};

const GenericPageHero = ({ children }: GenericPageHeroProps) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      w="100%"
      minH="30vh"
      py={8}
      as="header"
      background={navigationBgColor[colorMode]}
      borderY={`2px solid ${theme.colors.gray[200]}`}
    >
      <Container pt="60px" maxW="140ch">
        {children}
      </Container>
    </Box>
  );
};

export default GenericPageHero;
