module.exports = {
  routes: [
    {
      method: "GET",
      path: "/tag/:slug",
      handler: "tag.findBySlug",
    },
  ],
};
