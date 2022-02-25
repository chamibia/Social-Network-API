const { Thought, User } = require("../models");

const thoughtController = {
  getThoughts(req, res) {
    Thought.find()
      .sort({ createdAt: -1 })
      .then((dbThought) => {
        res.json(dbThought);
      });
  },
  
};

module.exports = thoughtController;
