import { _formatCardPost } from "../src/helpers";
const jobCard = {
  title: "Senior Frontend Engineer",
  description:
    "**About the role:**\nYou would work directly with the product, design, and engineering teams to help shape our product and culture. We’re looking for a Senior Frontend Engineer who excels at creating highly performant and scalable web and mobile applications. Your focus will be to deliver high quality software solutions in a rapidly evolving HR Tech space. It’s a unique chance to be an advocate for our incredible coding standards, efficiency, and reliability.\n\n**Some Challenges You’ll Tackle:**\nHelp integrate our platform with complex external systems\nHelp iterate on our development pipeline as our team scales\nBuild scalable, maintainable software given a complex set of requirements\nYou must have:\n5+ years of professional experience delivering production-grade software beyond personal or bootcamp projects.\n5+ years of experience with React.\nExperience writing tests with jest or any similar testing framework.\nExperience in a code review process, having your own work reviewed as well as reviewing that of your peers.\nExperience producing/consuming HTTP APIs (REST, SOAP, gRPC, etc.)\nWorking knowledge of CI/CD workflows\nVersion control (we use git)\nAbility to thrive in a fast-paced startup environment\nSelf-directed and responsible for deliverables\nBachelor’s degree in computer science or ample real-world experience\nTeam player\nBonus Qualifications:\nReact Native Experience\nExperience working with containers (Docker, rkt, etc.)\n\n**Benefits**\nWe believe in comprehensive benefits and perks that provide total wellness solutions. We offer excellent healthcare choices, and lots of other great perks!\n\nHighly competitive compensation package including salary and equity\nComprehensive medical, dental, and vision insurance\nRemote-First, work from anywhere\n401(k) plan\nParental Leave & flexible vacation policy",
  createdAt: "2021-12-29T08:33:35.313Z",
  updatedAt: "2021-12-30T11:36:10.816Z",
  slug: "bennie-senior-frontend-engineer",
  expiration_date: "2022-01-05T08:45:00.000Z",
  active: true,
  company: {
    data: {
      id: 1,
      attributes: {
        name: "Bennie",
        location: "Stamford CT, New York NY",
        description:
          "Bennie is an employee benefits platform that helps companies create a healthier workplace. We provide technology and services that are beyond what growing companies typically receive, yet exactly what they need. Our goal is to provide high quality company benefits through an engaging platform, while empowering employees to leverage their benefit options easily and effectively.\n\nAt Bennie, we’re creating an environment where our people can learn, thrive and move our mission forward. Our team is fully remote across the United States, and we also have offices in Stamford, CT and downtown Manhattan. Our Bennie team owns our company and our culture. We prize diversity of thought and expertise within our team—and we’re always looking for amazing people to help us do and be more.",
        url: null,
        createdAt: "2021-12-29T08:26:26.549Z",
        updatedAt: "2021-12-29T08:26:26.549Z",
        slug: "bennie",
        email: "contact@bennie.com",
        profile_picture: {
          data: {
            id: 10,
            attributes: {
              name: "bennie.jpg",
              alternativeText: "bennie.jpg",
              caption: "bennie.jpg",
              width: 100,
              height: 100,
              formats: null,
              hash: "bennie_fb8fafe998",
              ext: ".jpg",
              mime: "image/jpeg",
              size: 1.16,
              url: "https://res.cloudinary.com/yugiohdeckbuilder/image/upload/v1640766263/bennie_fb8fafe998.jpg",
              previewUrl: null,
              provider: "cloudinary",
              provider_metadata: {
                public_id: "bennie_fb8fafe998",
                resource_type: "image",
              },
              createdAt: "2021-12-29T08:24:23.021Z",
              updatedAt: "2021-12-29T08:24:23.021Z",
            },
          },
        },
      },
    },
  },
  categories: {
    data: [
      {
        id: 1,
        attributes: {
          title: "Front-end",
          slug: "front-end",
          createdAt: "2021-12-28T16:39:24.100Z",
          updatedAt: "2021-12-28T16:39:24.100Z",
        },
      },
      {
        id: 1,
        attributes: {
          title: "Back-end",
          slug: "back-end",
          createdAt: "2021-12-28T16:39:24.100Z",
          updatedAt: "2021-12-28T16:39:24.100Z",
        },
      },
    ],
  },
  post_settings: {
    id: 1,
    display_logo: true,
    highlight: true,
    pinned: true,
    featured: true,
  },
};

const jobCardProps = _formatCardPost(jobCard);

export default jobCardProps;
