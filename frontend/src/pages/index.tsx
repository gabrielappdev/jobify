import { useEffect } from "react";
import Container from "../components/Container";
import fetch from "services/api";
import { HomeProps, IndexProps, PostAttributesProps } from "types";
import { useDispatch } from "react-redux";
import { SET_GLOBAL_DATA } from "store/actions";
import HomePage from "../pages/Home";
import {
  applyPostsSorting,
  _formatCardPost,
  _formatCategories,
  _formatCompany,
} from "helpers";

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
      notification: null,
      notificationVisible: false,
    },
    categories: [],
    featuredPosts: [],
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
      categories: _formatCategories(json),
    };
  };

  const assignFeaturedCompanies = (json) => {
    data = {
      ...data,
      featuredCompanies: json,
    };
  };

  const assignPosts = (json, key) => {
    const jobs = applyPostsSorting(
      json.data.map((job) =>
        _formatCardPost({
          id: job.id,
          ...job.attributes,
        } as PostAttributesProps)
      )
    );
    data = {
      ...data,
      [key]: jobs,
    };
  };

  try {
    const promises = [
      fetch("/global?populate=*"),
      fetch("/categories"),
      fetch("/featured-companies"),
      fetch(
        "/posts?filters[active]=true&filters[post_settings][featured]=true&populate[0]=company&populate[1]=company.profile_picture&populate[2]=categories&populate[3]=post_settings"
      ),
      fetch(
        "/posts?filters[active]=true&filters[post_settings][featured]=false&populate[0]=company&populate[1]=company.profile_picture&populate[2]=categories&populate[3]=post_settings&pagination[limit]=50"
      ),
    ];
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
              break;
            case 2:
              assignFeaturedCompanies(json);
              break;
            case 3:
              assignPosts(json, "featuredPosts");
              break;
            case 4:
              assignPosts(json, "otherPosts");
              break;
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
