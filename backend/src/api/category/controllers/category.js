"use strict";

/**
 *  category controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    async findBySlug(ctx) {
      const { slug } = ctx.params;
      if (!slug) {
        ctx.status = 404;
      } else {
        try {
          const data = await strapi
            .service("api::category.category")
            .findBySlug(slug);
          ctx.body = data;
        } catch (error) {
          console.error("Error getting categories by slug: ", error);
        }
      }
    },
  })
);
