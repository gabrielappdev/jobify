import React from "react";
import { Url } from "url";

export type LogoProps = {
  url: string;
};

export type ColorModeProps = {
  light: string;
  dark: string;
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
  message: string;
  colorScheme: string;
  active: boolean;
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
  id: number;
  logo: string;
  name: string;
  slug: string;
  posts: number;
};

export type GlobalModalInnerProps = {};

export type GlobalModalProps = {
  isGlobalModalOpen: boolean;
  action: string;
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
  isNavbarAlwaysTransparent?: boolean;
} & {
  notificationVisible?: Boolean | string;
  globalModalProps?: GlobalModalProps;
};

export type TemplateDataProps =
  | Pick<IndexProps, "appData" | "categories" | "featuredCompanies"> & "tags";

export type CompanyProps = {
  id?: number;
  name: string;
  location: string;
  description: string;
  url: string;
  profile_picture: LogoProps;
  createdAt: string;
  updatedAt: string;
  slug: string;
  email: string;
  post_settings: PostSettingsProps;
  posts?: number;
  jobs?: JobCardProps[];
  social_link?: SocialLinkProps[];
};

export type PostSettingsProps = {
  display_logo: boolean;
  highlight: boolean;
  pinned: boolean;
  featured: boolean;
};

export type JobCardCompanyProps = {
  name: string;
  description: string;
  url: string;
  location: string;
  slug: string;
  logo: string;
  posts?: number;
  jobs?: JobCardProps[];
  createdAt?: string;
  updatedAt?: string;
  social_link: SocialLinkProps[];
};

export type FormattedPostSettings = {
  isHighlighted: boolean;
  isPinned: boolean;
  isFeatured: boolean;
  shouldDisplayLogo: boolean;
};

export type JobCardProps = {
  id?: number;
  title: string;
  description?: string;
  createdAt?: string;
  slug?: string;
  categories: CategoryProps[];
  tags: TagProps[];
  company: JobCardCompanyProps;
  isHighlighted: boolean;
  isPinned: boolean;
  isFeatured: boolean;
  shouldDisplayLogo: boolean;
};

export type JobPostProps = {
  relatedJobs: JobCardProps[];
  description: string;
} & JobCardProps;

export type RawCompanyProps = {
  data?: {
    id: number;
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
  id: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  expiration_date: string;
  active: boolean;
  company: CompanyProps;
  categories: CategoryProps[];
  tags: TagProps[];
  post_settings: PostSettingsProps;
};

export type CreateJobFormProps = {
  title: string;
  description: string;
  tags: TagProps[];
  categories: CategoryProps[];
  post_settings: PostSettingsProps;
};

export type RawPostProps = {
  data?: {
    id: number;
    attributes: PostAttributesProps;
  };
  attributes?: PostAttributesProps;
};

export type MetaProps = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    totalNumber: number;
  };
};

export type RoleProps = {
  name: string;
  type: string;
};

export type OrderProps = {
  id: number;
  total_in_cents: number;
  payment_intent_id: number;
  card_brand: string;
  card_last4: string;
  status: string;
  createdAt: string;
  users_permissions_user: UserInnerProps;
  post: PostAttributesProps;
  receipt?: string;
  total?: string;
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
  blocked: boolean;
  confirmed: boolean;
  email: "";
  id: number;
  provider: string;
  username: string;
  jwt: string;
  company: CompanyProps | null;
  role: RoleProps;
  create_job_flow?: CreateJobFlowProps;
};

export type UserProps = {
  user: UserInnerProps;
  isLoading: boolean;
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
