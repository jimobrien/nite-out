'use strict';

angular.module('nite-out.events', ['ui.router'])

// Configure out state using ui.router
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
    .state('main.events', {
      url: '/events',
      templateUrl: 'app/events/events.html',
      controller: 'EventsController'
    });
}])

.controller('EventsController', ['$scope', 'Events', 'Mapper', function($scope, Events, Mapper){
  $scope.events = Events.events;
  
  // Fetch our events to update $scope.events
  Events.getEvents(94102);

  $scope.places = [];

  // let $scope.map be the initial interface object for the google-map directive
  // Mapper.init is the default object for setup
  // for changing options go to: https://angular-ui.github.io/angular-google-maps/#!/api
  $scope.map = Mapper.init;

  // setting map options through the google-map directive interface
  $scope.setCenter = function(event){
    // async Geocoder API call
    var address = event.event.venue.address + ',' + event.event.venue.city;
    Mapper.setCenter(address);
  };

  $scope.select = function(place){
    $scope.setCenter(place.vicinity);
    window.scrollTo(0,0);
    console.log('you selected', place.name);
  };

  // takes args: ('type of establishment', optional radius in meters, optional callback())
  $scope.renderListOfPlaces = function(){
    $scope.places = Mapper.getLocations();
  };

  window.doStuff = function(){
    $scope.$apply(function(){
      $scope.places = Mapper.getLocations();
    });
    $scope.renderListOfPlaces();
  };

}]);

