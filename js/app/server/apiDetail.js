app.controller('apiDetailCtrl', ['$scope', '$http', '$state', '$location', 'isLogin', 'user', '$cookies', 'api',
    function ($scope, $http, $state, $location, isLogin, user, $cookies, api) {
        var url = $location.url();
        var path = url.split('/');
        var id = path[4];
        var params = {
            id: id
        }
        $scope.popupshow1 = false;
        $scope.popupshow2 = false;
//查询接口
        function apiDetail(params){
          console.log(params);
            api.apiDetail(params).then(function (res){
              if (res.success) {
                $scope.apidetail = res.data;
                $scope.name = res.data.name;
                $scope.method = res.data.method;
                $scope.requestUrl = res.data.requestUrl;
                $scope.auth = res.data.auth;
                $scope.rateLimitTtl = res.data.rateLimitTtl;
                $scope.rateLimitNum = res.data.rateLimitNum;
                $scope.cacheKey = res.data.cacheKey;
                $scope.cacheTtl = res.data.cacheTtl;
                $scope.description = res.data.description;
                // $location.path('/server/server/appList/'+appKey);
              }
            })
        };
        apiDetail(params);
//修改接口
      $scope.okUpdate = function(apidetail){
        data = {
          id: id
        }
        if($scope.name != apidetail.name){
            data.name = apidetail.name;
        }
        if($scope.requestUrl != apidetail.requestUrl){
            data.requestUrl = apidetail.requestUrl;
        }
        if($scope.method != apidetail.method){
            data.method = apidetail.method;
        }
        if($scope.auth != apidetail.auth){
            data.auth = apidetail.auth;
        }
        if($scope.rateLimitTtl != apidetail.rateLimitTtl){
            data.rateLimitTtl = apidetail.rateLimitTtl;
        }
        if($scope.rateLimitNum != apidetail.rateLimitNum){
            data.rateLimitNum = apidetail.rateLimitNum;
        }
        if($scope.cacheKey != apidetail.cacheKey){
            data.cacheKey = apidetail.cacheKey;
        }
        if($scope.cacheTtl != apidetail.cacheTtl){
            data.cacheTtl = apidetail.cacheTtl;
        }
        if($scope.description != apidetail.description){
          data.description = apidetail.description;
        }
        api.apiUpdate(data).then(function(res){
            console.log(data.name);
            console.log(data.requestUrl);
            console.log(data.method);
            console.log(data.auth);
            console.log(data.rateLimitTtl);
            console.log(data.rateLimitNum);
            console.log(data.cacheKey);
            console.log(data.cacheTtl);
            console.log(data.description);
            console.log(res);
            if(res.success){
              // window.location.reload();
            }
        });
      }

//删除接口
      $scope.okDelete = function(){
        data = {
          id: id
        }
        api.apiDelete(data).then(function(res){
          console.log(data.id);
          console.log(res);
          if(res.success){
            $location.path('/server/appList/' + $scope.apidetail.parentAppkey);
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
