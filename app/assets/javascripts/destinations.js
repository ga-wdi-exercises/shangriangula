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
  ]);

  function RouterFunction($stateProvider){
    $stateProvider
    .state("index", {
      url: "/",
      templateUrl: "ng-views/destination.index.html"
    })
    .state("show", {
      url: "/:id"
    });
  }

})();
