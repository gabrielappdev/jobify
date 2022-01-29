import OrderCard from "@/components/OrderCard";
import {
  Button,
  Flex,
  Heading,
  Skeleton,
  Stack,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import fetch from "services/api";
import { ReducersProps } from "store/reducers";
import DashboardTemplate from "templates/dashboard";
import { HomeProps } from "types";

type AppDataProps = {
  data?: Omit<HomeProps, "currencySymbol" | "notification">;
};

const Orders = ({ data }: AppDataProps) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedOrders, setFetchedOrders] = useState(false);
  const global = useSelector(({ app }: ReducersProps) => app.appData);
  const user = useSelector(({ user }: ReducersProps) => user.user);

  const toast = useToast();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!fetchedOrders && user.jwt) {
        setIsLoading(true);
        try {
          const responseData = await fetch("/current-user/orders", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.jwt}`,
            },
          });
          const response = await responseData.json();
          if (response.error) {
            toast({
              title: "Error",
              description: response?.error?.message || "",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          } else {
            const orders = response.orders;
            setOrders(orders);
          }
        } catch (error) {
        } finally {
          setIsLoading(false);
          setFetchedOrders(true);
        }
      }
    };
    fetchOrders();
  }, [user, isLoading, fetchedOrders]);

  if (isLoading) {
    return (
      <Stack gap={4}>
        {Array.from(new Array(10)).map((_, index) => (
          <Skeleton shadow="md" h="200px" w="100%" key={index} />
        ))}
      </Stack>
    );
  }

  if (fetchedOrders && !isLoading && !orders.length) {
    return (
      <Stack gap={4}>
        <Heading size="md">Orders</Heading>
        <Stack align="center" justify="center">
          <Heading size="sm">You have not orders yet</Heading>
          <Button colorScheme="blue" maxW="max-content">
            <Link href="/jobs/new">Create a job now !</Link>
          </Button>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack>
      <Heading size="md">Orders</Heading>
      <Stack gap={4}>
        {orders.map((order) => {
          return (
            <OrderCard
              order={order}
              currency={data!.currency ?? "$"}
              key={order.id}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};

const OrdersWithTemplate = ({ data }: AppDataProps) => {
  return (
    <DashboardTemplate data={data}>
      <Orders />
    </DashboardTemplate>
  );
};

export async function getStaticProps() {
  const responseData = await fetch("/app-data");
  const appData = await responseData.json();
  let data = null;
  if (appData) {
    data = appData;
  }

  return {
    props: {
      data,
    },
  };
}

export default OrdersWithTemplate;
