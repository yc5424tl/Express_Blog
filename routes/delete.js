

const learnedTable = require('../models/learnedModel.js');
const heardTable   = require('../models/heardModel.js');
const thoughtTable = require('../models/thoughtModel.js');
const watchedTable = require('../models/watchedModel.js');


let express = require('express');
let router = express.Router();


router.delete('/heard/:_id', function(req, res) {

    heardTable.findByIdAndDelete(req.params._id, (err, post) => {
        res.render('../views/templates/delete/post.hbs', { post: post })
            .catch((err) => {
                next(err);
            });
        });
    });


router.delete('/learned/:_id', function(req, res) {

    learnedTable.findByIdAndDelete(req.params._id, (err, post) => {
        res.render('../views/templates/delete/post.hbs', { post: post })
            .catch((err) => {
                next(err);
            });
        });
    });

router.post('/thought/:_id', function(req, res) {

    thoughtTable.findByIdAndDelete(req.params._id, (err, post) => {
        res.render('../views/templates/delete/post.hbs', { post: post })
            .catch((err) => {
                next(err);
            });
        });
    });

router.post('/watched/:_id', function(req, res) {

    watchedTable.findByIdAndDelete(req.params._id, (err, post) => {
        res.render('../views/templates/delete/post.hbs', { post: post })
            .catch((err) => {
                next(err);
            });
        });
    });

module.exports = router;