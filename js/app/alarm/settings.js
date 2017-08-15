app.controller('AlarmSettingsCtrl', ['$scope', '$http', '$state', '$modal', '$location', 'isLogin', 'user', '$cookies', 'api',
    function($scope, $http, $state, $modal, $location, isLogin, user, $cookies, api) {

        api.getAlarmConfig().then(function(res) {
            if (res.success) {
                $scope.alarmSettings = {
                    strictMode: (+res.data.strictMode) ? true : false,
                    timeout: res.data.timeout,
                    errorThreshold: res.data.errorThreshold
                }

                console.log($scope.alarmSettings)

            } else {
                $scope.alarmSettings = {
                    strictMode: 0,
                    timeout: 10000,
                    errorThreshold: '60/10'
                }
            }
        }).catch(function() {
            $scope.alarmSettings = {
                strictMode: 0,
                timeout: 10000,
                errorThreshold: '60/10'
            }
        });

        $scope.create = function() {
            var strictMode = 0;
            console.log($scope.alarmSettings.strictMode)
            if ($scope.alarmSettings.strictMode) {
                strictMode = 1;
            }
            api.createAlarmConfig({
                strictMode: strictMode,
                timeout: $scope.alarmSettings.timeout,
                errorThreshold: $scope.alarmSettings.errorThreshold
            }).then(function() {})
        }
    }
]);