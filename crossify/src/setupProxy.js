const { createProxyMiddleware } = require("http-proxy-middleware");
const object = require("./config/default.json");
const BackendURL = object.BackendURL;
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: BackendURL,
      changeOrigin: true,
    })
  );
};
