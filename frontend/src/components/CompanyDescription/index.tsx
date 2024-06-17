import Section from "@/components/Section";
import { Box, Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";

type CompanyDescriptionProps = {
  data: {
    name: string;
    description: string;
    url?: string;
  };
};

const CompanyDescription = ({ data }: CompanyDescriptionProps) => {
  return (
    <Section minW="auto">
      <Center>
        <Stack>
          <Heading size="xl">About {data?.name}</Heading>
          <Flex my={2}>
            <Text mr={2} fontWeight="bold">
              Website:{" "}
            </Text>
            <Text color="blue.500">
              {data?.url && (
                <a
                  rel="noreferrer noopener"
                  href={data?.url as string}
                  target="_blank"
                >
                  {data?.url}
                </a>
              )}
            </Text>
          </Flex>
          <Box my={4}>
            <div
              dangerouslySetInnerHTML={{ __html: data?.description as string }}
            />
          </Box>
        </Stack>
      </Center>
    </Section>
  );
};

export default CompanyDescription;
