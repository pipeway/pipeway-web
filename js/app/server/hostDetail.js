app.controller('hostDetailCtrl', ['$scope', '$http', '$state', '$location', 'isLogin', 'user', '$cookies', 'api',
    function ($scope, $http, $state, $location, isLogin, user, $cookies, api) {
        var url = $location.url();
        var path = url.split('/');
        var id = path[4];
        var params = {
            id: id
        }
        $scope.popupshow1 = false;
        $scope.popupshow2 = false;
//查询主机
        function hostDetail(params){
          console.log(params);
            api.hostDetail(params).then(function (res){
              console.log(res);
              if (res.success) {
                $scope.hostdetail = res.data;
                $scope.parentAppkey = res.data.parentAppkey
                $scope.name = res.data.name;
                $scope.protocal = res.data.protocal;
                $scope.host = res.data.host;
                $scope.port = res.data.port;
                $scope.description = res.data.description;
              }
            })
        };
        hostDetail(params);
//修改主机
      $scope.okUpdate = function(hostdetail){
        var data = {
          id: id
        }
        if($scope.name != hostdetail.name){
          data.name = hostdetail.name;
        }
        if($scope.protocal != hostdetail.protocal){
          data.protocal = hostdetail.protocal;
        }
        if($scope.host != hostdetail.host){
          data.host = hostdetail.host;
        }
        if($scope.port != hostdetail.port){
          data.port = hostdetail.port;
        }
        if($scope.description != hostdetail.description){
          data.description = hostdetail.description;
        }
         api.hostUpdate(data).then(function(res){
             console.log(data.name);
             console.log(data.protocal);
             console.log(data.host);
             console.log(data.port);
             console.log(data.description);
             console.log(data.id);
             console.log(res);
             console.log(res.success);
             if(res.success){
              //  $location.path('/server/appList/' + $scope.hostdetail.parentAppkey);
              // window.location.reload();
            }
         });
      }
//删除主机
      $scope.okDelete = function(){
        var data = {
          id: id
        };
        api.hostDelete(data).then(function(res){
          console.log(res);
           if(res.success){
             $location.path('/server/appList/' + $scope.hostdetail.parentAppkey);
           }
        });
      }

      $scope.updateApp = function(){
          $scope.popupshow1 = true;
        }
      $scope.deleteApp = function(){
          $scope.popupshow2 = true;
        }
      $scope.noUpdate = function(){
          $scope.popupshow1 = false;
      }
      $scope.noDelete = function(){
          $scope.popupshow2 = false;
      }
      $scope.closePopup = function(){
        $scope.popupshow1 = false;
        $scope.popupshow2 = false;
      }
}]);
