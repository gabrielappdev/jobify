import { useEffect, useState, useMemo } from "react";
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
  CloseButton,
  Center,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { CategoryProps, GlobalNotificationProps } from "types";
import { AddIcon, ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import DarkModeSwitch from "../DarkModeSwitch";
import useIsTouchDevice from "hooks/useDeviceDetect";
import { contrastColor, navigationBgColor } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_GLOBAL_DATA,
  OPEN_GLOBAL_MODAL,
  SET_USER,
} from "../../store/actions";
import { ReducersProps } from "../../store/reducers";
import { AnimatedWrapper } from "./styles";
import usePusherEventListener from "../../hooks/usePusherEventListener";
import { PUSHER_GLOBAL_NOTIFICATION } from "../../constants";
import fetch from "../../services/api";
import { LocalStorage } from "../../services/localStorage";
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";

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
  const { colorMode } = useColorMode();
  const [isTransparent, setIsTransparent] = useState(true);
  const [isRefreshingUserToken, setIsRefreshingUserToken] = useState(false);
  const [tokenWasRefreshed, setTokenWasRefreshed] = useState(false);
  const localStorage = useMemo(() => {
    return new LocalStorage();
  }, []);

  const [globalNotification, setGlobalNotification] = useState(
    data?.globalNotification
  );
  const dispatch = useDispatch();
  const isGlobalNotificationVisible = useSelector(
    ({ app }: ReducersProps) => app.notificationVisible
  );
  const user = useSelector(({ user }: ReducersProps) => user.user);

  const shouldDisplayNotification = useMemo(() => {
    if (globalNotification) {
      return globalNotification.active;
    }
    return false;
  }, [globalNotification]);

  const handleLogout = () => {
    dispatch({
      type: SET_USER,
      payload: null,
    });
    localStorage.setData("jobify", {
      jwt: null,
    });
  };

  useEffect(() => {
    const refreshToken = async (token) => {
      setIsRefreshingUserToken(true);
      try {
        const userResponse = await fetch("/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const user = await userResponse.json();
        if (user) {
          const token = localStorage.getData("jobify").jwt;
          localStorage.setData("jobify", {
            jwt: token,
          });
          dispatch({
            type: SET_USER,
            payload: { ...user, jwt: token },
          });
        }
      } catch (error) {
        dispatch({
          type: SET_USER,
          payload: null,
        });
      } finally {
        setIsRefreshingUserToken(false);
        setTokenWasRefreshed(true);
      }
    };
    if (typeof window !== undefined) {
      const localData = localStorage.getData("jobify");
      if (localData?.jwt && !tokenWasRefreshed) {
        refreshToken(localData.jwt);
      }
    }
  }, [localStorage]);

  const UserMenu = () => {
    if (user?.email) {
      return (
        <MenuGroup title={`Hello ${user.username}!`}>
          <Link href="/profile">
            <MenuItem icon={<AiOutlineUser />}>Profile</MenuItem>
          </Link>
          <MenuItem onClick={handleLogout} icon={<BiLogOutCircle />}>
            Logout
          </MenuItem>
        </MenuGroup>
      );
    }
    return (
      <MenuGroup title="Account">
        <MenuItem
          onClick={() => openGlobalModal("signup")}
          icon={<AiOutlineUserAdd />}
        >
          Sign up
        </MenuItem>
        <MenuItem
          onClick={() => openGlobalModal("signin")}
          icon={<AiOutlineUser />}
        >
          Sign in
        </MenuItem>
      </MenuGroup>
    );
  };

  usePusherEventListener(
    async (data) => {
      const fetchNotifications = async () => {
        try {
          const response = await fetch("/global?populate[0]=notification");
          if (response) {
            const { data } = await response.json();
            if (!data?.error) {
              setGlobalNotification(data?.attributes?.notification);
              if (
                !isGlobalNotificationVisible ||
                isGlobalNotificationVisible === "hide"
              ) {
                localStorage.setData("jobify", {
                  hideGlobalNotification: false,
                });
                dispatch({
                  type: SET_GLOBAL_DATA,
                  payload: { notificationVisible: true },
                });
              }
            }
          }
        } catch (error) {
          console.error("Error fetching global data notifications: ", error);
        }
      };
      if (data) {
        await fetchNotifications();
      }
    },
    PUSHER_GLOBAL_NOTIFICATION,
    [isGlobalNotificationVisible, dispatch]
  );

  useEffect(() => {
    let startTimer = setTimeout(() => {
      const storedHideGlobalNotification =
        localStorage.getData("jobify")?.hideGlobalNotification;
      if (
        !storedHideGlobalNotification &&
        globalNotification &&
        isGlobalNotificationVisible !== "hide"
      ) {
        dispatch({
          type: SET_GLOBAL_DATA,
          payload: { notificationVisible: true },
        });
      }
    }, 2000);
    let timer = setTimeout(() => {
      if (isGlobalNotificationVisible) {
        handleHideGlobalNotification(false);
      }
    }, 30000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, [globalNotification, dispatch, isGlobalNotificationVisible]);

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
          <Image src={data?.logo} width={196} height={56} />
        </Box>
      </Link>
    );
  };

  const handleHideGlobalNotification = (shouldStore = true) => {
    dispatch({
      type: SET_GLOBAL_DATA,
      payload: { notificationVisible: "hide" },
    });
    if (shouldStore) {
      localStorage.setData("jobify", {
        hideGlobalNotification: true,
      });
    }
  };

  const openGlobalModal = (action: string) => {
    dispatch({
      type: OPEN_GLOBAL_MODAL,
      payload: { action, params: {} },
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
                  {data?.categories?.map((category, index) => (
                    <Link href={`/categories/${category.slug}`} key={index}>
                      <MenuItem>{category.title}</MenuItem>
                    </Link>
                  ))}
                </MenuGroup>
                <UserMenu />
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      );
    }
    return (
      <Flex w="100%" align="center">
        <Flex align="center">
          {getLogo()}
          <Box ml={4}>
            <DarkModeSwitch />
          </Box>
        </Flex>
        <Spacer />
        <Flex align="center">
          <Menu>
            <MenuButton
              bg={contrastColor[colorMode]}
              as={Button}
              rightIcon={<ChevronDownIcon />}
              data-testid="navigation-categories"
            >
              Categories
            </MenuButton>
            <MenuList>
              {data?.categories?.map((category, index) => (
                <Link href={`/categories/${category.slug}`} key={index}>
                  <MenuItem>{category.title}</MenuItem>
                </Link>
              ))}
            </MenuList>
          </Menu>
          <Button
            data-testid="navigation-post-job"
            ml={4}
            colorScheme="green"
            leftIcon={<AddIcon />}
          >
            Post a job
          </Button>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<AiOutlineUser />}
              variant="outline"
              color={theme.colors.green[500]}
              border="none"
              ml={2}
              isLoading={isRefreshingUserToken}
              size="lg"
              _hover={{ background: "transparent" }}
              _active={{
                background: "transparent",
                color: theme.colors.green[200],
              }}
            />
            <MenuList>
              <UserMenu />
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    );
  };
  return (
    <Box
      position="fixed"
      zIndex={999}
      left={0}
      top={0}
      borderBottom={1}
      borderBottomColor={theme.colors.gray[300]}
      w="100%"
      background={isTransparent ? "transparent" : navigationBgColor[colorMode]}
      transition="background ease 200ms"
      data-testid="navigation"
    >
      {shouldDisplayNotification && (
        <AnimatedWrapper
          isMobile={isMobile}
          color={theme.colors[globalNotification.colorScheme as string][500]}
          className={
            isGlobalNotificationVisible === true
              ? "displayGlobalNotification"
              : isGlobalNotificationVisible === "hide" &&
                "hideGlobalNotification"
          }
        >
          <Container maxW="140ch">
            <Center>
              <Text color={theme.colors.white} textAlign="center" fontSize="sm">
                {globalNotification.message}
              </Text>
              <CloseButton
                color={theme.colors.white}
                position="absolute"
                top="-4px"
                right="10px"
                onClick={() => handleHideGlobalNotification(true)}
              />
            </Center>
          </Container>
        </AnimatedWrapper>
      )}
      <Container
        maxW="140ch"
        p={4}
        pt={6}
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
