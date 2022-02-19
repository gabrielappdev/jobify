module.exports = {
  routes: [
    {
      method: "GET",
      path: "/job/:slug",
      handler: "post.findBySlug",
    },
    {
      method: "GET",
      path: "/related-jobs/:slug",
      handler: "post.getRelatedPosts",
    },
    {
      method: "GET",
      path: "/jobs",
      handler: "post.getAllActivePosts",
    },
    {
      method: "GET",
      path: "/current-user/jobs",
      handler: "post.getUserPostsByActivity",
    },
  ],
};
