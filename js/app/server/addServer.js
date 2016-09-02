app.controller('AddServerCtrl', ['$scope', '$http', '$state', '$modal', '$location','isLogin', 'user', '$cookies','api','FileUploader',
    function ($scope, $http, $state, $modal, $location, isLogin, user, $cookies, api,FileUploader) {
        var avator = '';
        $scope.createApp = function (params){
            var data = {
                name: params.name,
                serial: params.serial,
                type: 1,
                description: params.description,
                hostGroup: params.hostGroup
            }
            // console.log(data.name);
            // console.log(data.serial);
            // console.log(data.description);
            var reg1 = /^[\u4e00-\u9fa5]{2,}$/gi;
            var reg2 = /^[A-Za-z]+$/;
            var reg3 = /^[A-Za-z]{2,}$/
            if (!reg1.test(data.name)){
              alert("应用名称不能为空或格式错误！");
            }
            if(!reg2.test(data.serial) || data.serial == null){
              alert("应用代号不能为空或格式错误！");
            }
            if(!reg3.test(data.hostGroup) || data.hostGroup == null){
              alert("主机组不能为空或格式错误！");
            }
            else{
                api.appCreate(data).then(function (res){
                    console.log(res);
                    if(res.success){
                        $scope.params.name = '';
                        $scope.params.serial = '';
                        $scope.params.description = '';
                        $scope.params.hostGroup = '';
                        // $state.go('server.list');
                        $scope.items = res;
                        getAppKey();
                        addSuccess();
                    }
                    else{
                        alert(res.data.msg);
                    }
                });
            }
            // console.log(data);
            // data.avator = avator;
            // data.ios = $scope.params.ios;
            // data.android = $scope.params.android;
            // data.pc = $scope.params.pc;
            // api.addApp(data).then(function(resp) {
            //     console.log(resp,'resp');
            //     if(resp.data.success){
            //         $state.go('apps.note');
            //     }
            // });
        };
        //获取appKey
        function getAppKey(){
            api.getServerList({
                type: 1,
                page: 1,
                pageSize: 10
            }).then(function(res){
                $scope.appKey = res.data.data.results[0].appKey;
            })
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
                $location.path('/server/server/createHost/' + $scope.appKey);
            }, function () {
                $state.go('server.list');
            });
        }
    }]);
