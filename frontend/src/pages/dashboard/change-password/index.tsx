import {
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
  useToast,
} from "@chakra-ui/react";
import useIsTouchDevice from "hooks/useDeviceDetect";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import fetch from "services/api";
import { SET_USER } from "store/actions";
import { ReducersProps } from "store/reducers";
import DashboardTemplate from "templates/dashboard";

type FormProps = {
  currentPassword: string;
  password: string;
  confirmPassword: string;
};

const defaultValues = {
  currentPassword: "",
  password: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const isMobile = useIsTouchDevice();
  const user = useSelector(({ user }: ReducersProps) => user.user);
  const [visiblePasswordsState, setVisiblePasswordsState] = useState({
    currentPassword: false,
    password: false,
    confirmPassword: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    defaultValues,
  });
  const togglePasswordVisibility = (
    type: "password" | "confirmPassword" | "currentPassword"
  ) => {
    setVisiblePasswordsState({
      ...visiblePasswordsState,
      [type]: !visiblePasswordsState[type],
    });
  };
  const onSubmit = async (data: FormProps) => {
    if (data.password !== data.confirmPassword) {
      return toast({
        title: "Error",
        description: "New Password and new password confirmation should match",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    const submitData = {
      password: data.currentPassword,
      newPassword: data.password,
    };

    try {
      setIsSaving(true);
      const responseData = await fetch("/password", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });
      const response = await responseData.json();
      if (response?.error) {
        toast({
          title: "Error",
          description:
            responseData?.error?.message ?? responseData?.error?.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Success",
          description: "Password updated successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        reset(defaultValues);
        dispatch({
          type: SET_USER,
          payload: { ...user, jwt: response.jwt },
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error?.message ?? error?.error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardTemplate>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={4}>
          <Heading as="h6" size="md">
            Change Password
          </Heading>
          <InputGroup>
            <Input
              {...register("currentPassword", { required: true })}
              placeholder="Current Password"
              type={
                visiblePasswordsState["currentPassword"] ? "text" : "password"
              }
              bg="white"
              isInvalid={!!errors?.currentPassword}
              w={isMobile ? "100%" : "30%"}
            />
            <InputRightAddon>
              <IconButton
                onClick={() => togglePasswordVisibility("currentPassword")}
                aria-label="Display password"
                icon={
                  visiblePasswordsState["password"] ? <FaEyeSlash /> : <FaEye />
                }
              />
            </InputRightAddon>
          </InputGroup>
          <InputGroup>
            <Input
              {...register("password", { required: true })}
              placeholder="New Password"
              type={visiblePasswordsState["password"] ? "text" : "password"}
              bg="white"
              w={isMobile ? "100%" : "30%"}
              isInvalid={!!errors?.password}
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
          <InputGroup>
            <Input
              {...register("confirmPassword", { required: true })}
              placeholder="New Password confirmation"
              type={
                visiblePasswordsState["confirmPassword"] ? "text" : "password"
              }
              bg="white"
              isInvalid={!!errors?.confirmPassword}
              w={isMobile ? "100%" : "30%"}
            />
            <InputRightAddon>
              <IconButton
                onClick={() => togglePasswordVisibility("confirmPassword")}
                aria-label="Display password"
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
          <Flex gap={4}>
            <Button isLoading={isSaving} colorScheme="green" type="submit">
              Save
            </Button>
            <Button
              type="reset"
              variant="outline"
              isDisabled={isSaving}
              colorScheme="gray"
            >
              Reset
            </Button>
          </Flex>
        </Stack>
      </form>
    </DashboardTemplate>
  );
};

export default ChangePassword;
