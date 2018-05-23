

let express = require('express');
let router = express.Router();
let flash = require('express-flash');
let LearnedData = require('../models/learnedModel');
let ThoughtData = require('../models/thoughtModel');
let WatchedData = require('../models/watchedModel');
let HeardData   = require('../models/heardModel');


/* GET home page. */
// router.use('/', function(req, res) {
//     res.render('index', {title: 'Home'});
// });

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Home' });
});


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});



/* GET new post page */
router.get('/wrote', function(req, res) {
    res.render('../views/view_wrote.hbs', { title: 'Today I Wrote'});
});



/* GET thought page */
router.get('/thought', function(req, res) {
    ThoughtData.find(function(err, thought) {
        res.render('../views/view_thought.hbs', { title: 'Today I Thought', posts: thought });
    });
});



/* GET heard page */
router.get('/heard', function(req, res) {
    HeardData.find(function(err, heard) {
        res.render('../views/view_heard.hbs', { title: 'Today I Heard', posts: heard });
    });
});



/* GET watched page */
router.get('/watched', function(req, res) {
    WatchedData.find(function(err, watched) {
        res.render('../views/view_watched.hbs', {title: 'Today I Watched', posts: watched });
    });
});



/* GET learned page */
router.get('/learned', function(req, res) {
    LearnedData.find(function(err, learned) {
        res.render('../views/view_learned.hbs', { title: 'Today I Learned', posts: learned });
    });
});



router.get('/learned/:_id', function(req, res, next) {
    LearnedData.findById(req.params._id)
        .then( (post) => {
            if(post) {
                res.render('../views/view_single_learned.hbs', {post: post});
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
                res.render('../views/view_single_thought.hbs', {post: post});
            }
            else {
                next();
            }
        })
        .catch( (err) => {
            next(err);
        });
    });



router.get('/heard/:_id', function(req, res, next) {
    HeardData.findById(req.params._id)
        .then( (post) => {
            if(post) {
                res.render('../views/view_single_heard.hbs', {post: post});
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
                res.render('../views/view_single_watched.hbs', {post: post});
            }
            else {
                next();
            }
        })
        .catch( (err) => {
            next(err);
        });
    });



// router.post('/new_post', function(req, res, next) {
//
//     let postType = $('.dropdown-menu').selected;
//
//     switch(postType) {
//
//         case 'Heard':
//             buildHeardPost(req, res);
//             break;
//
//         case 'Learn':
//             buildLearnedPost(req, res);
//             break;
//
//         case 'Thought':
//             buildThoughtPost(req, res);
//             break;
//
//         case 'Watch':
//             buildWatchedPost(req, res);
//             break;
//
//         default:
//             flash('error', 'Please select a post type.');
//             res.redirect('/');
//     }
//
//     // if (postType == 'heard') {
//     //     buildHeardPost(req, res);
//     // }
//     // //     if(req.body.title && req.body.body) {
//     // //         p = new HeardData({
//     // //             post_author: 'testAuthor',
//     // //             post_title: req.body.title,
//     // //             post_body: req.body.body,
//     // //             date_created: Date.now()
//     // //         });
//     // //
//     // //         if(req.body.artist) {
//     // //             p.post_artist = req.body.artist;
//     // //         }
//     // //
//     // //         if(req.body.album) {
//     // //             p.post_album = req.body.album;
//     // //         }
//     // //
//     // //         if(req.body.track) {
//     // //             p.post_track = req.body.track;
//     // //         }
//     // //
//     // //         if(req.body.post_url_link) {
//     // //             p.post_url_link = req.body.heardUrl;
//     // //         }
//     // //
//     // //         if(req.body.rating) {
//     // //             p.user_rating = req.body.rating;
//     // //         }
//     // //         p.save().then((newHeardPost) => {
//     // //             console.log('New heard post created: ', newHeardPost);
//     // //             res.redirect('/');
//     // //         })
//     // //     }
//     // //     else {
//     // //         req.flash('error', 'Please enter title and body');
//     // //         res.redirect('/');
//     // //     }
//     // // }
//     //
//     // else if (postType == 'learned') {
//     //     buildLearnedPost(req, res);
//     // }
//     // //     if(req.body.title && req.body.body) {
//     // //         p = new LearnedData({
//     // //             post_author:  'testAuthor',
//     // //             post_title:   req.body.title,
//     // //             post_body:    req.body.body,
//     // //             date_created: Date.now()
//     // //         });
//     // //
//     // //         p.save().then((newLearnedPost) => {
//     // //             console.log('New learned post created: ', newLearnedPost);
//     // //             res.redirect('/');
//     // //         })
//     // //     }
//     // //     else {
//     // //         req.flash('error', 'Please enter title and body.');
//     // //         res.redirect('/');
//     // //     }
//     // // }
//     //
//     // else if (postType == 'thought') {
//     //     buildThoughtPost(req, res);
//     //     // if(req.body.title && req.body.body) {
//     //     //     p = new ThoughtData({
//     //     //         post_author: 'testAuthor',
//     //     //         post_title: req.body.title,
//     //     //         post_body: req.body.body,
//     //     //         date_created: Date.now()
//     //     //     });
//     //     //
//     //     //     p.save().then((newThoughtPost) => {
//     //     //         console.log('New thought post created: ', newThoughtPost);
//     //     //         res.redirect('/');
//     //     //     })
//     //     // }
//     //     // else {
//     //     //     req.flash('error', 'Please enter title and body.');
//     //     //     res.redirect('/');
//     //     // }
//     // }
//     //
//     // else if (postType == 'watched') {
//     //     buildWatchedPost(req, res);
//     // }
//     //
//     // else {
//     //     req.flash('error', 'Please select a post type.' + postType);
//     //     res.redirect('/');
//
// });


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
    } else {
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

    if (req.body.thoughtTitle) {
        console.log('thoughtTitle True');
    } else {
        console.log('thoughtTitle False')
    }

    if(req.body.thoughtBody) {
        console.log('thoughtBody true')
    } else {
        console.log('thoughtBody false')
    }

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



// function buildHeardPost(req, res, next) {
//
//     let post ;
//
//     if(req.body.heardTitle && req.body.heardBody) {
//
//         post = new HeardData({
//             post_author: 'testAuthor',
//             post_title: req.body.heardTitle,
//             post_body: req.body.heardBody,
//             date_created: Date.now()
//         });
//
//         if(req.body.heardArtist) {
//             post.post_artist = req.body.heardArtist;
//         }
//
//         if(req.body.heardAlbum) {
//            post.post_album = req.body.heardAlbum;
//         }
//
//         if(req.body.heardTrack) {
//             post.post_track = req.body.heardTrack;
//         }
//
//         if(req.body.heardUrl) {
//             post.post_url_link = req.body.heardUrl;
//         }
//
//         if(req.body.heardRating) {
//             post.user_rating = req.body.heardRating;
//         }
//         post.save().then((newHeardPost) => {
//             console.log('New heard post created: ', newHeardPost);
//             res.redirect('/');
//         })
//     }
//
//     else {
//         flash('error', 'Please enter title and body');
//         res.redirect('/');
//     }
// }



// function buildThoughtPost(req, res) {
//
//     let post;
//
//     if(req.body.thoughtTitle && req.body.thoughtBody) {
//         post = new ThoughtData({
//             post_author: 'testAuthor',
//             post_title: req.body.thoughtTitle,
//             post_body: req.body.thoughtBody,
//             date_created: Date.now()
//         });
//
//         post.save().then((newThoughtPost) => {
//             console.log('New thought post created: ', newThoughtPost);
//             res.redirect('/');
//         })
//     }
//     else {
//         flash('error', 'Please enter title and body.');
//         res.redirect('/');
//     }
// }



// function buildWatchedPost(req, res) {
//
//     let post;
//
//     if(req.body.watchedTitle && req.body.watchedBody) {
//         post = new WatchedData({
//             post_author: 'testAuthor',
//             post_title: req.body.watchedTitle,
//             post_body: req.body.watchedBody,
//             date_created: Date.now(),
//         });
//
//         if(req.body.watchedUrl) {
//             post.post_url_link = req.body.watchedUrl;
//         }
//
//         if(req.body.watchedFileInput) {
//             post.post_file_uri = req.body.watchedFileInput;
//         }
//
//         post.save().then( (newWatchedPost) => {
//             console.log('New watched post created: ', newWatchedPost);
//             res.redirect('/');
//         })
//     }
//     else {
//         flash('error', 'Please enter title and body.');
//         res.redirect('/');
//     }
// }



// function buildLearnedPost(req, res) {
//
//     let post;
//
//     if(req.body.learnedTitle && req.body.learnedBody) {
//         post = new LearnedData({
//             post_author:  'testAuthor',
//             post_title:   req.body.learnedTitle,
//             post_body:    req.body.learnedBody,
//             date_created: Date.now()
//         });
//
//         post.save().then((newLearnedPost) => {
//             console.log('New learned post created: ', newLearnedPost);
//             res.redirect('/');
//         })
//     }
//     else {
//         flash('error', 'Please enter title and body.');
//         res.redirect('/');
//     }
// }


module.exports = router;


