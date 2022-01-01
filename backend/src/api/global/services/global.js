"use strict";

/**
 * global service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::global.global", ({ strapi }) => ({
  async getTemplateData() {
    try {
      const categories = await strapi.db
        .query("api::category.category")
        .findMany();
      const appData = await strapi.db.query("api::global.global").findOne({
        where: { id: 1 },
        populate: ["hero", "logo", "notification"],
      });
      const featuredCompanies = await strapi
        .service("api::company.company")
        .setFeaturedCompanies();

      return {
        appData,
        categories,
        featuredCompanies,
      };
    } catch (error) {
      console.error("Error getting the template data: ", error);
    }
  },
  async getIndexData() {
    try {
      const templateDate = await this.getTemplateData();

      const featuredJobs = await strapi
        .service("api::post.post")
        .getFeaturedJobs();
      const otherJobs = await strapi.service("api::post.post").getOtherPosts();

      return {
        ...templateDate,
        featuredJobs,
        otherJobs,
      };
    } catch (error) {
      console.error("Error getting the template data: ", error);
    }
  },
}));
