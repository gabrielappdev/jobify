import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { highlightColor } from "helpers";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import { JobCardCompanyProps } from "types";

type CompanyCardProps = {
  data: JobCardCompanyProps;
  shouldDisplayLogo: Boolean;
};

const CompanyCard = ({ data, shouldDisplayLogo }: CompanyCardProps) => {
  const { colorMode } = useColorMode();
  return (
    <Stack align="center">
      <Link href={`/companies/${data.slug}`}>
        {shouldDisplayLogo && (
          <Box
            borderRadius="4px"
            width="100px"
            height="100px"
            overflow="hidden"
            borderWidth={1}
            cursor="pointer"
            borderColor={highlightColor[colorMode]}
          >
            <Image
              src={data.logo as string}
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </Box>
        )}
      </Link>
      <Heading size="md" as="h3">
        {data.name}
      </Heading>
      <Flex data-testid="job-card-location" align="center">
        <FaMapMarkerAlt />
        <Text ml={2}>{data.location}</Text>
      </Flex>
      <Text size="xs">
        <b>Jobs posted:</b> {data.posts}
      </Text>
    </Stack>
  );
};

export default CompanyCard;
