import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Skeleton,
  Stack,
  Text,
  theme,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { highlightColor } from "helpers";
import useIsTouchDevice from "hooks/useDeviceDetect";
import Link from "next/link";
import { useRouter } from "next/router";
import { cloneElement, useEffect, useMemo, useState } from "react";
import {
  FaCheck,
  FaCheckCircle,
  FaHome,
  FaSuitcase,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import fetch from "services/api";
import { LocalStorage } from "services/localStorage";
import { SET_USER } from "store/actions";
import { ReducersProps } from "store/reducers";

const menus = [
  {
    title: "Home",
    icon: <FaHome aria-label="Dashboard home" />,
    url: "/dashboard",
    disabled: false,
    type: "regular",
    loading: false,
  },
  {
    title: "Jobs",
    icon: <FaSuitcase aria-label="Dashboard Jobs" />,
    url: "/dashboard/jobs",
    disabled: false,
    type: "regular",
    loading: false,
  },
  {
    title: "Orders",
    icon: <FaCheck aria-label="Dashboard orders" />,
    url: "/dashboard/orders",
    disabled: false,
    type: "regular",
    loading: false,
  },
];

type MenuItemProps = {
  menuItem: {
    title: string;
    icon: React.ReactElement;
    url: string;
    disabled: boolean;
    type: string;
    loading: boolean;
  };
  isActive: boolean;
  isCollapsed: boolean;
  isDisabled: boolean;
  type: string;
  isLoading: boolean;
};

type DashboardTemplateProps = {
  children: React.ReactElement;
};

const MenuItem = ({
  menuItem,
  isActive,
  isCollapsed,
  isDisabled,
  type = "regular",
  isLoading = false,
}: MenuItemProps) => {
  if (isLoading) {
    return <Skeleton h="40px" w="100%" />;
  }
  return (
    <Link href={menuItem.url}>
      <Button
        isDisabled={isDisabled}
        bg="transparent"
        _hover={{ background: theme.colors.green[700] }}
      >
        <Flex
          align="center"
          w={isCollapsed ? "auto" : "100%"}
          p={2}
          gap={4}
          cursor="pointer"
          color={
            type === "danger" ? theme.colors.red[500] : theme.colors.green[300]
          }
          background={isActive ? theme.colors.green[700] : "transparent"}
          _hover={{ background: theme.colors.green[700] }}
        >
          {menuItem.icon}
          {!isCollapsed && (
            <Text fontWeight={isActive ? "bold" : "normal"}>
              {menuItem.title}
            </Text>
          )}
        </Flex>
      </Button>
    </Link>
  );
};

const DashboardTemplate = ({ children }: DashboardTemplateProps) => {
  const dispatch = useDispatch();
  const isMobile = useIsTouchDevice();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const user = useSelector(({ user }: ReducersProps) => user.user);
  const router = useRouter();
  const toast = useToast();

  const userMenus = useMemo(() => {
    return [
      {
        title: "Change password",
        icon: <FaUser aria-label="Dashboard Change Password" />,
        url: "/dashboard/change-password",
        disabled: false,
        type: "regular",
        loading: false,
      },
      {
        title: "Confirm account",
        icon: <FaCheckCircle aria-label="Dashboard Confirm Account" />,
        url: "/dashboard/confirm-account",
        disabled: !!user?.confirmed,
        type: "regular",
        loading: isFetchingUser,
      },
      {
        title: "Delete account",
        icon: <FaTrash aria-label="Dashboard Delete Account" />,
        url: "/dashboard/delete-account",
        type: "danger",
        disabled: false,
        loading: false,
      },
    ];
  }, [user, isFetchingUser]);

  const activeRoute = useMemo(() => {
    return router.pathname;
  }, [router.pathname]);

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  const localStorage = useMemo(() => {
    return new LocalStorage();
  }, []);

  const unauthorizedCallback = () => {
    toast({
      title: "Error",
      description: "You are not authorized to see this content",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
    return router.push("/");
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setIsFetchingUser(true);
      const token = localStorage.getData("jobify").jwt;
      if (!token) {
        return unauthorizedCallback();
      }
      const responseData = await fetch("/current-user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const response = await responseData.json();
      if (response) {
        dispatch({
          type: SET_USER,
          payload: { ...response, jwt: token },
        });
      } else {
        return unauthorizedCallback();
      }
      setIsFetchingUser(false);
    };
    if (!user.email) {
      fetchCurrentUser();
    }
  }, [dispatch, user]);

  const { colorMode } = useColorMode();
  return (
    <>
      <Flex w="100%">
        <Box
          bg={theme.colors.green[900]}
          h="100vh"
          w={isCollapsed ? "4rem" : "16rem"}
        >
          <Stack p={4} h="100%">
            <Text fontSize="sm" color="white">
              {!isCollapsed ? "Options" : "..."}
            </Text>
            {menus.map((item, index) => {
              return (
                <MenuItem
                  menuItem={item}
                  key={index}
                  isActive={activeRoute === item.url}
                  isCollapsed={isCollapsed}
                  isDisabled={!!item?.disabled}
                  type={item.type}
                  isLoading={item.loading}
                />
              );
            })}
            <Text fontSize="sm" color="white">
              {!isCollapsed ? "Account" : "..."}
            </Text>
            {userMenus.map((item, index) => {
              return (
                <MenuItem
                  menuItem={item}
                  key={index}
                  isActive={activeRoute === item.url}
                  isCollapsed={isCollapsed}
                  isDisabled={item.disabled}
                  type={item.type}
                  isLoading={item.loading}
                />
              );
            })}
            {!isMobile && (
              <IconButton
                aria-label={
                  isCollapsed ? "Click to uncollapse" : "Click to collapse"
                }
                size="sm"
                icon={isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                variant="outline"
                colorScheme="green"
                onClick={() => setIsCollapsed((prevState) => !prevState)}
                mt="auto!important"
                w="max-content"
              />
            )}
          </Stack>
        </Box>
        <Box flex={1} p={4} bg={highlightColor[colorMode]}>
          {cloneElement(children, { ...children.props, user })}
        </Box>
      </Flex>
    </>
  );
};

export default DashboardTemplate;