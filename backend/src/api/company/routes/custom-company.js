module.exports = {
  routes: [
    {
      method: "GET",
      path: "/company/:slug",
      handler: "company.getCompanyPage",
    },
    {
      method: "GET",
      path: "/featured-companies",
      handler: "company.featuredCompanies",
    },
  ],
};
