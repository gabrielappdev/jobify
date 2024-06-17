import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Skeleton,
  Stack,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import { bgColor } from "helpers";
import useIsTouchDevice from "hooks/useDeviceDetect";
import _ from "lodash";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPhotoVideo } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import fetch from "services/api";
import slugify from "slugify";
import { SET_USER } from "store/actions";
import { ReducersProps } from "../../store/reducers";
import { SocialLinkProps, UserInnerProps } from "../../types";
import SocialLinkBuilder from "../SocialLinkBuilder";
import UploadButton from "../UploadButton";

const ReactRTE = dynamic(async () => import("../Editor"), {
  ssr: false,
});

type CreateCompanyProps = {
  onSuccess: (data: any) => void;
  user?: UserInnerProps;
};

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

const CreateCompany = ({ onSuccess, user }: CreateCompanyProps) => {
  const isMobile = useIsTouchDevice();
  const currentUser =
    user ??
    useSelector(({ user: reducerUser }: ReducersProps) => reducerUser.user);
  const toast = useToast();
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);
  const { colorMode } = useColorMode();

  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const initialDescription = useMemo(() => {
    return (user?.company?.description as string) ?? "";
  }, [user]);

  const initialSocialLinks = useMemo(() => {
    return user?.company?.social_link ?? [];
  }, [user]);

  const onSubmit = async (data: CreateCompanyFormProps) => {
    if (!data.profilePicture && !isEdit) {
      return toast({
        title: "Error",
        description: "You must upload a profile picture to your company",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
    const endpoint = isEdit
      ? `/companies/${currentUser.company.id}?populate[0]=profile_picture&populate[1]=social_link`
      : "/companies";
    try {
      const responseData = await fetch(endpoint, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${currentUser.jwt}`,
        },
        body: formData,
      });
      const response = await responseData.json();
      if (response?.error) {
        toast({
          title: "Error",
          description: response?.error?.message || "",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        if (isEdit) {
          let {
            data: { attributes },
          } = response;
          let formattedAttributes = {
            ...attributes,
            profile_picture: {
              url: attributes?.profile_picture?.data?.attributes?.url ?? "",
            },
            social_link: attributes?.social_link ?? [],
          };
          dispatch({
            type: SET_USER,
            payload: {
              ...currentUser,
              company: { ...currentUser.company, ...formattedAttributes },
            },
          });
          toast({
            title: "Company updated!",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          onSuccess(attributes);
        } else {
          const company = _.omit(response, ["users_permissions_user"]);
          const updatedUser = { ...response.users_permissions_user, company };
          dispatch({
            type: SET_USER,
            payload: { ...updatedUser, jwt: currentUser.jwt },
          });
          toast({
            title: isEdit
              ? "Company updated!"
              : `Congratulations! You've created the company ${response.name}`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          onSuccess(response);
        }
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

  useEffect(() => {
    const company = currentUser.company ?? {};
    if (_.get(company, "name")) {
      reset(_.pick(company, _.keys(defaultValues)));
      setIsEdit(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [currentUser]);

  const resetLogoRef = useRef(null);

  const { handleSubmit, register, reset, setValue, watch } =
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

  if (isLoading) {
    return (
      <Stack w="100%" gap={4}>
        <Flex
          gap={4}
          justify={isMobile ? "flex-start" : "space-between"}
          align="center"
          direction={isMobile ? "column-reverse" : "row"}
          mb={4}
        >
          <Skeleton w="200px" h="36px" />
          <Skeleton w="100px" h="100px" />
        </Flex>
        <Stack gap={4}>
          {Array.from(new Array(10)).map((_, index) => (
            <Skeleton w="100%" h="40px" key={index} />
          ))}
        </Stack>
      </Stack>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} onReset={handleResetForm}>
      <Flex
        gap={4}
        justify={isMobile ? "flex-start" : "space-between"}
        align="center"
        direction={isMobile ? "column-reverse" : "row"}
        mb={4}
      >
        <Heading mb={4} as="h6" size="lg">
          {isEdit ? "Edit company" : "Create a Company"}
        </Heading>
        {currentUser?.company?.profile_picture?.url && (
          <Image
            borderRadius="4px"
            objectFit="cover"
            boxSize="100px"
            src={currentUser.company.profile_picture.url}
            alt={currentUser.company.name}
          />
        )}
      </Flex>
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
        <ReactRTE
          onValueChange={onRTEValueChange}
          initialValue={initialDescription}
        />
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
        <SocialLinkBuilder
          onChange={handleSocialLinksChange}
          initialValues={initialSocialLinks}
        />
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
