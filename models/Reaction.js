// import chema, model, types from mongoose
const { Schema, Model, Types } = require('mongoose');
// import moment library
const moment = require('moment');

// create new instance of Schema
const ReactionSchema = new Schema(
    {
        // objectID
        reactionID: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        // reactionText, string
        reactionText: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 250
        },
        // username, string
        username: {
            type: String,
            required: true,
            ref: 'User'
        },
        // dateCreated
        dateCreated: {
            type: Date,
            default: Date.now,
            get: (createDateStamp) => moment(createDateStamp).format('MM/DD/YYY [at] HH:MM: a')
        },
        // use imported ReactionSchema
        //reactions: [ ReactionSchema ],
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

// export module as ReactionSchema
module.exports = ReactionSchema;