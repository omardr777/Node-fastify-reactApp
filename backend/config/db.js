const mongoose = require('mongoose');

exports.connectToDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log(`
        connected to : ${connect.connection.host}
        `)
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}