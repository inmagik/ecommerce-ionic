(function(){
"use strict";

angular.module('app')
.controller('ProductCtrl', ProductCtrl);

function ProductCtrl($scope, $rootScope, DataService, ionicMaterialMotion, ionicMaterialInk, $timeout, $stateParams){
    ionicMaterialInk.displayEffect()

    //this comes from rootScope
    $rootScope.$watch('shop', function(nv){
        if(!nv) return;
        $timeout(function(){
            setup();
        })
    })

    function setup(){
        
        DataService.getProduct($stateParams.productId)
        .then(function(product){
            $scope.product = product;
            $timeout(function () {
                ionicMaterialMotion.ripple();
            }, 100);
        })
    }
};


})();