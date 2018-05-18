
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let LearnedSchema = new Schema({
    post_author:    {type: String, required: true},
    post_title:     {type: String, required: true},
    post_body:      {type: String, required: true},
    date_created:   {type: Date,   required: true},
    date_last_edit: {type: Date}
});

let LearnedPosts = mongoose.model('LearnedPost', LearnedSchema);

LearnedSchema.virtual('url').get(function() {
    return '/learned/' + this._id;
});


// module.exports = mongoose.model('Learned', LearnedSchema);
module.exports = LearnedPosts;