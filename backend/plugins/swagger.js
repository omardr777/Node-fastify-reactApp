const fp = require('fastify-plugin');

module.exports = fp((fastify, opts, next) => {

    fastify.register(require('fastify-swagger'), {
        exposeRoute: true,
        routePrefix: '/docs',
        swagger: {
            info: { title: 'fastify-api' }
        }
    })

    next();
})