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
    return (
      companies
        // .filter(({ posts }) => posts.length >= 2)
        .sort((a, b) => b.posts.length - a.posts.length)
        .slice(0, 5)
        .map((company) => ({
          id: company.id,
          logo: company.profile_picture.url,
          name: company.name,
          slug: company.slug,
          posts: company.posts.length,
        }))
    );
  },
}));
