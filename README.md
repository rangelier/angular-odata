Angular-odata
=============

This module converts *GET* request parameters to the odata format when using $resource.

Configuration
=============
Please register your route prefix in the module.config method.

    var app = angular.modulde("app",["ngResource","codefabriek.odata"]);
    app.config(["$httpProvider","$odataProvider",function($httpProvider, $odataProvider){
       $odataProvider.routePrefix("/odata/");
       $httpProvider.interceptors.push("odataInterceptor");
    }]);

The *GET* request parameters to url's that contain the configured prefix will be converted to odata format.

How to
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

MIT license
=============================
Copyright (c) 2015 Code Fabriek

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

