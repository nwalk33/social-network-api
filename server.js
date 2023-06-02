// require mongoose
const mongoose = require('mongoose');
// require express
const express = require('express');
// require config connection
const db = require('./config/connections');
// require routes/api
const routes = require('./routes');
// use app as express method
const app = express();
// PORT env
const PORT = process.env.PORT || 3001;

// use express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routes);


// mongoose debug query
mongoose.set('debug', true);

// listen PORT console log
app.listen(PORT, () => console.log(`Connected to Localhost: listening at ${PORT}`));