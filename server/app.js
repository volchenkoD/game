const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');



const  authRoutes = require('./routes/auth');
const lessonRoutes = require('./routes/lesson');
const keys = require('./config/keys');


const app = express();

mongoose.connect(keys.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then( () => console.log('connect')).catch(error => console.log(error));


app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/lesson', lessonRoutes);

module.exports = app;