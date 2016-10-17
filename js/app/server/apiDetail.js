app.controller('apiDetailCtrl', ['$scope', '$http', '$state', '$location', 'isLogin', 'user', '$cookies', 'api',
    function ($scope, $http, $state, $location, isLogin, user, $cookies, api) {
        var url = $location.url();
        var path = url.split('/');
        var id = path[4];
        var params = {
            id: id
        }
        function apiDetail(params){
          console.log(params);
            api.apiDetail(params).then(function (res){
              if (res.success) {
                $scope.apiDetail = res.data;
                // $location.path('/server/server/appList/'+appKey);
              }
            })
        };
        apiDetail(params);
}]);
