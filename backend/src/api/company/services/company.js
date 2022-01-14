"use strict";
const _ = require("lodash");

/**
 * company service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::company.company", ({ strapi }) => ({
  async setFeaturedCompanies() {
    const companies = await strapi.query("api::company.company").findMany({
      select: ["name", "slug", "id"],
      populate: { posts: true, profile_picture: true },
    });
    if (!companies.length) return [];
    return (
      companies
        // .filter(({ posts }) => posts.length >= 1)
        .sort((a, b) => b.posts.length - a.posts.length)
        .slice(0, 5)
        .map((company) => ({
          id: company.id,
          logo:
            company?.profile_picture?.url ??
            "https://res.cloudinary.com/yugiohdeckbuilder/image/upload/v1642095660/logo_placeholder_251f61658c.jpg?updated_at=2022-01-13T17:40:59.918Z",
          name: company.name,
          slug: company.slug,
          posts: company?.posts?.length ?? 0,
        }))
    );
  },
  async getLatestJobs(slug) {
    try {
      const posts = await strapi.db.query("api::post.post").findMany({
        where: {
          active: true,
          company: {
            slug,
          },
        },
        limit: 10,
        populate: [
          "categories",
          "company.profile_picture",
          "company.posts",
          "post_settings",
          "tags",
        ],
      });
      return strapi.service("api::post.post").attachPostLength(posts);
    } catch (error) {
      console.error(
        `Error getting the latest posts of company ${slug}: `,
        error
      );
    }
  },
}));
