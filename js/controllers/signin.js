'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', '$cookies', '$cookieStore', '$location', 'api',
    function($scope, $http, $state, $cookies, $cookieStore, $location, api) {
        $scope.authError = null;
        $scope.Login = '登录中……';
        $scope.login = function(store) {
            $scope.authError = null;
            api.loginConfig().then(function(res) {

                if (res) {
                   window.location.href = res.loginUrl;
                }
                console.log(res);
                /*if (res.success) {
                    $cookies['token'] = res.data.token;
                    $state.go('client.list');
                } else {
                    $scope.authError = '用户名或密码错误';
                }*/
            }).catch(function(r) {
                $scope.authError = 'Server Error';
            });
            return;
        };
        function isOwnEmpty (obj){
            for(var name in obj) {
                if(obj.hasOwnProperty(name)) {
                    return false;
                }
            }
            return true;
        }

        var token = window.location.search;
        if (token) {
            $scope.Login = '登录中……';
            sessionStorage.setItem('token', token.slice(7));
            setTimeout(function () {
                $state.go('dashboard.home');
                //window.location.href = window.location.origin + '/table';
            }, 2000);
        } else {
            $scope.Login = '登录失败';
            setTimeout(function () {
                 $scope.login();
            }, 2000);
            return false;
        }

  }]);
