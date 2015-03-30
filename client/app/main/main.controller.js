'use strict';

angular.module('churchAttenApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.awesomeThings = [];
    $scope.todayDate = new Date();

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing, phone:"", group:0, today:Date.now(), count:1 });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.updateThing = function(thing) {

      $http.put('/api/things/' + thing._id, {today:Date.now(), count:thing.count+1});
    };

    $scope.groupThing = function(thing) {
      $http.put('/api/things/' + thing._id, {group:thing.group});
    };

    $scope.removeThing = function(thing) {

      $http.put('/api/things/' + thing._id, {today:null, count:thing.count-1});
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
