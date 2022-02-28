const { User } = require("../models");

const userContoller = {
  getUsers(req, res) {
    User.find()
      .select("-__v")
      .then((userData) => {
        res.json(userData);
      });
  },
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate('friends')
      .populate('thoughts')
      .then((userData) => {
        res.json(userData);
      });
  },
  //create user
  createUser(req, res) {
    User.create(req.body).then((userData) => {
      res.json(userData);
    });
  },
  //update user by id
  updateUser({ params, body }, res) {
    User.findByIdAndUpdate(
      {
        _id: params.userId,
      },
      body,
      { new: true, runValidators: true }
    )
      .then((userData) => {
        if (!userData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },
  //delete pizza
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then((userData) => {
        if (!userData) {
          res.status(404).json({
            message: "No user found with this id!",
          });
          return;
        }
        res.json(userData);
      })
      .catch((err) => res.status(400).json(err));
  },

  addFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId }, 
        { $addToSet: { friends: req.params.friendId } },
        { new: true })
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },

    // remove friend from friend list
    removeFriend(req, res) {
      User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
        .then((dbUserData) => {
          if (!dbUserData) {
            return res.status(404).json({ message: 'No user with this id!' });
          }
          res.json(dbUserData);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    }
}

module.exports = userContoller;
