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
  _formatTags,
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

export async function getServerSideProps() {
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
    tags: [],
    featuredJobs: [],
    otherJobs: [],
    featuredCompanies: [],
  };

  const assignGlobalData = (json) => {
    const appData = json as HomeProps;
    const {
      logo: { url },
      hero: { url: heroUrl },
    } = appData;
    data = {
      ...data,
      appData: {
        ...appData,
        logoUrl: url?.toString(),
        heroUrl: heroUrl?.toString(),
      },
    };
  };

  const assignCategories = (json) => {
    data = {
      ...data,
      categories: _formatCategories(json),
    };
  };

  const assignTags = (json) => {
    data = {
      ...data,
      tags: _formatTags(json),
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
      json.map((job) =>
        _formatCardPost({
          id: job.id,
          ...job,
        } as PostAttributesProps)
      )
    );
    data = {
      ...data,
      [key]: jobs,
    };
  };

  const response = await fetch("/index");
  const responseData = await response.json();

  if (Object.keys(data)?.length) {
    let {
      appData,
      categories,
      tags,
      featuredCompanies,
      featuredJobs,
      otherJobs,
    } = responseData;
    appData = assignGlobalData(appData);
    categories = assignCategories(categories);
    tags = assignTags(tags);
    featuredCompanies = assignFeaturedCompanies(featuredCompanies);
    featuredJobs = assignPosts(featuredJobs, "featuredJobs");
    otherJobs = assignPosts(otherJobs, "otherJobs");
  }
  return {
    props: { data },
    notFound,
  };
}

export default Index;
