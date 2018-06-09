

const learnedTable = require('../models/learnedModel.js');
const heardTable   = require('../models/heardModel.js');
const thoughtTable = require('../models/thoughtModel.js');
const watchedTable = require('../models/watchedModel.js');


let express = require('express');
let router = express.Router();


router.get('/heard/:_id', (req, res, next) => {
    heardTable.findById(req.params._id)
        .then( (post) => {
            if(post) {
                res.render('../views/templates/update_forms/heard.hbs', { post: post });
            }
            else {
                next();
            }
        })
        .catch( (err) => {
            next(err);
        });
});


router.post('/heard/:_id', (req, res, next) => {

    let query = req.params._id;
    let title = req.body.postTitle;
    let body = req.body.postBody;
    let edited = Date.now();


    heardTable.findByIdAndUpdate(query, {
        post_title: title,
        post_body: body,
        date_last_edit: edited,
    })
        .then((post) => {
            if (post) {

                    if (req.body.postArtist) {
                        post.post_artist = req.body.postArtist;
                    }

                    if (req.body.postAlbum) {
                        post.post_album = req.body.postAlbum;
                    }

                    if (req.body.postTrack) {
                        post.post_track = req.body.postTrack;
                    }

                    if (req.body.postLink) {
                        post.post_url_link = req.body.postLink;
                    }

                    if (req.body.postRating) {
                        post.user_rating = req.body.postRating
                    }

                    post.save().then((updatedPost) => {
                        res.render('../views/templates/view_single/heard.hbs', {post: updatedPost});
                    })
                        .catch((err) => {
                            res.redirect('/');
                            next(err);
                        });
                }

        })
        .catch((err) => {
            next(err);
        })
});


router.get('/learned/:_id', (req, res, next) => {
    learnedTable.findById(req.params._id)
        .then((post) => {
            if(post) {
                res.render('../views/templates/update_forms/learned.hbs', { post: post });
            }
            else {
                next();
            }
        })
        .catch((err) => {
            next(err);
        });
    });


router.post('/learned/:_id', (req, res, next) => {


    let query = req.params._id;
    let title = req.body.postTitle;
    let body = req.body.postBody;
    let edited = Date.now();

    learnedTable.findByIdAndUpdate(query, {
        post_title: title,
        post_body: body,
        date_last_edit: edited
    })
        .then((post) => {
            if(post) {
                post.save().then((updatedPost) => {
                    res.render('../views/templates/view_single/learned.hbs', {post: updatedPost});
                });
            }
            else {
                next();
            }
        })
        .catch((err) => {
            next(err);
        });

    });



// router.post('/learned/:_id', (req, res, next) => {
//
//
//     learnedTable.findByIdAndUpdate(req.params._id)
//         .then((post) => {
//             if(post) {
//                 if (req.body.post_title && req.body.post_body) {
//
//                     post.post_title = req.body.post_title;
//                     post.post_body  = req.body.post_body;
//                     post.save().then((updatedPost) => {
//
//                         res.render('../views/templates/view_single/learned.hbs', {post: updatedPost});
//                     })
//                         .catch((err) => {res.redirect('/'); next(err);});
//                 }
//             }
//         })
//         .catch((err) => {
//             res.redirect('/');
//             next(err);
//         });
// });



router.get('/thought/:_id', (req, res, next) => {
    thoughtTable.findById(req.params._id)
        .then((post) => {
            if(post) {
                res.render('../views/templates/update_forms/thought.hbs', { post: post });
            }
            else {
                next();
            }
        })
        .catch((err) => {
            next(err);
        });
});


router.post('/thought/:_id', (req, res, next) => {

    let query = req.params._id;
    let title = req.body.postTitle;
    let body = req.body.postBody;

    thoughtTable.findOneAndUpdate(query, {
        post_title:     title,
        post_body:      body,
        date_last_edit: Date, now
    })
        .then((post) => {
            if (post) {
                post.save().then((updatedPost) => {
                    res.render('../views/templates/view_single/thought.hbs', {post: updatedPost});
                })
            }
            else {
                next();
            }
        })

        .catch((err) => {
            next(err);
        });


    router.get('/watched/:_id', (req, res, next) => {
        watchedTable.findById(req.params._id)
            .then((post) => {
                if (post) {
                    res.render('../views/templates/update_forms/watched.hbs', {post: post});
                }
                else {
                    next();
                }
            })
            .catch((err) => {
                next(err);
            });
    });
});


router.post('/watched/:_id', (req, res, next) => {
    let query = req.params._id;
    let title = req.body.postTitle;
    let body = req.body.postBody;

    watchedTable.findOneAndUpdate(query, {
        post_title:     title,
        post_body:      body,
        date_last_edit: Date.now()
    })
        .then((post) => {

            if (post) {

                if (req.body.postLink) {
                    post.post_url_link = req.body.postLink;
                }

                if (req.body.postFile) {
                    post.post_file_uri = req.body.postFile;
                }

                post.save().then((updatedPost) => {
                    res.render('../views/templates/view_single/watched.hbs', { post: updatedPost });
                })
                    .catch((err) => {
                        res.redirect('/');
                        next(err);
                    })

                .catch((err) => {
                    next(err);
                });
            }
        });
});


module.exports = router;