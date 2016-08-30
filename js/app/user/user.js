app.controller('UserCtrl', ['$scope', '$http', '$state', 'isLogin', '$log', function ($scope, $http, $state, isLogin, $log) {
    isLogin();
    var params = {
        page: 0,
        pageSize: 10
    };
    $scope.currentPage = 0;
    $scope.totalItems = 1;
    var api = {
        addRelease: function(data){
            return $http.post('/api/v1/app/release',data);
        },
        selectUsersList: function(params) {
            return $http.get('/api/v1/users/list?page=' + params.page +'&pageSize=' + params.pageSize);
        }
    };
    $scope.selectUsersList = function(params) {
        api.selectUsersList(params).then(function(resp) {
            if(resp.data.success) {
                $scope.usersnList = resp.data.data.results;
                $scope.totalItems = resp.data.data.totalSize;
            }
        })
    };
    $scope.selectUsersList(params);

    $scope.pageChanged = function(index) {
        $log.info('Page changed to: ' + $scope.currentPage);
        if(index > 0) {
            params.index = index - 1;
        }
        $scope.selectUsersList(params);
    };
}]);



