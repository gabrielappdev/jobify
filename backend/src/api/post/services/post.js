"use strict";
const moment = require("moment");
/**
 * post service.
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::post.post", ({ strapi }) => ({
  async unpublish(...args) {
    try {
      const response = await strapi.db.query("api::post.post").updateMany({
        where: {
          active: true,
          expiration_date: {
            $lt: moment().endOf("day").toDate(),
          },
        },
        data: {
          active: false,
        },
      });
      console.log("Number of jobs updated: ", response.count);
    } catch (error) {
      console.log(error);
    }
  },
}));
