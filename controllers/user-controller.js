const {User} = require('../models')

const userContoller = {

    getUsers(req, res) {
        User.find()
        .select('-__v')
        .then(userData => {
            res.json(userData)
        })
    },

    createUser(req, res) {
        User.create(req.body)
        .then(userData => {
            res.json(userData)
        })
    }
}

module.exports = userContoller