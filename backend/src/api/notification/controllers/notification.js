"use strict";

/**
 *  notification controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::notification.notification",
  ({ strapi }) => ({
    async getCurrentUserNotifications(ctx) {
      const currentUser = ctx.state.user.id;
      const notifications = await strapi.db
        .query("api::notification.notification")
        .findMany({
          where: {
            users_permissions_user: currentUser,
          },
          orderBy: { createdAt: "DESC" },
        });
      ctx.body = {
        notifications,
      };
    },
    async readNotification(ctx) {
      const notificationId = Number(ctx.request.body.notificationId);
      const userNotifications = await strapi
        .query("api::notification.notification")
        .findMany({
          where: { users_permissions_user: ctx.state.user.id },
        });
      const notificationObject = await strapi.db
        .query("api::notification.notification")
        .findOne({
          id: notificationId,
        });
      if (!notificationObject) {
        ctx.status = 404;
        return;
      }
      const updatedNotification = await strapi.db
        .query("api::notification.notification")
        .update({
          where: { id: notificationId },
          data: {
            readed: true,
          },
        });

      ctx.body = {
        notification: updatedNotification,
      };
    },
    async readAllNotifications(ctx) {
      const notifications = await strapi.db
        .query("api::notification.notification")
        .findMany({
          where: {
            readed: false,
            users_permissions_user: ctx.state.user.id,
          },
        });
      let count = 0;
      for (let notification of notifications) {
        await strapi.db.query("api::notification.notification").update({
          where: { id: notification.id },
          data: {
            readed: true,
          },
        });
        count++;
      }
      ctx.body = {
        notifications: count,
      };
    },
    async deleteNotification(ctx) {
      const notificationId = Number(ctx.request.params.id);
      const userNotifications = await strapi
        .query("api::notification.notification")
        .findMany({
          where: { users_permissions_user: ctx.state.user.id },
        });
      const notificationObject = await strapi.db
        .query("api::notification.notification")
        .findOne({
          id: notificationId,
        });
      if (!notificationObject) {
        ctx.status = 404;
        return;
      }
      await strapi.db.query("api::notification.notification").delete({
        where: { id: notificationId },
      });

      ctx.status = 200;
    },
    async deleteAllNotifications(ctx) {
      const notifications = await strapi.db
        .query("api::notification.notification")
        .findMany({
          where: {
            users_permissions_user: ctx.state.user.id,
          },
        });
      let count = 0;
      for (let notification of notifications) {
        await strapi.db.query("api::notification.notification").delete({
          where: { id: notification.id },
          data: {
            readed: true,
          },
        });
        count++;
      }
      ctx.body = {
        notifications: count,
      };
    },
  })
);
