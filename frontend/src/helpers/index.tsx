import {
  FormattedPostSettings,
  JobCardCompanyProps,
  PostSettingsProps,
  JobCardProps,
  PostAttributesProps,
  CategoryProps,
  CompanyProps,
  TagProps,
} from "types";
import _ from "lodash";
import { rgba } from "polished";
import { theme } from "@chakra-ui/react";
import moment from "moment";
import { currencies } from "../constants";

export const defaultPostPopulateQuery =
  "populate[0]=company&populate[1]=company.profile_picture&populate[2]=categories&populate[3]=post_settings";

export const _formatCategories = (
  categories: CategoryProps[]
): CategoryProps[] => {
  return categories.map(({ id, title, slug, description }) => ({
    id,
    title,
    slug,
    description,
  }));
};

export const _formatTags = (tags: TagProps[]): TagProps[] => {
  return tags.map(({ id, title, slug }) => ({
    id,
    title,
    slug,
  }));
};

export const _formatCompany = (data: CompanyProps): JobCardCompanyProps => {
  const { name, location, slug, posts, createdAt, updatedAt } = data;
  return {
    name,
    description: data?.url,
    url: data?.url,
    location,
    slug,
    logo: data?.profile_picture?.url ?? null,
    posts,
    createdAt,
    updatedAt,
  };
};

export const _extractRawData = (json) => {
  if (json?.data && Array.isArray(json?.data)) {
    if (!json.data?.length) return [];
    return json.data.map(({ attributes, id }) => ({ ...attributes, id }));
  }
  if (
    json?.data &&
    !Array.isArray(json?.data) &&
    typeof json?.data === "object"
  ) {
    return { ...json.data?.attributes, id: json.data?.id };
  }
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
    tags: _formatTags(data.tags),
    ..._formatSettings(data.post_settings),
  };
};

export const _formatAppData = (json) => {
  const {
    logo: { url },
    hero: { url: heroUrl },
  } = json;
  json = {
    ...json,
    logoUrl: url?.toString(),
    heroUrl: heroUrl?.toString(),
    currencySymbol: _getCurrencySymbol(json.currency),
  };
  return json;
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

export const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const pickParams = (params) => {
  return _.pick(params, [
    "title",
    "category",
    "company",
    "tag",
    "location",
    "pinned",
    "highlight",
    "featured",
    "searchType",
    "limit",
    "page",
  ]);
};

export const _getCurrencySymbol = (currency) => {
  return (
    currencies.find(({ cc }) => {
      return cc === currency?.toUpperCase();
    })?.symbol ?? "$"
  );
};
