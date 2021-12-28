import { useEffect } from "react";
import Container from "../components/Container";
import fetch from "services/api";
import { HomeProps, IndexProps } from "types";
import { useDispatch } from "react-redux";
import { SET_GLOBAL_DATA } from "store/actions";
import HomePage from "../pages/Home";

type IndexPageProps = {
  data: IndexProps;
};

const Index = ({ data }: IndexPageProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.appData?.price) {
      dispatch({
        type: SET_GLOBAL_DATA,
        payload: data,
      });
    }
  }, [data, dispatch]);
  return (
    <Container minH="100vh">
      <HomePage data={data} />
    </Container>
  );
};

export async function getStaticProps() {
  let notFound = false;
  let data: IndexProps = {
    appData: {
      name: "",
      description: "",
      price: 0,
      logo: null,
      logoUrl: "",
      hero: null,
      heroUrl: "",
    },
    categories: [],
  };

  const assignGlobalData = (json) => {
    const appData = json.data.attributes as HomeProps;
    const {
      logo: {
        data: {
          attributes: { url },
        },
      },
      hero: {
        data: {
          attributes: { url: heroUrl },
        },
      },
    } = appData;
    data = {
      ...data,
      appData: {
        ...appData,
        logoUrl: url?.toString(),
        heroUrl: heroUrl.toString(),
      },
    };
  };

  const assignCategories = (json) => {
    data = {
      ...data,
      categories: json.data.map(({ attributes: { title, slug } }) => ({
        title,
        slug,
      })),
    };
  };

  try {
    const promises = [fetch("/global?populate=*"), fetch("/categories")];
    const responses = await Promise.all(promises);
    if (responses) {
      for (let i = 0; i < responses.length; i++) {
        const json = await responses[i].json();
        if (json) {
          switch (i) {
            case 0:
              assignGlobalData(json);
              break;
            case 1:
              assignCategories(json);
          }
        }
      }
    }
  } catch (error) {
    //
    console.log(error);
    notFound = true;
  }
  return {
    props: { data },
    notFound,
  };
}

export default Index;
