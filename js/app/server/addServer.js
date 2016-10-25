app.controller('AddServerCtrl', ['$scope', '$http', '$state', '$modal', '$location','isLogin', 'user', '$cookies','api','FileUploader',
    function ($scope, $http, $state, $modal, $location, isLogin, user, $cookies, api,FileUploader) {
      $scope.params = {
          type:'1'
      }
        $scope.describeBtn = false;
        $scope.openDescribe = function(){
          $scope.describeBtn = !$scope.describeBtn;
        }

        $scope.createApp = function (params){
         validateForm(params);
         if($scope.nameValidateMessage || $scope.serialValidateMessage || $scope.hostGroupValidateMessage){
           return;
         }
          api.appCreate(params).then(function (res){
            console.log(res.success);
            console.log(params);
            $scope.items = res;
            if(res.success){
              addSuccess();
              }
              getAppKey();
            });
        };
        function validateForm(data){
          // var reg1=/^[\u4e00-\u9fa5]{2,}$/gi;
          // var reg2=/^[\w]{2,}$/;
          // if (!reg1.test(data.name)) {
          //     $scope.nameValidateMessage = true;
          //   }else{
          //     $scope.nameValidateMessage = false;
          //   }
          // if(!reg2.test(data.serial)){
          //   $scope.serialValidateMessage = true;
          // }else{
          //   $scope.serialValidateMessage = false;
          // }
          // if(!reg2.test(data.hostGroup)){
          //   $scope.hostGroupValidateMessage = true;
          // }else{
          //   $scope.hostGroupValidateMessage = false;
          // }
        }
        //获取appKey
        function getAppKey(){
            api.getServerList({
                type: 1,
                page: 1,
                pageSize: 10
            }).then(function(res){
                $scope.appKey = res.data.results[0].appKey;
                console.log(res);
                console.log($scope.appKey);
            });
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
                $location.path('/server/createHost/' + $scope.appKey);
            }, function () {
                $state.go('server.list');
            });
        }
    }]);
