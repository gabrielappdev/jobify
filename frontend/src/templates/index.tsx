import { useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { IndexProps } from "types";
import { Box, Divider, theme, useColorMode } from "@chakra-ui/react";
import { switchPrimaryColor } from "../helpers";

type TemplateProps = {
  children: React.ReactNode;
  data: IndexProps;
};

const Template = ({ children, data }: TemplateProps) => {
  const appData = useMemo(() => {
    return data.appData;
  }, []);
  const categories = useMemo(() => {
    return data.categories;
  }, []);
  const featuredCompanies = useMemo(() => {
    return data.featuredCompanies;
  }, []);
  return (
    <>
      <Navigation
        data={{ logo: appData.logoUrl, price: appData.price, categories }}
      />
      {children}
      <Divider />
      <Footer
        data={{
          appData,
          categories,
          featuredCompanies,
        }}
      />
    </>
  );
};

export default Template;
