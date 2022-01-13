import {
  CompanyProps,
  CreateJobFlowProps,
  OrderProps,
  TemplateDataProps,
  UserInnerProps,
} from "../../types";
import {
  bgColor,
  contrastColor,
  highlightColor,
  switchPrimaryColor,
  _formatAppData,
  _formatCategories,
  _formatTags,
} from "../../helpers";
import fetch from "../../services/api";
import Template from "../../templates";
import { useDispatch, useSelector } from "react-redux";
import { ReducersProps } from "store/reducers";
import CreateCompany from "@/components/CreateCompany";
import Section from "@/components/Section";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  theme,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import InjectUserHOC from "@/components/InjectUserHOC";
import { FaCheckCircle } from "react-icons/fa";
import CreateJob from "@/components/CreateJob";
import { SET_GLOBAL_DATA, SET_USER } from "store/actions";
import Payment from "@/components/Payment";

type NewJobProps = {
  data: TemplateDataProps;
  user?: UserInnerProps;
};

const CommonTab = ({
  children,
  disabledTabs,
  index,
}: {
  children: React.ReactElement;
  disabledTabs: number[];
  index: number;
}) => {
  const { colorMode } = useColorMode();
  return (
    <Tab
      _selected={{
        borderWidth: 1,
        bg: contrastColor[colorMode],
        color: switchPrimaryColor[colorMode],
      }}
      _disabled={{
        backgroundColor: theme.colors.gray[200],
        color: theme.colors.gray[400],
        fontWeight: "bold",
        cursor: "not-allowed",
      }}
      borderColor={highlightColor[colorMode]}
      isDisabled={disabledTabs.includes(index)}
    >
      <>
        <span>{children}</span>
        {disabledTabs.includes(index) ? (
          <FaCheckCircle style={{ marginLeft: "8px" }} />
        ) : null}
      </>
    </Tab>
  );
};

const NewJob = ({ data }: NewJobProps) => {
  const dispatch = useDispatch();
  const user = useSelector(({ user }: ReducersProps) => user.user);
  const [disabledTabs, setDisabledTabs] = useState([0, 1]);
  const [tabIndex, setTabIndex] = useState(0);
  const { colorMode } = useColorMode();

  useEffect(() => {
    dispatch({
      type: SET_GLOBAL_DATA,
      payload: data,
    });
  }, [dispatch, data]);

  useEffect(() => {
    if (user?.create_job_flow) {
      const { step: currentStep } = user.create_job_flow;
      const disabledTabs = Array.from(new Array(currentStep - 1)).map(
        (_, index) => index
      );
      if (currentStep === 2) {
        disabledTabs.push(2);
      }
      setDisabledTabs(disabledTabs);
      setTabIndex(currentStep - 1);
    }
  }, [user]);

  const handleTabChange = (index) => {
    setTabIndex(index);
  };

  const onCompanyCreate = (
    payload: CompanyProps & { users_permissions_user: UserInnerProps }
  ) => {
    const updatedUser = payload.users_permissions_user;
    const step = updatedUser?.create_job_flow?.step;
    handleTabChange(step - 1);
    dispatch({
      type: SET_USER,
      payload: { ...updatedUser },
    });
    window.scrollTo(0, 0);
  };

  const onCreateJob = (payload: {
    order: OrderProps;
    create_job_flow: CreateJobFlowProps;
  }) => {
    const { create_job_flow: createJobFlow, order } = payload;
    const updatedUser = {
      ...user,
      create_job_flow: { ...createJobFlow, order },
    };
    const step = user?.create_job_flow?.step;
    handleTabChange(step - 1);
    dispatch({
      type: SET_USER,
      payload: updatedUser,
    });
    window.scrollTo(0, 0);
  };

  return (
    <Template data={data}>
      <Box bg={bgColor[colorMode]} w="100%" pt="100px">
        <Section minW="auto">
          <Tabs
            index={tabIndex}
            onChange={handleTabChange}
            lazyBehavior="unmount"
            isLazy
            isFitted
            variant="enclosed"
          >
            <TabList mb="1em">
              <CommonTab index={0} disabledTabs={disabledTabs}>
                <>Create a company</>
              </CommonTab>
              <CommonTab index={1} disabledTabs={disabledTabs}>
                <>Create a job</>
              </CommonTab>
              <CommonTab index={2} disabledTabs={disabledTabs}>
                <>Payment</>
              </CommonTab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <CreateCompany onSuccess={onCompanyCreate} />
              </TabPanel>
              <TabPanel>
                <CreateJob onSuccess={onCreateJob} />
              </TabPanel>
              <TabPanel>
                <Payment />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Section>
      </Box>
    </Template>
  );
};

export async function getStaticProps() {
  const templateDataResponse = await fetch("/index");
  const templateData = await templateDataResponse.json();

  let data = {};
  data = {
    ...templateData,
    appData: _formatAppData(templateData.appData),
    categories: _formatCategories(templateData.categories),
    tags: _formatTags(templateData.tags),
  };
  return {
    props: {
      data,
    },
  };
}

const JobPage = ({ data }: NewJobProps) => {
  return (
    <InjectUserHOC data={data}>
      <NewJob data={data} />
    </InjectUserHOC>
  );
};

export default JobPage;
