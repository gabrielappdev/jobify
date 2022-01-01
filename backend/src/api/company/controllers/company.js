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
        populate: { profile_picture: true },
      });
      const jobs = await strapi
        .service("api::company.company")
        .getLatestJobs(slug);
      if (company) {
        ctx.body = { ...company, posts: jobs };
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
  async latestJobs(ctx) {
    const { slug } = ctx.params;
    if (!slug) {
      return (ctx.status = 404);
    }
    try {
      const jobs = await strapi
        .service("api::company.company")
        .getLatestJobs(slug);
      ctx.body = jobs;
    } catch (error) {
      ctx.body = error;
    }
  },
}));
