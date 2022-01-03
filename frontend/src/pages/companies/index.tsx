import qs from "qs";
import fetch from "../../services/api";
import {
  bgColor,
  _extractRawData,
  _formatAppData,
  _formatCardPost,
  _formatCompany,
} from "../../helpers";
import { TemplateDataProps, MetaProps, JobCardCompanyProps } from "../../types";
import Template from "templates";
import GenericPageHero from "@/components/GenericPageHero";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CompanyCard from "@/components/CompanyCard";
import Section from "@/components/Section";
import Pagination from "@/components/Pagination";

type CompaniesPageProps = {
  data: {
    templateData: TemplateDataProps;
    companies: JobCardCompanyProps[];
    meta: MetaProps;
    params: {
      limit: Number;
      page: Number;
    };
  };
};

const CompaniesPage = ({ data }: CompaniesPageProps) => {
  const { colorMode } = useColorMode();
  const [page, setPage] = useState(data?.params?.page || 1);
  const [limit, setLimit] = useState(data?.params?.limit || 15);
  const router = useRouter();

  useEffect(() => {
    router.push(`/companies?page=${page}&limit=${limit}`, undefined, {
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
              All companies
            </Heading>
            <Text>Meet all companies currently using our platform</Text>
          </Stack>
        </Center>
      </GenericPageHero>
      <Box py={4} bg={bgColor[colorMode]}>
        <Section minW="auto">
          <Stack w="100%">
            <SimpleGrid pt={4} columns={{ sm: 2, md: 4 }} gap={4} rowGap={8}>
              {data?.companies.map((company, index) => (
                <CompanyCard data={company} shouldDisplayLogo key={index} />
              ))}
            </SimpleGrid>
            <Flex w="100%" pt={4} justify="flex-end">
              <Pagination
                data={{
                  currentPage: data?.meta?.pagination?.page,
                  pageCount: data?.meta?.pagination?.pageCount,
                  onChange: (value) => handleChangePage(value),
                }}
              />
            </Flex>
          </Stack>
        </Section>
      </Box>
    </Template>
  );
};

export async function getServerSideProps({ query }) {
  const page = query?.page || 1;
  const pageSize = query?.limit || 15;
  const searchQuery = {
    sort: ["name"],
    populate: ["profile_picture", "posts"],
    pagination: {
      page,
      pageSize,
    },
  };
  console.log(qs.stringify(searchQuery));
  const promises = [
    fetch("/index"),
    fetch(
      `/companies?${qs.stringify(searchQuery, { encodeValuesOnly: true })}`
    ),
  ];
  const responses = await Promise.all(promises);
  const [templateData, companiesResponse] = await Promise.all(
    responses.map((response) => response.json())
  );
  let data = {};
  const meta = companiesResponse?.meta;
  const companies = _extractRawData(companiesResponse).map((company) => {
    return _formatCompany({
      ...company,
      profile_picture: _extractRawData(company.profile_picture),
      posts: _extractRawData(company?.posts)?.length || 0,
    });
  });
  data = {
    templateData: {
      ...templateData,
      appData: _formatAppData(templateData.appData),
    },
    companies,
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

export default CompaniesPage;
