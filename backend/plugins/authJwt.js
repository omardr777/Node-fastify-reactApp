const fp = require('fastify-plugin');
const User = require('../modules/userModule')
module.exports = fp(async (fastify, opts, next) => {

    // fastify.decorate('jwtauthentication', async (req, res) => {
    //     try {
    //         await req.jwtVerify()
    //     } catch (err) { console.log(err) }
    // })

    fastify.decorate("jwtauthenticate", async function (request, reply) {
        try {
            await request.jwtVerify()
        } catch (err) {
            reply.send(err)
        }
    })

    next();
})