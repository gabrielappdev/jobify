import { Box, Container, Divider, theme, useColorMode } from "@chakra-ui/react";
import { bgColor } from "helpers";
import { JobPostProps } from "types";
import CompanyDescription from "../CompanyDescription";
import JobListSection from "../JobListSection";

type JobPageContentProps = {
  data: JobPostProps;
};
const JobPageContent = ({ data }: JobPageContentProps) => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Container maxW="140ch">
        <Box p={4}>
          <div
            dangerouslySetInnerHTML={{ __html: data.description as string }}
          />
        </Box>
      </Container>
      <Box w="100%" bg={bgColor[colorMode]}>
        <Divider />
        <CompanyDescription
          data={{
            name: data?.company?.name,
            description: data?.company?.description,
            url: data?.company?.url,
          }}
        />
      </Box>
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
