import { useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { IndexProps } from "types";
import { Divider } from "@chakra-ui/react";

type TemplateProps = {
  children: React.ReactNode;
  data: IndexProps;
};

const Template = ({ children, data }: TemplateProps) => {
  const appData = useMemo(() => {
    return data?.appData;
  }, [data]);
  const categories = useMemo(() => {
    return data?.categories;
  }, [data]);
  const featuredCompanies = useMemo(() => {
    return data?.featuredCompanies;
  }, [data]);
  return (
    <>
      <Navigation
        data={{
          logo: appData?.logoUrl,
          price: appData?.price,
          categories,
          globalNotification: appData?.notification,
        }}
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
