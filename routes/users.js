let express = require('express');
const passport = require("passport");
let router = express.Router();


router.get('/auth/google',
    passport.Passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

router.get('/auth/google/callback',
    passport.Passport.authenticate('google', {failureRediret: '/' }),
    function(req, res) {
        res.redirect('/');
    });


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
