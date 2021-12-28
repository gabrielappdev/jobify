module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '674632c7471cbe50d03b93e5643eea4a'),
  },
});
