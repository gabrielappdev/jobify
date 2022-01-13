import React, { cloneElement, useEffect, useState } from "react";
import _ from "lodash";
import { useSelector } from "react-redux";
import { ReducersProps } from "store/reducers";
import { useRouter } from "next/router";
import { Center, Container, Skeleton, Stack } from "@chakra-ui/react";
import { TemplateDataProps } from "types";
import Template from "templates";

type InjectUserHOCProps = {
  data: TemplateDataProps;
  children: React.ReactElement;
};

const InjectUserHOC = ({ data, children }: InjectUserHOCProps) => {
  const router = useRouter();
  const user = useSelector(({ user }: ReducersProps) => user.user);
  const isLoading = useSelector(({ user }: ReducersProps) => user.isLoading);

  useEffect(() => {
    if (!isLoading && !user?.username) {
      router.push("/404");
    }
  }, [user, isLoading]);

  if (isLoading || !user?.username) {
    return (
      <Template data={data}>
        <Stack mt="120px" w="100%">
          <Center>
            <Container maxW="120ch" minH="100vh">
              <Stack w="100%" justify="center">
                {Array.from(new Array(20)).map((_, index) => {
                  return <Skeleton h="50px" w="100%" key={index} />;
                })}
              </Stack>
            </Container>
          </Center>
        </Stack>
      </Template>
    );
  }

  return cloneElement(children, { ...children.props, user });
};

export default InjectUserHOC;
