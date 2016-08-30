app.controller('CreateVersionCtrl', ['$scope', '$http', '$location', '$state', 'FileUploader',
    function ($scope, $http, $location, $state, FileUploader) {
    var url = $location.url();
    var reg = /.*\/(.*)\/(.*)\/(.*)/;
    var path = url.match(reg);
    var appKey = path[3];
    var path = "";
    $scope.appKey = appKey;
    console.log(path);
    var api = {
        addRelease: function(data){
            return $http.post('/api/v1/app/release',data);
        },
        selectVersionList: function(type) {
            return $http.get('/api/v1/app/bundle/list/' + $scope.appKey + '/' + type + '?page=0&pageSize=10');
        }
    };
    $scope.close = function () {
        window.location.href = localStorage.href;
    };
    $scope.createAppRelease = function (data){
        data.appkey = $scope.appKey;
        data.type = '0';
        data.downloadUrl = path;
        if(!data.forceUpdate) {
            data.forceUpdate = false;
        }
        api.addRelease(data).then(function(resp) {
            if(resp.data.success){
                $scope.apps = {};
                window.location.href = localStorage.href;
            } else {
                $scope.message = resp.data.message;
                console.log("11111");
            }
        });
    };
    $scope.uploader = new FileUploader({
        url: '/api/v1/upload'
    });

    $scope.uploader.onCompleteItem = function(fileItem, response) {
        path = response.data.path;
        return;
    };

    $scope.apps = {
        platform: '0',
        type : '0'
    };
    $scope.changePlatform = function(type){
        if(type === 'ios'){
            $scope.apps.platform = '1';
        } else if(type === 'android'){
            $scope.apps.platform = '0';
        }
    };
    $scope.changeType = function(type){
        if(type === 'Bundle'){
            $scope.apps.type = '1';
        } else if(type === 'Native'){
            $scope.apps.type = '0';
        }
    }

}]);
