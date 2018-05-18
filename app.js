// let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let bodyParser = require('body-parser');
let expressHbs = require('express-handlebars');
let flash = require('express-flash');
let session = require('express-session');
let mongoose = require('mongoose');
let db_url = process.env.NODE_BLOG_DB;
let sess_sec = process.env.BLOG_SESS_SEC;


mongoose.connect(db_url)
    .then( () => {console.log('Connected to mLab');})
    .catch( (err) => {console.log('Error connecting to mLab', err);});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let app = express();


// view engine setup

// app.set('views', path.join(__dirname, 'views')); replaced with following line
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json()); // added by me
app.use(bodyParser.urlencoded({extended: false})); //added by me
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: sess_sec, resave: false, saveUninitialized: false}));
app.use(flash());


// app.use('/views', express.static('views'));

app.use('/', indexRouter);
app.use('/users', usersRouter);





// catch 404 and forward to error handler

app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
    // next(createError(404));
});







// error handler

app.use(function(err, req, res, next) {

    if (err.kind === 'ObjectId' && err.name === 'CastError') {
        err.status = 404;
        err.message = 'ObjectId Not Found';
        res.status(err.status);
        res.render('404')
    }
// set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

// render the error page
    res.status(err.status || 500);
    res.render('error');
});

let ThoughtData = require('./models/thoughtModel');
let testThought = new ThoughtData({post_author: 'testAuthor', post_title: 'testTitle', post_body: 'testPostBodyContent', date_created: new Date(Date.now()) });
testThought.save();


module.exports = app;
