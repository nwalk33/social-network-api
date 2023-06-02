// import Router from express
const router = require('express').Router();
// import User Routers
const userRoutes = require('./userRoutes');
// import Thought Routers
const thoughtRoutes = require('./thoughtRoutes');

// Use Middleware for Routers
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

// export module as router
module.exports = router;