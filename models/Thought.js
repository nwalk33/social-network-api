const { Schema, model } = require('mongoose');

const ReactionSchema = require('./Reaction');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 250
        },
        username: {
            type: String,
            required: true,
        },
        dateCreated: {
            type: Date,
            default: Date.now,
            get: (createDateStamp) => moment(createDateStamp).format('MM/DD/YYY [at] HH:MM: a')
        },
        reactions: [ ReactionSchema ],
    },
    {
        toObject: {
            getters: true,
            virtuals: true,
        },
        toJSON: {
            getters:true,
            virtuals: true
        }
    }
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;