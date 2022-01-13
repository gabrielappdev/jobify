import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import _ from "lodash";
import { useState, useRef } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import slugify from "slugify";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { SocialLinkProps } from "../../types";
import { ReducersProps } from "../../store/reducers";
import SocialLinkBuilder from "../SocialLinkBuilder";
import { bgColor } from "helpers";
import UploadButton from "../UploadButton";
import fetch from "services/api";
import { SET_USER } from "store/actions";

const ReactRTE = dynamic(() => import("../Editor"), {
  ssr: false,
});

type CreateCompanyFormProps = {
  name: string;
  location: string;
  description: string;
  url: string;
  profilePicture: File;
  social_link: SocialLinkProps[];
  slug: string;
  email: string;
};

const defaultValues: CreateCompanyFormProps = {
  name: "",
  location: "",
  description: "",
  url: "",
  profilePicture: null,
  social_link: [],
  slug: "",
  email: "",
};

const CreateCompany = ({ onSuccess }) => {
  const user = useSelector(({ user }: ReducersProps) => user.user);
  const toast = useToast();
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);
  const { colorMode } = useColorMode();

  const onSubmit = async (data: CreateCompanyFormProps) => {
    setIsSaving(true);
    const formData = new FormData();
    let submitData = _.omit(
      {
        ...data,
        slug: slugify(data.name).toLowerCase(),
        social_link: data.social_link.map((socialLink) => ({
          ...socialLink,
          icon: socialLink.name,
        })),
      },
      ["profilePicture"]
    );
    if (data.profilePicture) {
      formData.append("files.profile_picture", data.profilePicture);
    }
    formData.append("data", JSON.stringify(submitData));

    try {
      const responseData = await fetch("/companies", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
        body: formData,
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
        const user = response.users_permissions_user;
        dispatch({
          type: SET_USER,
          payload: user,
        });
        toast({
          title: `Congratulations! You've created the company ${response.name}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onSuccess(response);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error?.message || "",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const resetLogoRef = useRef(null);

  const { handleSubmit, register, reset, setValue } =
    useForm<CreateCompanyFormProps>({
      defaultValues,
    });

  const onRTEValueChange = (value) => {
    setValue("description", value);
  };

  const handleLogoChange = (files) => {
    setValue("profilePicture", files[0] ?? null);
  };

  const handleResetForm = () => {
    reset(defaultValues);
    if (resetLogoRef.current) {
      resetLogoRef.current.click();
    }
  };

  const handleSocialLinksChange = (links: SocialLinkProps[]) => {
    setValue("social_link", links);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={handleResetForm}>
      <Heading mb={4} as="h6" size="lg">
        Create a Company
      </Heading>
      <Stack>
        <Input
          bg={bgColor[colorMode]}
          {...register("name", { required: true })}
          placeholder="Company Name"
        />
        <Box mb={4} />
        <Input
          bg={bgColor[colorMode]}
          {...register("location", { required: true })}
          placeholder="Company Location"
        />
        <Box mb={4} />
        <ReactRTE onValueChange={onRTEValueChange} />
        <Box mb={4} />
        <InputGroup>
          <InputLeftAddon children="https://" />
          <Input
            bg={bgColor[colorMode]}
            placeholder="Company site url"
            {...register("url")}
          />
        </InputGroup>
        <Box mb={4} />
        <UploadButton
          maxWidth={200}
          maxHeight={200}
          accept="image/*"
          title="Choose the company logo"
          icon={<FaPhotoVideo />}
          onChange={handleLogoChange}
          resetLogoRef={resetLogoRef}
        />
        <Box mb={4} />
        <SocialLinkBuilder onChange={handleSocialLinksChange} />
        <Box mb={4} />
        <Input
          bg={bgColor[colorMode]}
          {...register("email", { required: true })}
          type="email"
          placeholder="Company contact e-mail"
          my={4}
        />
      </Stack>
      <Divider />
      <Flex my={4}>
        <Button isLoading={isSaving} type="submit" mr={4} colorScheme="green">
          Save and continue
        </Button>
        <Button isDisabled={isSaving} type="reset" colorScheme="gray">
          Reset
        </Button>
      </Flex>
    </form>
  );
};

export default CreateCompany;
