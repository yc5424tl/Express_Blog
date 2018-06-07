
const
    indexRouter = require('./index.js'),
    userRouter = require('./users.js');


function init(server) {
    server.get('*', function (req, res, next) {
        console.log('Request was made to: ' + req.originalUrl);
        return next();
    });

    server.get('/', function (req, res) {
        res.redirect('/');
    });

    server.use('/', indexRouter);
    server.use('/users', userRouter);

}

module.exports = init;