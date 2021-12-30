import { _formatCardPost } from "../src/helpers";

const posts = {
  data: [
    {
      id: 1,
      attributes: {
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
          ],
        },
        post_settings: {
          id: 1,
          display_logo: true,
          highlight: true,
          pinned: true,
          featured: true,
        },
      },
    },
    {
      id: 2,
      attributes: {
        title: "PostgreSQL DBA and Linux admin",
        description:
          "Lifetimely is a fast-growing B2B SaaS company looking for a DBA with deep PostgreSQL expertise to help us manage and take ownership of our databases.\n\nYou can read about our app on the Shopify app store and on our website. We provide real-time reporting and predictions to more than 4000 eCommerce shops. To give you a sense of scale - we collect data on millions of orders per day from a few thousand stores and process many millions of background jobs to be able to deliver quality reports and insights to our customers.\n\nWe're looking to add a senior database admin to our existing team.\n\n🔍 We are looking for someone who has: 🔍\n\nExperience in tuning Postgres, maintaining and configuring backups, managing ETL processes a must.\nExperience as an Ubuntu admin preferred.\nFamiliarity with Ansible is a plus.\nhumble, can mentor others, both provide and receive direction and is always willing to share what they learn\noverlaps with EST or CET zone at least 5 hours ( prefer America / Europe / Africa )\nCompensation for this position is between $50K-$100K and varies with experience and skillset.\n\nThis can be either a full-time position or a part-time hourly gig if you are into freelancing. You are expected to have at least 20 hours per week dedicated to us. You will be employed through https://www.letsdeel.com/ as a contractor.\n\n☘️ Where we are and how we work: ☘️\n\nOur tech stack is Ansible / Ruby / PostgreSQL.\n\nWorking for Lifetimely doesn't feel like the usual office or startup gig: we are a distributed group of ten people across nine different countries 🇫🇮 🇺🇸 🇮🇳 🇫🇷 🇨🇱 🇪🇬 🇪🇸 🇮🇶 🇭🇷 with our own way of working. Some of us are nomads, some just like working remotely. We highly encourage written (long-form) communication and documenting things on Notion and generally don't like tight fixed schedules. There is not really much management or oversight, we expect you to know how to manage yourself. We prioritize shipping and results above how or when you do the work.\n\nTwo meetings per week, one for the devs on Tuesday, another one on Thursdays for everyone. That's it.\n\nIf you are into distributed work and prefer the lifestyle aspects or maybe live somewhere with not a lot of exciting startups, you will enjoy working with us.",
        createdAt: "2021-12-30T12:56:35.655Z",
        updatedAt: "2021-12-30T12:59:47.023Z",
        slug: "lifetimely-postgre-sql-dba-and-linux-admin",
        expiration_date: "2022-01-06T14:00:00.000Z",
        active: true,
        company: {
          data: {
            id: 2,
            attributes: {
              name: "Lifetimely",
              location: "  Helsinki, Finland",
              description:
                "Helping ecommerce companies understand their customer data.\nDemocratizing data for ecommerce stores\n\nLifetimely helps ecommerce companies make sense of their customer behavior and lifetime value. We're a 100% distributed team of 6 people across four different continents serving thousands of customers.\n\nYou can read about our app on the Shopify app store. We provide real-time reporting to ecommerce shop owners. To give you a sense of scale - we collect data on millions of orders per day from many ecommerce stores and process many millions of background jobs to be able to deliver quality lifetime value reports to our customers.\n\nWe are huge believers in async distributed work and try our best sticking to calm work practices respecting each other's time. \n",
              url: "lifetimely.io",
              createdAt: "2021-12-30T12:54:50.522Z",
              updatedAt: "2021-12-30T12:54:50.522Z",
              slug: "lifetimely",
              email: "contact@lifetimely.io",
              profile_picture: {
                data: {
                  id: 11,
                  attributes: {
                    name: "logo2.jpg",
                    alternativeText: "logo2.jpg",
                    caption: "logo2.jpg",
                    width: 100,
                    height: 100,
                    formats: null,
                    hash: "logo2_9e9065b588",
                    ext: ".jpg",
                    mime: "image/jpeg",
                    size: 1.48,
                    url: "https://res.cloudinary.com/yugiohdeckbuilder/image/upload/v1640868800/logo2_9e9065b588.jpg",
                    previewUrl: null,
                    provider: "cloudinary",
                    provider_metadata: {
                      public_id: "logo2_9e9065b588",
                      resource_type: "image",
                    },
                    createdAt: "2021-12-30T12:53:19.235Z",
                    updatedAt: "2021-12-30T12:53:19.235Z",
                  },
                },
              },
            },
          },
        },
        categories: {
          data: [
            {
              id: 2,
              attributes: {
                title: "Backend",
                slug: "backend",
                createdAt: "2021-12-28T18:02:24.484Z",
                updatedAt: "2021-12-28T18:02:24.484Z",
              },
            },
          ],
        },
        post_settings: {
          id: 2,
          display_logo: true,
          highlight: false,
          pinned: false,
          featured: true,
        },
      },
    },
    {
      id: 3,
      attributes: {
        title: "WordPress Engineer",
        description:
          "The Opportunity\n\nModern Tribe, is looking for a WordPress Engineer with solid PHP and WordPress experience to join our agency team. Are you a dependable and competent developer with strong communication skills? Are you a quick learner that likes to solve complex problems using WordPress and OOP techniques? We want to meet you!\n\nThe WordPress Engineer role at Modern Tribe will offer you the opportunity to become a core member within our tribe. You will be collaborating with an awesome dev team working on innovative and large scale WordPress installations. We are looking for a backend developer that is already actively working in the WordPress website and plugin development field. You need to be up to speed and knowledgeable about the most recent releases and standards of WordPress. We want you to be as excited and as passionate as we are about what we are creating with the platform.\n\nExperienced WordPress developers only!",
        createdAt: "2021-12-30T13:02:46.462Z",
        updatedAt: "2021-12-30T13:07:25.913Z",
        slug: "modern-tribe-word-press-engineer",
        expiration_date: "2022-01-07T03:00:00.000Z",
        active: true,
        company: {
          data: {
            id: 3,
            attributes: {
              name: "Modern Tribe",
              location: "Minneapolis, Minnesota",
              description:
                "Live well, do good work\nModern Tribe is a rapidly growing software & design company. We develop custom solutions for some of the world’s largest companies, government institutions and smaller growing organizations. We pride ourselves on our ability to bridge people and technology and to bring the passion and dedication of an entrepreneur to every project. Our team is composed of talented employees and freelancers around North & South America (and a smattering across the globe).\n",
              url: "https://tri.be/",
              createdAt: "2021-12-30T13:02:02.500Z",
              updatedAt: "2021-12-30T13:02:02.500Z",
              slug: "modern-tribe",
              email: "contact@tri.be",
              profile_picture: {
                data: {
                  id: 12,
                  attributes: {
                    name: "logo3.jpg",
                    alternativeText: "logo3.jpg",
                    caption: "logo3.jpg",
                    width: 100,
                    height: 100,
                    formats: null,
                    hash: "logo3_86f1e03730",
                    ext: ".jpg",
                    mime: "image/jpeg",
                    size: 1.18,
                    url: "https://res.cloudinary.com/yugiohdeckbuilder/image/upload/v1640869292/logo3_86f1e03730.jpg",
                    previewUrl: null,
                    provider: "cloudinary",
                    provider_metadata: {
                      public_id: "logo3_86f1e03730",
                      resource_type: "image",
                    },
                    createdAt: "2021-12-30T13:01:31.553Z",
                    updatedAt: "2021-12-30T13:01:31.553Z",
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
              id: 2,
              attributes: {
                title: "Backend",
                slug: "backend",
                createdAt: "2021-12-28T18:02:24.484Z",
                updatedAt: "2021-12-28T18:02:24.484Z",
              },
            },
          ],
        },
        post_settings: {
          id: 3,
          display_logo: true,
          highlight: false,
          pinned: false,
          featured: true,
        },
      },
    },
    {
      id: 4,
      attributes: {
        title: "Cloud Infrastructure Engineer",
        description:
          "Time zones: EST (UTC -5), CST (UTC -6), MST (UTC -7), PST (UTC -8), AKST (UTC -9), HST (UTC -10)\n\nRemote within the U.S. -- $70 - $100k\n\n\n\nPodsights is a small, distributed organization seeking an engineer to join our growing team!\n\n\nHere's a little about us, a little about what we believe, and what we are looking for.\n\n\nPodsights is an attribution platform for podcast advertising. We likely work with your favorite publisher and handle over 10 billion events a month.\n\nOur mission is simple, we are looking to grow the podcast industry. Far too many brands try a podcast advertising campaign and churn. Or worse: they don’t even try to enter the market. By providing a platform for brands to optimize results, we encourage investment in podcast advertising, and by proxy to publishers.\n\nWe’re looking for an engineer interested in digging into and securing our cloud infrastructure.\n\nWe believe that where you went to school has little bearing on your performance as an engineer. Where you live isn’t a proxy for talent. Your current employer provides low signal about your future potential.\n\nDifferent backgrounds bring different perspectives, and we believe this helps us be better problem solvers. We encourage applications from all sorts of diverse backgrounds.\n\nAt Podsights, we look for ambition and curiosity. Want to start a company of your own one day? Yes, we want to talk. Are you interested in the business side of software? Tell us more.\n\nOur team consists of members of Embedly (acquired by Medium), Horizon Media, Claritas, NPM, and How Stuff Works. You can learn more about us here: Podsights Team\n\n\n\nAs a Cloud Infrastructure Engineer, some of your projects will include:\n\nManaging (create, monitor, and destroy) resources within our GCP cloud infrastructure\nSecuring our resources with IAM roles, bucket permissions, and other network-related items\nSetting up a systems monitoring solution\nTroubleshooting infrastructure issues including Docker and Kubernetes\n\n\nIn order to be successful in this role, we think you’ll need:\n\nBackground in cloud infrastructure (Google Cloud Platform preferred)\nKnowledge of Airflow, Docker, and Kubernetes\nExperience creating and configuring a systems monitoring solution\nFamiliarity with Python\n\n\nIf the above interests you, drop us a note. We’re less worried about a resume (LinkedIn is fine), but more importantly, tell us about your ideal next role.\n\nBenefits\n\nOpportunity to build something meaningful from the ground up. We’re changing the way podcast ads are bought and sold.\nFast-paced and challenging work environment ideal for a life-long learner.\nCompetitive compensation and a 401K program.\nFully remote role with an annual WFH stipend.\nWe cover 100% of health benefits (medical, dental, and vision)!\n4 weeks of PTO each year.\nHoliday break before the New Year.\nA generous parental leave policy.\n\n\nHere at Podsights, we believe strongly that we benefit from diversity and encourage applicants from underrepresented backgrounds to apply. We value inclusion and welcome diverse viewpoints.\n\n\n\nWe are unable to sponsor work visas at this time.",
        createdAt: "2021-12-30T13:13:08.039Z",
        updatedAt: "2021-12-30T13:22:02.309Z",
        slug: "podsights-cloud-infrastructure-engineer",
        expiration_date: "2022-01-08T03:00:00.000Z",
        active: true,
        company: {
          data: {
            id: 4,
            attributes: {
              name: "Podsights",
              location: "New Hampshire",
              description:
                "The operating system for podcast advertising\nPodsights is the operating system for podcast advertising. We likely work with your favorite publisher and handle over 7 billion events a month. Our mission is to grow the podcast industry. Far too many brands try a podcast advertising campaign and churn. Or worse: they don’t even try to enter the market. By providing a platform for brands to understand and scale podcast advertising, we encourage investment in podcast advertising, and by proxy to publishers.",
              url: "https://podsights.com/",
              createdAt: "2021-12-30T13:10:49.291Z",
              updatedAt: "2021-12-30T13:10:49.291Z",
              slug: "podsights",
              email: "contact@podsights.com/",
              profile_picture: {
                data: {
                  id: 13,
                  attributes: {
                    name: "logo4.jpg",
                    alternativeText: "logo4.jpg",
                    caption: "logo4.jpg",
                    width: 100,
                    height: 100,
                    formats: null,
                    hash: "logo4_a24ac506cc",
                    ext: ".jpg",
                    mime: "image/jpeg",
                    size: 1.49,
                    url: "https://res.cloudinary.com/yugiohdeckbuilder/image/upload/v1640869835/logo4_a24ac506cc.jpg",
                    previewUrl: null,
                    provider: "cloudinary",
                    provider_metadata: {
                      public_id: "logo4_a24ac506cc",
                      resource_type: "image",
                    },
                    createdAt: "2021-12-30T13:10:33.930Z",
                    updatedAt: "2021-12-30T13:10:33.930Z",
                  },
                },
              },
            },
          },
        },
        categories: {
          data: [
            {
              id: 2,
              attributes: {
                title: "Backend",
                slug: "backend",
                createdAt: "2021-12-28T18:02:24.484Z",
                updatedAt: "2021-12-28T18:02:24.484Z",
              },
            },
          ],
        },
        post_settings: {
          id: 4,
          display_logo: true,
          highlight: false,
          pinned: true,
          featured: true,
        },
      },
    },
    {
      id: 5,
      attributes: {
        title: "Senior Site Reliability Engineer",
        description:
          "Loadsmart is seeking to hire a Latin America-based Senior Site Reliability Engineer. This person will have a passion for disrupting the industry and building solutions that create sustainable, long-lasting value. You will be supporting a rapidly growing tech company with award-winning solutions focused on being the best one stop shop for carriers across the United States.\n\nAs a Senior Site Reliability Engineer, you will implement experimental ideas to deploy software development projects and new processes. This role requires creative problem solving, and troubleshooting root-cause analysis of system operation issues.\n\n\nThe Right Fit\n\nIf you are passionate about solving problems at scale, you will be successful here. You are fearless in pursuit of reinventing the future of freight through solving inefficiencies in the industry.\n\n\nResponsibilities\nBuild data warehouse to house data from various sources, including relational databases, streaming services and Web APIs\nBuild and support complex ETL infrastructure to deliver clean and reliable data\nOptimize data architecture by trading off storage and computation to achieve low cost and high performance\nMove seamlessly from high-altitude thinking to the tangible and practical supporting our lean software development team\nCollect metrics and understand how each metric correlates to the business and inspire the team to do the same\nBe available for application support during off-hours, as part of on-call rotation\nSeek, give, and receive constructive feedback to teammates through code and specification reviews\n\nQualifications\n5+ years of experience in Cloud Computing, SRE/DevOps, data modeling, ETL development, data warehousing, data pipeline and data lake creation\nExperience working with and administering one or more columnar storage systems: Redshift, Snowflake, Bigquery, etc\nHands-on experience and advanced knowledge of SQL\nExperience in working with AWS, Cloud environments, Containers, Kubernetes\nDocker - DevOps Engineering environment with owning tests, CI/CD pipelines\nExperience with automation and provisioners like Terraform, Ansible or Chef\nTroubleshooting and system engineering exposure in UNIX/Linux production environments\nExperience automating tasks with scripting languages such as Python, Bash, and JavaScript\nExpertise in managing Linux servers (either RedHat or Debian-based distros)\nExperience with Big Data and streaming technologies is a plus (Hadoop, M/R, Hive, Spark, etc)\n\nWhat you will find here\nGenerous stock options\nOpportunity to work with modern, cutting-edge technologies\nMind and body initiatives (Work out platform, Yoga classes, activity challenges)",
        createdAt: "2021-12-30T13:40:43.712Z",
        updatedAt: "2021-12-30T14:49:01.521Z",
        slug: "loadsmart-senior-site-reliability-engineer",
        expiration_date: "2022-01-08T03:00:00.000Z",
        active: true,
        company: {
          data: {
            id: 5,
            attributes: {
              name: "LoadSmart",
              location: "New York, NY",
              description:
                "Loadsmart is seeking to hire a Latin America-based Senior Site Reliability Engineer. This person will have a passion for disrupting the industry and building solutions that create sustainable, long-lasting value. You will be supporting a rapidly growing tech company with award-winning solutions focused on being the best one stop shop for carriers across the United States.\n\nAs a Senior Site Reliability Engineer, you will implement experimental ideas to deploy software development projects and new processes. This role requires creative problem solving, and troubleshooting root-cause analysis of system operation issues.\n\n\nThe Right Fit\n\nIf you are passionate about solving problems at scale, you will be successful here. You are fearless in pursuit of reinventing the future of freight through solving inefficiencies in the industry.\n\n\nResponsibilities\nBuild data warehouse to house data from various sources, including relational databases, streaming services and Web APIs\nBuild and support complex ETL infrastructure to deliver clean and reliable data\nOptimize data architecture by trading off storage and computation to achieve low cost and high performance\nMove seamlessly from high-altitude thinking to the tangible and practical supporting our lean software development team\nCollect metrics and understand how each metric correlates to the business and inspire the team to do the same\nBe available for application support during off-hours, as part of on-call rotation\nSeek, give, and receive constructive feedback to teammates through code and specification reviews\n\nQualifications\n5+ years of experience in Cloud Computing, SRE/DevOps, data modeling, ETL development, data warehousing, data pipeline and data lake creation\nExperience working with and administering one or more columnar storage systems: Redshift, Snowflake, Bigquery, etc\nHands-on experience and advanced knowledge of SQL\nExperience in working with AWS, Cloud environments, Containers, Kubernetes\nDocker - DevOps Engineering environment with owning tests, CI/CD pipelines\nExperience with automation and provisioners like Terraform, Ansible or Chef\nTroubleshooting and system engineering exposure in UNIX/Linux production environments\nExperience automating tasks with scripting languages such as Python, Bash, and JavaScript\nExpertise in managing Linux servers (either RedHat or Debian-based distros)\nExperience with Big Data and streaming technologies is a plus (Hadoop, M/R, Hive, Spark, etc)\n\nWhat you will find here\nGenerous stock options\nOpportunity to work with modern, cutting-edge technologies\nMind and body initiatives (Work out platform, Yoga classes, activity challenges)",
              url: "https://loadsmart.com/",
              createdAt: "2021-12-30T13:39:48.958Z",
              updatedAt: "2021-12-30T13:39:48.958Z",
              slug: "load-smart",
              email: "contact@loadsmart.com",
              profile_picture: {
                data: {
                  id: 14,
                  attributes: {
                    name: "load5.jpg",
                    alternativeText: "load5.jpg",
                    caption: "load5.jpg",
                    width: 100,
                    height: 100,
                    formats: null,
                    hash: "load5_8b2836cfa1",
                    ext: ".jpg",
                    mime: "image/jpeg",
                    size: 1.6,
                    url: "https://res.cloudinary.com/yugiohdeckbuilder/image/upload/v1640871566/load5_8b2836cfa1.jpg",
                    previewUrl: null,
                    provider: "cloudinary",
                    provider_metadata: {
                      public_id: "load5_8b2836cfa1",
                      resource_type: "image",
                    },
                    createdAt: "2021-12-30T13:39:24.991Z",
                    updatedAt: "2021-12-30T13:39:24.991Z",
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
              id: 2,
              attributes: {
                title: "Backend",
                slug: "backend",
                createdAt: "2021-12-28T18:02:24.484Z",
                updatedAt: "2021-12-28T18:02:24.484Z",
              },
            },
          ],
        },
        post_settings: {
          id: 5,
          display_logo: false,
          highlight: true,
          pinned: false,
          featured: true,
        },
      },
    },
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 25,
      pageCount: 1,
      total: 5,
    },
  },
};

const formattedPosts = posts.data.map(({ attributes }) =>
  _formatCardPost(attributes)
);

export default formattedPosts;
