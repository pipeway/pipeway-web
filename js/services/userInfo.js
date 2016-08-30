/**
 * Created by tangtangli on 16/4/1.
 */
'use strict';
angular.module('app').service('user', ['$http', '$cookies', user]);

function user($http, $cookies) {
   function getUserInfo() {
       $http.get('/api/v1/user/MYSELF').then(function (response) {
           console.log(response.data.data);
           $cookies['role'] = response.data.data.role;
       });
   }
    getUserInfo();
}