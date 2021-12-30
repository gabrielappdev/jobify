module.exports = {
  routes: [
    {
      method: "GET",
      path: "/job/:slug",
      handler: "post.findBySlug",
    },
  ],
};
