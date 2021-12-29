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
  console.log(data.company);
  return {
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
