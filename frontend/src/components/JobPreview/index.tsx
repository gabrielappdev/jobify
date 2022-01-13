import {
  Box,
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  SimpleGrid,
  Stack,
  Switch,
  Tag,
  Text,
} from "@chakra-ui/react";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import { FaRocket } from "react-icons/fa";
import { useSelector } from "react-redux";
import { ReducersProps } from "store/reducers";
import { JobCardProps, PostSettingsProps } from "types";
import JobCard from "../JobCard";

type JobPreviewProps = {
  data: JobCardProps;
  onChange: (post_settings: PostSettingsProps, total: Number) => void;
};

const titles = {
  highlight: "Highlight the job",
  featured: "Feature the job",
  pinned: "Pin the job",
  display_logo: "Display your logo company",
};

const JobPreview = ({ data, onChange }: JobPreviewProps) => {
  const globalData = useSelector(({ app }: ReducersProps) => app.appData);
  const prices = useMemo(() => {
    if (globalData) {
      return _.pick(globalData, [
        "price",
        "highlight",
        "featured",
        "pinned",
        "display_logo",
      ]);
    }
    return null;
  }, [globalData]);

  const [switches, setSwitches] = useState<PostSettingsProps>({
    featured: false,
    pinned: false,
    highlight: false,
    display_logo: false,
  });

  const isAllEnabled = useMemo(() => {
    return _.keys(switches).every((key) => switches[key]);
  }, [switches]);

  const total = useMemo(() => {
    return _.keys(switches).reduce((total, key) => {
      total += switches[key] ? Number(prices[key]) : 0;
      return total;
    }, Number(prices.price));
  }, [prices, switches]);

  const handleToggleSwitch = (key, value) => {
    const values = _.cloneDeep(switches);
    values[key] = value;
    setSwitches(values);
  };

  const handleEnableAll = () => {
    const toggleAll = (value: boolean) => {
      const allKeys = _.keys(switches);
      const values = _.cloneDeep(switches);
      allKeys.forEach((key) => {
        values[key] = value;
      });
      setSwitches(values);
    };
    if (isAllEnabled) {
      toggleAll(false);
    } else {
      toggleAll(true);
    }
  };

  useEffect(() => {
    onChange(switches, total);
  }, [switches]);

  return (
    <Stack>
      <Stack gap={4}>
        <Flex
          w="100%"
          justify="space-between"
          aling="center"
          gap={2}
          color="green.400"
        >
          <Flex gap={2}>
            <Heading as="h6" size="md">
              Boost your job
            </Heading>
            <FaRocket />
          </Flex>
          <FormControl w="max-content" display="flex" alignItems="center">
            <FormLabel color="gray.500" htmlFor="enable-all-boosts" mb="0">
              {isAllEnabled ? "Disable all" : "Enable all"}
            </FormLabel>
            <Switch
              isChecked={isAllEnabled}
              onChange={handleEnableAll}
              colorScheme="green"
              id="enable-all-boosts"
            />
          </FormControl>
        </Flex>
        <SimpleGrid my={4} gap={4} columns={{ sm: 2, md: 4 }}>
          {_.keys(switches).map((key, index) => {
            return (
              <Box
                p={4}
                key={index}
                shadow="md"
                _hover={{ shadow: "lg" }}
                borderRadius={4}
              >
                <Center>
                  <Stack w="100%" gap={2} align="center" justify="center">
                    <Tag colorScheme="green" size="lg">
                      $ {prices[key]}
                    </Tag>
                    <Heading
                      size="sm"
                      as="h6"
                      color={!!switches[key] ? "green.500" : "gray.400"}
                    >
                      {titles[key]}
                    </Heading>
                    <Switch
                      colorScheme="green"
                      isChecked={switches[key]}
                      onChange={({ target: { checked } }) =>
                        handleToggleSwitch(key, checked)
                      }
                    />
                  </Stack>
                </Center>
              </Box>
            );
          })}
        </SimpleGrid>
      </Stack>
      <Divider />
      {data?.title && <JobCard data={data} isPreview />}
      <Divider />
    </Stack>
  );
};

export default JobPreview;
