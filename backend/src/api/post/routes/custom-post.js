module.exports = {
  routes: [
    {
      method: "GET",
      path: "/jobs/:slug",
      handler: "post.findBySlug",
    },
  ],
};
