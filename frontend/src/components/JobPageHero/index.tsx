import {
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import useIsTouchDevice from "hooks/useDeviceDetect";
import moment from "moment";
import Link from "next/link";
import { JobCardProps } from "types";
import CompanyCard from "../CompanyCard";
import GenericPageHero from "../GenericPageHero";

type JobPageHeroProps = {
  data: JobCardProps;
};

const JobPageHero = ({ data }: JobPageHeroProps) => {
  const isMobile = useIsTouchDevice();
  return (
    <GenericPageHero>
      <Flex
        align="center"
        justify="space-between"
        direction={isMobile ? "column-reverse" : "row"}
      >
        <Stack>
          <Heading as="h1" size="xl">
            {data.title}
          </Heading>
          <Text py={2}>
            <b>Posted:</b> {moment(data.createdAt as string).format("ll")}
          </Text>
          <Flex my={2} gap={4}>
            {data.categories.map(({ title, slug }, index) => {
              return (
                <Link href={`/categories/${slug}`} key={index}>
                  <Tag
                    display="flex"
                    justifyContent="center"
                    cursor="pointer"
                    colorScheme="blue"
                    size="lg"
                  >
                    {title}
                  </Tag>
                </Link>
              );
            })}
          </Flex>
          <Flex my={2} gap={4}>
            {data.tags.map(({ title, slug }, index) => {
              return (
                <Link href={`/tags/${slug}`} key={index}>
                  <Tag
                    display="flex"
                    justifyContent="center"
                    cursor="pointer"
                    colorScheme="green"
                    size="lg"
                  >
                    {title}
                  </Tag>
                </Link>
              );
            })}
          </Flex>
        </Stack>
        <Flex pb={isMobile ? 4 : 0}>
          <CompanyCard
            data={data.company}
            shouldDisplayLogo={data.shouldDisplayLogo}
          />
        </Flex>
      </Flex>
    </GenericPageHero>
  );
};

export default JobPageHero;
