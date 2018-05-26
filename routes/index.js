'use strict';

let express     = require('express');
let router      = express.Router();
let mongoose    = require('mongoose');
let flash       = require('express-flash');
let util        = require('util');
let LearnedData = require('../models/learnedModel');


let HeardData  = require('../models/heardModel');
let ThoughtData = require('../models/thoughtModel');
let WatchedData = require('../models/watchedModel');

let Learned = new LearnedData();



/* GET home page. */

router.get('/', function(req, res, next) {

    //let recentPosts = {};
    let recentPosts = [];
    // let learned = util.inspect(LearnedData.find( {}, null, {sort: '-date', limit: 1}));

    LearnedData.find({}, null, {sort: '-date', limit: 1}, function (err, post) {
        console.log('inner learned = ' + post);
        //recentPosts['Learned'] = post;
        recentPosts.push(post);
        res.render('index', { posts: recentPosts[0]});
        // res.render('index', {posts: recentPosts['Learned']});
    });

    // HeardData.find({}, null, { sort: '-date', limit: 1 }, function (err, post) {
    //     console.log('heard: ' + post);
    //     //recentPosts['Heard'] = post;
    //     recentPosts.push(post);
    //     // res.render('index', {posts: Object.values(recentPosts)});
    //     res.render('index', { posts: recentPosts });
    // });
    //
    // recentPosts['Learned'] = learned;
    // console.log('Outer learned = ' + learned);

        // console.log('post = ' + post);
        // console.log(recentPosts['Learned']);
});

    //res.render('index', {posts: recentPosts['Learned']});



function getLastLearned() {
    LearnedData.find({}, null, {sort: '-date', limit: 1}, function(err, post) {
        return post;
    })
}

function getLastHeard() {
    HeardData.find({}, null, {sort: '-date', limit: 1}, function(err, post) {
        return post;
    })
}

function getLastThought() {
    ThoughtData.find({}, null, {sort: '-date', limit: 1}, function(err, post) {
        return post;
    })
}

function getLastWatched() {
    WatchedData.find({}, null, {sort: '-date', limit: 1}, function(err, post) {
        return post;
    })
}


/* GET new post page */
router.get('/wrote', function(req, res) {
    WatchedData.find(function (err, watched) {
        res.render('../views/view_wrote.hbs', {
            title: 'Today I Wrote',
            posts: watched
        });
    });
});


/* GET thought page */
router.get('/thought', function(req, res) {
    ThoughtData.find(function(err, thought) {
        res.render('../views/view_thought.hbs', {
            title: 'Today I Thought',
            posts: thought
        });
    });
});


/* GET heard page */
router.get('/heard', function(req, res) {
    HeardData.find(function(err, heard) {
        res.render('../views/view_heard.hbs', {
            title: 'Today I Heard',
            posts: heard
        });
    });
});


/* GET watched page */
router.get('/watched', function(req, res) {
    WatchedData.find(function(err, watched) {
        res.render('../views/view_watched.hbs', {
            title: 'Today I Watched',
            posts: watched
        });
    });
});


/* GET learned page */

router.get('/learned', function(req, res) {
    LearnedData.find(function(err, learned) {
        res.render('../views/view_learned.hbs', {
            title: 'Today I Learned',
            posts: learned
        });
    });
});


router.get('/heardPost/:_id', function(req, res, next) {
    HeardData.findById(req.params._id)
        .then( (post) => {
            if(post) {
                res.render('view_single_heard', { post: post });
            }
            else {
                next();
            }
        })
        .catch( (err) => {
            next(err);
        });
});


router.get('/learned/:_id', function(req, res, next) {
    LearnedData.findById(req.params._id)
        .then( (post) => {
            if(post) {
                res.render('view_single_learned', { post: post });
            }
            else {
                next();
            }
        })
        .catch( (err) => {
            next(err);
        });
    });


router.get('/thought/:_id', function(req, res, next) {
    ThoughtData.findById(req.params._id)
        .then( (post) => {
            if(post) {
                res.render('view_single_thought', { post: post });
            }
            else {
                next();
            }
        })
        .catch( (err) => {
            next(err);
        });
    });


router.get('/watched/:_id', function(req, res, next) {
    WatchedData.findById(req.params._id)
        .then( (post) => {
            if(post) {
                res.render('view_single_watched', { post: post });
            }
            else {
                next();
            }
        })
        .catch( (err) => {
            next(err);
        });
    });


router.post('/new_heard', function(req, res, next) {

    let post;

    if(req.body.heardTitle && req.body.heardBody) {

        post = new HeardData({
            post_author: 'testAuthor',
            post_title: req.body.heardTitle,
            post_body: req.body.heardBody,
            date_created: Date.now()
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
        if(req.body.heardUrl) {
            post.post_url_link = req.body.heardUrl;
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
            post_author:  'testAuthor',
            post_title:   req.body.learnedTitle,
            post_body:    req.body.learnedBody,
            date_created: Date.now()
        });

        post.save().then((newLearnedPost) => {
            console.log('New learned post created: ', newLearnedPost);
            res.redirect('/');
        })
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
    }

    else {
        flash('error', 'Please enter title and body.');
        res.redirect('/');
    }
});


router.post('/new_watched', function(req, res, next) {

    let post;

    if(req.body.watchedTitle && req.body.watchedBody) {

        post = new WatchedData({
            post_author: 'testAuthor',
            post_title: req.body.watchedTitle,
            post_body: req.body.watchedBody,
            date_created: Date.now(),
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
    }

    else {
        flash('error', 'Please enter title and body.');
        res.redirect('/');
    }
});


module.exports = router;


