"use strict";

/**
 * tag service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::tag.tag", ({ strapi }) => ({
  async findBySlug(slug) {
    try {
      const templateData = await strapi
        .service("api::global.global")
        .getTemplateData();
      const jobs = await strapi.db.query("api::post.post").findMany({
        where: {
          active: true,
          tags: {
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

      const tag = await strapi.db.query("api::tag.tag").findOne({
        where: {
          slug,
        },
      });

      return {
        tag,
        templateData,
        jobs: strapi.service("api::post.post").attachPostLength(jobs),
      };
    } catch (error) {
      throw new Error(error);
    }
  },
}));
