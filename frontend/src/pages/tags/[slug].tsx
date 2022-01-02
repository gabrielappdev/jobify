import { useMemo } from "react";
import useSWR from "swr";
import JobListSection from "@/components/JobListSection";
import { Box, useColorMode } from "@chakra-ui/react";
import Template from "templates";
import { TagProps, JobCardProps, TemplateDataProps } from "types";
import {
  _formatAppData,
  _formatCardPost,
  applyPostsSorting,
  bgColor,
  _formatCategories,
} from "../../helpers";
import fetch, { fetcher } from "../../services/api";

type TagPageProps = {
  data: {
    tag: TagProps;
    templateData: TemplateDataProps;
    jobs: JobCardProps[];
  };
};

const useTagFetch = (slug) => {
  const { data: tagData, error } = useSWR(`/tag/${slug}`, fetcher);

  return {
    tagData,
    isLoading: !error && !tagData,
    error,
  };
};

const CategoryPage = ({ data }: TagPageProps) => {
  const { colorMode } = useColorMode();

  const { tagData, isLoading } = useTagFetch(data?.tag?.slug);

  const jobs = useMemo(() => {
    return tagData?.jobs
      ? applyPostsSorting(tagData?.jobs?.map((job) => _formatCardPost(job)))
      : data?.jobs;
  }, [tagData?.jobs]);

  return (
    <Template data={data?.templateData}>
      <Box minH="60vh" pt="120px" w="100%" bg={bgColor[colorMode]}>
        <JobListSection
          heading={`Latest ${data?.tag?.title} jobs`}
          isLoading={isLoading}
          description={
            !data?.jobs?.length
              ? "No recent jobs found for this tag!"
              : `${data.jobs?.length} ${
                  data.jobs?.length === 1 ? "job" : "jobs"
                } found`
          }
          jobList={jobs}
        />
      </Box>
    </Template>
  );
};

export async function getStaticPaths() {
  const response = await fetch("/tags?pagination[pageSize]=100");
  const { data: tags } = await response.json();
  return {
    paths: tags.map(({ attributes: { slug } }) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const response = await fetch(`/tag/${slug}`);
  const tagPageData = await response.json();

  let data = {};
  let notFound = false;

  if (!tagPageData?.tag) {
    notFound = true;
  } else {
    data = {
      ...tagPageData,
      jobs: applyPostsSorting(
        tagPageData.jobs.map((job) => _formatCardPost(job))
      ),
      templateData: {
        ...tagPageData.templateData,
        appData: _formatAppData(tagPageData.templateData.appData),
      },
    };
  }

  return {
    props: {
      data,
    },
    notFound,
  };
}

export default CategoryPage;
