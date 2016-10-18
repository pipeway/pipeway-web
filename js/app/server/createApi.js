app.controller('createApiCtrl', ['$scope', '$http', '$state', '$location', '$modal', 'isLogin', 'user', '$cookies', 'api', 'appKey',
    function ($scope, $http, $state, $location, $modal, isLogin, user, $cookies, api, appKey) {
        var appKey = appKey;
        $scope.appKey = appKey;
        $scope.params = {
            parentAppkey: appKey,
            auth: '1',
            method: '0',
            buildIn: false,
            captchaRequired: false
        }
        $scope.expireBtn = false;
        $scope.timesBtn = false;
        $scope.cacheBtn = false;
        $scope.describeBtn = false;
        $scope.openExpire = function(){
            $scope.expireBtn = !$scope.expireBtn;
        }
        $scope.openTimes = function() {
            $scope.timesBtn = !$scope.timesBtn;
        }
        $scope.openCache = function() {
            $scope.cacheBtn = !$scope.cacheBtn;
        }
        $scope.openDescribe = function() {
            $scope.describeBtn = !$scope.describeBtn;
        }
        $scope.openAuth = function(){
            if ($scope.params.auth === '1'){
                $scope.params.auth = '0';
            } else {
                $scope.params.auth = '1';
            }

        }
        $scope.createApi = function (params){
            console.log(params);
            validateForm(params);
            if ($scope.methodValidateMessage || $scope.authValidateMessage) {
                return;
            }
            api.createApi(params).then(function (res){
                 $scope.items = res;
                 console.log(res);
                 if (res.success) {
                    $scope.params = {
                        parentAppkey: appKey
                    };
                    addSuccess();
                 }
            })
        };
        function validateForm(data){
           data.captchaRequired = data.captchaRequired ? 1 : 0;
            data.buildIn = data.buildIn ? 1 : 0;
            if(!data.method){
                $scope.methodValidateMessage = true;
            } else {
                $scope.methodValidateMessage = false;
            }
            if(!data.auth){
                $scope.authValidateMessage = true;
            } else {
                $scope.authValidateMessage = false;
            }
        }
        function addSuccess(size) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContentSuccess.html',
                controller: 'ModalInstanceCtrl',
                size: size,
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });
            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
                $location.path('/server/createApi/' + $scope.appKey);
            }, function () {
                $location.path('/server/appList/' + appKey);
            });
        }
}]);
