app.controller('hostDetailCtrl', ['$scope', '$http', '$state', '$location', 'isLogin', 'user', '$cookies', 'api',
    function ($scope, $http, $state, $location, isLogin, user, $cookies, api) {
        var url = $location.url();
        var path = url.split('/');
        var id = path[4];
        var params = {
            id: id
        }
        function hostDetail(params){
          console.log(params);
            api.hostDetail(params).then(function (res){
              console.log(res);
              if (res.success) {
                $scope.hostDetail = res.data;
                // $location.path('/server/server/appList/'+appKey);
              }
            })
        };
        hostDetail(params);
}]);
