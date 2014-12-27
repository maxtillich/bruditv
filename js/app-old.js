var app = angular.module("BrudiTvApp", ["firebase"]);

app.controller("BrudiAdminCtrl", function($scope, $firebase) {
  var ref = new Firebase("https://bruditv.firebaseio.com/videos");
  var sync = $firebase(ref);
  $scope.videos = sync.$asArray();

  $scope.addVideo = function(ytid, title, artist, starttime, endtime) {
    var dateAdded = Math.floor(new Date().getTime() / 1000);
    $scope.videos.$add({ytid: ytid, title: title, artist: artist, starttime: starttime, endtime: endtime, dateadded: dateAdded});
  }
});

app.controller("BrudiPlayerCtrl", function($scope, $firebase, $sce) {
  var ref = new Firebase("https://bruditv.firebaseio.com/videos");
  var sync = $firebase(ref);

  ref.on("value", function(snapshot) {
    var i = 0;
    var rand = Math.floor(Math.random() * snapshot.numChildren());
    snapshot.forEach(function(snapshot) {
      if (i == rand) {
        randomVideo = snapshot.val();
        console.log(randomVideo);

        $scope.randomTitle = randomVideo.title;
        $scope.randomArtist = randomVideo.artist;

        if(randomVideo.starttime) {
          startTimeHuman = randomVideo.starttime.split(':');
          startTimeSeconds = startTimeHuman[0]*60 + parseInt(startTimeHuman[1], 10);
        } else {
          startTimeSeconds = "";
        }

        if(randomVideo.endtime) {
          endTimeHuman = randomVideo.endtime.split(':');
          endTimeSeconds = endTimeHuman[0]*60 + parseInt(endTimeHuman[1], 10);
        } else {
          endTimeSeconds = "";
        }

        $scope.randomURL = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + randomVideo.ytid + "?version=3;autoplay=1;start=" + startTimeSeconds + ";end=" + endTimeSeconds + "color=white;hl=en_US;enablejsapi=1;rel=0;modestbranding=1;autohide=1;showinfo=0;controls=0;iv_load_policy=3");
        $scope.$apply();
      }
      i++;
    });
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
});