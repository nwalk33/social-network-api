// import Router from express
const router = require('express').Router();
// import all API routes
const apiRoutes = require('./api')

// Use Middleware for apiRoutes
router.use('/api', apiRoutes);

router.use(async (req, res) => {
    res.status(404).send('APIs not found: 404 Error')
});

module.exports = router;