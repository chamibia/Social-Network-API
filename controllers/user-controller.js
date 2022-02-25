const {User} = require('../models')

const userContoller = {

    getUsers(req, res) {
        User.find()
        .select('-__v')
        .then(userData => {
            res.json(userData)
        })
    },
    getUserById ({params}, res) {
        User.findOne({_id: params.id})
        .populate({
            //thought and friend data
            select: '-__v'
        })
        .then(userData => {
            res.json(userData)
        })
    },
    //create user 
    createUser(req, res) {
        User.create(req.body)
        .then(userData => {
            res.json(userData)
        })
    },
    //update user by id 
   updateUser({params, body}, res) {
       User.findByIdAndUpdate({
           _id: params.id }, body, {new: true, runValidators: true})
           .then(userData => {
               if(!userData) {
                   res.status(404).json({message: 'No user found with this id'})
                   return;
               }
               res.json(userData)
           })
           .catch(err => res.status(400).json(err))
       },
       //delete pizza
       deleteUser({params}, res) {
           User.findOneAndDelete({_id: params.id})
           .then(userData => {
               if(!userData) {
                   res.status(404).json({
                       message: 'No user found with this id!'
                   })
                   return;
               }
               res.json(userData)
           })
           .catch(err => res.status(400).json(err))
       }

}

module.exports = userContoller