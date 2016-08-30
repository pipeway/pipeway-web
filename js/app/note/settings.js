app.controller('SettingsCtrl', ['$scope', '$http', '$state', '$location', function ($scope, $http, $state, $location) {
    var url = $location.url();
    var reg = /.*\/(.*)/;
    var path = url.match(reg);
    var id = path[1];

    var api = {
        appInfo: function() {
            return $http.get('/api/v1/app/info/' + id);
        },
        update: function(data) {
            return $http.post('/api/v1/app/update/' + id, data);
        },
        delete: function(data) {
            return $http.post('/api/v1/app/delete/' + id, data);
        }
    };
    $scope.queryAppInfo = function() {
        api.appInfo().then(function(res) {
            $scope.setting = res.data.data;
            $scope.name = res.data.data.name;
            $scope.appPushKey = res.data.data.appPushKey;
            $scope.appPushSecret = res.data.data.appPushSecret;
        })
    };
    $scope.queryAppInfo();

    $scope.saveSettings = function (setting) {
        var data = {};
        if($scope.appPushKey != setting.appPushKey) {
            data.appPushKey = setting.appPushKey;
        };
        if($scope.appPushSecret != setting.appPushSecret) {
            data.appPushSecret = setting.appPushSecret;
        }
        if($scope.name != setting.name) {
            data.name = setting.name;
        }
        api.update(data).then(function(res) {
            if(res.data.success) {
                $state.go('apps.note')
            }
        });
    };
    $scope.deleteSettings = function() {
        if(window.confirm('您确定要删除吗？')) {
            api.delete({}).then(function(res) {
                if(res.data.success) {
                    $state.go('apps.note');
                }
            })
        }

    };
    $scope.changePlatform = function(type){
        if(type === 'ios'){
            $scope.setting.ios = !$scope.setting.ios;
        } else if(type === 'android'){
            $scope.setting.android = !$scope.setting.android;
        } else if(type === 'pc'){
            $scope.setting.pc = !$scope.setting.pc;
        }
    };

}]);

