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
import SocialLinkCard from "../SocialLinkCard";

type CompanyCardProps = {
  data: JobCardCompanyProps;
  shouldDisplayLogo: boolean;
  displaySocialLinks: boolean;
};

const CompanyCard = ({
  data,
  shouldDisplayLogo,
  displaySocialLinks = false,
}: CompanyCardProps) => {
  const { colorMode } = useColorMode();
  return (
    <Stack align="center">
      {shouldDisplayLogo && (
        <Link href={`/companies/${data?.slug}`}>
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
              src={
                (data?.logo as string) ??
                process.env.NEXT_PUBLIC_COMPANY_LOGO_PLACEHOLDER
              }
              width="100%"
              height="100%"
              objectFit="cover"
            />
          </Box>
        </Link>
      )}
      <Heading size="md" as="h3">
        {data?.name}
      </Heading>
      <Flex data-testid="job-card-location" align="center">
        <FaMapMarkerAlt />
        <Text ml={2}>{data?.location}</Text>
      </Flex>
      <Text size="xs">
        <b>Jobs posted:</b> {data?.posts}
      </Text>
      <Flex p={4} gap={2}>
        {displaySocialLinks &&
          data?.social_link?.map((socialLink) => (
            <SocialLinkCard
              data={socialLink}
              isRemovable={false}
              onRemove={() => ({})}
            />
          ))}
      </Flex>
    </Stack>
  );
};

export default CompanyCard;
