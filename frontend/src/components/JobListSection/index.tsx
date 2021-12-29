import { Center, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { JobCardProps } from "types";
import Section from "../Section";

type JobListSection = {
  heading: String;
  description?: String;
  jobList: JobCardProps[];
};

const JobListSection = ({ heading, description, jobList }) => {
  return (
    <Section>
      <Center>
        <Stack align="center">
          <Heading as="h2" size="xl">
            {heading}
          </Heading>
          {description && <Text size="md">{description}</Text>}
        </Stack>
      </Center>
    </Section>
  );
};

export default JobListSection;
