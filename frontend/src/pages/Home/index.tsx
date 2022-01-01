import { IndexProps } from "types";
import Template from "../../templates";
import Hero from "@/components/Hero";
import JobListSection from "@/components/JobListSection";
import FeaturedCompanies from "@/components/FeaturedCompanies";

type DataType = {
  data: IndexProps;
};

const Home = ({ data }: DataType) => {
  return (
    <Template data={data}>
      <Hero data={data?.appData} />
      <FeaturedCompanies data={data?.featuredCompanies} />
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
