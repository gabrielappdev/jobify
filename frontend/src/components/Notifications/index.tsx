import {
  useState,
  useRef,
  forwardRef,
  Ref,
  useEffect,
  useCallback,
  useMemo,
  memo,
} from "react";
import { BellIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
  Text,
  theme,
  useToast,
} from "@chakra-ui/react";
import _ from "lodash";
import { NotificationProps, UserInnerProps } from "types";
import NotificationCard from "./NotificationCard";
import fetch from "services/api";
import { useDispatch } from "react-redux";
import { SET_NOTIFICATIONS } from "store/actions";

type NotificationsProps = {
  user: UserInnerProps;
  notifications: NotificationProps[];
  isLoading: boolean;
};

type NotificationsTriggerProps = {
  isLoading?: boolean;
  onClick: () => void;
  hasAdornment: boolean;
};

const NotificationsTrigger = forwardRef(
  (
    {
      isLoading = false,
      onClick,
      hasAdornment = false,
    }: NotificationsTriggerProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <IconButton
        ref={ref}
        onClick={onClick}
        aria-label="Options"
        icon={<BellIcon />}
        variant="outline"
        color={theme.colors.green[500]}
        border="none"
        ml={2}
        position="relative"
        isLoading={isLoading}
        size="lg"
        _hover={{ background: "transparent" }}
        _active={{
          background: "transparent",
          color: theme.colors.green[200],
        }}
        _before={{
          content: hasAdornment ? "''" : "none",
          position: "absolute",
          top: "12px",
          right: "15px",
          background: theme.colors.red[500],
          borderRadius: "100%",
          width: "7px",
          height: "7px",
        }}
      />
    );
  }
);

const Notifications = ({
  user,
  notifications,
  isLoading = false,
}: NotificationsProps) => {
  const [allNotifications, setAllNotifications] =
    useState<NotificationProps[]>(notifications);
  const unreadedNotifications = useMemo(() => {
    return allNotifications.filter(({ readed }) => !readed).length;
  }, [allNotifications]);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prevState) => !prevState);

  useEffect(() => {
    setAllNotifications(notifications);
  }, [notifications]);

  useEffect(() => {
    if (!isOpen) {
      dispatch({
        type: SET_NOTIFICATIONS,
        payload: { notifications: allNotifications },
      });
    }
  }, [isOpen, dispatch, allNotifications]);

  const updateNotification = useCallback(
    (notification: NotificationProps) => {
      const clonedNotifications = _.cloneDeep(allNotifications);
      const index = clonedNotifications.findIndex(
        (not) => not.id === notification.id
      );
      if (index >= 0) {
        clonedNotifications.splice(index, 1, notification);
        const sortedNotifications = clonedNotifications.sort(
          (a: NotificationProps, b: NotificationProps) => {
            if (a.readed > b.readed) return 1;
            if (a.readed < b.readed) return -1;
            return 0;
          }
        );
        setAllNotifications(sortedNotifications);
      }
    },
    [allNotifications]
  );

  const deleteAllNotifications = async () => {
    setIsUpdating(true);
    try {
      const responseData = await fetch(
        `/current-user/notifications/delete-all`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );
      const response = await responseData.json();
      if (response.error) {
        toast({
          title: "Error",
          description: response?.error?.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        setAllNotifications([]);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error?.message ?? "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const readAllNotifications = async () => {
    setIsUpdating(true);
    try {
      const responseData = await fetch(`/current-user/notifications/read-all`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.jwt}`,
          "Content-Type": "application/json",
        },
      });
      const response = await responseData.json();
      if (response.error) {
        toast({
          title: "Error",
          description: response?.error?.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const clonedNotifications = _.cloneDeep(allNotifications).map(
          (notification) => ({ ...notification, readed: true })
        );
        setAllNotifications(clonedNotifications);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error?.message ?? "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const onDeleteNotification = (id: number) => {
    const clonedNotifications = _.cloneDeep(allNotifications);
    const index = clonedNotifications.findIndex(
      (notification) => notification.id === id
    );
    clonedNotifications.splice(index, 1);
    setAllNotifications(clonedNotifications);
  };

  const getPopoverBody = () => {
    if (isUpdating) {
      return Array.from(new Array(allNotifications.length)).map((_, index) => {
        return <Skeleton h="150px" w="100%" mb={2} key={index} />;
      });
    }

    if (allNotifications.length === 0) {
      return <Text>There is no notifications at this moment</Text>;
    }
    return allNotifications.map((notification) => (
      <NotificationCard
        notification={notification}
        onMarkAsRead={updateNotification}
        onDelete={onDeleteNotification}
        key={notification.id}
        user={user}
      />
    ));
  };

  const ref = useRef();
  return (
    <>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={close}
        placement="bottom"
        closeOnBlur={false}
        initialFocusRef={ref}
      >
        <PopoverTrigger>
          <NotificationsTrigger
            isLoading={isLoading}
            ref={ref}
            onClick={toggle}
            hasAdornment={unreadedNotifications > 0}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">
            <Flex gap={4} align="center">
              Notifications: {allNotifications.length}
              <Flex gap={4}>
                <Text color="gray.500" fontSize="sm">
                  Readed: {allNotifications.length - unreadedNotifications}
                </Text>
                <Text fontSize="sm" color="red.500">
                  Unread: {unreadedNotifications}
                </Text>
              </Flex>
            </Flex>
            <Text fontSize="xs">
              Readed notifications are delete within 30 days
            </Text>
          </PopoverHeader>
          <PopoverArrow />
          <PopoverBody maxH="350px" overflowY="auto">
            {getPopoverBody()}
          </PopoverBody>
          {notifications.length > 0 && (
            <PopoverFooter d="flex" justifyContent="flex-end">
              <ButtonGroup size="sm">
                {unreadedNotifications > 0 && (
                  <Button
                    onClick={readAllNotifications}
                    isLoading={isUpdating}
                    colorScheme="blue"
                  >
                    Read all
                  </Button>
                )}
                <Button
                  onClick={deleteAllNotifications}
                  isLoading={isUpdating}
                  colorScheme="red"
                >
                  Clear all
                </Button>
              </ButtonGroup>
            </PopoverFooter>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
};

export default memo(Notifications);
