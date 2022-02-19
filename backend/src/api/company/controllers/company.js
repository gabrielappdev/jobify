"use strict";
const _ = require("lodash");

/**
 *  company controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::company.company", ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    if (!slug) {
      ctx.status = 404;
    } else {
      try {
        const company = await strapi.query("api::company.company").findOne({
          where: { slug },
          populate: ["profile_picture", "social_link"],
        });
        const jobs = await strapi
          .service("api::company.company")
          .getLatestJobs(slug);
        const templateData = await strapi
          .service("api::global.global")
          .getTemplateData();
        if (company) {
          ctx.body = { company: { ...company, posts: jobs }, templateData };
        } else {
          ctx.status = 404;
        }
      } catch (err) {
        ctx.body = err;
      }
    }
  },
  async featuredCompanies(ctx) {
    try {
      const companies = await strapi
        .service("api::company.company")
        .setFeaturedCompanies();
      ctx.body = companies;
    } catch (error) {
      return { error: error.message };
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
      return { error: error.message };
    }
  },
  async getCompanyPage(ctx) {
    const { slug } = ctx.params;
    if (!slug) {
      ctx.status = 404;
    } else {
      try {
        const company = await strapi.query("api::company.company").findOne({
          where: { slug },
          populate: ["profile_picture", "social_link"],
        });
        const jobs = await strapi
          .service("api::company.company")
          .getLatestJobs(slug);
        const templateData = await strapi
          .service("api::global.global")
          .getTemplateData();
        const featuredCompanies = await strapi
          .service("api::company.company")
          .setFeaturedCompanies();
        ctx.body = {
          company: { ...company, jobs, posts: jobs.length },
          templateData,
          featuredCompanies,
        };
      } catch (error) {
        return { error: error.message };
      }
    }
  },
  async _verifySlug(ctx) {
    const data = JSON.parse(ctx.request.body.data);
    const slug = data.slug;
    const companiesWithSameSlug = await strapi.db
      .query("api::company.company")
      .findMany({
        where: {
          slug: {
            $containsi: slug,
          },
        },
      });
    let newSlug = slug;
    if (companiesWithSameSlug.length) {
      newSlug += `-${companiesWithSameSlug.length + 1}`;
      ctx.request.body.data = JSON.stringify({ ...data, slug: newSlug });
    }
  },
  async create(ctx) {
    await this._verifySlug(ctx);
    const response = await super.create(ctx);
    ctx.body = response;
    if (response?.data?.id) {
      const user = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({
          where: {
            id: ctx.state.user.id,
          },
          populate: ["create_job_flow"],
        });
      const flowContent = {
        createdCompany: true,
        step: 2,
      };
      if (!user.create_job_flow) {
        await strapi.db.query("api::create-job-flow.create-job-flow").create({
          data: {
            users_permissions_user: ctx.state.user.id,
            ...flowContent,
          },
        });
      } else {
        await strapi.db.query("api::create-job-flow.create-job-flow").update({
          where: { id: user.create_job_flow.id },
          data: {
            ...flowContent,
          },
        });
      }
      const updateResponse = await strapi.db
        .query("api::company.company")
        .update({
          where: { id: response.data.id },
          data: {
            users_permissions_user: ctx.state.user.id,
          },
          populate: [
            "users_permissions_user",
            "profile_picture",
            "users_permissions_user.create_job_flow",
          ],
        });
      ctx.body = {
        ...updateResponse,
        users_permissions_user: _.omit(updateResponse.users_permissions_user, [
          "password",
          "resetPasswordToken",
          "confirmationToken",
        ]),
      };
    }
  },
  async update(ctx) {
    const user = await strapi
      .query("plugin::users-permissions.user")
      .findOne({ where: { id: ctx.state.user.id }, populate: ["company"] });
    if (
      user.company?.id &&
      ctx.request.params.id &&
      Number(ctx.request.params.id) === user?.company?.id
    ) {
      ctx.request.query = { populate: ["profile_picture", "social_link"] };
      if (_.keys(ctx.request.files).includes("files.profile_picture")) {
        ctx.request.files.files = [ctx.request.files["files.profile_picture"]];
        await strapi.controller("plugin::upload.content-api").upload(ctx);
        const fileId = _.first(ctx.body)?.id;
        ctx.request.body.data = JSON.stringify({
          ...JSON.parse(ctx.request.body.data),
          profile_picture: fileId,
        });
        ctx.request.files = {};
      }
      await this._verifySlug(ctx);
      const response = await super.update(ctx);
      ctx.body = response;
    } else {
      ctx.status = 403;
      ctx.body = {
        error: "You are unauthorized to perform this action!",
      };
    }
  },
}));
