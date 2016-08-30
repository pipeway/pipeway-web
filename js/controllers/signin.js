'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', '$cookies', '$cookieStore', 'api',
    function($scope, $http, $state, $cookies, $cookieStore, api) {
        $scope.authError = null;
        $scope.login = function(store) {
            $scope.authError = null;
            api.signIn('/pipeway/v1/signin', store).then(function(res) {
                if (res.success) {
                    $state.go('apps.note');
                } else {
                    $scope.authError = '用户名或密码错误';
                }
            }).catch(function(r) {
                $scope.authError = 'Server Error';
            })
            console.log(api);
          // $http.post('/api/v1/signin', param(store), {headers: WWW_FORM_HEADER})
          //   .then(function(response) {
          //       console.log(response);
          //       if ( !response.data.success) {
          //         $scope.authError = 'Email or Password not right';
          //       }else{
          //            $cookies['token'] = response.data.data.token;
          //            $state.go('apps.note');
          //            // var now = (new Date() - 0) + 60*24*30*60*1000;
          //            // var exp = new Date(now);
          //       }
          //   }, function(x) {
          //       $scope.authError = 'Server Error';
          //   });
        };
  }]);

