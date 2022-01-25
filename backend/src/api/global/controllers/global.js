"use strict";
const _ = require("lodash");

/**
 *  global controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { pusher, asyncDispatchMessages } = require("../../../../config/pusher");

module.exports = createCoreController("api::global.global", ({ strapi }) => ({
  async update(ctx) {
    const response = await super.update(ctx);
    ctx.body = response;
    if (ctx.request.body?.data?.notification) {
      asyncDispatchMessages(
        [
          (created_at) =>
            pusher.trigger(
              "jobify-notifications",
              "actions/update::global-notification",
              {
                message: {
                  action: "actions/update::global-notification",
                  created_at,
                },
              }
            ),
        ],
        "",
        "Pusher notification for Global notification update dispatched"
      );
    }
  },
  async getIndexData(ctx) {
    try {
      const data = await strapi.service("api::global.global").getIndexData();
      ctx.body = data;
    } catch (error) {
      console.error("Error getting home data: ", error);
      return { error: error.message };
    }
  },
  async getCurrentUser(ctx) {
    try {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unathenticated();
      }
      const currentUser = await strapi
        .query("plugin::users-permissions.user")
        .findOne({
          where: {
            id: user.id,
          },
          populate: [
            "role",
            "roles",
            "company",
            "company.profile_picture",
            "company.social_link",
            "create_job_flow",
            "create_job_flow.order",
            "social_link",
          ],
        });
      ctx.body = _.omit(currentUser, [
        "password",
        "resetPasswordToken",
        "confirmationToken",
      ]);
    } catch (error) {
      return { error: error.message };
    }
  },
}));
