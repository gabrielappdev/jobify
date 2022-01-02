"use strict";
const moment = require("moment");
const slugify = require("slugify");
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
        populate: [
          "categories",
          "company.profile_picture",
          "company.posts",
          "post_settings",
          "tags",
        ],
      });
      if (job) {
        const templateData = await strapi
          .service("api::global.global")
          .getTemplateData();
        const relatedJobs = await strapi
          .service("api::post.post")
          .getRelatedPosts(slug);
        ctx.body = {
          job: {
            ...job,
            company: { ...job.company, posts: job.company.posts.length },
            relatedJobs,
          },
          templateData,
        };
      } else {
        ctx.status = 404;
      }
    } catch (err) {
      ctx.body = err;
    }
  },
  async getRelatedPosts(ctx) {
    const { slug } = ctx.params;
    if (!slug) {
      return ctx.status(404);
    }
    try {
      const relatedPosts = await strapi
        .service("api::post.post")
        .getRelatedPosts(slug);
      if (!relatedPosts) {
        ctx.status = 404;
      } else {
        ctx.body = relatedPosts;
      }
    } catch (error) {
      ctx.body = error;
    }
  },
  async create(ctx) {
    const company = await strapi.query("api::company.company").findOne({
      where: { id: ctx.request.body.data.company },
      populate: { users_permissions_user: true },
    });
    ctx.request.body.data = {
      ...ctx.request.body.data,
      expiration_date: moment().add(7, "days").endOf("day").toDate(),
      slug: `${company.slug}-${slugify(ctx.request.body.data.title)}`,
    };
    const response = await super.create(ctx);
    if (response?.data?.id) {
      const completePost = await strapi.query("api::post.post").findOne({
        where: { id: response.data.id },
        populate: {
          company: {
            users_permissions_user: true,
          },
          categories: true,
        },
      });

      const user = company.users_permissions_user;
      const categories = completePost.categories;

      try {
        await strapi.service("api::notification.notification").create({
          title: `New Job at ${company.name} - ${response.data.attributes.title}`,
          content: response.data.attributes.description
            .substr(0, 20)
            .concat("..."),
          url: `/jobs/${response.data.attributes.slug}`,
          users_permissions_user: user.id,
          expiration_date: response.data.attributes.expiration_date,
          user,
          categories,
        });
      } catch (error) {
        console.log("after post created error: ", error);
      }
    }

    return response;
  },
  async getAllActivePosts(ctx) {
    try {
      const posts = await strapi.service("api::post.post").getAllActivePosts();
      ctx.body = posts;
    } catch (error) {
      ctx.body = error;
    }
  },
}));
