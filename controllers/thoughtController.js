// import Thought and User Models
const { Thought, User } = require('../models')

// User model controller
const thoughtModelController = {
    // GET all users
    getThoughts(req, res) {
        Thought.find({})
        // populate Thoughts path user
        // .populate({ path: 'username', select: '-__V' })
        .select('-__V')
        // sort by id
        .sort({ _id: -1 })
        .then(ThoughtsDataDB => res.json(ThoughtsDataDB))
        // catch err status 500
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // GET User by ID
    getThoughByID({ params}, res){
        Thought.findOne({ _id: params.id })
        // populate Users path Thought
        // .populate({ path: 'username', select: '-__V' })
        // sort by id
        .sort({ _id: -1 })
        .select('-__V')
        .then(ThoughtsDataDB => {
            if(!ThoughtsDataDB){
                res.status(404).json({ message: 'Cannot find Thought with input ID' });
                return;
            }
            res.json(ThoughtsDataDB)
        })
        // catch err status 500
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Create new Thought
    createThought({ body}, res){
        Thought.create(body)
        // find one and update by ID
        .then(({ _id}) => {
            return User.findOneAndUpdate(
                { username: body.username },
                { $push: { thoughts: _id }},
                { new: true }
            );
        })
        // save to User database
        .then(UsersDataDB => res.json(UsersDataDB))
        // catch err 400
        .catch(err => res.status(400).json(err));
    },

    // Update Thought by ID
    updateThoughtByID({ params, body}, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
        .then(ThoughtsDataDB => {
            if(!ThoughtsDataDB) {
                res.status(404).json({ message: 'Cannot find Thought with input ID' });
                return;
            }
            res.json(ThoughtsDataDB)
        })
        // catch err 400
        .catch(err => res.status(400).json(err));
    },

    // Delete Thought by ID
    deleteThoughtByID({ params}, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(ThoughtsDataDB => {
            if(!ThoughtsDataDB) {
                res.status(404).json({ message: 'Cannot find Thought with input ID' });
                return;
            }
            res.json(ThoughtsDataDB)
        })
        // catch err 400
        .catch(err => res.status(400).json(err));
    },

    // Add Reaction by ID
    AddReaction({ params, body}, res) {
        Thought.findOneAndUpdate({ _id: params.id }, {$push: { reactions: body}}, { new: true, runValidators: true})
        .then(ThoughtsDataDB => {
            if(!ThoughtsDataDB) {
                res.status(404).json({ message: 'Cannot find Thought with input ID' });
                return;
            }
            res.json(ThoughtsDataDB)
        })
        // catch err 400
        .catch(err => res.status(400).json(err));
    },

    // Delete Friend by ID
    DeleteReactionByID({ params}, res) {
        Thought.findOneAndUpdate({ _id: params.id }, {$pull: { reactions: {reactionID: params.reactionID}}}, { new: true, runValidators: true})
        .then(ThoughtsDataDB => {
            if(!ThoughtsDataDB) {
                res.status(404).json({ message: 'Cannot find Reaction with input ID' });
                return;
            }
            res.json(ThoughtsDataDB)
        })
        // catch err 400
        .catch(err => res.status(400).json(err));
    },
};

// export module as userModelController
module.exports = thoughtModelController;