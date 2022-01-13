import {
  Box,
  Button,
  Center,
  CircularProgress,
  Divider,
  Heading,
  Stack,
  Text,
  toast,
  useToast,
} from "@chakra-ui/react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import fetch from "services/api";
import { ReducersProps } from "store/reducers";
import { SET_USER } from "store/actions";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isFinishing, setIsFinishing] = useState(false);

  const user = useSelector(({ user }: ReducersProps) => user.user);

  const total = useMemo(() => {
    return Number(user?.create_job_flow?.order?.total_in_cents) / 100;
  }, [user]);

  const isLoaded = useMemo(() => {
    return !!stripe && !!elements;
  }, [stripe, elements]);

  if (!isLoaded) {
    return (
      <Box w="100%" minH="100vh">
        <Center>
          <CircularProgress isIndeterminate color="green" size="lg" />
        </Center>
      </Box>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFinishing(true);

    const payload = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/",
      },
      redirect: "if_required",
    });

    if (payload.error) {
      const error = payload.error;
      if (error.type === "card_error" || error.type === "validation_error") {
        toast({
          title: error.type,
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occured",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      try {
        const responseData = await fetch("/posts", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.jwt}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              ...user.create_job_flow.values,
              order_id: user.create_job_flow.order.id,
            },
          }),
        });
        const response = await responseData.json();
        if (response?.error) {
          toast({
            title: "Error",
            description: responseData?.error?.message || "",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          router.push(`/jobs/${response.slug}`);
          dispatch({
            type: SET_USER,
            payload: {
              ...user,
              create_job_flow: response.create_job_flow,
            },
          });
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error?.message ?? "An unexpect error occured",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }

    setIsFinishing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <Stack gap={2}>
        <PaymentElement id="payment-element" />
        <Divider />
        <Text>1 - Job post</Text>
        <Heading as="h6" size="sm">
          Total: ${total}
        </Heading>
        <Button
          isLoading={isFinishing}
          type="submit"
          width="max-content"
          colorScheme="green"
        >
          Finish purchase
        </Button>
      </Stack>
    </form>
  );
};

export default CheckoutForm;
