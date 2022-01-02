module.exports = {
  routes: [
    {
      method: "GET",
      path: "/category/:slug",
      handler: "category.findBySlug",
    },
  ],
};
