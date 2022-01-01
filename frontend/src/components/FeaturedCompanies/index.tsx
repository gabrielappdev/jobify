import { Box, Button, SimpleGrid, Stack, Text, theme } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FeaturedCompaniesProps } from "types";
import Section from "../Section";

type FeaturedCompaniesDataProps = {
  data: FeaturedCompaniesProps[];
};

const FeaturedCompanies = ({ data }: FeaturedCompaniesDataProps) => {
  return (
    <Section minW="auto">
      <Stack w="100%" align="center">
        <SimpleGrid w="100%" columns={{ sm: 2, md: 5 }} gap={4}>
          {data?.map((company) => {
            return (
              <Link
                href={`/companies/${company.slug}`}
                key={company.id as number}
              >
                <Stack
                  cursor="pointer"
                  role="partner"
                  align="center"
                  borderRadius={4}
                >
                  <Image
                    width="100%"
                    height="100%"
                    src={company.logo?.toString()}
                    alt={company.name + " logo"}
                  />
                  <Text mt={2} fontWeight="bold" role="name">
                    {company.name}
                  </Text>
                  <Text fontSize="xs" mt={2} role="posts">
                    Jobs posted: {company.posts}
                  </Text>
                </Stack>
              </Link>
            );
          })}
        </SimpleGrid>
        <Text py={4} textAlign="center" color={theme.colors.green[400]}>
          Partner companies with great results in our platform
        </Text>
        <Link href="/companies">
          <Button colorScheme="green" variant="outline" w="max-content">
            See all companies
          </Button>
        </Link>
      </Stack>
    </Section>
  );
};

export default FeaturedCompanies;
