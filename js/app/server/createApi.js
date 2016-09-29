app.controller('createApiCtrl', ['$scope', '$http', '$state', '$location', 'isLogin', 'user', '$cookies', 'api',
    function ($scope, $http, $state, $location, isLogin, user, $cookies, api) {
        var url = $location.url();
        var path = url.split('/');
        var appKey = path[4];
        $scope.params = {
            parentAppkey: appKey
        }
        $scope.createApi = function (params){
            api.createApi(params).then(function (res){
              console.log(res);
              if (res.success) {
                console.log('成功');
                $state.go('server.apiList');
              }
              // if(res.success){
              //   alert(res.data.msg);
              //   $scope.params.name = '';
              //   $scope.params.serial = '';
              //   $scope.params.description = '';
              //   $scope.params.hostGroup = '';
              //   }
              //   else{
              //     alert(res.data.msg);
              //   }
              // });
            })
        };
}]);
