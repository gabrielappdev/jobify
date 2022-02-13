import { useEffect } from "react";
import Container from "../components/Container";
import { IndexProps } from "types";
import { useDispatch } from "react-redux";
import { SET_GLOBAL_DATA } from "store/actions";
import HomePage from "../pages/Home";
import { assignIndexData } from "helpers";

type IndexPageProps = {
  data: IndexProps;
};

const Index = ({ data }: IndexPageProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SET_GLOBAL_DATA,
      payload: data,
    });
  }, [data, dispatch]);
  return (
    <Container minH="100vh">
      <HomePage data={data} />
    </Container>
  );
};

export async function getServerSideProps() {
  return assignIndexData();
}

export default Index;
