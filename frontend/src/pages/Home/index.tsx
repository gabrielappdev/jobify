import { IndexProps } from "types";
import Template from "../../templates";
import Hero from "@/components/Hero";
import JobListSection from "@/components/JobListSection";

type DataType = {
  data: IndexProps;
};

const Home = ({ data }: DataType) => {
  return (
    <Template data={data}>
      <Hero data={data.appData} />
      <JobListSection
        heading="Featured Jobs"
        description="Trending jobs with high competition"
        jobList={data.featuredPosts}
      />
    </Template>
  );
};

export default Home;
