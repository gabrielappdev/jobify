"use strict";

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
}));
