const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    
    { 
        thought: {
            type: String,
            required: true,
            //Must be between 1 and 280 characters
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateformat(createdAtVal)

        },
        username: {
            type: String,
            required: true
            //user that created the thought

        },
        reactions: {
            //Array of nested documents created with the reactionSchema

        },
        
            toJSON: {
              virtuals: true,
            },
            id: false,
          
    
})

//virtual called reactionCount that retrieves the length of the thought's reactions array field on query
thoughtSchema.virtual('reactionCount').get(function () {
    return this.thought.length;
  });

const Thought = model('Thought', thoughtSchema)

module.exports = Thought;
    