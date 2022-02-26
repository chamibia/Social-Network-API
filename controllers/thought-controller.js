const { Thought, User } = require("../models");

const thoughtController = {
  //get /api/thoughts all thoughts
  getThoughts(req, res) {
    Thought.find()
      .sort({ createdAt: -1 })
      .then((dbThought) => {
        res.json(dbThought);
      });
  },
  //GET /api/thoughts/:id to get a single thought by its _id
  getSingleThought({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .populate({ path: "reaction", select: "_v" })
      .select("_v")
      .then((dbThought) => {
        if (!dbThought) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }

        res.json(dbThought);
      });
  },
  //POST /api/thoughts to create a new thought, push the created thought's _id to the associated user's thoughts array field
  createThought({ body }, res) {
    Thought.create(body).then((dbThought) => {
      User.findByIdAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: dbThought._id } },
        { new: true }
      )
        .then((userData) => {
          if (!userData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
          }
          res.json(userData);
        })
        .catch((err) => res.json(err));
    })
  },
  updateThought

};

module.exports = thoughtController;
