'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const colors = require('colors')
const mongoDB = require('./config/db')
const fs = require('fs')
mongoDB.connectToDB()

module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.register(require('fastify-cors'), {
    origin: '*',
    methods: ['POST', "GET", "DELETE", "PUT"],

  })
  // Do not touch the following lines
  fastify.decorateRequest('fastify', fastify);
  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(require('fastify-formbody'))
  fastify.register(require('fastify-jwt'),
    { secret: process.env.JWT_SECRET })
  // fastify.register(require('./plugins/authJwt'))


  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
  if (process.env.NODE_ENV === 'production') {
    fastify.register(require("fastify-static"), {
      root: path.join(__dirname, "../frontend/build/"),
    });
    fastify.setNotFoundHandler(function (req, reply) {
      const stream = fs.createReadStream(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'))
      reply.type('text/html').send(stream)
    })
  } else {
    fastify.setNotFoundHandler(function (req, reply) {
      reply.send({ message: 'You are in dev mode' })
    })
  }


}
