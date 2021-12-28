import { useMemo } from "react";
import Navigation from "@/components/Navigation";
import { IndexProps } from "types";

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
  return (
    <>
      <Navigation
        data={{ logo: appData.logoUrl, price: appData.price, categories }}
      />
      {children}
    </>
  );
};

export default Template;
