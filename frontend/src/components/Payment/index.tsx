import { useEffect, useState } from "react";
import fetch from "services/api";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { ReducersProps } from "store/reducers";
import CheckoutForm from "./CheckoutForm.tsx";
import { Stack, useToast } from "@chakra-ui/react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const user = useSelector(({ user }: ReducersProps) => user.user);
  const toast = useToast();

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const responseData = await fetch("/orders/get-client-secret", {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        });
        const response = await responseData.json();
        if (response?.error) {
          toast({
            title: "Error",
            description: response?.error?.message ?? responseData?.error?.error,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          setClientSecret(response.clientSecret);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error?.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };
    if (stripePromise && !clientSecret && user?.create_job_flow?.order) {
      getClientSecret();
    }
  }, [stripePromise, user, clientSecret]);

  return (
    <Stack minH="50vh" w="100%" gap={4}>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </Stack>
  );
};

export default Payment;
