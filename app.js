const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
//require config
const config = require('./config/index');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const companyRouter  = require('./routes/company');
const staffRouter  = require('./routes/staff');
const shopRouter = require('./routes/shop');

// import minddleware
const errorHandler = require('./middleware/errorHandle');


const app = express();
mongoose.connect(config.MONGO_URI);

app.use(logger('dev'));
app.use(express.json({
    limit : '50mb'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/company',companyRouter);
app.use('/staff',staffRouter);
app.use('/shop', shopRouter);



app.use(errorHandler);
module.exports = app;
