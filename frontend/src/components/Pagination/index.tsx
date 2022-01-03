import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Button, Flex, IconButton, Stack } from "@chakra-ui/react";

type PaginationProps = {
  data: {
    pageCount: Number;
    currentPage: Number;
    onChange: (value: number) => void;
  };
};

type PaginationButtonProps = {
  index: number;
};

const Pagination = ({ data }: PaginationProps) => {
  const PaginationButton = ({ index }: PaginationButtonProps) => {
    return (
      <Button
        isDisabled={data.currentPage === index + 1}
        colorScheme="blue"
        variant={data.currentPage === index + 1 ? "solid" : "outline"}
        onClick={() => data.onChange(index + 1)}
        mr={2}
        size="sm"
      >
        {index + 1}
      </Button>
    );
  };
  const getPages = () => {
    const pageCount = data.pageCount as number;
    const currentPage = data.currentPage as number;
    if (pageCount - currentPage >= 5) {
      const start = Array.from(new Array(data.pageCount))
        .map((_, index) => index - 1)
        .slice(currentPage, currentPage + 2)
        .map((value, index) => {
          return <PaginationButton index={value} key={index} />;
        });
      const separator = (
        <Button size="sm" colorScheme="gray" disabled>
          ...
        </Button>
      );
      const end = Array.from(new Array(data.pageCount))
        .map((_, index) => index)
        .slice(pageCount - 2, pageCount)
        .map((value, index) => {
          return <PaginationButton index={value} key={index} />;
        });

      return (
        <Flex align="center">
          {start}
          {separator}
          {end}
        </Flex>
      );
    } else {
      return Array.from(new Array(data.pageCount))
        .map((_, index) => index)
        .slice(-6)
        .map((value, index) => {
          return <PaginationButton index={value} key={index} />;
        });
    }
  };
  return (
    <Stack>
      <Flex align="center">
        {data.currentPage !== 1 && (
          <IconButton
            aria-label="First Page"
            icon={<ArrowLeftIcon />}
            size="sm"
            mr={2}
            sx={{ "& svg": { width: "8px", height: "8px" } }}
            onClick={() => data.onChange((data.currentPage as number) - 1)}
          />
        )}
        <IconButton
          aria-label="Previous Page"
          icon={<ChevronLeftIcon />}
          size="sm"
          mr={2}
          onClick={() => data.onChange((data.currentPage as number) - 1)}
          disabled={data.currentPage === 1}
        />
        {getPages()}
        <IconButton
          aria-label="Next Page"
          icon={<ChevronRightIcon />}
          size="sm"
          onClick={() => data.onChange((data.currentPage as number) + 1)}
          disabled={
            (data.currentPage as number) - 1 === data.pageCount ||
            data.pageCount === 1
          }
        />
        {(data.currentPage as number) - 1 !== data.pageCount ||
          (data.currentPage !== 1 && (
            <IconButton
              aria-label="Last Page"
              icon={<ArrowRightIcon />}
              size="sm"
              sx={{ "& svg": { width: "8px", height: "8px" } }}
              onClick={() => data.onChange((data.currentPage as number) + 1)}
            />
          ))}
      </Flex>
    </Stack>
  );
};

export default Pagination;
