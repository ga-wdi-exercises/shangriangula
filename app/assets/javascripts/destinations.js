//= require angular.min
//= require angular-resource.min
//= require angular-ui-router.min

"use strict";

(function(){

  angular
  .module("shangriangula", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("Destination", [
    "$resource",
    destFactoryFunction
  ])
  .controller("indexCtrl", [
    "Destination",
    indexCtrlFunction
  ])
  .controller("showCtrl", [
    "Destination",
    "$stateParams",
    showCtrlFunction
  ])
  .directive("destinationForm", [
    "Destination",
    destFormFunction
  ]);

  function RouterFunction($stateProvider){
    $stateProvider
    .state("index", {
      url: "/",
      templateUrl: "ng-views/destination.index.html",
      controller: "indexCtrl",
      controllerAs: "indexVM"
    })
    .state("show", {
      url: "/:id",
      templateUrl: "ng-views/destination.show.html",
      controller: "showCtrl",
      controllerAs: "showVM"
    });
  }

  function destFactoryFunction($resource){
    var Destination = $resource("/destinations/:id.json", {}, {
      update: {method: "PUT"}
    });
    Destination.all = Destination.query();
    return Destination;
  }

  function indexCtrlFunction(Destination){
    var indexVM = this;
    indexVM.destinations = Destination.all;
    indexVM.newDestination = new Destination();
  }

  function showCtrlFunction(Destination, $stateParams){
    var showVM = this;
    Destination.all.$promise.then(function(){
      Destination.all.forEach(function(destination){
        if(destination.id == $stateParams.id){
          showVM.destination = destination;
        }
      });
    });
  }

  function destFormFunction(Destination){
    return{
      templateUrl: "ng-views/destination.form.html",
      scope: {
        destination:  "=",
        formMethod:   "@"
      },
      link: function(scope){
        scope.create = function(){
          Destination.save(scope.destination, function(response){
            Destination.all.push(response);
          });
        }
        scope.update = function(){
          Destination.update({id: scope.destination.id}, scope.destination, function(response){
            console.log("Successful");
          });
        }
      }
    }
  }

})();
