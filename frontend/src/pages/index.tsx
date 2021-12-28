import { Heading } from "@chakra-ui/react";
import Container from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";

const Index = () => (
  <Container height="100vh">
    <DarkModeSwitch />
    <Heading as="h1">With chakra</Heading>
  </Container>
);

export default Index;
