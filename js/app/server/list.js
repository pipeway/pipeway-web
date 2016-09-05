app.controller('ServerListCtrl', ['$scope', '$http', '$state', 'isLogin', 'user', '$cookies', 'api',
    function ($scope, $http, $state, isLogin, user, $cookies, api) {
    var data = {
        type: 1,
        page: 1,
        pageSize: 10
    }
    $scope.currentPage = 0;
    $scope.totalItems = 1;
    function getServerList(data){
        api.getServerList(data).then(function(res){
            console.log(res.data.data);
            $scope.appList = res.data.data.results;
            $scope.totalItems = res.data.data.totalSize;
        })
    }
    getServerList(data);
    $scope.pageChanged = function(index) {
        data.page = index;
        getServerList(data);
    };
}]);
