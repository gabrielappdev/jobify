"use strict";

/**
 * notification service.
 */

const { createCoreService } = require("@strapi/strapi").factories;
const { pusher, asyncDispatchMessages } = require("../../../../config/pusher");
const _ = require("lodash");
const moment = require("moment");

const getPostCreateNotification = async (params = {}, users = []) => {
  const notificationData = {
    title: params.title,
    url: params.url,
  };
  await asyncDispatchMessages(
    [
      users.map(({ id }) => {
        return () =>
          pusher.trigger("jobify-notifications", "actions/new-joba-alert", {
            message: {
              ...notificationData,
              user_id: id,
              action: "actions/new-joba-alert",
              created_at: moment().toDate("DD/MM/YYYY HH:ss"),
            },
          });
      }),
    ],
    `Start processing notifications for post ${params.title}`,
    `Notications created for ${users.length} users for post ${params.title}`
  );
};

const getPostAuthorCreatorNotification = async (params = {}, user) => {
  await asyncDispatchMessages(
    [
      () =>
        pusher.trigger("jobify-notifications", "actions/job-created", {
          message: {
            ...params,
            action: "actions/job-created",
          },
        }),
    ],
    "",
    `Notications created for post (${params.title}) - author ${user.email}`
  );
};

const handleNotifications = async (
  params,
  user = null,
  interestedUsers = []
) => {
  const requestParams = _.omit(params, [
    "user",
    "categories",
    "expiration_date",
  ]);
  if (interestedUsers.length) {
    await strapi.db.query("api::notification.notification").createMany({
      data: interestedUsers.map(({ id }) => ({
        ...requestParams,
        users_permissions_user: id,
      })),
    });
    await getPostCreateNotification(requestParams, interestedUsers);
  }

  if (user) {
    await strapi.entityService.create("api::notification.notification", {
      data: requestParams,
    });

    await getPostAuthorCreatorNotification(
      {
        title: `Job posts - ${user.email} your post ${
          params.title
        } was created and is active until ${moment(
          params.expiration_date
        ).format("DD/MM/YYYY HH:ss")}`,
        user_id: user.id,
        created_at: moment().toDate("DD/MM/YYYY HH:ss"),
      },
      user
    );
  }
};

module.exports = createCoreService(
  "api::notification.notification",
  ({ strapi }) => ({
    async create(params = {}) {
      const user = params.user; // author user
      const postCategories = params.categories;
      const interestedUsers = await strapi.db
        .query("plugin::users-permissions.user")
        .findMany({
          select: ["id"],
          where: {
            $or: Array.from(postCategories).map((category) => ({
              categories: {
                title: {
                  $eq: category.title,
                },
              },
            })),
            id: {
              $not: user.id,
            },
          },
        });

      await handleNotifications(params, user, interestedUsers);
    },
    async clear() {
      const now = moment();
      try {
        const response = await strapi.db
          .query("api::notification.notification")
          .deleteMany({
            where: {
              readed: true,
              updatedAt: {
                $lt: now.toDate(),
              },
            },
          });
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  })
);
