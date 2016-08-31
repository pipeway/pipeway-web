/**
 * Created by tangtangli on 16/4/1.
 */
'use strict';
angular.module('app').service('user', ['$http', '$cookies', user]);

function user($http, $cookies) {
    function myself() {
        return $http.get('/pipeway/v1/user/MYSELF').then(function (res) {
            return res.data;
        });
    }
    return {
        myself: myself
    };
}