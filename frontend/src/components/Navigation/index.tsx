import { useEffect, useState } from "react";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  Button,
  Flex,
  useColorMode,
  IconButton,
  Spacer,
  theme,
  Container,
  Text,
  CloseButton,
} from "@chakra-ui/react";
import Image from "next/image";
import { CategoryProps, GlobalNotificationProps } from "types";
import { AddIcon, ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import DarkModeSwitch from "../DarkModeSwitch";
import useIsTouchDevice from "hooks/useDeviceDetect";
import { navigationBgColor } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { SET_GLOBAL_DATA } from "../../store/actions";
import { ReducersProps } from "../../store/reducers";

import { AnimatedWrapper } from "./styles";

export type NavigationProps = {
  data: {
    logo: string;
    price: Number;
    categories: CategoryProps[];
    globalNotification?: GlobalNotificationProps;
  };
};

const Navigation = ({ data }: NavigationProps) => {
  const isMobile = useIsTouchDevice();
  const [isTransparent, setIsTransparent] = useState(true);
  const [globalNotification, setGlobalNotification] = useState(
    data.globalNotification
  );
  const dispatch = useDispatch();
  const isGlobalNotificationVisible = useSelector(
    ({ app }: ReducersProps) => app.appData.notificationVisible
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (globalNotification) {
        dispatch({
          type: SET_GLOBAL_DATA,
          payload: {
            appData: { notificationVisible: true },
          },
        });
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [globalNotification, dispatch]);

  const { colorMode } = useColorMode();

  useScrollPosition(
    ({ currPos }) => {
      setIsTransparent(currPos.y > -200);
    },
    [colorMode],
    null,
    false,
    500
  );

  const getLogo = () => {
    return (
      <Link href="/">
        <Box sx={{ cursor: "pointer" }} data-testid="navigation-home">
          <Image src={data.logo} width={196} height={56} />
        </Box>
      </Link>
    );
  };

  const handleHideGlobalNotification = () => {
    dispatch({
      type: SET_GLOBAL_DATA,
      payload: {
        appData: { notificationVisible: "hide" },
      },
    });
  };

  const getRightSideContent = () => {
    if (isMobile) {
      return (
        <Flex w="100%" align="center">
          {getLogo()}
          <Spacer />
          <Flex align="center">
            <DarkModeSwitch />
            <Button
              data-testid="navigation-post-job"
              size="sm"
              ml={4}
              colorScheme="green"
            >
              Job
            </Button>
            <Menu>
              <MenuButton
                size="sm"
                background="inherit"
                aria-label="Navigation Mobile Options"
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                ml={4}
                data-testid="navigation-categories"
              />
              <MenuList>
                <MenuGroup title="Categories">
                  {data.categories.map((category, index) => (
                    <Link href={`/categories/${category.slug}`} key={index}>
                      <MenuItem>{category.title}</MenuItem>
                    </Link>
                  ))}
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      );
    }
    return (
      <Flex w="100%" align="center">
        {getLogo()}
        <Spacer />
        <Flex align="center">
          <Menu>
            <MenuButton
              background="inherit"
              as={Button}
              rightIcon={<ChevronDownIcon />}
              data-testid="navigation-categories"
            >
              Categories
            </MenuButton>
            <MenuList>
              {data.categories.map((category, index) => (
                <Link href={`/categories/${category.slug}`} key={index}>
                  <MenuItem>{category.title}</MenuItem>
                </Link>
              ))}
            </MenuList>
          </Menu>
          <DarkModeSwitch />
          <Button
            data-testid="navigation-post-job"
            ml={4}
            colorScheme="green"
            leftIcon={<AddIcon />}
          >
            Post a job
          </Button>
        </Flex>
      </Flex>
    );
  };

  console.log;

  return (
    <Box
      position="fixed"
      zIndex={999}
      left={0}
      top={0}
      borderBottom={1}
      borderBottomColor={theme.colors.gray[300]}
      p={4}
      w="100%"
      background={isTransparent ? "transparent" : navigationBgColor[colorMode]}
      transition="background ease 200ms"
      data-testid="navigation"
    >
      {globalNotification && (
        <AnimatedWrapper
          color={theme.colors[globalNotification.colorScheme as string][300]}
          className={
            isGlobalNotificationVisible === true
              ? "displayGlobalNotification"
              : isGlobalNotificationVisible === "hide" &&
                "hideGlobalNotification"
          }
        >
          <Container maxW="140ch" p={2}>
            <Text fontSize="lg">{globalNotification.message}</Text>
            <CloseButton
              position="absolute"
              top="10px"
              right="10px"
              onClick={handleHideGlobalNotification}
            />
          </Container>
        </AnimatedWrapper>
      )}
      <Container
        maxW="140ch"
        centerContent
        direction="row"
        background="inherit"
      >
        {getRightSideContent()}
      </Container>
    </Box>
  );
};

export default Navigation;
