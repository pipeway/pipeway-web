app.controller('createApiCtrl', ['$scope', '$http', '$state', '$location', '$modal', 'isLogin', 'user', '$cookies', 'api', 'appKey',
    function ($scope, $http, $state, $location, $modal, isLogin, user, $cookies, api, appKey) {
        var appKey = appKey;
        $scope.appKey = appKey;
        $scope.params = {
            parentAppkey: appKey
        }
        $scope.createApi = function (params){
            api.createApi(params).then(function (res){
                 $scope.items = res;
                 console.log(res);
                 if (res.success) {
                    $scope.params = {};
                    addSuccess();
                 }
            })
        };
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
