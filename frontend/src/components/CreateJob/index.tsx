import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  _formatCategories,
  _formatCompany,
  _formatSettings,
  _formatTags,
} from "helpers";
import useIsTouchDevice from "hooks/useDeviceDetect";
import _ from "lodash";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import fetch from "services/api";
import { CategoryProps, PostSettingsProps, TagProps } from "types";
import { ReducersProps } from "../../store/reducers";
import JobPreview from "../JobPreview";
import MultiSelect from "../MultiSelect";

const ReactRTE = dynamic(() => import("../Editor"), {
  ssr: false,
});

type CreateJobProps = {
  onSuccess: (values: any) => void;
  isEdit?: boolean;
};

type FormattedCategoryProps = {
  label: string;
  value: string;
};

type FormattedTagProps = {
  label: string;
  value: string;
};

type CreateJobFormProps = {
  title: string;
  description: string;
  tags: TagProps[];
  categories: CategoryProps[];
  post_settings: PostSettingsProps;
};

const defaultValues = {
  title: "",
  description: "",
  tags: [],
  categories: [],
  post_settings: {
    featured: false,
    pinned: false,
    highlight: false,
    display_logo: false,
  },
};

const CreateJob = ({ onSuccess, isEdit = false }: CreateJobProps) => {
  const isMobile = useIsTouchDevice();
  const toast = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [initialSwitches, setInitialSwitches] = useState(
    defaultValues.post_settings
  );

  const tags = useSelector(({ app }: ReducersProps) => app.tags);
  const categories = useSelector(({ app }: ReducersProps) => app.categories);
  const global = useSelector(({ app }: ReducersProps) => app.appData);
  const user = useSelector(({ user }: ReducersProps) => user.user);

  const currency = useMemo(() => {
    return global?.currency ?? "usd";
  }, [global]);

  const [total, setTotal] = useState(global.price ?? 0);
  const { formattedCategories, formattedTags } = useMemo(() => {
    const formattedCategories = categories.map((category) => ({
      value: category.id.toString(),
      label: category.title.toString(),
    }));
    const formattedTags = tags.map((tag) => ({
      value: tag.id.toString(),
      label: tag.title.toString(),
    }));

    return { formattedCategories, formattedTags };
  }, [categories, tags]);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateJobFormProps>({
    defaultValues,
  });

  const {
    title,
    description,
    categories: formCategories,
    tags: formTags,
    post_settings: postSettings,
  } = watch();

  useEffect(() => {
    if (isEdit) {
      const values = user.create_job_flow.values;
      const formattedCategories = _.intersectionBy(
        categories,
        values.categories,
        "id"
      );
      const formattedTags = _.intersectionBy(tags, values.tags, "id");
      reset({
        ...values,
        categories: formattedCategories.map((category) => ({
          id: category.id,
          label: category.title,
          value: category.id.toString(),
          ...category,
        })),
        tags: formattedTags.map((tag) => ({
          id: tag.id,
          label: tag.title,
          value: tag.id.toString(),
          ...tag,
        })),
      });
      setInitialSwitches(values.post_settings);
    }
  }, [isEdit, user, reset]);

  const onSubmit = async (data: CreateJobFormProps) => {
    setIsSaving(true);
    try {
      const responseData = await fetch("/orders/create-payment-intent", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { ...data, company: user.company.id } }),
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
          title: `Congratulations! You've created your job description`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onSuccess(response);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Internal server error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const jobCardPreviewData = useMemo(() => {
    return {
      title,
      description,
      categories: _formatCategories(formCategories),
      tags: _formatTags(formTags),
      company: _formatCompany(user.company),
      ..._formatSettings(postSettings as PostSettingsProps),
    };
  }, [title, description, formCategories, formTags, postSettings, user]);

  const handleDescriptionChange = (value: string) => {
    setValue("description", value);
  };

  const handleCategoriesSelection = (
    selectedCategories: FormattedCategoryProps[]
  ) => {
    const originalCategories = _.intersectionBy(
      categories,
      selectedCategories.map((category) => ({ id: parseInt(category.value) })),
      "id"
    );
    setValue(
      "categories",
      originalCategories.map((category) => ({
        ...category,
        value: category.id.toString(),
        label: category.title,
      }))
    );
  };
  const handleTagsSelection = (selectedTags: FormattedTagProps[]) => {
    const originalTags = _.intersectionBy(
      tags,
      selectedTags.map((tag) => ({ id: parseInt(tag.value) })),
      "id"
    );
    setValue(
      "tags",
      originalTags.map((tag) => ({
        ...tag,
        value: tag.id.toString(),
        label: tag.title,
      }))
    );
  };

  const handlePostSettingsChange = (
    postSettings: PostSettingsProps,
    total: Number
  ) => {
    setValue("post_settings", postSettings);
    setTotal(total as number);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading size="lg" as="h6" mb={4}>
        Create job
      </Heading>
      <Stack gap={4} w="100%">
        <Input
          isInvalid={!!errors?.title}
          {...register("title")}
          placeholder="Job Title"
        />
        <ReactRTE
          title="Description"
          onValueChange={handleDescriptionChange}
          initialValue={description}
        />
        <Flex w="100%" direction={isMobile ? "column" : "row"} gap={4}>
          <Box flexBasis="50%">
            <MultiSelect
              options={formattedCategories}
              placeholder="Job categories"
              isClearable
              onChange={handleCategoriesSelection}
              size="md"
              value={formCategories}
            />
          </Box>

          <Box flexBasis="50%">
            <MultiSelect
              options={formattedTags}
              placeholder="Job Tags"
              isClearable
              onChange={handleTagsSelection}
              size="md"
              value={formTags}
            />
          </Box>
        </Flex>
        <Divider />
        <JobPreview
          data={jobCardPreviewData}
          currency={"usd"}
          onChange={handlePostSettingsChange}
          initialSwitches={initialSwitches}
        />
        <Divider />
        <Flex gap={2} align="center">
          <Heading size="md">Total: {`$ ${total}`}</Heading>
          {currency !== "usd" && (
            <Text color="red.600" fontSize="sm">
              * The total price in {currency.toUpperCase()} will be shown on the
              next page (payment)
            </Text>
          )}
        </Flex>
        <Stack w="100%">
          <Flex gap={4} w="100%" align="center">
            <Button isLoading={isSaving} type="submit" colorScheme="green">
              Save and continue
            </Button>
            <Button isDisabled={isSaving} type="reset" colorScheme="gray">
              Reset
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </form>
  );
};

export default CreateJob;
