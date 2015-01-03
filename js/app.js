var app = angular.module("BrudiTvApp", ["firebase"]);

app.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
  var ref = new Firebase("https://bruditv.firebaseio.com/");
  return $firebaseAuth(ref);
}]);

app.controller("BrudiAdminCtrl", ["$scope", "Auth", "$firebase", function($scope, Auth, $firebase) {
  var authref = new Firebase("https://bruditv.firebaseio.com/");
  var ref = new Firebase("https://bruditv.firebaseio.com/videos");
  var sync = $firebase(ref);
  $scope.videos = sync.$asArray();

  $scope.auth = Auth;
  $scope.user = $scope.auth.$getAuth();

  $scope.authAdmin = function(adminEmail, adminPassword) {
    authref.authWithPassword({
      email    : adminEmail,
      password : adminPassword
    }, function(error, authData) {
      if(error) {
        alert("auth issue");
      } else {
        $scope.auth = Auth;
        $scope.user = $scope.auth.$getAuth();
        $scope.$apply();
      }
    });
  }

  $scope.addVideo = function(ytid, title, artist, starttime, endtime) {
    var dateAdded = Math.floor(new Date().getTime() / 1000);
    if(starttime === "") {
      starttime = "00:01";
    }
    $scope.videos.$add({ytid: ytid, title: title, artist: artist, starttime: starttime, endtime: endtime, dateadded: dateAdded});
  }
}]);

app.controller("BrudiPlayerCtrl", function($scope, $firebase, $sce, $timeout) {
  var ref = new Firebase("https://bruditv.firebaseio.com/videos");
  var sync = $firebase(ref);

  $scope.next = function() {
    $scope.callAtTimeout = function(status) {
      if(status === 'show') {
        $scope.showAnnouncement = true;
      }
      if(status === 'hide') {
        $scope.showAnnouncement = false;
      }
    }
    $timeout(function(){ $scope.callAtTimeout('show'); }, 3500);
    $timeout(function(){ $scope.callAtTimeout('hide'); }, 8000);

    var oldrand = rand || -1;
    var rand = Math.floor(Math.random() * $scope.snapshot.numChildren());
    while(rand == oldrand) { // Damit wir nicht das letzte nochmal haben
      rand = Math.floor(Math.random() * $scope.snapshot.numChildren());
    }
    var i = 0;
    $scope.snapshot.forEach(function(snapshot) {
      if (i == rand) {
        randomVideo = snapshot.val();

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

        $scope.randomURL = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + randomVideo.ytid + "?version=3;autoplay=1;start=" + startTimeSeconds + ";end=" + endTimeSeconds + "color=white;disablekb=1;hl=en_US;enablejsapi=1;rel=0;modestbranding=1;autohide=1;showinfo=0;controls=0;iv_load_policy=3;origin=http://brudi.local");
        $scope.$apply();
      }
      i++;
    });
    if($scope.tiktok) {
      $timeout.cancel($scope.tiktok);
    }
    $scope.tiktok = $timeout($scope.next, (endTimeSeconds - startTimeSeconds) * 1000);
  };
    
  ref.once("value", function(snapshot) { // Sonst laedt er jedes mal neu, wenn es einen neuen Eintrag in Firebase gibt
      $scope.snapshot = snapshot;
      $scope.next();
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  // SKIP KEYBOARD
  $scope.keyup = function(keyEvent) {
    if((keyEvent.which === 39) || (keyEvent.which === 32) || (keyEvent.which === 13) || (keyEvent.which === 78)) {
      $scope.next();
    }
  };
  
});

