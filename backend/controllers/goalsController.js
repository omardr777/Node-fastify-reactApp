const Goal = require('../modules/goalModule')

const User = require('../modules/userModule')



exports.getGoals = async (req, res) => {
    try {
        return await Goal.find({ user: req.user.id })
    } catch (err) {
        console.error(err)
    }
}

exports.postGoal = async (req, res) => {
    try {
        let newGoal = await Goal.create({ text: req.body.text, user: req.user.id, date: req.body.date, done: req.body.done });
        return newGoal
    } catch (err) {
        console.error(err)
    }
}

exports.getGoal = async (req, res) => {
    const { id } = req.params
    const goal = await Goal.findById(id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }
    res.send(goal)
}


exports.updateGoal = async (req, res) => {
    const goal = await Goal.findById(req.body.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.body.id, req.body, {
        new: true,
    })
    console.log(updatedGoal)
    res.status(200).send(updatedGoal)
    // const { id } = req.params
    // const { text } = req.body

    // const user = await User.findById(req.user.id)

    // if (!uesr) {
    //     res.status(400);
    //     throw new Error('You must login')
    // }

    // const goal = await Goal.findById(id);
    // if (!goal) {
    //     res.status(400)
    //     throw new Error(`Goal ${id} not found`)
    // }
    // if (goal.user.toStrin() !== req.user.id) {
    //     res.status(401);
    //     throw new Error('User not authorzed')
    // }
    // const updatedGoal = await Goal.findByIdAndUpdate(id, { text })
    // res.status(200).send(updatedGoal)

}


exports.deleteGoal = async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    // Check for user
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    // Make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove()

    res.status(200).send({ id: req.params.id })
    // const { id } = req.params
    // try {
    //     await Goal.findByIdAndDelete(id)
    //     return { message: `Goal with id ${id} deleted successfully` }
    // } catch (err) {
    //     console.error(err)
    // }
}
