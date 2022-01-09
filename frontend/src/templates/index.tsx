import { useEffect, useMemo, useRef } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { IndexProps } from "types";
import { Box, Divider, Heading, Stack } from "@chakra-ui/react";
import ModalDialog from "@/components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { ReducersProps } from "store/reducers";
import { CLOSE_GLOBAL_MODAL } from "store/actions";
import Sign from "@/components/Sign";

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

  const ref = useRef(null);
  const dispatch = useDispatch();

  const { isGlobalModalOpen, action, params } = useSelector(
    ({ app }: ReducersProps) => app.globalModalProps
  );

  const closeGlobalModal = () => {
    dispatch({
      type: CLOSE_GLOBAL_MODAL,
    });
  };

  useEffect(() => {
    if (isGlobalModalOpen) {
      ref?.current?.open();
    } else {
      ref?.current?.close();
    }
  }, [isGlobalModalOpen, action, ref]);

  return (
    <>
      <ModalDialog
        ref={ref}
        data={{ size: "xl", onClose: () => closeGlobalModal() }}
      >
        <Sign data={{ type: action === "signin" ? "in" : "up", params }} />
      </ModalDialog>
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
