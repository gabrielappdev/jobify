import {
  Box,
  Button,
  Center,
  CircularProgress,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import _ from "lodash";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { SyntheticEvent, useMemo, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import fetchClient from "services/api";
import { ReducersProps } from "store/reducers";
import { SET_USER } from "store/actions";
import AddressFill, { FormAddressProps } from "@/components/AddressFill";
import { Address, PaymentMethodCreateParams } from "@stripe/stripe-js";
import { BiCreditCardAlt } from "react-icons/bi";
import Clipboard from "@/components/Clipboard";
import {
  _formatCategories,
  _formatCompany,
  _formatSettings,
  _formatTags,
} from "helpers";
import { PostSettingsProps } from "types";
import JobCard from "@/components/JobCard";

type CheckoutForm = {
  clientSecret: string;
  onGoBack: () => void;
};

const CheckoutForm = ({ clientSecret, onGoBack }: CheckoutForm) => {
  const stripe = useStripe();
  const elements = useElements();

  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();

  const [isFinishing, setIsFinishing] = useState(false);

  const ref = useRef(null);

  const user = useSelector(({ user }: ReducersProps) => user.user);

  const global = useSelector(({ app }: ReducersProps) => app.appData);

  const values = useMemo(() => {
    return user?.create_job_flow?.values;
  }, [user]);

  const jobCardPreviewData = useMemo(() => {
    if (values) {
      const { title, description } = values;
      return {
        title,
        description,
        categories: _formatCategories(values.categories),
        tags: _formatTags(values.tags),
        company: _formatCompany(user.company),
        ..._formatSettings(values.post_settings as PostSettingsProps),
      };
    }
    return null;
  }, [values, user]);

  const country = useMemo(() => {
    return global?.country ?? "br";
  }, [global]);

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

  const submit = async (
    billingDetails: Pick<
      PaymentMethodCreateParams.BillingDetails,
      "address" | "name"
    >
  ) => {
    setIsFinishing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          ...billingDetails,
        },
      },
    });

    if (payload.error) {
      const error = payload.error;
      if (error.type === "card_error" || error.type === "validation_error") {
        toast({
          title: "Error",
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
        const values = user.create_job_flow.values;
        const responseData = await fetchClient("/posts", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.jwt}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              ...values,
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

  const onAddressFill = async (data: FormAddressProps) => {
    if (typeof data === "object") {
      const nameObject = _.pick(data, ["name", "last_name"]);
      const addressObject = _.omit(data, [
        "street",
        "number",
        "complement",
        "district",
      ]);
      const concattedAddress = _.values(addressObject).join(" ");
      const name = _.values(nameObject).join(" ");

      const address: Address = {
        city: data.city ?? null,
        state: data.state,
        country,
        line1: concattedAddress,
        line2: concattedAddress,
        postal_code: data.postal_code,
      };

      submit({ name, address });
    }
  };

  const submitForm = async (event: SyntheticEvent) => {
    event.preventDefault();

    ref.current.click();
  };

  return (
    <Stack gap={4}>
      <AddressFill ref={ref} onSubmit={onAddressFill} />
      <form id="payment-form" onSubmit={submitForm}>
        <Stack gap={4}>
          {process.env.NODE_ENV !== "production" && (
            <Stack
              p={4}
              borderWidth={1}
              borderColor="gray.400"
              borderRadius={4}
            >
              <Text color="gray.400" fontWeight="bold">
                Testing scenarios
              </Text>
              <Flex gap={4}>
                <Clipboard value="4000000760000002">
                  <Button
                    colorScheme="green"
                    size="sm"
                    leftIcon={<BiCreditCardAlt />}
                  >
                    Brazilian credit card test number
                  </Button>
                </Clipboard>
                <Clipboard value="4242424242424242">
                  <Button
                    colorScheme="blue"
                    size="sm"
                    leftIcon={<BiCreditCardAlt />}
                  >
                    USA credit card test number
                  </Button>
                </Clipboard>
                <Clipboard value="4000000000000002">
                  <Button
                    colorScheme="red"
                    size="sm"
                    leftIcon={<BiCreditCardAlt />}
                  >
                    Incorrect card number
                  </Button>
                </Clipboard>
              </Flex>
            </Stack>
          )}
          <CardElement />
          <Divider />
          <Text>Check the card below to see if everything is ok</Text>
          <JobCard data={jobCardPreviewData} isPreview />
          <Heading as="h6" size="sm">
            Total: {global?.currencySymbol}
            {total}
          </Heading>
          <Flex gap={4}>
            <Button
              isLoading={isFinishing}
              type="submit"
              width="max-content"
              colorScheme="green"
            >
              Finish purchase
            </Button>
            <Button
              isDisabled={isFinishing}
              width="max-content"
              colorScheme="gray"
              onClick={onGoBack}
            >
              Edit job post
            </Button>
          </Flex>
        </Stack>
      </form>
    </Stack>
  );
};

export default CheckoutForm;
