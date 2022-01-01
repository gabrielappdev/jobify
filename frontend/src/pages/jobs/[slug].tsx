import { _formatCardPost, _formatSettings } from "helpers";
import _ from "lodash";
import Template from "templates";
import { JobCardProps, JobPostProps, TemplateDataProps } from "types";
import fetch from "../../services/api";

type JobPageProps = {
  data: {
    templateData: TemplateDataProps;
    job: JobPostProps;
  };
};

const JobPage = ({ data }: JobPageProps) => {
  return (
    <Template data={data.templateData}>{JSON.stringify(data.job)}</Template>
  );
};

export async function getStaticPaths() {
  const res = await fetch("/jobs");
  const jobs = await res.json();

  const paths = jobs.map((job) => ({
    params: { slug: job.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }) {
  try {
    const response = await fetch(`/job/${slug}`);
    const responseData = await response.json();
    const assignAppData = (json) => {
      const {
        logo: { url },
        hero: { url: heroUrl },
      } = json;
      json = {
        ...json,
        logoUrl: url?.toString(),
        heroUrl: heroUrl.toString(),
      };
      return json;
    };

    return {
      props: {
        data: {
          ...responseData,
          job: {
            ..._formatCardPost(responseData.job),
            relatedJobs: responseData.job.relatedJobs.map((relatedJob) =>
              _formatCardPost(relatedJob)
            ),
          },
          templateData: {
            ...responseData.templateData,
            appData: { ...assignAppData(responseData.templateData.appData) },
          },
        },
      },
    };
  } catch (error) {
    console.error(`Error generating page job/${slug} | `, error);
  }
}

export default JobPage;
