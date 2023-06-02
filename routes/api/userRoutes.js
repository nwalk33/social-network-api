// import router from express
const router = require('express').Router();

// import User Controllers
const {
    getUsers,
    getUserByID,
    createUser,
    updateUserByID,
    deleteUserByID,
    AddFriendByID,
    DeleteFriendByID
} = require('../../controller/userController');

// API GET POST routes for User /api/users
router.route('/')
.get(getUsers)
.post(createUser);

// API GET PUT DELETE routes for User with ID params /api/users/:id
router.route('/:id')
.get(getUserByID)
.put(updateUserByID)
.delete(deleteUserByID);

// API POST DELETE routes for User with ID params /api/users/:id
router.route('/:id/friends/:friendID')
.post(AddFriendByID)
.delete(DeleteFriendByID);

// export module as router
module.exports = router;