import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  SimpleGrid,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import qs from "qs";
import { SyntheticEvent, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { ReducersProps } from "store/reducers";
import { bgColor, pickParams } from "../../helpers";

export type SearchParamsProps = {
  title?: string;
  category?: number | string;
  company?: string;
  tag?: number | string;
  location?: string;
  page?: number;
  limit?: number;
};

type AdvancedSearchJobsProps = {
  params: SearchParamsProps;
  hasInheritBackground?: boolean;
};

const AdvancedSearchJobs = ({
  params,
  hasInheritBackground = true,
}: AdvancedSearchJobsProps) => {
  const { colorMode } = useColorMode();
  const categories = useSelector(({ app }: ReducersProps) => app.categories);
  const tags = useSelector(({ app }: ReducersProps) => app.tags);
  const router = useRouter();

  const pickedParams = useMemo(() => {
    const values = pickParams(params);
    return {
      ...values,
      category: values?.category ? parseInt(values.category) : "",
      tag: values?.tag ? parseInt(values.tag) : "",
    };
  }, [params]);

  const { handleSubmit, register, reset } = useForm<SearchParamsProps>({
    defaultValues: {
      ...pickedParams,
    },
  });

  const onSubmit = (data: SearchParamsProps) => {
    router.push(
      `/jobs?${qs.stringify(data, { encodeValuesOnly: true })}`,
      undefined,
      {
        shallow: false,
      }
    );
  };

  useEffect(() => {
    reset(params);
  }, [params]);

  const handleReset = (event: SyntheticEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    reset({
      title: "",
      category: null,
      company: "",
      tag: null,
      location: "",
      page: 1,
      limit: 15,
    });
    router.push(`/jobs`, undefined, {
      shallow: false,
    });
  };

  return (
    <Box
      py={4}
      w="100%"
      bg={hasInheritBackground ? "inherit" : bgColor[colorMode]}
    >
      <form onSubmit={handleSubmit(onSubmit)} onReset={handleReset}>
        <Stack>
          <SimpleGrid gap={4} columns={{ sm: 1, md: 2 }}>
            <Input
              mr={2}
              bg={bgColor[colorMode]}
              placeholder="Job title"
              {...register("title")}
            />
            <Input
              mr={2}
              bg={bgColor[colorMode]}
              placeholder="Company name"
              {...register("company")}
            />
          </SimpleGrid>
          <SimpleGrid gap={4} columns={{ sm: 2, md: 3 }}>
            <Input
              mr={2}
              bg={bgColor[colorMode]}
              placeholder="Location"
              {...register("location")}
            />
            <Select
              bg={bgColor[colorMode]}
              {...register("category")}
              placeholder="Job Category"
            >
              {categories.map((category) => {
                return (
                  <option
                    key={category.id as number}
                    value={category.id as number}
                  >
                    {category.title}
                  </option>
                );
              })}
            </Select>
            <Select
              bg={bgColor[colorMode]}
              {...register("tag")}
              placeholder="Job Tag"
            >
              {tags.map((tag) => {
                return (
                  <option key={tag.id as number} value={tag.id as number}>
                    {tag.title}
                  </option>
                );
              })}
            </Select>
          </SimpleGrid>
          <Flex align="center" justify="flex-end">
            <div>
              <Button color="gray.100" bgColor="gray.500" type="reset">
                Clear
              </Button>
              <Button ml={2} colorScheme="blue" type="submit">
                Search
              </Button>
            </div>
          </Flex>
        </Stack>
      </form>
    </Box>
  );
};

export default AdvancedSearchJobs;
