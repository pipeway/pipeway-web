app.controller('BundleVersionCtrl', ['$scope', '$http', '$location', '$log', '$cookies', '$window', '$state', '$rootScope', function ($scope, $http, $location, $log, $cookies, $window, $state, $rootScope) {
    var url = $location.url();
    var reg = /.*\/(.*)\/(.*)\/(.*)/;
    var path = url.match(reg);
    var appKey = path[1];
    var platform = path[2];
    var parentVersion = path[3];
    var params = {
        page: 0,
        pageSize: 10
    };
    $scope.appKey = appKey;
    $scope.platform = platform;
    $scope.parentVersion = parentVersion;
    $scope.currentPage = 0;
    $scope.totalItems = 1;
    localStorage.href = window.location.href;
    var api = {
        addRelease: function(data){
            return $http.post('/api/v1/app/release',data);
        },
        selectVersionList: function(params) {
            console.log(params, '----');
            return $http.get('/api/v1/app/bundle/list/' + $scope.appKey + '/' + $scope.platform + '/' + $scope.parentVersion +'?page=' + params.page +'&pageSize=' + params.pageSize);
        },
        deleteVersion: function(id) {
            return $http.post('/api/v1/app/bundle/delete/'+ id);
        }
    };
    $scope.back = function() {
        $window.history.go(-1);
        console.log('back');
    };
    $scope.selectAppVersionList = function(params) {
        api.selectVersionList(params).then(function(resp) {
            if(resp.data.success) {
                $scope.versionList = resp.data.data.results;
                var results = resp.data.data.results;
                $scope.totalItems = resp.data.data.totalSize;
            }
        })
    };
    console.log(params);
    $scope.selectAppVersionList(params);

    $scope.pageChanged = function(index) {
        $log.info('Page changed to: ' + $scope.currentPage);
        if(index > 0) {
            params.index = index - 1;
        }
        $scope.selectAppVersionList(params);
    };
    $scope.deleteVersion = function(id, platform) {
        params.platform = platform;
        if (window.confirm('确定删除?')) {
            api.deleteVersion(id).then(function(res) {
                if(res.data.success) {
                    $scope.selectAppVersionList(params);
                }
            })
        }
    };

}]);

