import {
  applyPostsSorting,
  _formatCardPost,
  _formatSettings,
  randomIntFromInterval,
  _formatAppData,
} from "../../helpers";
import _ from "lodash";
import Template from "templates";
import { JobPostProps, TemplateDataProps } from "types";
import fetch from "../../services/api";
import JobPageHero from "@/components/JobPageHero";
import JobPageContent from "@/components/JobPageContent";
import { fetcher } from "../../services/api";
import useSWR from "swr";
import { Container, Flex, Skeleton, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

type JobPageProps = {
  data: {
    templateData: TemplateDataProps;
    job: JobPostProps;
  };
};

const useJobFetch = (slug) => {
  const { data: jobData, error } = useSWR(`/job/${slug}`, fetcher);

  return {
    jobData,
    isLoading: !error && !jobData,
    error,
  };
};

const JobPage = ({ data }: JobPageProps) => {
  const { jobData, isLoading } = useJobFetch(data?.job?.slug);
  const router = useRouter();

  const getJobPageContent = () => {
    const TemplateWrapper = ({ children }) => {
      return <Template data={data?.templateData}>{children}</Template>;
    };
    if (isLoading) {
      <TemplateWrapper>
        <Container maxW="140ch">
          <Stack>
            <Flex justify="space-between">
              <Skeleton w="100px" h="100px" />
              <Stack>
                <Skeleton w="80%" />
                <Skeleton w="60%" />
                <Skeleton w="50%" />
              </Stack>
            </Flex>
            <Stack>
              {Array.from(new Array(10)).map((_, index) => {
                return (
                  <Skeleton
                    key={index}
                    w={`calc(100% - ${randomIntFromInterval(0, 50)}%)`}
                    h="25px"
                    mb={2}
                  />
                );
              })}
            </Stack>
          </Stack>
        </Container>
      </TemplateWrapper>;
    }
    if (jobData) {
      if (!jobData?.job?.active) {
        router.push("/404");
      }
    }
    return (
      <TemplateWrapper>
        <JobPageHero data={data?.job} />
        <JobPageContent data={data?.job} />
      </TemplateWrapper>
    );
  };
  return getJobPageContent();
};

export async function getStaticPaths() {
  const res = await fetch("/jobs");
  const jobs = await res.json();

  const paths = jobs?.map((job) => ({
    params: { slug: job.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  let notFound = false;
  let data = {};

  const response = await fetch(`/job/${slug}`);
  const responseData = await response.json();

  if (!responseData?.job?.active) {
    notFound = true;
  } else {
    data = {
      ...responseData,
      job: {
        ..._formatCardPost(responseData.job),
        relatedJobs: applyPostsSorting(
          responseData.job.relatedJobs?.map((relatedJob) =>
            _formatCardPost(relatedJob)
          )
        ),
      },
      templateData: {
        ...responseData.templateData,
        appData: { ..._formatAppData(responseData.templateData.appData) },
      },
    };
  }

  return {
    props: {
      data,
    },
    notFound,
    revalidate: 10,
  };
}

export default JobPage;
