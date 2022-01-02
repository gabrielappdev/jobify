"use strict";

/**
 *  tag controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::tag.tag", ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    if (!slug) {
      ctx.status = 404;
    } else {
      try {
        const data = await strapi.service("api::tag.tag").findBySlug(slug);
        ctx.body = data;
      } catch (error) {
        console.error("Error getting tags by slug: ", error);
      }
    }
  },
}));
