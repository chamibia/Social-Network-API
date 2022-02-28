const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thought: {
      type: String,
      required: true,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now
      // get: (createdAtVal) => dateformat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
      //user that created the thought
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false,
  }
);

//virtual called reactionCount that retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
