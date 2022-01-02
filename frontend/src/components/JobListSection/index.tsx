import { useState, useEffect, useMemo } from "react";
import {
  Center,
  Flex,
  Heading,
  Select,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { JobCardProps } from "types";
import JobCard from "../JobCard";
import Section from "../Section";
import useIsTouchDevice from "../../hooks/useDeviceDetect";

type JobListSectionProps = {
  heading: String;
  description?: String;
  jobList: JobCardProps[];
  isLoading?: Boolean;
};

const JobListSection = ({
  heading,
  description,
  jobList,
  isLoading,
}: JobListSectionProps) => {
  const isMobile = useIsTouchDevice();
  const [displayedJobs, setDisplayedJobs] = useState(jobList);
  const [category, setCategory] = useState("");

  useEffect(() => {
    setDisplayedJobs(jobList);
  }, [jobList]);

  const allCategories = useMemo(() => {
    const jobsCategories = jobList?.reduce((acc: String[], job): String[] => {
      const categories = job?.categories.map(({ title }) => title);
      acc = acc.concat(categories);
      return acc;
    }, []);
    jobsCategories?.unshift("Select a category");
    const set = new Set(jobsCategories);

    return Array.from(set);
  }, [jobList]);

  useEffect(() => {
    if (category) {
      setDisplayedJobs([
        ...jobList?.filter((data) =>
          data?.categories.find(({ title }) => title === category)
        ),
      ]);
    } else {
      setDisplayedJobs(jobList);
    }
  }, [category]);

  const getCards = () => {
    if (isLoading) {
      return (
        <Stack w="100%">
          {Array.from(new Array(10)).map((_, index) => {
            return <Skeleton h="125px" w="100%" key={index} />;
          })}
        </Stack>
      );
    }
    if (displayedJobs?.length) {
      return displayedJobs?.map((jobCard: JobCardProps, index) => {
        return <JobCard data={jobCard} key={index} />;
      });
    }
  };

  return (
    <Section minW="auto">
      <Center>
        <Stack w="100%">
          <Flex
            w="100%"
            align="center"
            justify="space-between"
            direction={isMobile ? "column" : "row"}
          >
            <Stack w="100%">
              <Heading as="h2" size="xl" textAlign="left">
                {heading}
              </Heading>
              {description && (
                <Text role="description" textAlign="left" size="md">
                  {description}
                </Text>
              )}
            </Stack>
            {!!jobList?.length && (
              <Flex w="100%" justify="flex-end">
                <Select
                  onChange={({ target: { value } }) => setCategory(value)}
                  maxW="300px"
                  pt={isMobile ? 4 : 0}
                >
                  {allCategories?.map((cat, index) => {
                    return (
                      <option
                        key={index}
                        value={index === 0 ? "" : cat.toString()}
                      >
                        {cat}
                      </option>
                    );
                  })}
                </Select>
              </Flex>
            )}
          </Flex>
          <Stack pt={8} w="inherit">
            {getCards()}
          </Stack>
        </Stack>
      </Center>
    </Section>
  );
};

export default JobListSection;
