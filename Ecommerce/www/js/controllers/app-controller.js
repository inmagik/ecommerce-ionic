(function(){
"use strict";

angular.module('app')
.controller('AppCtrl', AppCtrl);

function AppCtrl($scope, $rootScope, $timeout, DataService){

    $rootScope.user = null;

    $scope.logout = function(){
        $rootScope.user = null;
        $rootScope.$broadcast("app:logoutSuccess");
    };

    // An example implementation of login/logout helpers
    // To use them, $auth must be injected into controller

    /*
    $scope.logged = $auth.isAuthenticated();
    $scope.$on("app:loginSuccess", function(){
        $scope.logged = true;
    });
    $scope.logout = function(){
        $auth.logout()
        $rootScope.$broadcast("app:logoutSuccess");
        $scope.logged = false;
    };
    */
    $rootScope.categoriesById = {};

    DataService.getShop()
    .then(function(shop){
        var categoriesById = {};
        $rootScope.shop = shop;
        console.log(1, shop)
        _.each(shop.product_categories, function(cat){
            console.log(2, cat)
            categoriesById[cat.id] = cat;
        })
        $timeout(function(){
            $rootScope.categoriesById = categoriesById;
            console.log(3, $rootScope.categoriesById)
        })
    });

};


})();