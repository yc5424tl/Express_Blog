
let express         = require('express');
let bodyParser      = require('body-parser');
let path            = require('path');
let logger          = require('morgan');
let cookieParser    = require('cookie-parser');
let flash           = require('express-flash');
let session         = require('express-session');
let fs              = require('fs');
let expressHbs      = require('express-handlebars');
let expressWinston  = require('express-winston');
let winston         = require('winston');
let db_url          = process.env.NODE_BLOG_DB;
let sess_sec        = process.env.BLOG_SESS_SEC;
let mongoose        = require('mongoose');
let indexRouter     = require('./routes/index.js');
let usersRouter     = require('./routes/users.js');
let crudRouter      = require('./routes/update.js');
let delRouter       = require('./routes/delete.js');
let app             = express();
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});



mongoose.connect(db_url)
    .then( () => {console.log('Connected to mLab');})
    .catch( (err) => {console.log('Error connecting to mLab', err);});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



app.set('port', (process.env.PORT || 3000));



// view engine setup
app.engine('.hbs', expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs',
    helpers: { postPreview }
}));
app.set('view engine', '.hbs');


app.use(logger('combined', {stream: accessLogStream})); // combined, common, dev, short, tiny
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: sess_sec, resave: false, saveUninitialized: false }));
app.use(flash());
app.use(expressWinston.logger({transports: [new winston.transports.Console({json: true, colorize: true}),]}));
app.use('/', indexRouter);
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

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


module.exports =
    app;
    expressHbs();
    bodyParser.urlencoded({extended: false});
    bodyParser.json({extended:false});


function postPreview(text) {
    let formattedPreview = '';
    if (text.length < 250) {
        formattedPreview = text;
    }
    else {
        formattedPreview = text.substring(0, 250) + '...';
    }
    return formattedPreview;
}


//     passport       = require('passport'),
//     GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//
//     pass = passport.Passport();
//
// pass.serializeUser(function(user, done) {
//     done(null, user);
// });
//
// pass.deserializeUser(function(obj, done) {
//     done(null, obj);
// });
//
//
// pass.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CONSUMER_KEY,
//     consumerSecret: process.env.GOOGLE_CONSUMER_SECRET,
//     callbackURL: "http://www.kater-bater.herokuapp.com/oauth2callback"
// },
//     function(accessToken, refreshToken, profile, done) {
//         User.findOrCreate({ googleId: profile.id }, function (err, user) {
//             return done(err, user);
//         });
//     }));
