"use strict";

const { defaultsDeep, isEmpty } = require("lodash/fp");
const session = require("koa-session");

const defaultConfig = {
  client: "cookie",
  key: "strapi.sid",
  prefix: "strapi:sess:",
  ttl: 864000000,
  rolling: false,
  secretKeys: ["mySecretKey1", "mySecretKey2"],
  cookie: {
    path: "/",
    httpOnly: true,
    maxAge: 864000000,
    rewrite: true,
    signed: false,
  },
};

module.exports = (userConfig, { strapi }) => {
  if (!isEmpty(userConfig.client) && userConfig.client !== "cookie") {
    throw new Error(
      "The session middleware only handles the `cookie` client. Please update your config."
    );
  }

  const config = defaultsDeep(defaultConfig, userConfig);
  config.client = "cookie"; // forces cookie store

  strapi.server.app.keys = config.secretKeys;
  strapi.server.use(session(config, strapi.server.app));
  strapi.server.use((ctx, next) => {
    ctx.state = defaultsDeep({ session: {} }, ctx.state);

    return next();
  });
};
