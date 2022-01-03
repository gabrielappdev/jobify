import qs from "qs";
import fetch from "../../services/api";
import {
  bgColor,
  _extractRawData,
  _formatAppData,
  _formatCardPost,
  _formatCompany,
} from "../../helpers";
import { TemplateDataProps, JobCardProps, MetaProps } from "../../types";
import Template from "templates";
import GenericPageHero from "@/components/GenericPageHero";
import {
  Box,
  Center,
  Heading,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import JobListSection from "@/components/JobListSection";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type JobsPageProps = {
  data: {
    templateData: TemplateDataProps;
    jobs: JobCardProps[];
    meta: MetaProps;
    params: {
      limit: Number;
      page: Number;
    };
  };
};

const JobsPage = ({ data }: JobsPageProps) => {
  const { colorMode } = useColorMode();
  const [page, setPage] = useState(data?.params?.page || 1);
  const [limit, setLimit] = useState(data?.params?.limit || 15);
  const router = useRouter();

  useEffect(() => {
    router.push(`/jobs?page=${page}&limit=${limit}`, undefined, {
      shallow: false,
    });
  }, [page]);

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
          </Stack>
        </Center>
      </GenericPageHero>
      <Box py={4} bg={bgColor[colorMode]}>
        <JobListSection
          heading={`Showing: ${data?.meta?.pagination?.pageSize} results`}
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
    fetch(`/posts?${qs.stringify(searchQuery, { encodeValuesOnly: true })}`),
  ];
  const responses = await Promise.all(promises);
  const [templateData, postsResponse] = await Promise.all(
    responses.map((response) => response.json())
  );
  let data = {};

  const format = (postsResponse) => {
    const p = _extractRawData(postsResponse);
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
      console.log(post.post_settings);
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
    },
  };
  return {
    props: {
      data,
    },
  };
}

export default JobsPage;
