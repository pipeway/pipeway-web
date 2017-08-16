app.controller('AlarmSettingsCtrl', ['$scope', '$http', '$state', '$modal', '$location', 'isLogin', 'user', '$cookies', 'api', 'toaster',
    function($scope, $http, $state, $modal, $location, isLogin, user, $cookies, api, toaster) {

        api.getAlarmConfig().then(function(res) {
            if (res.success) {
                $scope.alarmSettings = {
                    strictMode: (+res.data.strictMode) ? true : false,
                    timeout: res.data.timeout,
                    errorThreshold: res.data.errorThreshold,
                    notifyThreshold: res.data.notifyThreshold
                }

            } else {
                $scope.alarmSettings = {
                    strictMode: 0,
                    timeout: 10000,
                    errorThreshold: '10/60',
                    notifyThreshold: '5/60'
                }
            }
        }).catch(function() {
            $scope.alarmSettings = {
                strictMode: 0,
                timeout: 10000,
                errorThreshold: '60/10',
                notifyThreshold: '5/60'
            }
        });

        $scope.create = function() {
            var strictMode = 0;
            if ($scope.alarmSettings.strictMode) {
                strictMode = 1;
            }
            api.createAlarmConfig({
                strictMode: strictMode,
                timeout: $scope.alarmSettings.timeout,
                errorThreshold: $scope.alarmSettings.errorThreshold,
                notifyThreshold: $scope.alarmSettings.notifyThreshold
            }).then(function() {
                alert('添加成功')
            })
        }
    }
]);