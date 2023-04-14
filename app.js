const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

//สร้าง middleware จัดการ error
const errorHandler = require('./middleware/errorHandler');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const companyRouter  = require('./routes/company');
const staffRouter  = require('./routes/staff');
const shopRouter = require('./routes/shop');
const config = require('./config/index');


const app = express();
mongoose.connect(config.MONGODB_URI);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//init passport
app.use(passport.initialize());


// route
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/company',companyRouter);
app.use('/staff',staffRouter);
app.use('/shop', shopRouter);



app.use(errorHandler);

module.exports = app;
