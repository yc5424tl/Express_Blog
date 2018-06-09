
let express     = require('express');
let router      = express.Router();
let flash       = require('express-flash');
let async       = require('async');

let LearnedData = require('../models/learnedModel');
let HeardData   = require('../models/heardModel');
let ThoughtData = require('../models/thoughtModel');
let WatchedData = require('../models/watchedModel');



/* GET home page. */
router.get('/', function(req, res, next) {

    let heardPost;
    let thoughtPost;
    let learnedPost;
    let watchedPost;

    async.series([

        function (callback) {
            ThoughtData.find({}, null, {sort: '-date', limit: 1}, function (err, latestThought) {
                if (err) {
                    callback(err, null);
                }
                thoughtPost = latestThought;
                callback(null, latestThought);
            })
        },
        function (callback) {
            HeardData.find({}, null, {sort: '-date', limit: 1}, function (err, latestHeard) {
                if (err) {
                    callback(err, null);
                }
                heardPost = latestHeard;
                callback(null, latestHeard);
            })
        },
        function (callback) {
            LearnedData.find({}, null, {sort: '-date', limit: 1}, function (err, latestLearned) {
                if (err) {
                    callback(err, null);
                }
                learnedPost = latestLearned;
                callback(null, latestLearned);
            })
        },
        function (callback) {
            WatchedData.find({}, null, {sort: '-date', limit: 1}, function (err, latestWatched) {
                if (err) {
                    callback(err, null);
                }
                watchedPost = latestWatched;
                callback(null, latestWatched);
            })
        }
    ],

    function (err) {
        if (err) {
            callback(err, null)
        }
        return res.render('../views/templates/index.hbs', {heard: heardPost, learned: learnedPost, thought: thoughtPost, watched: watchedPost})
    });
});





/* GET new post page */
router.get('/wrote', function(req, res) {
    res.render('../views/templates/view_wrote.hbs');
});



/* GET thought page */
router.get('/thought', function(req, res) {
    ThoughtData.find(function(err, thought) {
        res.render('../views/templates/view_all/thought.hbs', {
            title: 'Today I Thought',
            posts: thought
        });
    });
});



/* GET heard page */
router.get('/heard', function(req, res) {
    HeardData.find(function(err, heard) {
        res.render('../views/templates/view_all/heard.hbs', {
            title: 'Today I Heard',
            posts: heard
        });
    });
});



/* GET watched page */
router.get('/watched', function(req, res) {
    WatchedData.find(function(err, watched) {
        res.render('../views/templates/view_all/watched.hbs', {
            title: 'Today I Watched',
            posts: watched
        });
    });
});



/* GET learned page */
router.get('/learned', function(req, res) {
    LearnedData.find(function(err, learned) {
        res.render('../views/templates/view_all/learned.hbs', {
            title: 'Today I Learned',
            posts: learned
        });
    });
});



router.get('/heard/:_id', function(req, res, next) {
    HeardData.findById(req.params._id)
        .then((post) => {
            if(post) {
                res.render('../views/templates/view_single/heard.hbs', { post: post });
            }
            else {
                next();
            }
        })
        .catch((err) => {
            next(err);
        });
    });



router.get('/learned/:_id', function(req, res, next) {
    LearnedData.findById(req.params._id)
        .then( (post) => {
            if(post) {
                res.render('../views/templates/view_single/learned.hbs', { post: post });
            }
            else {
                next();
            }
        })
        .catch((err) => {
            next(err);
        });
    });



router.get('/thought/:_id', function(req, res, next) {
    ThoughtData.findById(req.params._id)
        .then( (post) => {
            if(post) {
                res.render('../views/templates/view_single/thought.hbs', { post: post });
            }
            else {
                next();
            }
        })
        .catch((err) => {
            next(err);
        });
    });



router.get('/watched/:_id', function(req, res, next) {
    WatchedData.findById(req.params._id)
        .then((post) => {
            if(post) {
                res.render('../views/templates/view_single/watched.hbs', { post: post });
            }
            else {
                next();
            }
        })
        .catch((err) => {
            next(err);
        });
    });



router.post('/new_heard', function(req, res, next) {

    let post;

    if(req.body.heardTitle && req.body.heardBody) {

        post = new HeardData({
            post_author:   'testAuthor',
            post_title:    req.body.heardTitle,
            post_body:     req.body.heardBody,
            date_created:  Date.now()
        });

        if(req.body.heardArtist) {
            post.post_artist = req.body.heardArtist;
        }

        if(req.body.heardAlbum) {
            post.post_album = req.body.heardAlbum;
        }

        if(req.body.heardTrack) {
            post.post_track = req.body.heardTrack;
        }

        if(req.body.heardLink) {
            post.post_url_link = req.body.heardLink;
        }

        if(req.body.heardRating) {
            post.user_rating = req.body.heardRating;
        }

        post.save().then((newHeardPost) => {
            console.log('New heard post created: ', newHeardPost);
            res.redirect('/');
        })
            .catch((err) => {
                next(err);
            });
    }

    else {
        flash('error', 'Please enter title and body');
        res.redirect('/');
    }
});



router.post('/new_learned', function(req, res, next) {

    let post;

    if(req.body.learnedTitle && req.body.learnedBody) {

        post = new LearnedData({
            post_author:   'testAuthor',
            post_title:    req.body.learnedTitle,
            post_body:     req.body.learnedBody,
            date_created:  Date.now()
        });

        post.save().then((newLearnedPost) => {
            console.log('New learned post created: ', newLearnedPost);
            res.redirect('/');
        })
            .catch((err) => {
                next(err);
            });
    }

    else {
        flash('error', 'Please enter title and body.');
        res.redirect('/');
    }
});



router.post('/new_thought', function(req, res, next) {

    let post;

    if (req.body.thoughtTitle && req.body.thoughtBody) {

        post = new ThoughtData({
            post_author: 'testAuthor',
            post_title: req.body.thoughtTitle,
            post_body: req.body.thoughtBody,
            date_created: Date.now()
        });

        post.save().then((newThoughtPost) => {
            console.log('New thought post created: ', newThoughtPost);
            res.redirect('/');
        })
            .catch((err) => {
                next(err);
            });
    }

    else {
        flash('error', 'Please enter title and body.');
        res.redirect('/');
    }
});


// POST NEW WATCHED
router.post('/new_watched', function(req, res, next) {

    let post;

    if(req.body.watchedTitle && req.body.watchedBody) {

        post = new WatchedData({
            post_author:   'testAuthor',
            post_title:    req.body.watchedTitle,
            post_body:     req.body.watchedBody,
            date_created:  Date.now(),
        });

        if(req.body.watchedUrl) {
            post.post_url_link = req.body.watchedUrl;
        }

        if(req.body.watchedFileInput) {
            post.post_file_uri = req.body.watchedFileInput;
        }

        post.save().then( (newWatchedPost) => {
            console.log('New watched post created: ', newWatchedPost);
            res.redirect('/');
        })
            .catch((err) => {
                next(err);
            });
    }

    else {
        flash('error', 'Please enter title and body.');
        res.redirect('/');
    }
});


module.exports = router;



