const { Thought, User } = require("../models");

const thoughtController = {
  //get /api/thoughts all thoughts
  getThoughts(req, res) {
    Thought.find({})
    .select("-__v")
      .sort({ _id: -1 })
      .then((dbThought) => {
        res.json(dbThought)
        .catch((err) => {
            res.status(400).json(err)
        })
      });
  },
  //get thought by id 
getSingleThought({params}, res) {
    Thought.findOne({_id: params.thoughtId})
    .populate({
        path: "reactions",
        select:"-_v",
    })
    .select("-_v")
    .then((dbThought) => {
        if(!dbThought) {
            res.status(404).json({
                message: "No thought found with this id!"
            })
            return;
        }
        res.json(dbThought)
    })
    .catch((err) => {
        res.status(400).json(err)
    })
},
//create a new thought, push thought's associated user 
createThought({ body }, res) {
    //find username first
    User.findOne({ username: body.username})
    .then((userData)=> {
        if(!userData) {
            res.status(404).json({
                message: "No user found with this username"
            })
            return;
        }
        Thought.create(body).then((dbThought) => {
            User.findOneAndUpdate(
                {username: body.username},
                {$push: {thoughts: dbThought._id}},
                {new: true}
            ).then((userData) => {
                res.json([dbThought, userData])
            })
    })
    })
    .catch((err) => res.status(400).json(err))
  },
  updateThought ({params, body}, res) {
      Thought.findOneAndUpdate({_id: params.thoughtId}, body, {
          new: true,
          runValidators: true
      })
      .then((dbThought) => {
          if(!dbThought) {
              res.status(404).json({
                  message: "No thought found with this id!",
              })
              return;
          }
          res.json(dbThought)

      })
      .catch((err) => res.json(err))
  },
  deleteThought({params}, res) {
      Thought.findOneAndDelete({_id: params.thoughtId})
      .then((deletedThought)=> {
          if(!deletedThought){
              return res.status(404)
              .json({message: "No thought found with this id!"})
          }
          res.json(deletedThought)
      })
      .catch((err) => res.json(err))
  },

  //add reaction
  addReaction({params, body}, res) {
      Thought.findOneAndUpdate (
          {_id: params.thoughtId},
          {$push: {reactions: body}},
          {new: true, runValidators: true}
      )
      .then((dbThought) => {
          if(!dbThought) {
              res.status(404).json({
                  message: "No thought found with this id!"
              })
              return
          }
          res.json(dbThought)
      })
      .catch((err) => res.json(err))
  }, 
  removeReaction({params}, res) {
      Thought.findOneAndUpdate (
          {_id: params.thoughtId},
          {$pull: {reactions: {reactionId: params.reactionId}}},
          {new: true}
      )
      .then((dbThought) => res.json(dbThought))
      .catch((err) => res.json(err))
  }

};

module.exports = thoughtController;
