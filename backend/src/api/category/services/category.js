"use strict";

/**
 * category service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::category.category", ({ strapi }) => ({
  async findBySlug(slug) {
    try {
      const templateData = await strapi
        .service("api::global.global")
        .getTemplateData();
      const jobs = await strapi.db.query("api::post.post").findMany({
        where: {
          active: true,
          categories: {
            slug,
          },
        },
        populate: [
          "categories",
          "company.profile_picture",
          "company.posts",
          "post_settings",
          "tags",
        ],
      });

      const category = await strapi.db.query("api::category.category").findOne({
        where: {
          slug,
        },
      });

      return {
        category,
        templateData,
        jobs: strapi.service("api::post.post").attachPostLength(jobs),
      };
    } catch (error) {
      throw new Error(error);
    }
  },
}));
