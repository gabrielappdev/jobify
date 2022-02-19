import Template from "../../templates";
import { Box, useColorMode } from "@chakra-ui/react";
import {
  FeaturedCompaniesProps,
  JobCardCompanyProps,
  TemplateDataProps,
} from "types";
import GenericPageHero from "@/components/GenericPageHero";
import CompanyCard from "@/components/CompanyCard";
import fetch from "services/api";
import {
  _formatCardPost,
  _formatCategories,
  _formatAppData,
  _formatCompany,
  applyPostsSorting,
  bgColor,
} from "../../helpers";
import _ from "lodash";
import JobListSection from "@/components/JobListSection";
import CompanyDescription from "@/components/CompanyDescription";

type CompanyPageProps = {
  data: {
    company: JobCardCompanyProps;
    templateData: TemplateDataProps;
    featuredCompanies: FeaturedCompaniesProps[];
  };
};

const CompanyPage = ({ data }: CompanyPageProps) => {
  console.log(data);
  const { colorMode } = useColorMode();
  return (
    <Template data={data.templateData}>
      <GenericPageHero>
        <CompanyCard
          displaySocialLinks
          data={data?.company}
          shouldDisplayLogo={true}
        />
      </GenericPageHero>
      <Box w="100%" bg={bgColor[colorMode]}>
        <CompanyDescription
          data={{
            name: data?.company?.name,
            description: data?.company?.description,
            url: data?.company?.url,
          }}
        />
        <JobListSection
          heading={`Latest ${data?.company?.name}'s jobs`}
          jobList={data?.company?.jobs}
          description={
            !data?.company?.posts
              ? "No recent jobs found for this company!"
              : `${data?.company?.posts} ${
                  data?.company?.posts === 1 ? "job" : "jobs"
                } found`
          }
        />
      </Box>
    </Template>
  );
};

export async function getStaticPaths() {
  const res = await fetch("/companies?pagination[pageSize]=1000");
  const { data: companies } = await res.json();
  const paths = companies?.map(({ attributes: { slug } }) => ({
    params: { slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  const response = await fetch(`/company/${slug}`);
  const responseData = await response.json();

  let notFound = false;
  let data = {};

  if (response?.error) {
    notFound = true;
  } else {
    let companyData = responseData?.company;

    data = {
      ...responseData,
      templateData: {
        ...responseData.templateData,
        appData: { ..._formatAppData(responseData?.templateData?.appData) },
      },
      company: {
        ..._formatCompany(companyData),
        jobs: applyPostsSorting(
          responseData?.company?.jobs.map((job) => _formatCardPost(job))
        ),
      },
    };
  }
  return {
    props: {
      data,
      notFound,
    },
  };
}

export default CompanyPage;
