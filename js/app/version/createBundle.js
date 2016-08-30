app.controller('CreateVersionCtrl', ['$scope', '$http', '$location', '$state', 'FileUploader',
    function ($scope, $http, $location, $state, FileUploader) {
        var url = $location.url();
        var reg = /.*\/(.*)\/(.*)\/(.*)/;
        var path = url.match(reg);
        var appKey = path[1];
        var platform = path[2];
        var parentVersion = path[3];
        var path = "";
        $scope.appKey = appKey;
        $scope.platform = platform;
        $scope.parentVersion = parentVersion;

        var api = {
            addRelease: function(data){
                return $http.post('/api/v1/app/release',data);
            }
        };
        $scope.close = function() {
            window.location.href = localStorage.href;
        };
        $scope.createBundleRelease = function (data){
            data.appkey = $scope.appKey;
            data.type = '1';
            data.platform = platform;
            data.parentVersion = parentVersion;
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