app.controller('apiListCtrl', ['$scope', '$http', '$state', '$location', 'isLogin', 'user', '$cookies', 'api',
    function ($scope, $http, $state, $location, isLogin, user, $cookies, api) {
        var url = $location.url();
        var path = url.split('/');
        var appKey = path[4];
        $scope.appKey = appKey;
        console.log($scope.appKey);
        // var data = {
        //     type: 0,
        //     page: 1,
        //     pageSize: 10
        // }
        // $scope.currentPage = 0;
        // $scope.totalItems = 1;
        // function getServerList(data){
        //     api.getServerList(data).then(function(res){
        //         console.log(res.data.data);
        //         $scope.appList = res.data.data.results;
        //         $scope.totalItems = res.data.data.totalSize;
        //     })
        // }
        // getServerList(data);
        // $scope.pageChanged = function(index) {
        //     data.page = index;
        //     getServerList(data);
    // };
}]);
