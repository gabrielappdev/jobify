import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Tag,
  Text,
} from "@chakra-ui/react";
import { _getCurrencySymbol } from "helpers";
import _ from "lodash";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { FaReceipt } from "react-icons/fa";
import { JobCardProps, OrderProps } from "types";

type OrderCard = {
  order: OrderProps & { post: JobCardProps };
  currency: string;
};

const OrderCard = ({ order, currency }: OrderCard) => {
  if (!order.post) {
    return null;
  }
  const currencySymbol = useMemo(() => {
    return _getCurrencySymbol(currency);
  }, [currency]);
  return (
    <Box shadow="md" borderRadius={4} p={4}>
      <Stack>
        <Text fontSize="sm" colorScheme="gray" fontWeight="bold">
          Bought in: {moment(order.createdAt).format("MMMM Do YYYY, h:mm A")}
        </Text>
        <Flex justify="space-between" align="center">
          <Link href={`/jobs/${order.post?.slug ?? ""}`}>
            <Heading
              cursor="pointer"
              size="md"
              isTruncated
              color="blue.500"
              _hover={{ color: "blue.700" }}
              transition="hover 0.2s ease"
            >
              {order.post.title}
            </Heading>
          </Link>
          <Stack gap={1}>
            <a href={order.receipt} rel="noopener noreferrer" target="_blank">
              <Button
                leftIcon={<FaReceipt />}
                variant="outline"
                colorScheme="blue"
              >
                Receipt
              </Button>
            </a>
            <Tag
              maxW="max-content"
              alignSelf="flex-end"
              colorScheme={order.status === "complete" ? "green" : "gray"}
            >
              {_.capitalize(order.status)}
            </Tag>
          </Stack>
        </Flex>
        <Stat>
          <StatLabel>Total</StatLabel>
          <StatNumber fontSize="md">
            {currencySymbol} {order.total}
          </StatNumber>
          <Flex fontSize="sm" alignItems="center">
            Payed with{" "}
            <Image
              src={`/payment_brands/${order.card_brand}.svg`}
              width="40px"
              height="20px"
            />{" "}
            end in {order.card_last4}
          </Flex>
        </Stat>
      </Stack>
    </Box>
  );
};

export default OrderCard;
