import _ from "lodash";
import { useRouter } from "next/router";
import qs from "qs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import GenericPageHero from "@/components/GenericPageHero";
import {
  Box,
  Center,
  Heading,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import AdvancedSearchJobs, {
  SearchParamsProps,
} from "@/components/AdvancedSearchJobs";
import JobListSection from "@/components/JobListSection";
import Pagination from "@/components/Pagination";
import Template from "../../templates";
import { SET_GLOBAL_DATA } from "../../store/actions";
import fetch from "../../services/api";
import {
  bgColor,
  pickParams,
  _extractRawData,
  _formatAppData,
  _formatCardPost,
  _formatCompany,
} from "../../helpers";
import { TemplateDataProps, JobCardProps, MetaProps } from "../../types";

type JobsPageProps = {
  data: {
    templateData: TemplateDataProps;
    jobs: JobCardProps[];
    meta: MetaProps;
    params: SearchParamsProps;
  };
};

const JobsPage = ({ data }: JobsPageProps) => {
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const router = useRouter();

  const [page, setPage] = useState(data?.params?.page || 1);
  const [limit, setLimit] = useState(data?.params?.limit || 15);
  const [jobs, setJobs] = useState(data?.jobs);

  useEffect(() => {
    dispatch({
      type: SET_GLOBAL_DATA,
      payload: data?.templateData,
    });
  }, [data?.templateData]);

  useEffect(() => {
    setJobs(data?.jobs);
  }, [data?.jobs]);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  return (
    <Template data={data.templateData}>
      <GenericPageHero>
        <Center>
          <Stack align="center">
            <Heading as="h1" size="2xl">
              All jobs
            </Heading>
            <Text>Find below all active jobs listed</Text>
            <AdvancedSearchJobs params={data?.params} />
          </Stack>
        </Center>
      </GenericPageHero>
      <Box py={4} bg={bgColor[colorMode]}>
        <JobListSection
          heading=""
          description={`Showing: ${jobs?.length} ${
            jobs?.length === 1 ? "result" : "results"
          }`}
          jobList={data?.jobs}
          displayCategoriesFilters={false}
          Pagination={
            <Pagination
              data={{
                currentPage: data?.meta?.pagination?.page,
                pageCount: data?.meta?.pagination?.pageCount,
                onChange: (value) => handleChangePage(value),
              }}
            />
          }
        />
      </Box>
    </Template>
  );
};

export async function getServerSideProps({ query }) {
  const page = query?.page || 1;
  const pageSize = query?.limit || 15;

  const buildSearchQuery = () => {
    const allParams = pickParams(query);
    const searchType = allParams?.searchType || "$or";

    let title = {};
    if (allParams.title !== "") {
      title = {
        title: {
          $containsi: allParams.title,
        },
      };
    }

    let location = {};
    if (allParams?.location !== "") {
      location = {
        company: {
          location: {
            $containsi: allParams.location,
          },
        },
      };
    }

    let category = {};
    if (!!allParams?.category) {
      category = {
        categories: {
          id: allParams.category,
        },
      };
    }

    let tag = {};
    if (!!allParams?.tag) {
      tag = {
        tags: {
          id: allParams.tag,
        },
      };
    }

    let company = {};
    if (!!allParams?.company) {
      company = {
        company: {
          name: {
            $containsi: allParams.company,
          },
        },
      };
    }

    let postSettings = {};
    if (
      ["highlight", "featured", "pinned"].some((settings) =>
        Object.keys(allParams).includes(settings)
      )
    ) {
      postSettings = {
        post_settings: {
          ..._.pick(allParams, ["highlight", "featured", "pinned"]),
        },
      };
    }

    return {
      filters: {
        $and: [
          { ...title },
          { ...location },
          { ...company },
          { ...category },
          { ...tag },
          { ...postSettings },
        ],
      },
    };
  };

  const searchQuery = {
    filters: {
      active: true,
    },
    sort: ["title"],
    populate: [
      "company",
      "company.profile_picture",
      "company.posts",
      "categories",
      "tags",
      "post_settings",
    ],
    pagination: {
      page,
      pageSize,
    },
  };
  const promises = [
    fetch("/index"),
    fetch(
      `/posts?${qs.stringify(searchQuery, {
        encodeValuesOnly: true,
      })}&${qs.stringify(buildSearchQuery(), { encodeValuesOnly: true })}`
    ),
  ];
  const responses = await Promise.all(promises);
  const [templateData, postsResponse] = await Promise.all(
    responses.map((response) => response.json())
  );
  let data = {};

  const format = (postsResponse) => {
    const p = _extractRawData(postsResponse) || [];
    const jobs = p.map((post) => {
      Object.keys(post).forEach((key) => {
        if (!Array.isArray(post[key])) {
          let value = _extractRawData(post[key]);
          switch (key) {
            case "company":
              post.company = {
                ...value,
                profile_picture: _extractRawData(value.profile_picture),
                posts: _extractRawData(value?.posts)?.length || 0,
              };
              break;
            case "categories":
            case "tags":
              post[key] = value;
              break;
          }
        }
      });
      return _formatCardPost(post);
    });
    const meta = postsResponse.meta;
    return {
      data: jobs,
      meta: meta,
    };
  };
  const { data: jobs, meta } = format(postsResponse);
  data = {
    templateData: {
      ...templateData,
      appData: _formatAppData(templateData.appData),
    },
    jobs,
    meta,
    params: {
      page: parseInt(page) as Number,
      limit: parseInt(pageSize) as Number,
      ...pickParams(query),
    },
  };
  return {
    props: {
      data,
    },
  };
}

export default JobsPage;
