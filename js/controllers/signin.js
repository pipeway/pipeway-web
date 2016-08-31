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
                    $cookies['token'] = res.data.token;
                    $state.go('apps.note');
                } else {
                    $scope.authError = '用户名或密码错误';
                }
            }).catch(function(r) {
                $scope.authError = 'Server Error';
            });
        };
  }]);

