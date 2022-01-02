import { useMemo } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import JobListSection from "@/components/JobListSection";
import { Box, useColorMode } from "@chakra-ui/react";
import Template from "templates";
import { CategoryProps, JobCardProps, TemplateDataProps } from "types";
import {
  _formatAppData,
  _formatCardPost,
  applyPostsSorting,
  bgColor,
  _formatCategories,
} from "../../helpers";
import fetch, { fetcher } from "../../services/api";

type CategoryPageProps = {
  data: {
    category: CategoryProps;
    templateData: TemplateDataProps;
    jobs: JobCardProps[];
  };
};

const useCategoryFetch = (slug) => {
  const { data: categoryData, error } = useSWR(`/category/${slug}`, fetcher);

  return {
    categoryData,
    isLoading: !error && !categoryData,
    error,
  };
};

const CategoryPage = ({ data }: CategoryPageProps) => {
  const { colorMode } = useColorMode();

  const { categoryData, isLoading } = useCategoryFetch(data?.category?.slug);

  const jobs = useMemo(() => {
    return categoryData?.jobs
      ? applyPostsSorting(
          categoryData?.jobs?.map((job) => _formatCardPost(job))
        )
      : data?.jobs;
  }, [categoryData?.jobs]);

  return (
    <Template data={data?.templateData}>
      <Box minH="50vh" pt="120px" w="100%" bg={bgColor[colorMode]}>
        <JobListSection
          heading={`Latest ${data?.category?.title} jobs`}
          isLoading={isLoading}
          description={
            !data?.jobs?.length
              ? "No recent jobs found for this category!"
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
  const response = await fetch("/categories?pagination[pageSize]=100");
  const { data: categories } = await response.json();
  return {
    paths: categories.map(({ attributes: { slug } }) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const response = await fetch(`/category/${slug}`);
  const categoryPageData = await response.json();

  let data = {};
  let notFound = false;

  if (!categoryPageData?.category) {
    notFound = true;
  } else {
    data = {
      ...categoryPageData,
      jobs: applyPostsSorting(
        categoryPageData.jobs.map((job) => _formatCardPost(job))
      ),
      templateData: {
        ...categoryPageData.templateData,
        appData: _formatAppData(categoryPageData.templateData.appData),
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
