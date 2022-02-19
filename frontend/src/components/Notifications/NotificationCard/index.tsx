import {
  Flex,
  Heading,
  IconButton,
  Stack,
  Tag,
  Text,
  theme,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiCheck, BiTrash } from "react-icons/bi";
import fetch from "services/api";
import { NotificationProps, UserInnerProps } from "types";

type NotificationCardProps = {
  notification: NotificationProps;
  onMarkAsRead: (notification: NotificationProps) => void;
  onDelete: (id: number) => void;
  user: UserInnerProps;
};

const getCardBody = (
  notification: NotificationProps,
  onMarkAsRead: (notification: NotificationProps) => void,
  onDelete: (id: number) => void,
  user: UserInnerProps
) => {
  const toast = useToast();
  const [isMarkingAsRead, setIsMarkingAsRead] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    return () => {
      setIsMarkingAsRead(false);
      setIsDeleting(false);
    };
  }, []);

  const handleMarkAsRead = async (id: number) => {
    setIsMarkingAsRead(true);
    try {
      const responseData = await fetch(`/current-user/notifications/read`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notificationId: id,
        }),
      });
      const response = await responseData.json();
      if (response.error) {
        toast({
          title: "Error",
          description: response?.error?.message ?? responseData?.error?.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        onMarkAsRead({
          ...notification,
          readed: true,
        });
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
      setIsMarkingAsRead(false);
    }
  };

  const handleDeleteNotification = async (id: number) => {
    setIsDeleting(true);
    try {
      await fetch(`/current-user/notifications/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notificationId: id,
        }),
      });
      onDelete(id);
    } catch (error) {
      toast({
        title: "Error",
        description: error?.message ?? "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const notificationBody = (
    <Stack
      cursor={notification.url ? "pointer" : "default"}
      borderBottomWidth={1}
      borderBottomColor="gray.200"
      mb={2}
      py={2}
    >
      <Flex justify="space-between">
        <Tag size="sm" colorScheme={notification.readed ? "gray" : "red"}>
          {notification.readed ? "Readed" : "Unreaded"}
        </Tag>
        <Text fontSize="xs" color="gray.400">
          {moment(notification.createdAt, "YYYYMMDD").fromNow()}
        </Text>
      </Flex>
      <Link href={notification.url}>
        <Heading _hover={{ color: theme.colors.blue[500] }} size="sm" as="h6">
          {notification.title}
        </Heading>
      </Link>
      <Text
        dangerouslySetInnerHTML={{ __html: notification.content }}
        fontSize="sm"
      />
      <Flex justify="flex-end" align="center" gap={4}>
        {!notification.readed && (
          <Tooltip label="Mark as read">
            <IconButton
              isDisabled={isDeleting}
              isLoading={isMarkingAsRead}
              icon={<BiCheck />}
              aria-label="Mark as read"
              size="sm"
              color="blue"
              variant="outline"
              onClick={() => handleMarkAsRead(notification.id)}
              type="button"
            />
          </Tooltip>
        )}
        <Tooltip label="Delete notification">
          <IconButton
            isLoading={isDeleting}
            isDisabled={isMarkingAsRead}
            icon={<BiTrash />}
            aria-label="Delete notification"
            size="sm"
            color="red"
            variant="outline"
            onClick={() => handleDeleteNotification(notification.id)}
            type="button"
          />
        </Tooltip>
      </Flex>
    </Stack>
  );
  return notificationBody;
};

const NotificationCard = ({
  notification,
  onMarkAsRead,
  onDelete,
  user,
}: NotificationCardProps) => {
  return <>{getCardBody(notification, onMarkAsRead, onDelete, user)}</>;
};

export default NotificationCard;
