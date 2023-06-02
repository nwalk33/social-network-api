const router = require('express').Router();

const apiRoutes = require('./api')

router.use('/api', apiRoutes);

router.use(async (req, res) => {
    res.status(404).send('APIs not found: 404 Error')
});

module.exports = router;