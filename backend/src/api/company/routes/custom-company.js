module.exports = {
  routes: [
    {
      method: "GET",
      path: "/company/:slug",
      handler: "company.findBySlug",
    },
    {
      method: "GET",
      path: "/featured-companies",
      handler: "company.featuredCompanies",
    },
  ],
};
