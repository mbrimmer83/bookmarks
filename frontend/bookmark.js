var app = angular.module('bookmark-app', []);

var API = 'https://bookmarks-iwzyrxfszq.now.sh';

app.factory('backEnd', function($http) {
  return {
    getBookmarks: function() {
      return $http({
        method: 'GET',
        url: API + '/bookmark'
      });
    },
    postClicks: function(data) {
      return $http({
        method: 'POST',
        url: API + '/updateClicks',
        data: data
      });
    },
    postBookmarks: function(data) {
      return $http({
        method: 'POST',
        url: API + '/bookmark',
        data: data
      });
    },
    removeBookmark: function(data) {
      return $http({
        method: 'POST',
        url: API + '/removeBookmark',
        data: data
      });
    }
  };
});

app.controller('MainController', function ($http, $scope, backEnd) {
  backEnd.getBookmarks().then(function(data) {
    $scope.data = data.data;
    var id = data.data.bookmarks.length;
  });

  $scope.addBookmark = function() {
    var bookmark = {
      bookmark: {
      name: $scope.name,
      url: $scope.url,
      description: $scope.description
      }
    };
    console.log(bookmark);
    backEnd.postBookmarks(bookmark).then(function(err, res){
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
      backEnd.getBookmarks().then(function(data) {
        $scope.data = data.data;
      });
    });
  };

  $scope.updateClicks = function(data) {
    bookmarkId = {
      id: data._id,
      name: data.name,
      url: data.url,
      clicks: data.clicks,
      description: data.description
    };
    backEnd.postClicks(bookmarkId).then(function(err, res){
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
      backEnd.getBookmarks().then(function(data) {
        $scope.data = data.data;
      });
    });
  };

  $scope.remove = function(data) {
    bookmarkId = {
      id: data._id,
      name: data.name,
      url: data.url,
      clicks: data.clicks,
      description: data.description
    };
    backEnd.removeBookmark(bookmarkId).then(function(err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
      backEnd.getBookmarks().then(function(data) {
        $scope.data = data.data;
      });
    });
  };
});
