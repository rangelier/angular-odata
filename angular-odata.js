(function () {
    "use strict";

    /**
     * This module provides support for odata requests when using $resource in angular js.
     * Copyright (c) 2014 Code Fabriek
     */
    var odata = angular.module("codefabriek.odata", []);

    /**
     * Configure the odata settings.
     */
    odata.provider("$odata", [function () {
        var $routePrefix;

        this.routePrefix = function (prefix) {
            if (prefix) {
                $routePrefix = prefix;
                return this;
            }

            return $routePrefix;
        };

        this.$get = [function () {
            return {
                routePrefix: this.routePrefix()
            }
        }];
    }]);
    /**
     * Handles the outgoing $resource requests and transforms the parameters to odata compatible format.
     * The build-in $odataProvider is used to intercept requests to url's that contain the configured route prefix.
     */
    odata.factory("odataInterceptor", ["$odata", function ($odata) {
        if (!$odata || !angular.isString($odata.routePrefix))
            throw new Error("no route prefix is specified!");

        var odataInterceptorFactory = {};

        var _request = function (config) {
            if (config.method === "GET" && config.url.indexOf($odata.routePrefix) !== -1) {
                var params = {};

                for (var prop in config.params) {
                    var value = config.params[prop];

                    if (angular.isDefined(value))
                        params["$" + prop] = value;
                }

                config.params = params;
            }

            return config;
        };

        odataInterceptorFactory.request = _request;

        return odataInterceptorFactory;
    }]);
})();
