import { Center, Divider, Heading, Stack, Text } from "@chakra-ui/react";
import useIsTouchDevice from "hooks/useDeviceDetect";
import { JobCardProps } from "types";
import JobCard from "../JobCard";
import Section from "../Section";

type JobListSection = {
  heading: String;
  description?: String;
  jobList: JobCardProps[];
};

const JobListSection = ({ heading, description, jobList }) => {
  const isMobile = useIsTouchDevice();
  const getCards = () => {
    if (jobList.length) {
      return jobList.map((jobCard: JobCardProps, index) => {
        return <JobCard data={jobCard} key={index} />;
      });
    }
    return <div />;
  };
  return (
    <Section padding={4} minW="auto" maxW={isMobile ? "100%" : "120ch"}>
      <Center>
        <Stack w="100%">
          <Heading as="h2" size="xl" textAlign="center">
            {heading}
          </Heading>
          {description && (
            <Text role="description" textAlign="center" size="md">
              {description}
            </Text>
          )}
          <Divider />
          <Stack pt={8} w="inherit">
            {getCards()}
          </Stack>
        </Stack>
      </Center>
    </Section>
  );
};

export default JobListSection;
