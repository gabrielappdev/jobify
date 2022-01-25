import {
  Flex,
  IconButton,
  Stack,
  Text,
  Divider,
  Input,
  SimpleGrid,
  Select,
  InputLeftAddon,
  InputRightAddon,
  InputGroup,
  Button,
  CloseButton,
  Heading,
} from "@chakra-ui/react";
import useIsTouchDevice from "hooks/useDeviceDetect";
import _ from "lodash";
import { useState, useMemo, SyntheticEvent, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaPlus,
  FaTwitter,
} from "react-icons/fa";
import { SocialLinkProps } from "types";
import SocialLinkCard from "../SocialLinkCard";

const socialNetworks = [
  {
    name: "Facebook",
    value: "facebook",
    icon: <FaFacebook />,
    color: "facebook",
  },
  { name: "Twitter", value: "twitter", icon: <FaTwitter />, color: "twitter" },
  {
    name: "Linkedin",
    value: "linkedin",
    icon: <FaLinkedin />,
    color: "linkedin",
  },
  { name: "Github", value: "github", icon: <FaGithub />, color: "gray" },
];

type BlackListItem = {
  value: string;
};

type CreateSocialLinkFormProps = {
  onCreate: (data: SocialLinkProps) => void;
  onClose: () => void;
  blackList: BlackListItem[];
};

type SocialLinkBuilderProps = {
  onChange: (links: SocialLinkProps[]) => void;
  initialValues?: SocialLinkProps[];
};

const CreateSocialLinkForm = ({
  onCreate,
  onClose,
  blackList,
}: CreateSocialLinkFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm<SocialLinkProps>({
    defaultValues: {
      name: "",
      icon: null,
      url: "",
      color: "",
    },
  });

  const socialSelected = watch("name");

  const isMobile = useIsTouchDevice();

  const onSubmit = (data) => {
    const social = socialNetworks.find(
      (network) => network.value === socialSelected
    );
    data = {
      ...data,
      color: social.color,
      icon: social.icon,
      url: `https://${social.value}.com/${data.url}`,
    };
    onCreate(data);
    reset({
      name: "",
    });
  };

  const validOptions = useMemo(() => {
    return _.differenceBy(
      socialNetworks,
      blackList,
      "value"
    ) as typeof socialNetworks;
  }, [blackList]);

  return (
    <Stack p={4} borderWidth={1} borderRadius={4} borderColor="gray.400">
      <Flex w="100%" justify="space-between">
        <Heading as="h6" size="sm">
          Create social link
        </Heading>
        <CloseButton onClick={onClose} />
      </Flex>
      <Flex direction={isMobile ? "column" : "row"} gap={4}>
        <Select
          placeholder="Social Network"
          {...register("name", { required: true })}
          isInvalid={!!errors?.name}
          flexBasis="50%"
        >
          {validOptions.map((socialNetwork, index) => {
            return (
              <option value={socialNetwork.value} key={index}>
                {socialNetwork.name}
              </option>
            );
          })}
        </Select>
        {socialSelected && (
          <InputGroup flexBasis="50%">
            <InputLeftAddon children={`https://${socialSelected}.com/`} />
            <Input
              {...register("url", { required: true })}
              placeholder={`Your ${socialSelected} url`}
            />
          </InputGroup>
        )}
      </Flex>
      <Divider py={2} />
      <Flex align="center" w="100%">
        <Button mr={4} colorScheme="blue" onClick={handleSubmit(onSubmit)}>
          Create
        </Button>
        <Button type="reset" colorScheme="gray">
          Reset
        </Button>
      </Flex>
    </Stack>
  );
};

const SocialLinkBuilder = ({
  onChange,
  initialValues,
}: SocialLinkBuilderProps) => {
  const [showCreator, setShowCreator] = useState(false);
  const [socialLinks, setSocialLinks] = useState(initialValues ?? []);

  const createdLinks = useMemo(() => {
    return socialLinks?.map((socialLink) => ({ value: socialLink.name }));
  }, [socialLinks]);

  useEffect(() => {
    setSocialLinks(initialValues);
  }, [initialValues]);

  useEffect(() => {
    onChange(socialLinks);
  }, [socialLinks]);

  const createSocialLink = (payload: SocialLinkProps) => {
    const currentItems = [...socialLinks];
    currentItems.push(payload);

    setSocialLinks(currentItems);
  };

  const removeSocialLink = (event: SyntheticEvent, name: string) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const index = socialLinks.findIndex(
      (socialLink) => socialLink.name === name
    );
    if (index >= 0) {
      const clonedList = _.cloneDeep(socialLinks);
      clonedList.splice(index, 1);
      setSocialLinks(clonedList);
    }
  };

  return (
    <Stack py={4} w="100%">
      <Text>Social links</Text>
      <Flex
        cursor="pointer"
        alignItems="center"
        justify="space-between"
        w="inherit"
        onClick={() => setShowCreator(true)}
      >
        <Text color="gray.400">Click to create a new Social Link</Text>
        <IconButton
          aria-label="Create social link"
          icon={<FaPlus />}
          colorScheme="blue"
          size="sm"
          variant="outline"
        />
      </Flex>
      <Divider my={2} />
      {showCreator && (
        <CreateSocialLinkForm
          onCreate={createSocialLink}
          onClose={() => setShowCreator(false)}
          blackList={createdLinks}
        />
      )}
      <Divider />
      {socialLinks?.length > 0 ? (
        <Stack>
          <Text>Current social links</Text>
          <Flex gap={4}>
            {socialLinks?.map((socialLink, index) => {
              return (
                <SocialLinkCard
                  isRemovable
                  key={index}
                  data={{ ...socialLink }}
                  onRemove={(event) => removeSocialLink(event, socialLink.name)}
                />
              );
            })}
          </Flex>
        </Stack>
      ) : (
        <Text>No social links were created yet</Text>
      )}
    </Stack>
  );
};

export default SocialLinkBuilder;
