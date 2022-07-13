const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/swagger/index.html",
    "/chuck",
    "/swapi",
    "/search",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7272',
        secure: false
    });

    app.use(appProxy);
};
