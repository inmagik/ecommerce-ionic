(function(){
"use strict";

angular.module('app.permissions', ['permission'])

.run(function (Permission, $rootScope) {
  
  // Example: Define anonymous role based on $rootScope "user" property
  Permission.defineRole('logged', function () {
    // If the returned value is *truthy* then the user has the role, otherwise they don't
    if (!$rootScope.user) {
      return false; // Is anonymous
    }
    return true;
  });

  // Example: "logged" role based on satellizer API.
  // To use it inject $auth into run function
  /*
  
  Permission.defineRole('logged', function () {
    $auth.isAuthenticated()
  });
  
  */

});

})();