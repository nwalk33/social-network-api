// import chema, model, types from mongoose
const { Schema, model } = require('mongoose');
// import moment library
const moment = require('moment');
// import Reaction Schema
const ReactionSchema = require('./Reaction');

// create new instance of Schema
const ThoughtSchema = new Schema(
    {
        // thoughtText, string
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 250
        },
        // username, string
        username: {
            type: String,
            required: true,
        },
        // dateCreated
        dateCreated: {
            type: Date,
            default: Date.now,
            get: (createDateStamp) => moment(createDateStamp).format('MM/DD/YYY [at] HH:MM: a')
        },
        // use imported ReactionSchema
        reactions: [ ReactionSchema ],
    },
    {
        // set virtual fields true
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

// function to show reaction count
ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})

// create Thought model using ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export module as User
module.exports = Thought;