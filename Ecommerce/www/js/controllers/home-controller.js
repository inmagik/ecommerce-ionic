(function(){
"use strict";

angular.module('app')
.controller('HomeCtrl', HomeCtrl);

function HomeCtrl($scope, $rootScope, DataService){
    DataService.getShop()
    .then(function(shop){
        $scope.shop = shop;
    })
};


})();