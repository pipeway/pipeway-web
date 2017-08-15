app.controller('AlarmSettingsCtrl', ['$scope', '$http', '$state', '$modal', '$location', 'isLogin', 'user', '$cookies', 'api',
    function($scope, $http, $state, $modal, $location, isLogin, user, $cookies, api) {

        api.getAlarmConfig().then(function(res) {
            if (res.success) {
                $scope.alarmSettings = res.data
            } else {
                $scope.alarmSettings = {
                    stricMode: false,
                    timeout: 10000,
                    errorThreshold: '60/10'
                }
            }
        }).catch(function() {
            $scope.alarmSettings = {
                stricMode: false,
                timeout: 10000,
                errorThreshold: '60/10'
            }
        });

        $scope.create = function() {
            api.createAlarmConfig($scope.alarmSettings).then(function() {

            })
        }
    }
]);