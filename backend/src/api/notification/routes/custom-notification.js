module.exports = {
  routes: [
    {
      method: "GET",
      path: "/current-user/notifications",
      handler: "notification.getCurrentUserNotifications",
    },
    {
      method: "PUT",
      path: "/current-user/notifications/read",
      handler: "notification.readNotification",
    },
    {
      method: "PUT",
      path: "/current-user/notifications/read-all",
      handler: "notification.readAllNotifications",
    },
    {
      method: "DELETE",
      path: "/current-user/notifications/delete/:id",
      handler: "notification.deleteNotification",
    },
    {
      method: "DELETE",
      path: "/current-user/notifications/delete-all",
      handler: "notification.deleteAllNotifications",
    },
  ],
};
