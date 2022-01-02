import { useMemo } from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  Stack,
  Tag,
  Text,
  theme,
  useColorMode,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { JobCardProps } from "types";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiFillPushpin } from "react-icons/ai";
import {
  switchPrimaryColor,
  bgColor,
  highlightColor,
  contrastColor,
} from "../../helpers";
import useIsTouchDevice from "../../hooks/useDeviceDetect";
import moment, { MomentInput } from "moment";

export type JobCardDataProps = {
  data: JobCardProps;
};

const JobCard = ({ data }: JobCardDataProps) => {
  const isMobile = useIsTouchDevice();

  const { colorMode } = useColorMode();

  const backgroundColor = useMemo(() => {
    if (data.isHighlighted) {
      return highlightColor[colorMode];
    }
    return bgColor[colorMode];
  }, [data, colorMode]);

  const isNew = useMemo(() => {
    return moment(data.createdAt as MomentInput)
      .add("4", "hours")
      .isAfter(moment());
  }, [data]);

  const getAdornmentsPosition = () => {
    if (isMobile) {
      return {
        right: "10px",
        top: "10px",
      };
    }
    return {
      right: "16px",
      top: "10px",
    };
  };
  return (
    <Link href={"/jobs/" + data.slug}>
      <Box
        data-testid="job-card"
        aria-label={data.isHighlighted ? "highlighted" : "normal"}
        p={4}
        borderColor={switchPrimaryColor[colorMode]}
        borderWidth={1}
        borderRadius={4}
        position="relative"
        bg={backgroundColor}
        cursor="pointer"
        overflow="hidden"
        _hover={{ _before: { opacity: 1 } }}
        _before={{
          content: "''",
          position: "absolute",
          left: 0,
          top: 0,
          opacity: data.isHighlighted || data.isFeatured ? 1 : 0,
          background: theme.colors.green[500],
          width: "5px",
          height: "calc(100% + 200px)",
          transition: "opacity 0.3s ease",
        }}
      >
        <Flex
          position="absolute"
          {...getAdornmentsPosition()}
          align="center"
          data-testid="job-card-adornments"
        >
          {isNew && (
            <Box
              px={2}
              h="26px"
              borderRadius={2}
              color={contrastColor[colorMode]}
              bg={switchPrimaryColor[colorMode]}
              data-testid="job-card-new"
            >
              <Text fontWeight="bold" size="sm">
                NEW
              </Text>
            </Box>
          )}
          {data.isPinned && (
            <Box
              color={switchPrimaryColor[colorMode]}
              p={1}
              ml={2}
              borderRadius={1}
              borderWidth={1}
              borderColor={theme.colors.green[700]}
              w="25px"
              h="25px"
              data-testid="job-card-pinned"
            >
              <Center>
                <AiFillPushpin />
              </Center>
            </Box>
          )}
        </Flex>
        <Flex w="100%" h="inherit" align={isMobile ? "flex-start" : "center"}>
          {data.shouldDisplayLogo && (
            <Box
              w="auto"
              maxH="100px"
              height={isMobile ? "auto" : "inherit"}
              borderRadius={0}
              borderWidth={1}
              borderColor={colorMode === "dark" ? "white" : "transparent"}
              data-testid="job-card-company-logo"
            >
              <Center>
                <Image
                  src={data.company.logo.toString()}
                  alt={data.company.name.toString()}
                  width="100%"
                  height="100%"
                  objectFit="cover"
                />
              </Center>
            </Box>
          )}
          <Flex
            align="center"
            justify={isMobile ? "flex-start" : "space-between"}
            direction={isMobile ? "column" : "row"}
            w="100%"
          >
            <Stack px={4} pt={0} alignSelf={isMobile ? "flex-start" : "center"}>
              <Text
                fontSize="sm"
                fontWeight="bold"
                color={switchPrimaryColor[colorMode]}
                data-testid="job-card-company-name"
              >
                {data.company.name}
              </Text>
              <Heading
                fontSize="lg"
                fontWeight="bold"
                color={switchPrimaryColor[colorMode]}
                as="h6"
              >
                {data.title}
              </Heading>
              <Flex data-testid="job-card-categories">
                {data.categories.map((category, index) => {
                  return (
                    <Link key={index} href={`/categories/${category.slug}`}>
                      <Tag
                        ml={index !== 0 ? 2 : 0}
                        colorScheme="blue"
                        size="sm"
                      >
                        {category.title}
                      </Tag>
                    </Link>
                  );
                })}
              </Flex>
            </Stack>
            <Stack
              alignSelf={isMobile ? "flex-start" : "center"}
              ml={isMobile ? 4 : 0}
            >
              <Flex
                data-testid="job-card-location"
                align="center"
                pt={isMobile ? 4 : 0}
              >
                <FaMapMarkerAlt />
                <Text ml={2} fontWeight="bold">
                  {data.company.location}
                </Text>
              </Flex>
              <Flex justify="flex-end">
                {data?.tags?.map((tag, index) => {
                  return (
                    <Link key={index} href={`/tags/${tag.slug}`}>
                      <Tag
                        colorScheme="green"
                        ml={index !== 0 ? 2 : 0}
                        size="sm"
                      >
                        {tag.title}
                      </Tag>
                    </Link>
                  );
                })}
              </Flex>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};

export default JobCard;
