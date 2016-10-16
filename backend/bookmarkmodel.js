var mongoose = require('mongoose');

var Bookmark = mongoose.model('Bookmark', {
  _id: String,
  bookmarks: [
    {
      _id: { type: String, required: true },
      name: String,
      url: String,
      clicks: Number,
      description: String
    }
  ]
});

module.exports = Bookmark;
