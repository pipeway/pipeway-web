'use strict';
angular.module('app')
    .factory('isLogin', function ($cookies) {
         return function () {
            var token = $cookies['token'];
            if(!token) {
                $state.go('access.signin');
            }
        };
    });
