import { applyPostsSorting, _formatCardPost, _formatSettings } from "helpers";
import _ from "lodash";
import Template from "templates";
import { JobCardProps, JobPostProps, TemplateDataProps } from "types";
import fetch from "../../services/api";
import JobPageHero from "@/components/JobPageHero";
import JobPageContent from "@/components/JobPageContent";

type JobPageProps = {
  data: {
    templateData: TemplateDataProps;
    job: JobPostProps;
  };
};

const JobPage = ({ data }: JobPageProps) => {
  return (
    <Template data={data?.templateData}>
      <JobPageHero data={data?.job} />
      <JobPageContent data={data?.job} />
    </Template>
  );
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
  const assignAppData = (json) => {
    const {
      logo: { url },
      hero: { url: heroUrl },
    } = json;
    json = {
      ...json,
      logoUrl: url?.toString(),
      heroUrl: heroUrl?.toString(),
    };
    return json;
  };
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
        appData: { ...assignAppData(responseData.templateData.appData) },
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
