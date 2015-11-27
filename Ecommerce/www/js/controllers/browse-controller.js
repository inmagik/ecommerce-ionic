(function(){
"use strict";

angular.module('app')
.controller('BrowseCtrl', BrowseCtrl);

function BrowseCtrl($scope, $rootScope, DataService, ionicMaterialMotion, ionicMaterialInk, $timeout){
    ionicMaterialInk.displayEffect()
    DataService.getProducts()
    .then(function(products){
        $scope.products = products;
        $timeout(function () {
            ionicMaterialMotion.ripple();
        }, 100);
    })
};


})();