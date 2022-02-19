import JobCard from "@/components/JobCard";
import {
  Button,
  Flex,
  Heading,
  Select,
  Skeleton,
  Stack,
  useToast,
} from "@chakra-ui/react";
import {
  assignCategories,
  assignGlobalData,
  assignTags,
  _formatCardPost,
} from "helpers";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import fetch from "services/api";
import { ReducersProps } from "store/reducers";
import DashboardTemplate from "templates/dashboard";
import { HomeProps, JobCardProps } from "types";
import Modal from "@/components/Modal";
import CreateJob from "@/components/CreateJob";
import { SET_GLOBAL_DATA } from "store/actions";

type AppDataProps = {
  data?: Omit<HomeProps, "currencySymbol" | "notification">;
};

const Jobs = ({ data }: AppDataProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [jobs, setJobs] = useState<JobCardProps[]>([]);
  const [displayActionsIndex, setDisplayActionsIndex] = useState(null);
  const [currentPost, setCurrentPost] = useState(null);
  const toast = useToast();

  const modalRef = useRef({ open: () => ({}), close: () => ({}) });

  const user = useSelector(({ user }: ReducersProps) => user.user);

  const fetchPosts = useCallback(
    async (status) => {
      setIsLoading(true);
      try {
        const response = await fetch(`/current-user/jobs?status=${status}`, {
          headers: { Authorization: `Bearer ${user.jwt}` },
        });
        if (response?.error) {
          toast({
            title: "Error",
            description: response.error?.message || "",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          const responseData = await response.json();
          let jobs = responseData.posts;
          jobs = jobs.map((job) => {
            return _formatCardPost(job);
          });
          setJobs(jobs);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error?.message || "",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [user]
  );

  useEffect(() => {
    if (user.jwt && status) {
      fetchPosts(status);
    }
  }, [user, status]);

  if (isLoading) {
    return (
      <Stack gap={4}>
        {Array.from(new Array(10)).map((_, index) => (
          <Skeleton shadow="md" h="200px" w="100%" key={index} />
        ))}
      </Stack>
    );
  }

  const Header = () => {
    const handleStatusSelect = ({ target: { value } }) => {
      setStatus(value);
    };
    return (
      <Flex align="center" justify="space-between">
        <Heading size="md">Jobs</Heading>
        <Select value={status} maxW="150px" onChange={handleStatusSelect}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>
      </Flex>
    );
  };

  if (!isLoading && !jobs.length) {
    return (
      <Stack>
        <Header />
        <Stack align="center" justify="center">
          <Heading size="sm">No {status} jobs found</Heading>
          {status === "active" && (
            <Button colorScheme="blue" maxW="max-content">
              <Link href="/jobs/new">Create a job now !</Link>
            </Button>
          )}
        </Stack>
      </Stack>
    );
  }

  const handleDisplayActions = (index: number, action = false) => {
    if (!action) {
      setDisplayActionsIndex(null);
    } else {
      setDisplayActionsIndex(index);
    }
  };

  const onEdit = () => {
    fetchPosts(status);
  };
  const handlePostEditModal = (index: number) => {
    const cardJobPost = jobs[index];
    const post = {
      id: cardJobPost.id,
      title: cardJobPost.title,
      description: cardJobPost.description,
      tags: cardJobPost.tags.map((tag) => ({
        ...tag,
        label: tag.title,
        value: tag.id.toString(),
      })),
      categories: cardJobPost.categories.map((category) => ({
        ...category,
        label: category.title,
        value: category.id.toString(),
      })),
      post_settings: {
        display_logo: cardJobPost.shouldDisplayLogo as boolean,
        highlight: cardJobPost.isHighlighted as boolean,
        pinned: cardJobPost.isPinned as boolean,
        featured: cardJobPost.isFeatured as boolean,
      },
    };
    setCurrentPost(post);
    modalRef.current.open();
  };

  return (
    <Stack>
      <Modal
        ref={modalRef}
        data={{
          Header: <Heading size="md">Editing job</Heading>,
          size: "xl",
        }}
      >
        <CreateJob
          onSuccess={onEdit}
          isAfterCreateEdit
          postValues={currentPost}
          postId={currentPost?.id}
        />
      </Modal>
      <Header />
      <Stack gap={2}>
        {jobs.map((job, index) => {
          return (
            <Stack
              onMouseEnter={() => handleDisplayActions(index, true)}
              onMouseLeave={() => handleDisplayActions(index, false)}
              pb={4}
              cursor="pointer"
              key={index}
            >
              <JobCard isPreview data={job} />
              {index === displayActionsIndex && (
                <Flex justify="flex-end" gap={2}>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    leftIcon={<FaEdit />}
                    onClick={() => handlePostEditModal(index)}
                  >
                    Edit
                  </Button>
                </Flex>
              )}
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
};

const UserJobs = ({ data }: AppDataProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: SET_GLOBAL_DATA,
      payload: data,
    });
  }, [data, dispatch]);
  return (
    <DashboardTemplate data={data}>
      <Jobs />
    </DashboardTemplate>
  );
};

export async function getStaticProps() {
  const responseData = await fetch("/template-data");
  const { data: templateData } = await responseData.json();
  let data = {};
  if (Object.keys(templateData).length) {
    let { appData, categories, tags } = templateData;
    data = assignGlobalData(data, appData);
    data = assignCategories(data, categories);
    data = assignTags(data, tags);
  }
  return {
    props: {
      data,
    },
  };
}

export default UserJobs;
