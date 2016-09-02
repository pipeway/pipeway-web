app.controller('createApiCtrl', ['$scope', '$http', '$state', '$location', 'isLogin', 'user', '$cookies', 'api',
    function ($scope, $http, $state, $location, isLogin, user, $cookies, api) {
        var url = $location.url();
        var path = url.split('/');
        console.log(url);
        var appKey = path[4];
        $scope.appKey = appKey;
        $scope.params = {
            parentAppkey: appKey
        }
        $scope.createApi = function (params){
          console.log(params);
            api.createApi(params).then(function (res){
              console.log(res);
              if (res.success) {
                console.log('成功');
                $location.path('/server/server/appList/'+appKey);
              }
            })
        };
}]);