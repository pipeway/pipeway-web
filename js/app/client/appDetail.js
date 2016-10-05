app.controller('appDetailCtrl', ['$scope', '$http', '$state', '$location', 'isLogin', 'user', '$cookies', 'api',
    function ($scope, $http, $state, $location, isLogin, user, $cookies, api) {
      //获取appkey的值
      var url = $location.url();
      var path = url.split('/');
      console.log(path);
      var appKey = path[3];
      $scope.appKey = appKey;
      console.log($scope.appKey);

        var params = {
            appKey:appKey
        }
        function appDetail(data){
            api.getAppDetail(data).then(function (res){
              console.log(res);
              if (res.data.success) {
                $scope.appDetail = res.data.data;
                // $location.path('/server/server/appList/'+appKey);
              }
            })
        };
        appDetail(params);
}]);
