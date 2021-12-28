import { useMemo } from "react";
import { useColorMode, Switch } from "@chakra-ui/react";

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = useMemo(() => {
    return colorMode === "dark";
  }, [colorMode]);
  return (
    <Switch
      mb={0}
      mx={4}
      h="auto"
      colorScheme="green"
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  );
};

export default DarkModeSwitch;
