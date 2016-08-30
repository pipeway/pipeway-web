'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', '$cookies', '$cookieStore', function($scope, $http, $state, $cookies, $cookieStore) {
    $scope.store = {
        // loginName: 'root',
        // password: 'root'
    };
    $scope.authError = null;
    var WWW_FORM_HEADER = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    $scope.login = function(store) {
      $scope.authError = null;
      // Try to login
      $http.post('/api/v1/signin', param(store), {headers: WWW_FORM_HEADER})
        .then(function(response) {
            console.log(response);
            if ( !response.data.success) {
              $scope.authError = 'Email or Password not right';
            }else{
                 $cookies['token'] = response.data.data.token;
                 $state.go('apps.note');
                 // var now = (new Date() - 0) + 60*24*30*60*1000;
                 // var exp = new Date(now);
            }
        }, function(x) {
            $scope.authError = 'Server Error';
        });
    };
    function param(obj) {
      var str = [];
      for (var p in obj) {
          if (obj.hasOwnProperty(p)) {
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
      }
      return str.join("&");
    }
  }])
;

