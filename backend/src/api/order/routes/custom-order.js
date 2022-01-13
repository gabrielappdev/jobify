module.exports = {
  routes: [
    {
      method: "POST",
      path: "/orders/create-payment-intent",
      handler: "order.createPaymentIntent",
    },
    {
      method: "GET",
      path: "/orders/get-client-secret",
      handler: "order.getClientSecret",
    },
    {
      method: "POST",
      path: "/orders/finish-purchase",
      handler: "order.finishPurchase",
    },
  ],
};
