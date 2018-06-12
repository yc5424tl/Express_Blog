
const express      = require('express');
const bodyParser     = require('body-parser');


let path           = require('path');
let logger         = require('morgan');
let cookieParser   = require('cookie-parser');

let mongoose       = require('mongoose');
let flash          = require('express-flash');
let session        = require('express-session');
let fs             = require('fs');
let expressHbs     = require('express-handlebars');
let expressWinston = require('express-winston');
let winston        = require('winston');
let db_url         = process.env.NODE_BLOG_DB;
let sess_sec       = process.env.BLOG_SESS_SEC;



mongoose.connect(db_url)
    .then( () => {console.log('Connected to mLab');})
    .catch( (err) => {console.log('Error connecting to mLab', err);});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


let indexRouter     = require('./routes/index');
let usersRouter     = require('./routes/users');
let crudRouter      = require('./routes/update');
let delRouter       = require('./routes/delete');
let app             = express();
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

// view engine setup
app.engine('.hbs', expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs',
    helpers: {
        postPreview(text) {
            let formattedPreview = '';
            if(text.length < 100) {
                formattedPreview = text;
            }
            else{
                formattedPreview = text.substring(0, 100) + '...';
            }
            return formattedPreview;
        }
    }
}));
app.set('view engine', '.hbs');

app.use(logger('combined', {stream: accessLogStream})); // combined, common, dev, short, tiny
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: sess_sec, resave: false, saveUninitialized: false}));
app.use(flash());
app.use(expressWinston.logger({transports: [new winston.transports.Console({json: true, colorize: true}),]}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/edit', crudRouter);
app.use('/delete', delRouter);
app.use(expressWinston.errorLogger({transports: [new winston.transports.Console({json: true, colorize: true})]}));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
    // next(createError(404));
});


// error handler
app.use(function(err, req, res) {
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


module.exports = app;
expressHbs();
bodyParser.urlencoded(
    {extended: false});
bodyParser.json({
    extended:false
});




