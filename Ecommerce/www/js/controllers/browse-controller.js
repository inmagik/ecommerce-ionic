(function(){
"use strict";

angular.module('app')
.controller('BrowseCtrl', BrowseCtrl);

function BrowseCtrl($scope, $rootScope, DataService){
    DataService.getProducts()
    .then(function(products){
        $scope.products = products;
    })
};


})();