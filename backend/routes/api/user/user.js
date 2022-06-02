
const userController = require("../../../controllers/userController");
module.exports = async (app, opts) => {

    app.post('/', userController.Risgter)
    app.post('/login', userController.loginUser)
}