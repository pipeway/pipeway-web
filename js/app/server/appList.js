app.controller('apiListCtrl', ['$scope', '$http', '$state', '$location', 'isLogin', 'user', '$cookies', 'api',
    function ($scope, $http, $state, $location, isLogin, user, $cookies, api) {
        var url = $location.url();
        var path = url.split('/');
        var appKey = path[4];
        $scope.appKey = appKey;
        console.log($scope.appKey);
        
        //获取主机列表
        var dataHost = {
            appKey: appKey,
            page: 1,
            pageSize: 10
        }
        $scope.currentPageHost = 0;
        $scope.totalItemsHost = 1;
        function getHostList(data){
            console.log(data);
            api.getHostList(data).then(function(res){
                console.log(res);
                $scope.hostList = res.data.data.results;
                $scope.totalItemsHost = res.data.data.totalSize;
            })
        }
        getHostList(dataHost);
        $scope.pageChangedHost = function(index) {
            dataHost.page = index;
            getApiList(dataHost);
        };
        //获取api列表
        var dataApi = {
            appKey: appKey,
            page: 1,
            pageSize: 10
        }
        $scope.currentPageApi = 0;
        $scope.totalItemsApi = 1;
        function getApiList(data){
            console.log(data);
            api.getApiList(data).then(function(res){
                console.log(res);
                $scope.apiList = res.data.data.results;
                $scope.totalItemsApi = res.data.data.totalSize;
            })
        }
        getApiList(dataApi);
        $scope.pageChangedApi = function(index) {
            dataApi.page = index;
            getApiList(dataApi);
        };
    }]);
