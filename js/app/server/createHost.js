app.controller('createHostCtrl', ['$scope', '$http', '$state', '$location', '$modal', 'isLogin', 'user', '$cookies', 'api', '$cookieStore',
    function ($scope, $http, $state, $location, $modal, isLogin, user, $cookies,api,$cookieStore ) {
        var url = $location.url();
        var path = url.split('/');
        var appKey = path[3];
        $scope.appKey = appKey;
        $scope.params = {
            parentAppkey: appKey,
            protocal: '0'
        }
        $scope.describeBtn = false;
        $scope.openDescribe = function(){
            $scope.describeBtn = !$scope.describeBtn;
        }
        $scope.createHost = function (params){
            validateForm(params);
            if($scope.hostValidateMessage || $scope.portValidateMessage || $scope.protocalValidateMessage){
                return;
            }
            api.createHost(params).then(function (res){
                $scope.items = res;
                console.log(res);
                if (res.success) {
                    addSuccess()
                }
            })
        };
        function validateForm(data){
            // var regHost = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
            // var regHost = /\*/;
            var regPort = /^\d{1,5}$/;
            // if(!regHost.test(data.host)){
            //     $scope.hostValidateMessage = true;
            // } else {
            //     $scope.hostValidateMessage = false;
            // }
            if(!regPort.test(data.port)){
                $scope.portValidateMessage = true;
            } else {
                $scope.portValidateMessage = false;
            }
            if(!data.protocal){
                $scope.protocalValidateMessage = true;
            } else {
                $scope.protocalValidateMessage = false;
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

        (function getCookie(){
          var hostIsviewed1 = 'hostIsviewed1';
          if($cookieStore.get('hostIsviewed2')){
            $cookieStore.remove('hostIsviewed2');
            $cookieStore.put('hostIsviewed1',hostIsviewed1);
          }
        })();
}]);
