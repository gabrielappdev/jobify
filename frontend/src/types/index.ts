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
};

export type CategoryProps = {
  title: String;
  slug: String;
};

export type IndexProps = {
  appData?: HomeProps;
  categories?: CategoryProps[];
};
