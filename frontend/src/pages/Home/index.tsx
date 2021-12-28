import { IndexProps } from "types";
import Template from "../../templates";
import Hero from "@/components/Hero";

type DataType = {
  data: IndexProps;
};

const Home = ({ data }: DataType) => {
  return (
    <Template data={data}>
      <Hero data={data.appData} />
    </Template>
  );
};

export default Home;
