import {
  FormattedPostSettings,
  JobCardCompanyProps,
  RawCategoriesProps,
  RawCompanyProps,
  PostSettingsProps,
  JobCardProps,
  PostAttributesProps,
  CategoryProps,
} from "types";

import { rgba } from "polished";
import { theme } from "@chakra-ui/react";
import moment from "moment";

export const defaultPostPopulateQuery =
  "populate[0]=company&populate[1]=company.profile_picture&populate[2]=categories&populate[3]=post_settings";

export const _formatCategories = (
  categories: RawCategoriesProps
): CategoryProps[] => {
  return categories.data.map(({ attributes: { title, slug } }) => ({
    title,
    slug,
  }));
};

export const _formatCompany = (data: RawCompanyProps): JobCardCompanyProps => {
  const {
    name,
    location,
    slug,
    profile_picture: profilePicture,
  } = data.attributes;
  return {
    name,
    location,
    slug,
    logo: profilePicture.data.attributes.url,
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
    createdAt: data.createdAt,
    slug: data.slug,
    company: _formatCompany(data.company.data),
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
