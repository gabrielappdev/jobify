import { ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import useIsTouchDevice from "hooks/useDeviceDetect";
import Image from "next/image";
import Link from "next/link";
import { CategoryProps, FeaturedCompaniesProps, HomeProps } from "types";
import {
  bgColor,
  color,
  navigationBgColor,
  switchPrimaryColor,
} from "../../helpers";
import Section from "../Section";

type FooterDataProps = {
  data: {
    categories: CategoryProps[];
    featuredCompanies: FeaturedCompaniesProps[];
    appData: HomeProps;
  };
};

type GenericLinkProps = {
  name: string;
  url: string;
  colorMode: "light" | "dark";
};

const GenericLink = ({ name, url, colorMode }: GenericLinkProps) => {
  return (
    <Link href={url.toString()}>
      <Text
        textAlign="left"
        pb={2}
        pt={1}
        size="md"
        cursor="pointer"
        position="relative"
        _before={{
          content: "''",
          position: "absolute",
          left: "0px",
          bottom: "-2px",
          height: "2px",
          width: "100%",
          backgroundColor: switchPrimaryColor[colorMode],
          opacity: 0,
          transition: "opacity 0.2s ease",
        }}
        _hover={{ _before: { opacity: 1 } }}
        color={switchPrimaryColor[colorMode]}
      >
        {name}
      </Text>
    </Link>
  );
};

const quickLinks = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Jobs",
    url: "/jobs",
  },
  {
    name: "All Companies",
    url: "/companies",
  },
  {
    categories: "Categories",
    url: "/categories",
  },
];

const Footer = ({ data }: FooterDataProps) => {
  const { colorMode } = useColorMode();
  const isMobile = useIsTouchDevice();

  const handleScrollTop = () => {
    const scrollElement = document.querySelector(".fake-scroll-element");
    if (scrollElement) {
      scrollElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box
      as="footer"
      w="100%"
      pt={8}
      bg={bgColor[colorMode]}
      color={color[colorMode]}
    >
      <Stack w="100%">
        <Section minW={isMobile ? "auto" : "140ch"}>
          <SimpleGrid gap={4} columns={{ sm: 2, md: 4 }}>
            <Stack align="center" mb={4}>
              <Image width={196} height={56} src={data?.appData?.logoUrl} />
              <Text pt={4} fontSize="xs">
                Find the best talents in only one place
              </Text>
            </Stack>
            <Stack align="center" mb={4}>
              <Heading color={color[colorMode]} size="md" as="h6">
                Quick Links
              </Heading>
              {quickLinks?.map((link, index) => (
                <GenericLink
                  name={link.name}
                  url={link.url}
                  colorMode={colorMode}
                  key={index}
                />
              ))}
            </Stack>
            <Stack align="center" mb={4}>
              <Heading color={color[colorMode]} size="md" as="h6">
                Categories
              </Heading>
              {data?.categories?.map((category, index) => (
                <GenericLink
                  name={category.title}
                  url={`/categories/${category.slug}`}
                  colorMode={colorMode}
                  key={index}
                />
              ))}
            </Stack>
            <Stack align="center" mb={4}>
              <Heading color={color[colorMode]} size="md" as="h6">
                Featured Companies
              </Heading>
              {data?.featuredCompanies?.map((company, index) => (
                <GenericLink
                  name={company.name}
                  url={`/companies/${company.slug}`}
                  colorMode={colorMode}
                  key={index}
                />
              ))}
            </Stack>
          </SimpleGrid>
        </Section>
        <Flex w="100%" background={navigationBgColor[colorMode]}>
          <Section padding="32px 16px 32px 16px" inheritBg minW="auto">
            <Flex w="inherit" justify="space-between" align="center">
              <Text color={switchPrimaryColor[colorMode]} size="sm">
                {new Date().getFullYear()} - Jobify &#174;
              </Text>
              <Text size="sm">
                <IconButton
                  aria-label="Scroll Top Button"
                  icon={<ChevronUpIcon />}
                  onClick={handleScrollTop}
                  colorScheme="green"
                />
              </Text>
            </Flex>
          </Section>
        </Flex>
      </Stack>
    </Box>
  );
};

export default Footer;
