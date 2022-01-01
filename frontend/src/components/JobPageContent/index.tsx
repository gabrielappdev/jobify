import { Box, Container, theme, useColorMode } from "@chakra-ui/react";
import { bgColor } from "helpers";
import { JobPostProps } from "types";
import JobListSection from "../JobListSection";

type JobPageContentProps = {
  data: JobPostProps;
};
const JobPageContent = ({ data }: JobPageContentProps) => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Container maxW="140ch">
        <Box py={4}>
          <div
            dangerouslySetInnerHTML={{ __html: data.description as string }}
          />
        </Box>
      </Container>
      <Box
        borderTopWidth={1}
        borderTopColor={theme.colors.gray[200]}
        w="100%"
        bg={bgColor[colorMode]}
      >
        <JobListSection
          heading="Related posts"
          description="Find more recent jobs like this one"
          jobList={data.relatedJobs}
        />
      </Box>
    </>
  );
};

export default JobPageContent;
