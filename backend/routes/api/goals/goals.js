const goalsController = require('../../../controllers/goalsController')

module.exports = async (app, opts) => {
    app.get('/', {
        onRequest: [app.jwtauthenticate]
    }, goalsController.getGoals)
    app.post('/', {
        onRequest: [app.jwtauthenticate]
    }, goalsController.postGoal)
    app.put('/', {
        onRequest: [app.jwtauthenticate]
    }, goalsController.updateGoal)
    app.delete('/:id', {
        onRequest: [app.jwtauthenticate]
    }, goalsController.deleteGoal)
    app.get('/:id', {
        onRequest: [app.jwtauthenticate]
    }, goalsController.getGoal)
}