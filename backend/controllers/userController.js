const User = require('../modules/userModule')
const bcrypt = require('bcryptjs')
const fastify = require('../app')

exports.Risgter = async (req, res) => {
    const { name, password, email } = req.body;
    if (!name || !password || !email) {
        res.status(401);
        throw new Error("please enter required fields tt")
    }
    const user = await User.findOne({ email })
    if (user) {
        res.status(401);
        throw new Error("Email already exist")
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create the user:
    const newUser = await User.create({ name, email, password: hashedPassword })

    if (newUser) {
        res.status(201).send({ token: generateToken(req, { "id": newUser._id }) })
    } else {
        throw new Error("User already exist")
    }

}



exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(401)
        throw new Error('please enter requeid feilds')
    }
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).send({ token: generateToken(req, { "id": user._id }), name: user.name })
    } else {
        res.status(400)
        throw new Error('please enter requeiddfsdf')
    }
}

const generateToken = (req, payload) => {
    console.log("\n\n\n\n------payload", payload, "payload-----------\n\n\n\n")
    return req.fastify.jwt.sign(payload, { expiresIn: '1d' })
}