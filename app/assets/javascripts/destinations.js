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
      url: "/:id"
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
  }

  function destFormFunction(Destination){
    return{
      templateUrl: "ng-views/destination.form.html"
    }
  }

})();
