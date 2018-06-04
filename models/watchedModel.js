
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let WatchedSchema = new Schema({
    post_author:    {type: String, required: true},
    post_title:     {type: String, required: true},
    post_body:      {type: String, required: true},
    date_created:   {type: Date, required: true},
    date_last_edit: {type: Date, required: false},
    post_url_link:  {type: String, required: false},
    post_file_uri:  {type: String, required: false},
    }, {
    timestamps: true
});

let WatchedPosts = mongoose.model('WatchedPosts', WatchedSchema);

WatchedSchema.virtual('url').get(function() {
    return '/watched/' + this._id;
});

module.exports = WatchedPosts;