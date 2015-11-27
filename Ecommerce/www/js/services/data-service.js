(function(){
"use strict";

angular.module("app")
.factory('DataServiceRestangular', DataServiceRestangular)

function DataServiceRestangular(Restangular, baseServerUrl){
    return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(baseServerUrl);

        // Configuration of httpFields
        
        RestangularConfigurer.setDefaultHttpFields({
            'withCredentials': false
        });

        /* Custom response extractor for Restangular  */
        /* This one plays well with djangorestframework */
        
        RestangularConfigurer.setResponseExtractor(function(response, operation, what, url) {
        var newResponse;
        if (operation === "getList") {
            newResponse = response.results != undefined ? response.results : response;
            newResponse.metadata = {
                count : response.count,
                next : response.next,
                previous : response.previous,
                number : response.number,
            }
        } else {
            newResponse = response;
        }
            return newResponse;
        });
        
        
        /* Restangular requestSuffix, appended to all urls -- plays well with django */
        RestangularConfigurer.setRequestSuffix('/?');
        

    });
}

angular.module("app")
.factory('DataService', DataService)


function DataService(DataServiceRestangular, SHOP_ID){
    var svc = {};
    // Example restangular service. See also modules/config/network-config
    // for global restangular config.
    // Can do things like svc.something.one(id).get() or svc.something.getList()
    // and get back restangularized objects.
    
    
    var shops = DataServiceRestangular.service("shops");
    svc.getShop = shops.one(SHOP_ID).get;

    var shopService = DataServiceRestangular.service('products', DataServiceRestangular.one('shops', SHOP_ID));
    svc.getProducts = shopService.getList;

    svc.getProductsForCategory = function(catId){
        return shopService.getList({product_category:catId});
    }

    svc.getProduct = function(prodId){
        return shopService.one(prodId).get()
    }
    

    return svc;
}


})();