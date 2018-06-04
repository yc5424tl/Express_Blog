
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let HeardSchema = new Schema({
    post_author:    {type: String, required: true },
    post_title:     {type: String, required: true,  default: '', trim: true},
    post_body:      {type: String, required: true,  default: '', trim: true},
    date_created:   {type: Date,   required: true,  default: Date.now },
    date_last_edit: {type: Date,   required: false, default: null },
    post_artist:    {type: String, required: false, default: null },
    post_album:     {type: String, required: false, default: null },
    post_track:     {type: String, required: false, default: null },
    post_url_link:  {type: String, required: false, default: null },
    user_rating:    {type: Number, required: false, default: null , min: 0, max: 10}
});

HeardSchema.path('post_title').required(true, 'Post title cannot be blank');
HeardSchema.path('post_body').required(true, 'Post body cannot be blank');

let HeardPosts = mongoose.model('Heard', HeardSchema);

HeardSchema.virtual('url').get(function() {
    return '/heard/' + this._id;
});

module.exports = HeardPosts;
