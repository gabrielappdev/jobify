import {
  FormattedPostSettings,
  JobCardCompanyProps,
  RawCategoriesProps,
  PostSettingsProps,
  JobCardProps,
  PostAttributesProps,
  CategoryProps,
  CompanyProps,
} from "types";

import { rgba } from "polished";
import { theme } from "@chakra-ui/react";
import moment, { MomentInput } from "moment";

export const defaultPostPopulateQuery =
  "populate[0]=company&populate[1]=company.profile_picture&populate[2]=categories&populate[3]=post_settings";

export const _formatCategories = (
  categories: CategoryProps[]
): CategoryProps[] => {
  return categories.map(({ title, slug }) => ({
    title,
    slug,
  }));
};

export const _formatCompany = (data: CompanyProps): JobCardCompanyProps => {
  const {
    name,
    location,
    slug,
    profile_picture: profilePicture,
    posts,
    createdAt,
    updatedAt,
  } = data;
  return {
    name,
    location,
    slug,
    logo: profilePicture.url,
    posts,
    createdAt,
    updatedAt,
  };
};

export const _formatSettings = (
  data: PostSettingsProps
): FormattedPostSettings => {
  const {
    highlight: isHighlighted,
    pinned: isPinned,
    featured: isFeatured,
    display_logo: shouldDisplayLogo,
  } = data;
  return {
    isHighlighted,
    isPinned,
    isFeatured,
    shouldDisplayLogo,
  };
};

export const _formatCardPost = (data: PostAttributesProps): JobCardProps => {
  return {
    id: data.id,
    title: data.title,
    description: data?.description || "",
    createdAt: data.createdAt,
    slug: data.slug,
    company: _formatCompany(data.company),
    categories: _formatCategories(data.categories),
    ..._formatSettings(data.post_settings),
  };
};

export const bgColor = { light: "gray.50", dark: "gray.900" };

export const color = { light: "black", dark: "white" };

export const switchPrimaryColor = { light: "green.700", dark: "green.200" };

export const highlightColor = {
  light: rgba(theme.colors.green[500], 0.1),
  dark: rgba(theme.colors.green[500], 0.2),
};

export const contrastColor = {
  light: theme.colors.green[100],
  dark: theme.colors.green[900],
};

export const navigationBgColor = { light: "gray.100", dark: "gray.800" };

export const applyPostsSorting = (posts = []) => {
  return posts
    .sort((a, b) => {
      if (moment(a.createdAt).isBefore(b.createdAt)) {
        return 1;
      } else if (moment(a.createdAt).isAfter(b.createdAt)) return -1;
      return 0;
    })
    .sort((a, b) => b.isHighlighted - a.isHighlighted)
    .sort((a, b) => b.isPinned - a.isPinned);
};
