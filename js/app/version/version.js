app.controller('VersionCtrl', ['$scope', '$http', '$location', '$log', '$cookies', function ($scope, $http, $location, $log, $cookies) {
    var url = $location.url();
    var reg = /.*\/(.*)\/(.*)\/(.*)/;
    var path = url.match(reg);
    console.log(path);
    var appKey = path[1];
    var platform = path[2];
    var name = path[3];
    var params = {
        platform: 0,
        page: 0,
        pageSize: 10
    };
    $scope.appKey = appKey;
    $scope.platform = platform;
    $scope.name = name;
    $scope.appName = decodeURIComponent(name);
    $scope.role = $cookies['role'];
    $scope.currentPage = 0;
    $scope.totalItems = 1;

    localStorage.href = window.location.href;
    //localStorage.back = window.location.href;
    var api = {
        addRelease: function(data){
            return $http.post('/api/v1/app/release',data);
        },
        selectVersionList: function(params) {
            console.log(params.platform);
            return $http.get('/api/v1/app/native/list/' + $scope.appKey + '/' + params.platform + '?page=' + params.page +'&pageSize=' + params.pageSize);
        },
        deleteVersion: function(id) {
            return $http.post('/api/v1/app/bundle/delete/'+ id);
        }
    };
    $scope.selectAppVersionList = function(params) {
        api.selectVersionList(params).then(function(resp) {
            if(resp.data.success) {
                $scope.versionList = version(resp.data.data.results);
                $scope.totalItems = resp.data.data.totalSize;
            }
        })
    };
    function version (item) {
        for(var i = 0; i < item.length; i++) {
            item[i].appKey = $scope.appKey;
        }
        return item;
    }
    $scope.selectType = function(platform) {
        params.platform = platform;
        $scope.selectAppVersionList(params);
    };
    $scope.selectType(0);


    $scope.pageChanged = function(index) {
        $log.info('Page changed to: ' + $scope.currentPage);
        console.log(params);
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

