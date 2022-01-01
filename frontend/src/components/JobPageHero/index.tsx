import {
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  useColorMode,
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
  const { colorMode } = useColorMode();
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
          <SimpleGrid py={2} gap={4} columns={isMobile ? 2 : 4}>
            {data.categories.map(({ title, slug }, index) => {
              return (
                <Link href={`/categories/${slug}`} key={index}>
                  <Tag cursor="pointer" colorScheme="blue" size="lg">
                    {title}
                  </Tag>
                </Link>
              );
            })}
          </SimpleGrid>
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
