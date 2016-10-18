app.controller('apiListCtrl', ['$scope', '$http', '$state', '$location', 'isLogin', 'user', '$cookies', 'api',
    function ($scope, $http, $state, $location, isLogin, user, $cookies, api) {
        var url = $location.url();
        var path = url.split('/');
        var appKey = path[3];
        $scope.appKey = appKey;
        //获取主机列表
        var dataHost = {
            appKey: appKey,
            page: 1,
            pageSize: 5
        }

        $scope.currentPageHost = 0;
        $scope.totalItemsHost = 1;
        function getHostList(data){
            api.getHostList(data).then(function(res){
                console.log(res.data.results);
                $scope.hostList = res.data.results;
                $scope.totalItemsHost = res.data.totalSize;
            })
        }
        $scope.changeActive = function(){
          $scope.actived1 = !$scope.actived1;
          $scope.actived2 = !$scope.actived1;
          console.log($scope.actived1);
          console.log($scope.actived2);

        }

        getHostList(dataHost);
        $scope.pageChangedHost = function(index) {
            dataHost.page = index;
            getHostList(dataHost);
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
            api.getApiList(data).then(function(res){
                $scope.apiList = res.data.results;
                $scope.totalItemsApi = res.data.totalSize;
            })
        }
        getApiList(dataApi);
        $scope.pageChangedApi = function(index) {
            dataApi.page = index;
            getApiList(dataApi);
        };
    }]);
