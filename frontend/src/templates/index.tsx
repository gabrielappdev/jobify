import Footer from "@/components/Footer";
import ModalDialog from "@/components/Modal";
import Navigation from "@/components/Navigation";
import Sign from "@/components/Sign";
import { Divider } from "@chakra-ui/react";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_GLOBAL_MODAL } from "store/actions";
import { ReducersProps } from "store/reducers";
import { IndexProps } from "types";

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
          isAlwaysTransparent: data.isNavbarAlwaysTransparent,
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
