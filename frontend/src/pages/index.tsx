import { useEffect } from "react";
import { Heading } from "@chakra-ui/react";
import Container from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import fetch from "services/api";
import { HomeProps } from "types";
import { useDispatch, useSelector } from "react-redux";
import { SET_GLOBAL_DATA } from "store/actions";
import { ReducersProps } from "store/reducers";

type IndexProps = {
  data: HomeProps;
};

const Index = ({ data }: IndexProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.price) {
      dispatch({
        type: SET_GLOBAL_DATA,
        payload: data,
      });
    }
  }, [data, dispatch]);
  return (
    <Container height="100vh">
      <DarkModeSwitch />
      <Heading as="h1">With chakra</Heading>
      {data?.name && <Heading>{data.name}</Heading>}
    </Container>
  );
};

export async function getStaticProps() {
  let data: HomeProps = {
    name: "",
    description: "",
    price: 0,
    createdAt: "",
    updatedAt: "",
  };
  try {
    const response = await fetch("/global");
    if (response.ok) {
      const resultData = await response.json();
      if (resultData) {
        data = resultData.data.attributes;
      }
    }
  } catch (error) {
    //
  }
  return {
    props: { data },
  };
}

export default Index;
