
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let HeardSchema = new Schema({
    post_author:    {type: String, required: true},
    post_title:     {type: String, required: true},
    post_body:      {type: String, required: true},
    date_created:   {type: Date,   required: true},
    date_last_edit: {type: Date,   required: false},
    post_artist:    {type: String, required: false},
    post_album:     {type: String, required: false},
    post_track:     {type: String, required: false},
    post_url_link:  {type: String, required: false},
    user_rating:    {type: Number, required: false, min: 0, max: 10}
});

let HeardPosts = mongoose.model('HeardPost', HeardSchema);

HeardSchema.virtual('url').get(function() {
    return '/heard/' + this._id;
});


//module.exports = mongoose.model('Heard', HeardSchema);
module.exports = HeardPosts;