import {
  Button,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import _ from "lodash";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LocalStorage } from "../../services/localStorage";
import slugify from "slugify";
import fetch from "../../services/api";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { CLOSE_GLOBAL_MODAL, SET_USER } from "store/actions";
import { GlobalModalProps } from "types";
import { Url } from "url";

type SignProps = {
  data: {
    type: "in" | "up";
    params?: {
      redirect?: Url;
    };
  };
};

type SignFormProps = {
  identifier: string;
  password: string;
  confirmPassword?: string;
};

const Sign = ({ data }: SignProps) => {
  const [visiblePasswordsState, setVisiblePasswordsState] = useState({
    password: false,
    confirmPassword: false,
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const [signType, setSignType] = useState(data.type);

  const toast = useToast();

  const localStorage = useMemo(() => {
    return new LocalStorage();
  }, []);

  const signEndpoint = useMemo(() => {
    if (signType === "in") {
      return "/auth/local/";
    } else if (signType === "up") {
      return "/auth/local/register";
    }
  }, [signType]);

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignFormProps>({
    defaultValues: {
      identifier: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (submitData: SignFormProps) => {
    if (signType === "up") {
      const { password, confirmPassword } = submitData;
      if (password !== confirmPassword) {
        return toast({
          title: "Error",
          description: "Please, check your passwords.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
    const body = _.pick(
      _.omit(
        {
          ...submitData,
          username: slugify(_.first(submitData.identifier.split("@"))),
        },
        ["confirmPassword"]
      ),
      signType === "up"
        ? ["identifier", "username", "password"]
        : ["identifier", "password"]
    );

    try {
      setIsLoading(true);
      const response = await fetch(signEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          signType === "up"
            ? _.omit({ ...body, email: body.identifier }, ["identifier"])
            : body
        ),
      });
      if (response) {
        const responseData = await response.json();
        if (responseData.error) {
          toast({
            title: "Error",
            description: responseData?.error?.message || "",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          localStorage.setData("jobify", {
            jwt: responseData.jwt,
          });
          const user = { ...responseData.user, jwt: responseData.jwt };
          dispatch({
            type: CLOSE_GLOBAL_MODAL,
          });
          dispatch({
            type: SET_USER,
            payload: user,
          });
          toast({
            title: `Welcome ${user.username}`,
            description:
              signType === "in"
                ? "Redirecting you to yout dashboard"
                : "We`ve created your account",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          _.debounce(() => {
            router.push(data?.params?.redirect ?? "/");
          }, 5000)();
        }
      }
    } catch (error) {
      debugger;
      toast({
        title: "Error",
        description: error?.message || "",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (type: "password" | "confirmPassword") => {
    setVisiblePasswordsState({
      ...visiblePasswordsState,
      [type]: !visiblePasswordsState[type],
    });
  };

  return (
    <Stack py={4}>
      <Heading mb={4} as="h6" size="md">
        {signType === "in" ? "Sign in" : "Sign up"}
      </Heading>
      <Stack w="100%" align="center">
        {signType === "up" && (
          <Stack align="center" mb={2}>
            <Text>Do you have an account ?</Text>
            <Button
              onClick={() => setSignType("in")}
              w="max-content"
              variant="outline"
              colorScheme="blue"
            >
              Sign in now
            </Button>
          </Stack>
        )}
        {signType === "in" && (
          <Stack align="center" mb={2}>
            <Text>Don't have you an account yet ?</Text>
            <Button
              onClick={() => setSignType("up")}
              w="max-content"
              variant="outline"
              colorScheme="blue"
            >
              Sign up now
            </Button>
          </Stack>
        )}
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("identifier", { required: true })}
          placeholder={signType === "in" ? "E-mail or Username" : "E-mail"}
          type={signType === "in" ? "text" : "email"}
          mb={4}
        />
        <InputGroup>
          <Input
            {...register("password", { required: true })}
            isInvalid={!!errors?.password}
            placeholder="Password"
            type={visiblePasswordsState["password"] ? "text" : "password"}
            mb={4}
          />
          <InputRightAddon>
            <IconButton
              onClick={() => togglePasswordVisibility("password")}
              aria-label="Display password"
              icon={
                visiblePasswordsState["password"] ? <FaEyeSlash /> : <FaEye />
              }
            />
          </InputRightAddon>
        </InputGroup>
        {signType === "up" && (
          <InputGroup>
            <Input
              {...register("confirmPassword", { required: true })}
              isInvalid={!!errors?.confirmPassword}
              placeholder="Password confirmation"
              type={
                visiblePasswordsState["confirmPassword"] ? "text" : "password"
              }
              mb={4}
            />
            <InputRightAddon>
              <IconButton
                onClick={() => togglePasswordVisibility("confirmPassword")}
                aria-label="Display password confirmation"
                icon={
                  visiblePasswordsState["confirmPassword"] ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )
                }
              />
            </InputRightAddon>
          </InputGroup>
        )}
        <Flex align="center" w="100%">
          <Button isLoading={isLoading} colorScheme="green" type="submit">
            {signType === "in" ? "Enter" : "Register"}
          </Button>
          <Button isDisabled={isLoading} colorScheme="gray" ml={4} type="reset">
            Reset
          </Button>
        </Flex>
      </form>
    </Stack>
  );
};

export default Sign;
