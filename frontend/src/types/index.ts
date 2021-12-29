export type LogoProps = {
  data: {
    attributes: {
      url: String;
    };
  };
};

export type HomeProps = {
  name: String;
  description: String;
  price: Number;
  logo: LogoProps;
  logoUrl: string;
  hero: LogoProps;
  heroUrl: String;
};

export type CategoryProps = {
  title: String;
  slug: String;
};

export type IndexProps = {
  appData?: HomeProps;
  categories?: CategoryProps[];
  featuredPosts?: JobCardProps[];
};

export type CompanyProps = {
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
};

export type PostSettingsProps = {
  display_logo: Boolean;
  highlight: Boolean;
  pinned: Boolean;
  featured: Boolean;
};

export type JobCardCompanyProps = {
  name: String;
  location: String;
  slug: String;
  logo: String;
};

export type FormattedPostSettings = {
  isHighlighted: Boolean;
  isPinned: Boolean;
  isFeatured: Boolean;
  shouldDisplayLogo: Boolean;
};

export type JobCardProps = {
  title: String;
  createdAt: String;
  slug: String;
  categories: CategoryProps[];
  company: JobCardCompanyProps;
  isHighlighted: Boolean;
  isPinned: Boolean;
  isFeatured: Boolean;
  shouldDisplayLogo: Boolean;
};

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
  title: String;
  description: String;
  createdAt: String;
  updatedAt: String;
  slug: String;
  expiration_date: String;
  active: Boolean;
  company: RawCompanyProps;
  categories: RawCategoriesProps;
  post_settings: PostSettingsProps;
};

export type RawPostProps = {
  data?: {
    id: Number;
    attributes: PostAttributesProps;
  };
  attributes?: PostAttributesProps;
};
