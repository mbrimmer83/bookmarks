var express = require('express');
var mongoose = require('mongoose');
var mongoCreds = require('./cred.json');
var ObjectID = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var cors = require('cors');
//Mongo database
mongoose.connect('mongodb://' + mongoCreds.username + ':' + mongoCreds.password + '@ds029745.mlab.com:29745/matts-bookmarks');
var Bookmark = require('./bookmarkmodel');
var app = express();
app.use(bodyParser.json());
app.use(cors());

//Request for bookmarks sends to client
app.get('/bookmark', function(req, res) {
  Bookmark.findOne({ _id: '123456789'}, function (err, bookmarks) {
    if (err) {
      console.log(err.message);
      return;
    }
    res.json({bookmarks: bookmarks.bookmarks});
  });
});
// app.post('/bookmark', function(req, res) {
//   var id = new ObjectID();
//   var bookmark = new Bookmark ({
//     _id: '123456789',
//     bookmarks: [
//       {
//         _id: id,
//         name: 'DigitalCrafts',
//         url: 'http://www.digitalcrafts.com/',
//         clicks: 0,
//         description: 'DigitalCrafts Coding Bootcamp'
//       }
//     ]
//   });
//   bookmark.save(function(err){
//     if (err) {
//       console.log(err.message);
//       return;
//     }
//     console.log('Saved', bookmark);
//   });
// });
// Updates bookmarks with changes from client
app.post('/bookmark', function(req, res) {
  var userInfo = req.body;
  var id = new ObjectID();
  var bookmark = {
    _id: id,
    name: userInfo.bookmark.name,
    url: userInfo.bookmark.url,
    clicks: 0,
    description: userInfo.bookmark.description
  };
  Bookmark.findOne({ _id: "123456789"}, function(err, theBookmarks) {
    if (!theBookmarks) {
      console.log("Bookmarks not found!");
      return;
    }
    theBookmarks.bookmarks.push(bookmark);
    theBookmarks.save(function(err, reply) {
      if (err) {
        res.json({ status: "Fail", error: err.message });
        console.log(err.message);
        return;
      }
      console.log('Updated succeeded', reply);
      res.json({
        status:"OK"
      });
    });
  });
});
// Removes a bookmark
app.post('/removeBookmark', function (req, res) {
  var id = req.body.id;
  Bookmark.findOne({ _id: '123456789'}, function (err, bookmarks) {
    if (err) {
      console.log(err.message);
      return;
    }
    var arr = bookmarks.bookmarks;
    var attr = "_id:";
    var idx = getAttrId(arr, attr, id);
    bookmarks.bookmarks.splice(idx, 1);
    bookmarks.save(function(err, reply) {
      if (err) {
        res.json({ status: "Fail", error: err.message });
        console.log(err.message);
        return;
      }
      console.log('Updated succeeded');
      res.json({
        status:"OK"
      });
    });
  });
});
// Updates the clicks
app.post('/updateClicks', function (req, res) {
  var clicks = req.body.clicks + 1;
  var id = req.body.id;
  var theBookmark = {
    _id: req.body.id,
    name: req.body.name,
    url: req.body.url,
    clicks: clicks,
    description: req.body.description
  };
  Bookmark.findOne({ _id: '123456789'}, function (err, bookmarks) {
    if (err) {
      console.log(err.message);
      return;
    }
    var arr = bookmarks.bookmarks;
    var attr = "_id:";
    var idx = getAttrId(arr, attr, id);
    bookmarks.bookmarks[idx] = theBookmark;
    bookmarks.save(function(err, reply) {
      if (err) {
        res.json({ status: "Fail", error: err.message });
        console.log(err.message);
        return;
      }
      console.log('Updated succeeded');
      res.json({
        status:"OK"
      });
    });
  });

});
//Get index element by attribute
function getAttrId(arr, attr, id) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]._id === id) {
      return i;
    }
  }
}

app.listen(8000, function() {
  console.log('Listening on port 8000!');
});
