const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"]
    }, //
    password: {
        type: String, required: [true, "Please enter a passwords"]
    },
    email: {
        type: String, required: [true, "Please enter"], unique: true
    }
}, { timestamps: true })


module.exports = mongoose.model('User', userSchema)