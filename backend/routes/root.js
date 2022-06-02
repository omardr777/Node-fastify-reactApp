// 'use strict'
// const path = require('path')
// const fs = require('fs')

module.exports = async function (fastify, opts) {
    //     if (process.env.NODE_ENV === 'production') {
    //         fastify.register(require("fastify-static"), {
    //             root: path.join(__dirname, "../../frontend/build/"),
    //         });
    //         fastify.get('/', async function (request, reply) {
    //             const stream = fs.createReadStream(path.resolve(__dirname, '../..', 'frontend', 'build', 'index.html'))
    //             reply.type('text/html').send(stream)

    //         })
    //     } else {
    //         fastify.get('/', async function (request, reply) {
    //             return { root: true }
    //         })
    //     }

    //     // if (process.env.NODE_ENV === 'production') {
    //     //     fastify.register(require("fastify-static"), {
    //     //         root: path.join(__dirname, "../../frontend/build/"),
    //     //     });
    //     //     fastify.route({
    //     //         method: 'GET',
    //     //         url: '*',
    //     //         handler: function (request, reply) {
    //     //             const stream = fs.createReadStream(path.resolve(__dirname, '../..', 'frontend', 'build', 'index.html'))
    //     //             reply.type('text/html').send(stream)
    //     //         }
    //     //     })









    //     //     // fastify.get('*', async function (request, reply) {
    //     //     //   const stream = fs.createReadStream(path.resolve(__dirname, '../..', 'frontend', 'build', 'index.html'))
    //     //     //   reply.type('text/html').send(stream)

    //     //     // })





    //     // } else {
    //     //     fastify.get('/', async function (request, reply) {
    //     //         return { root: true }
    //     //     })
    //     // }

}
