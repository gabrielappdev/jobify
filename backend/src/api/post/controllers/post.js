"use strict";

/**
 *  post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    try {
      const job = await strapi.query("api::post.post").findOne({
        where: { slug },
        populate: { categories: true, company: true, post_settings: true },
      });
      if (job) {
        ctx.body = job;
      } else {
        ctx.status = 404;
      }
      console.log(job);
    } catch (err) {
      ctx.body = err;
    }
  },
}));
