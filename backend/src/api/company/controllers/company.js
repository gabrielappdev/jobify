"use strict";

/**
 *  company controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::company.company", ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    try {
      const company = await strapi.query("api::company.company").findOne({
        where: { slug },
        populate: { profile_picture: true, posts: true },
      });
      if (company) {
        ctx.body = company;
      } else {
        ctx.status = 404;
      }
    } catch (err) {
      ctx.body = err;
    }
  },
  async featuredCompanies(ctx) {
    try {
      const companies = await strapi
        .service("api::company.company")
        .setFeaturedCompanies();
      ctx.body = companies;
    } catch (error) {
      ctx.body = error;
    }
  },
}));
