
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ThoughtSchema = new Schema({
    post_author:    {type: String, required: true},
    post_title:     {type: String, required: true},
    post_body:      {type: String, required: true},
    date_created:   {type: Date,   required: true},
    date_last_edit: {type: Date}
});

let ThoughtPosts = mongoose.model('ThoughtPost', ThoughtSchema);

ThoughtSchema.virtual('url').get(function() {
    return '/thought/' + this._id;
});

module.exports = ThoughtPosts;