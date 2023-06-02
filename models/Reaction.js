const { Schema, Model, Types } = require('mongoose');

const ReactionSchema = new Schema(
    {
        reactionID: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        reactionText: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 250
        },
        username: {
            type: String,
            required: true,
            ref: 'User'
        },
        dateCreated: {
            type: Date,
            default: Date.now,
            get: (createDateStamp) => moment(createDateStamp).format('MM/DD/YYY [at] HH:MM: a')
        },
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

module.exports = ReactionSchema;