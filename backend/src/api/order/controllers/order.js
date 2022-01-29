"use strict";

/**
 *  order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async createPaymentIntent(ctx) {
    try {
      if (!ctx.request.body.data || !ctx.request.body.data?.title) {
        return { error: "Invalid job" };
      }

      const fetchedUser = await strapi
        .query("plugin::users-permissions.user")
        .findOne({
          where: { id: ctx.state.user.id },
          populate: ["create_job_flow", "create_job_flow.order"],
        });
      const paymentIntent = await strapi
        .service("api::order.order")
        .createPaymentIntent(
          {
            ...ctx.request.body.data,
          },
          fetchedUser?.create_job_flow?.order?.payment_intent_id
        );

      const user = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({
          where: { id: ctx.state.user.id },
          populate: ["create_job_flow"],
        });

      const { amount: total_in_cents, id: payment_intent_id } = paymentIntent;

      const order = await strapi.db.query("api::order.order").create({
        data: {
          total_in_cents,
          payment_intent_id,
          users_permissions_user: user.id,
          status: "pending",
        },
      });

      const userJobFlowId = user.create_job_flow.id;

      const updatedJobFlow = await strapi.db
        .query("api::create-job-flow.create-job-flow")
        .update({
          where: { id: userJobFlowId },
          data: {
            values: JSON.stringify(ctx.request.body.data),
            step: 3,
            order: order.id,
          },
        });

      ctx.body = { order, create_job_flow: updatedJobFlow };
    } catch (error) {
      return { error: error?.message ?? error?.error };
    }
  },
  async getClientSecret(ctx) {
    try {
      const user = await strapi.db
        .query("plugin::users-permissions.user")
        .findOne({
          where: { id: ctx.state.user.id },
          populate: ["create_jow_flow", "create_job_flow.order"],
        });
      const clientSecret = await strapi
        .service("api::order.order")
        .getClientSecret(user.create_job_flow.order.payment_intent_id);
      ctx.body = {
        clientSecret,
      };
    } catch (error) {
      return { error: error.message };
    }
  },
  async finishPurchase(ctx) {
    const orderId = ctx.request.body?.data?.orderId;
    if (!orderId) {
      return { error: "Unable to finish this order" };
    }
    try {
      const { order, job } = await strapi
        .service("api::order.order")
        .finishPurchase(ctx.state.user, orderId);
      ctx.body = {
        order,
        job,
      };
    } catch (error) {
      return { error: error?.message };
    }
  },
  async currentUserOrders(ctx) {
    const status = ctx.request.params.status ?? "all";
    let options = {
      users_permissions_user: ctx.state.user.id,
    };
    if (status !== "all") {
      options = {
        ...options,
        status,
      };
    }
    const orders = await strapi.db.query("api::order.order").findMany({
      where: { ...options },
      orderBy: {
        createdAt: "desc",
      },
      populate: ["users_permissions_user", "post"],
    });

    ctx.body = orders.length
      ? {
          orders: orders.map((order) => ({
            ...order,
            total: order.total_in_cents / 100,
          })),
        }
      : { orders: [] };
  },
}));
