app.controller('PushCtrl', ['$scope', '$http', '$state', '$location', '$modal', '$log',
    function ($scope, $http, $state, $location, $modal, $log) {
        console.log($modal);
    var url = $location.url();
    var reg = /.*\/(.*)/;
    var path = url.match(reg);
    var id = path[1];
    $scope.showDefine = false;
    var api = {
        appInfo: function() {
            return $http.get('/api/v1/app/info/' + id);
        },
        pushMsg: function (params) {
            return $http.post('/api/v1/push',params);
        }
    };
    $scope.changePlatform = function(type){
        if(type === 'ios'){
            $scope.push.ios = !$scope.push.ios;
        } else if(type === 'android'){
            $scope.push.android = !$scope.push.android;
        } else if(type === 'pc'){
            $scope.push.pc = !$scope.push.pc;
        }
    }
    $scope.define = function(){
        $scope.showDefine = !$scope.showDefine;
    }
    $scope.queryAppInfo = function() {
        api.appInfo().then(function(res) {
            $scope.push = res.data.data;
            $scope.items = res.data.data;
        })
    };
    $scope.queryAppInfo();
    $scope.savePush = function (push) {
        // console.log(push);
        var data = {
            to: push.to,
            // to: '15801514883_1_15527928085',
            title: push.title,
            appkey: push.appkey, 
            msg: push.msg,
            from: 'web', 
            android: push.android,
            ios: push.ios,
            pc: push.pc,
            extra: push.extra
        }
        if(!data.to){
            data.to = 'all';
        }
        console.log(data);
        api.pushMsg(data).then(function(res) {
            console.log(res);
            if(res.data.success) {
                $scope.pushSuccess();
            }
        });
    };
    $scope.popUp = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
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
            $scope.savePush($scope.push);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
    $scope.pushSuccess = function (size) {
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
            $state.go('apps.note');
        }, function () {
            $state.go('apps.note');
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
}]);
