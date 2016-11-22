'use strict';
angular.module('app')
    .factory('appKey', function ($location) {
        var url = $location.url();
        console.log(url);
        var path = url.split('/');
        var appKey = path[3];
        return appKey
    });
