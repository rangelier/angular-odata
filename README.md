angular-odata
=============

This module converts *GET* request parameters to the odata format when using $resource.

How to
=============
Please register your route prefix in the module.config method.

    var app = angular.modulde("app",["ngResource"]);
    app.config(["$odataProvider",function($odataProvider){
       $odataProvider.routePrefix("/odata/");
    }]);

The *GET* request parameters to url's that contain the configured prefix will be converted to odata format.

Example
=============

    app.factory("fakeResource",["$resource", function($resource){
       return $resource("/api/odata/Product",{
          format: "@format"
       });
    }]);
    app.controller("fakeController",["fakeResource",function(fakeResource){
      $scope.products = [];
      fakeResource.query({format: "application/json"}, function(response){
        $scope.products = response;    
      });
    }]);
    
the actuel GET url will be transformed from:

http://localhost/api/odata/Product?format=application/json

**to**

http://localhost/api/odata/Product?$format=application/json

