module.exports = {
  "* 30 * * * *": async ({ strapi }) => {
    await strapi.service("api::post.post").unpublish();
  },
};
