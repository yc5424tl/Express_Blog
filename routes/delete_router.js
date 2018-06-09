

const learnedTable = require('../models/learnedModel.js');
const heardTable   = require('../models/heardModel.js');
const thoughtTable = require('../models/thoughtModel.js');
const watchedTable = require('../models/watchedModel.js');


let express = require('express');
let router = express.Router();


router.delete('/heard/:_id', function(req, res) {

    let postID = req.params._id;

    heardTable.findByIdAndDelete()
})