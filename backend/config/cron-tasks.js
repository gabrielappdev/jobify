module.exports = {
  // every 10 minutes - checks if there is a expired post
  "* */10 * * * *": async ({ strapi }) => {
    const { count } = await strapi.service("api::post.post").unpublish();
    if (count) {
      console.warn(`[CRON - Unpublish Posts] - ${count} posts was unpublished`);
    }
  },
  // everyday at midnight - delete all notifications that was created 30 days and was seen
  "* 0 0 * * *": async ({ strapi }) => {
    const { count } = await strapi
      .service("api::notification.notification")
      .clear();
    if (count) {
      console.warn(
        `[CRON - Delete Notifications] - ${count} notifications was delete`
      );
    }
  },
};
