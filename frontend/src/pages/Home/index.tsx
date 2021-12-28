import Container from "@/components/Container";
import { IndexProps } from "types";
import Template from "../../templates";

type DataType = {
  data: IndexProps;
};

const Home = ({ data }: DataType) => {
  return (
    <Template data={data}>
      <Container></Container>
    </Template>
  );
};

export default Home;
