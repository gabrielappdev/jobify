"use strict";

/**
 * order service.
 */

const _ = require("lodash");

const { createCoreService } = require("@strapi/strapi").factories;

const { stripe } = require("../../../../config/stripe");

const utils = require("@strapi/utils");
const { ApplicationError } = utils.errors;

const getTotalValue = (postSettings = {}, prices = {}) => {
  const totalAdditionalPrice = _.keys(postSettings).reduce((acc, key) => {
    acc += !!postSettings[key] ? Number(prices[key]) : 0;
    return acc;
  }, 0);

  return (prices.price + totalAdditionalPrice) * 100;
};

module.exports = createCoreService("api::order.order", ({ strapi }) => ({
  async createPaymentIntent(postObject) {
    const globalObject = await strapi.db
      .query("api::global.global")
      .findOne({ id: 1 });
    const prices = _.pick(globalObject, [
      "price",
      "highlight",
      "featured",
      "pinned",
      "display_logo",
    ]);
    const totalValue = getTotalValue(postObject.post_settings, prices);
    try {
      const paymentIntentResponse = await stripe.paymentIntents.create({
        amount: totalValue,
        currency: "usd",
      });
      return paymentIntentResponse;
    } catch (error) {
      throw new ApplicationError(error.raw.message);
    }
  },
  async getClientSecret(paymentIntentId) {
    if (!paymentIntentId) {
      throw new ApplicationError("Missing payment intent id");
    }
    try {
      const response = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (!response.client_secret) {
        throw new ApplicationError("Client secret not found");
      }
      return response.client_secret;
    } catch (error) {
      throw new ApplicationError(error.raw.message);
    }
  },
  async finishPurchase(user, job, orderId) {
    try {
      const order = await strapi.db.query("api::order.order").update({
        where: {
          id: orderId,
        },
        data: {
          post: job.id,
          status: "complete",
        },
      });

      const newJobFlow = await strapi.db
        .query("api::create-job-flow.create-job-flow")
        .create({
          data: {
            users_permissions_user: user.id,
            createdCompany: true,
            step: 2,
          },
        });

      await strapi.query("plugin::users-permissions.user").update({
        where: {
          id: user.id,
        },
        data: {
          create_job_flow: newJobFlow.id,
        },
      });

      return { order, job, create_job_flow: newJobFlow };
    } catch (error) {
      throw new ApplicationError(error.message ?? error.error);
    }
  },
}));
