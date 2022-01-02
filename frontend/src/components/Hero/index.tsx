import { HomeProps } from "types";
import {
  Text,
  Box,
  Container,
  Stack,
  Heading,
  theme,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";

type HeroProps = {
  data: HomeProps;
};

const Hero = ({ data }: HeroProps) => {
  return (
    <Box
      minH="50vh"
      w="100vw"
      position="relative"
      backgroundImage={data?.heroUrl?.toString()}
      backgroundSize="cover"
      pt={88}
      pb={8}
      data-testid="hero"
    >
      <Box
        position="absolute"
        width="100%"
        height="100%"
        top={0}
        left={0}
        zIndex={1}
        background={`linear-gradient(-120deg,${theme.colors.green[800]},rgba(54,54,54,0.00))`}
      />
      <Container centerContent>
        <Stack zIndex={2} align="center" h="100%" justify="center">
          <Heading color={theme.colors.white} size="3xl" as="h1">
            {data?.name}
          </Heading>
          {data?.description && (
            <Text
              color={theme.colors.white}
              fontSize="lg"
              textAlign="center"
              py={4}
              dangerouslySetInnerHTML={{
                __html: data?.description?.toString(),
              }}
              data-testid="hero-description"
            />
          )}
          {data?.price && (
            <Link href={`/jobs/new`}>
              <Button colorScheme="green">Post a job for ${data?.price}</Button>
            </Link>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero;
