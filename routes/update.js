

const learnedTable = require('../models/learnedModel.js');
const heardTable   = require('../models/heardModel.js');
const thoughtTable = require('../models/thoughtModel.js');
const watchedTable = require('../models/watchedModel.js');


let express = require('express');
let router = express.Router();


router.get('/heard/:_id', function(req, res, next) {
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


router.post('/heard/:_id', function(req, res, next) {

    heardTable.findById(req.params._id)
        .then((post) => {
            if (post) {

                if (req.params.post_title && req.params.post_body) {

                    post.post_title = req.params.post_title;
                    post.post_body = req.params.post_body;

                    if (req.params.post_artist) {
                        post.post_artist = req.params.post_artist;
                    }

                    if (req.params.post_album) {
                        post.post_album = req.params.post_album;
                    }

                    if (req.params.post_track) {
                        post.post_track = req.params.post_track;
                    }

                    if (req.params.post_url_link) {
                        post.post_url_link = req.params.post_url_link;
                    }

                    if (req.params.user_rating) {
                        post.user_rating = req.params.user_rating
                    }

                    post.save().then((updatedPost) => {
                        res.render('../views/templates/view_single/heard.hbs', {post: updatedPost});
                    })
                        .catch((err) => {
                            next(err);
                        });
                }
            }
        })
        .catch((err) => {
            next(err);
        });
});


router.get('/learned/:_id', function(req, res, next) {
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


router.post('/learned/:_id', function(req, res, next) {

    learnedTable.findById(req.params._id)
        .then((post) => {
            if(post) {
                if (req.params.post_title && req.params.post_body) {

                    post.post_title = req.params.post_title;
                    post.post_body = req.params.post_body;

                    post.save().then((updatedPost) => {
                        res.render('../views/templates/view_single/learned.hbs', {post: updatedPost});
                    })
                        .catch((err) => {
                            next(err);
                        });
                }
            }
        })
        .catch((err) => {
            next(err);
        });
});


router.get('/thought/:_id', function(req, res, next) {
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


router.post('/thought/:_id', function(req, res, next) {
    thoughtTable.findById(req.params._id)
        .then((post) => {
            if (post) {
                if (req.params.post_title && req.params.post_body) {

                    post.post_title = req.params.post_title;
                    post.post_body = req.params.post_body;

                    post.save().then((updatedPost) => {
                        res.render('../views/templates/view_single/thought.hbs', {post: updatedPost});
                    })
                        .catch((err) => {
                            next(err);
                        });
                }
            }
        })
        .catch((err) => {
            next(err);
        });
});


router.get('/watched/:_id', function(req, res, next) {
    watchedTable.findById(req.params._id)
        .then((post) => {
            if(post) {
                res.render('../views/templates/update_forms/watched.hbs', { post: post });
            }
            else {
                next();
            }
        })
        .catch((err) => {
            next(err);
        });
});


router.post('/watched/:_id', function(req, res, next) {
    watchedTable.findById(req.params._id)
        .then((post) => {
            if(post) {
                if (req.params.post_title && req.params.post_body) {

                    post.post_title = req.params.post_title;
                    post.post_body = req.params.post_body;

                    if(req.params.post_url_link) {
                        post.post_url_link = req.params.post_url_link;
                    }

                    if(req.params.post_file_uri) {
                        post.post_file_uri = req.params.post_file_uri;
                    }

                    post.save().then((updatedPost) => {
                        res.render('../views/templates/view_single/watched.hbs', { post: updatedPost });
                    })
                        .catch((err) => {
                            next(err);
                        });
                }
            }
        })
        .catch((err) => {
            next(err);
        });
});


module.exports = router;