(function(){
"use strict";

angular.module('app')
.controller('CategoryCtrl', CategoryCtrl);

function CategoryCtrl($scope, $rootScope, DataService, ionicMaterialMotion, ionicMaterialInk, $timeout, $stateParams){
    ionicMaterialInk.displayEffect()

    //this comes from rootScope
    $rootScope.$watch('shop', function(nv){
        if(!nv) return;
        $timeout(function(){
            setup();
        })
    })

    function setup(){
        $scope.category =  $rootScope.categoriesById[$stateParams.categoryId];
        console.log(1, $rootScope.categoriesById)
        
        DataService.getProductsForCategory($stateParams.categoryId)
        .then(function(products){
            $scope.products = products;
            $timeout(function () {
                ionicMaterialMotion.ripple();
            }, 100);
        })
    }
};


})();