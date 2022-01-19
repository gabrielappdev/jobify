import React from "react";
import { Url } from "url";

export type LogoProps = {
  url: String;
};

export type ColorModeProps = {
  light: String;
  dark: String;
};

export type HomeProps = {
  name: string;
  description: string;
  price: number;
  display_logo: number;
  featured: number;
  highlight: number;
  pinned: number;
  logo: LogoProps;
  logoUrl: string;
  hero: LogoProps;
  heroUrl: string;
  country: string;
  currency: string;
  currencySymbol: string;
  notification?: GlobalNotificationProps;
};

export type GlobalNotificationProps = {
  message: String;
  colorScheme: String;
  active: Boolean;
};

export type CategoryProps = {
  id: number;
  title: string;
  description: string;
  slug: string;
};

export type TagProps = {
  id: number;
  title: string;
  slug: string;
};

export type FeaturedCompaniesProps = {
  id: Number;
  logo: String;
  name: String;
  slug: String;
  posts: Number;
};

export type GlobalModalInnerProps = {};

export type GlobalModalProps = {
  isGlobalModalOpen: Boolean;
  action: String;
  props?: GlobalModalInnerProps;
  params?: {
    redirect?: Url;
  };
};

export type IndexProps = {
  appData?: HomeProps;
  categories?: CategoryProps[];
  tags?: TagProps[];
  featuredCompanies?: FeaturedCompaniesProps[];
  featuredJobs?: JobCardProps[];
  otherJobs?: JobCardProps[];
} & {
  notificationVisible?: Boolean | string;
  globalModalProps?: GlobalModalProps;
};

export type TemplateDataProps =
  | Pick<IndexProps, "appData" | "categories" | "featuredCompanies"> & "tags";

export type CompanyProps = {
  id?: Number;
  name: String;
  location: String;
  description: String;
  url: String;
  profile_picture: LogoProps;
  createdAt: String;
  updatedAt: String;
  slug: String;
  email: String;
  post_settings: PostSettingsProps;
  posts?: Number;
  jobs?: JobCardProps[];
};

export type PostSettingsProps = {
  display_logo: Boolean;
  highlight: Boolean;
  pinned: Boolean;
  featured: Boolean;
};

export type JobCardCompanyProps = {
  name: String;
  description: String;
  url: String;
  location: String;
  slug: String;
  logo: String;
  posts?: Number;
  jobs?: JobCardProps[];
  createdAt?: String;
  updatedAt?: String;
};

export type FormattedPostSettings = {
  isHighlighted: Boolean;
  isPinned: Boolean;
  isFeatured: Boolean;
  shouldDisplayLogo: Boolean;
};

export type JobCardProps = {
  id?: Number;
  title: String;
  description?: String;
  createdAt?: String;
  slug?: String;
  categories: CategoryProps[];
  tags: TagProps[];
  company: JobCardCompanyProps;
  isHighlighted: Boolean;
  isPinned: Boolean;
  isFeatured: Boolean;
  shouldDisplayLogo: Boolean;
};

export type JobPostProps = {
  relatedJobs: JobCardProps[];
  description: String;
} & JobCardProps;

export type RawCompanyProps = {
  data?: {
    id: Number;
    attributes: CompanyProps;
  };
  attributes?: CompanyProps;
};

export type CategoryAttibutesProps = {
  attributes: CategoryProps;
};

export type RawCategoriesProps = {
  data: CategoryAttibutesProps[];
};

export type PostAttributesProps = {
  id: Number;
  title: String;
  description: String;
  createdAt: String;
  updatedAt: String;
  slug: String;
  expiration_date: String;
  active: Boolean;
  company: CompanyProps;
  categories: CategoryProps[];
  tags: TagProps[];
  post_settings: PostSettingsProps;
};

export type RawPostProps = {
  data?: {
    id: Number;
    attributes: PostAttributesProps;
  };
  attributes?: PostAttributesProps;
};

export type MetaProps = {
  pagination: {
    page: Number;
    pageSize: Number;
    pageCount: Number;
    totalNumber: Number;
  };
};

export type RoleProps = {
  name: String;
  type: String;
};

export type OrderProps = {
  id: number;
  total_in_cents: number;
  payment_intent_id: number;
  card_brand: string;
  card_last4: string;
  status: string;
  users_permissions_user: UserInnerProps;
  post: PostAttributesProps;
};

export type CreateJobFlowProps = {
  id: number;
  step: number;
  createdCompany: true;
  isPaid: false;
  isPending: true;
  values?: any;
  order: OrderProps;
};

export type UserInnerProps = {
  blocked: Boolean;
  confirmed: Boolean;
  email: "";
  id: Number;
  provider: String;
  username: String;
  jwt: String;
  company: CompanyProps | null;
  role: RoleProps;
  create_job_flow?: CreateJobFlowProps;
};

export type UserProps = {
  user: UserInnerProps;
  isLoading: Boolean;
};

export type SocialLinkProps = {
  name: string;
  icon: React.ReactElement;
  url: string;
  color: string;
};

export type NotificationProps = {
  id: number;
  content: string;
  title: string;
  url: string;
  createdAt: string;
  readed: boolean;
};

export type NotificationsReducerProps = {
  notifications: NotificationProps[];
};
