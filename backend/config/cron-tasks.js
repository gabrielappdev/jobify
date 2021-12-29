module.exports = {
  "* * 1 * * *": async ({ strapi }) => {
    await strapi.service("api::post.post").unpublish();
  },
};
