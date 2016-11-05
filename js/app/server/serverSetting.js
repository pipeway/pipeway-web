app.controller('ServerSettingCtrl', ['$scope', '$http', '$state', '$modal', '$location','isLogin', 'user', '$cookies','api','FileUploader',
    function ($scope, $http, $state, $modal, $location, isLogin, user, $cookies, api,FileUploader) {
      var url = $location.url();
      var path = url.split('/');
      var appKey = path[3];
      console.log(appKey);
      var params = {
        appKey:appKey
      }
      $scope.popupshow1 = false;
      $scope.popupshow2 = false;
//查询应用
      function appDetail(data){
        api.getAppDetail(data).then(function(res){
          console.log(res);
          if(res.success){
            $scope.appdetail = res.data;
            $scope.name = res.data.name;
            $scope.hostGroup = res.data.hostGroup;
            $scope.description = res.data.description;
          }
        });
      };
        appDetail(params);
//修改应用
      $scope.okUpdate = function(appdetail){
        data = {
          appKey: appKey
        }
        if($scope.name != appdetail.name){
          data.name = appdetail.name;
        }
        if($scope.hostGroup != appdetail.hostGroup){
          data.hostGroup = appdetail.hostGroup;
        }
        if($scope.description != appdetail.description){
          data.description = appdetail.description;
        }
      api.appUpdate(data).then(function(res){
          console.log(data.name);
          console.log(data.hostGroup);
          console.log(data.description);
          if(res.success){
            console.log(res);
            // window.location.reload();
          }
        });
      }
//删除应用
      $scope.okDelete = function(){
        data = {
          appKey: appKey
        }
        api.appDelete(data).then(function(res){
           if(res.success){
               $location.path('/server/list');
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
