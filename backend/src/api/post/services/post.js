"use strict";
const moment = require("moment");
/**
 * post service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

const attachPostLength = (posts) => {
  return posts.map((post) => ({
    ...post,
    company: { ...post.company, posts: post.company.posts.length },
  }));
};

module.exports = createCoreService("api::post.post", ({ strapi }) => ({
  async unpublish(...args) {
    try {
      const response = await strapi.db.query("api::post.post").updateMany({
        where: {
          active: true,
          expiration_date: {
            $lt: moment().endOf("day").toDate(),
          },
        },
        data: {
          active: false,
        },
      });
      return response;
    } catch (error) {
      console.error("Error unpublishing post: ", error);
    }
  },
  async getRelatedPosts(slug) {
    try {
      const currentJob = await strapi.db
        .query("api::post.post")
        .findOne({ where: { slug }, populate: { categories: true } });
      if (currentJob) {
        const relatedPosts = await strapi.db.query("api::post.post").findMany({
          where: {
            active: true,
            $or: Array.from(currentJob.categories).map(
              ({ slug: category }) => ({
                categories: {
                  slug: category,
                },
              })
            ),
            $not: {
              slug: currentJob.slug,
            },
          },
          populate: [
            "categories",
            "company.profile_picture",
            "company.posts",
            "post_settings",
          ],
          limit: 5,
        });
        return attachPostLength(relatedPosts);
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting related jobs of a post: ", error);
      throw new Error(error);
    }
  },
  async getAllActivePosts() {
    try {
      const posts = await strapi.db.query("api::post.post").findMany({
        where: {
          active: true,
        },
        limit: 100000,
        populate: [
          "categories",
          "company.profile_picture",
          "company.posts",
          "post_settings",
        ],
      });
      return attachPostLength(posts);
    } catch (error) {
      console.error("Error fetching all active posts: ", error);
      throw new Error(error);
    }
  },
  async getFeaturedJobs() {
    try {
      const posts = await strapi.db.query("api::post.post").findMany({
        where: {
          active: true,
          post_settings: {
            featured: true,
          },
        },
        limit: 10,
        populate: [
          "categories",
          "company.profile_picture",
          "company.posts",
          "post_settings",
        ],
      });
      return attachPostLength(posts);
    } catch (error) {
      console.error("Error fetching all active posts: ", error);
      throw new Error(error);
    }
  },
  async getOtherPosts() {
    try {
      const posts = await strapi.db.query("api::post.post").findMany({
        where: {
          active: true,
          post_settings: {
            featured: false,
          },
        },
        limit: 50,
        populate: [
          "categories",
          "company.profile_picture",
          "company.posts",
          "post_settings",
        ],
      });
      return attachPostLength(posts);
    } catch (error) {
      console.error("Error fetching all active posts: ", error);
      throw new Error(error);
    }
  },
}));
