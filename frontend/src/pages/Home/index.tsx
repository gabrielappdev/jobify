import FeaturedCompanies from "@/components/FeaturedCompanies";
import Hero from "@/components/Hero";
import JobListSection from "@/components/JobListSection";
import { IndexProps } from "types";
import Template from "../../templates";

export type DataType = {
  data: IndexProps;
};

const Home = ({ data }: DataType) => {
  return (
    <Template data={data}>
      <Hero data={data?.appData} />
      {data?.featuredCompanies?.length === 5 && (
        <FeaturedCompanies data={data?.featuredCompanies} />
      )}
      <JobListSection
        heading="Featured Jobs"
        description="Trending jobs with high competition"
        jobList={data?.featuredJobs}
      />
      <JobListSection heading="Latest Jobs" jobList={data?.otherJobs} />
    </Template>
  );
};

export default Home;
