import GenericPageHero from "@/components/GenericPageHero";
import JobListSection from "@/components/JobListSection";
import { Box, Center, Heading, useColorMode } from "@chakra-ui/react";
import Template from "templates";
import { CategoryProps, JobCardProps, TemplateDataProps } from "types";
import {
  _formatAppData,
  _formatCardPost,
  applyPostsSorting,
  bgColor,
  _formatCategories,
} from "../../helpers";
import fetch from "../../services/api";

type CategoryPageProps = {
  data: {
    category: CategoryProps;
    templateData: TemplateDataProps;
    jobs: JobCardProps[];
  };
};

const CategoryPage = ({ data }: CategoryPageProps) => {
  const { colorMode } = useColorMode();
  return (
    <Template data={data?.templateData}>
      <Box pt="120px" w="100%" bg={bgColor[colorMode]}>
        <JobListSection
          heading={`Latest ${data?.category?.title} jobs`}
          description={
            !data?.jobs?.length && "No recent jobs found for this category!"
          }
          jobList={data?.jobs}
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
  };
}

export default CategoryPage;
