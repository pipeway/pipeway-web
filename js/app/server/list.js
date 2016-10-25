app.controller('ServerListCtrl', ['$scope', '$http', '$state', 'isLogin', 'user', '$cookies', 'api',
    function ($scope, $http, $state, isLogin, user, $cookies, api) {
    var data = {
        type: 1,
        page: 1,
        pageSize: 10
    }
    $scope.currentPage = 0;
    $scope.totalItems = 1;
    $scope.pages = true;
    function getServerList(data){
        api.getServerList(data).then(function(res){
          console.log(res.data);
          if(res.data.totalSize < 11){
            $scope.pages = false;
          }
            $scope.appList = res.data.results;
            $scope.totalItems = res.data.totalSize;
        })
    }
    getServerList(data);
    $scope.pageChanged = function(index) {
        data.page = index;
        getServerList(data);
    };
}]);
