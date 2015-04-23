angular.module('lunchCorgi.event', [])

.controller('eventController', function($scope, $location, Event, Events){
  $scope.event = {};

  $scope.loadEvent = function(){
    Event.loadEvent($scope)
  }

  $scope.loadEvents = function() {
    $location.path('/')
  }

  $scope.loadEvent();

  $scope.createMap = function(){
    // fake data
    // return Event.createMap(30.2958, -97.8101, "map-canvas", $scope)
    // real data will look something like this
    return Event.createMap($scope.event.lat, $scope.event.lng, "map-canvas", $scope)
  }

  $scope.createMap();
})

.controller('chatCtrl',function($scope, $window, Event){
  $scope.test = "works"
  $scope.chats=[{messagekey:'test',username:'vis'}];
  $scope.loadchats = function(){
    console.log('start')
    Event.getChat(
      function(value){$scope.chats =value.data;
        console.log($scope.chats);
    });

  }
  $scope.init =function(){
    $scope.loadchats()
    setInterval($scope.loadchats,10000)
  }
  $scope.sendmessage =function(){
    var userToken = $window.localStorage.getItem('com.corgi')
    Event.sendChat(userToken,$scope.textinput,function(){
      $scope.loadchats();
    })
  }
  $scope.init()
})
