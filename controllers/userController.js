// import User Model
const { User } = require('../models')

// User model controller
const userModelController = {
    // GET all users
    getUsers(req, res) {
        User.find({})
        // populate Users path Thoughts
        .populate({ path: 'thoughts', select: '-__V' })
        // populate Users path Friends
        .populate({ path: 'friends', select: '-__V'})
        .select('-__V')
        .then(UsersDataDB => res.json(UsersDataDB))
        // catch err status 500
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // GET User by ID
    getUserByID({ params}, res){
        User.findOne({ _id: params.id })
        // populate Users path Thought
        .populate({ path: 'thoughts', select: '-__V' })
        // populate Users path Friends
        .populate({ path: 'friends', select: '-__V'})
        .select('-__V')
        .then(UsersDataDB => {
            if(!UsersDataDB){
                res.status(404).json({ message: 'Cannot find User with input ID' });
                return;
            }
            res.json(UsersDataDB)
        })
        // catch err status 500
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Create new User
    createUser({ body}, res){
        User.create(body)
        // save to User database
        .then(UsersDataDB => res.json(UsersDataDB))
        // catch err 400
        .catch(err => res.status(400).json(err));
    },

    // Update User by ID
    updateUserByID({ params, body}, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true})
        .then(UsersDataDB => {
            if(!UsersDataDB) {
                res.status(404).json({ message: 'Cannot find User with input ID' });
                return;
            }
            res.json(UsersDataDB)
        })
        // catch err 400
        .catch(err => res.status(400).json(err));
    },

    // Delete User by ID
    deleteUserByID({ params}, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(UsersDataDB => {
            if(!UsersDataDB) {
                res.status(404).json({ message: 'Cannot find User with input ID' });
                return;
            }
            res.json(UsersDataDB)
        })
        // catch err 400
        .catch(err => res.status(400).json(err));
    },

    // Add Friend by ID
    AddFriendByID({ params}, res) {
        User.findOneAndUpdate({ _id: params.id }, {$addToSet: { friends: params.friendID}}, { new: true, runValidators: true})
        // populate path Friends
        .populate({ path: 'friends', select: ('-__V')})
        .select('-__V')
        .then(UsersDataDB => {
            if(!UsersDataDB) {
                res.status(404).json({ message: 'Cannot find User with input ID' });
                return;
            }
            res.json(UsersDataDB)
        })
        // catch err 400
        .catch(err => res.status(400).json(err));
    },

    // Delete Friend by ID
    DeleteFriendByID({ params}, res) {
        User.findOneAndUpdate({ _id: params.id }, {$pull: { friends: params.friendID}}, { new: true, runValidators: true})
        // populate path Friend
        .populate({ path: 'friends', select: ('-__V')})
        .select('-__V')
        .then(UsersDataDB => {
            if(!UsersDataDB) {
                res.status(404).json({ message: 'Cannot find User with input ID' });
                return;
            }
            res.json(UsersDataDB)
        })
        // catch err 400
        .catch(err => res.status(400).json(err));
    },
};

// export module as userModelController
module.exports = userModelController;