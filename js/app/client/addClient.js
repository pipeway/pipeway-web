app.controller('AddClientCtrl', ['$scope', '$http', '$state', 'isLogin', 'user', '$cookies','api','FileUploader',
    function ($scope, $http, $state, isLogin, user, $cookies, api,FileUploader) {
        var avator = '';

        $scope.popupshide = function(){
          $scope.popupshow = false;
        }
        $scope.createApp = function (params){
          var reg1=/^[\u4e00-\u9fa5]{2,}$/gi;
          var reg2=/^[A-Za-z]+$/;
          var reg3=/^[A-Za-z]{2,}$/
          var data = {
            name: params.name,
            serial: params.serial,
            type:0,
            description: params.description,
            hostGroup:params.hostGroup
          }
            if (!reg1.test(data.name||data.name==null)){
                $scope.messages="应用名称为空或格式错误！";
                $scope.popupshow = true;
              }
            else{
                if(!reg2.test(data.serial) || data.serial==null){
                  $scope.messages="应用代号为空或格式错误！";
                  $scope.popupshow = true;
                }
                else{
                    if(!reg3.test(data.hostGroup) || data.hostGroup==null){
                      $scope.messages="主机组为空或格式错误！";
                      $scope.popupshow = true;
                    }
                    else{
                    api.appCreate(data).then(function (res){
                      console.log(res.success);
                      console.log(data);
                      if(res.success){
                        $scope.messages=res.data.msg+'!';
                        $scope.popupshow = true;
                        $scope.params.name = '';
                        $scope.params.serial = '';
                        $scope.params.description = '';
                        $scope.params.hostGroup = '';
                        }
                        else{
                          $scope.messages=res.data.msg+'!';
                          $scope.popupshow = true;
                        }
                      });
                    }
                }
              }
        };

    }]);
