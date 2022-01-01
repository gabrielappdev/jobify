import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  theme,
  useColorMode,
} from "@chakra-ui/react";
import { navigationBgColor } from "helpers";
import useIsTouchDevice from "hooks/useDeviceDetect";
import Link from "next/link";
import { JobCardProps } from "types";
import CompanyCard from "../CompanyCard";

type JobPageHeroProps = {
  data: JobCardProps;
};

const JobPageHero = ({ data }: JobPageHeroProps) => {
  const isMobile = useIsTouchDevice();
  const { colorMode } = useColorMode();
  return (
    <Box
      w="100%"
      minH="30vh"
      py={8}
      as="header"
      background={navigationBgColor[colorMode]}
      borderY={`2px solid ${theme.colors.gray[200]}`}
    >
      <Container pt="60px" maxW="140ch">
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
              <b>Posted:</b> {data.createdAt}
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
      </Container>
    </Box>
  );
};

export default JobPageHero;
