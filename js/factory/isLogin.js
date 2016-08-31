'use strict';
angular.module('app')
    .factory('isLogin', function ($cookies, $state) {
         return function () {
            var token = $cookies['token'];
            if(!token) {
                $state.go('access.signin');
            }
        };
    });
