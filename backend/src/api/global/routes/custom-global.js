module.exports = {
  routes: [
    {
      method: "GET",
      path: "/index",
      handler: "global.getIndexData",
    },
    {
      method: "GET",
      path: "/current-user",
      handler: "global.getCurrentUser",
    },
  ],
};
