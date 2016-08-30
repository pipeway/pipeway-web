app.controller('FormCtrl', ['$scope', '$http', '$state', 'isLogin', 'user', '$cookies', 'FileUploader',
    function ($scope, $http, $state, isLogin, user, $cookies, FileUploader) {
    var avator = '';
    var api =   {
        addApp: function(data){
            return $http.post('/api/v1/app/add',data);
        },
        selectApp: function() {
            return $http.get('/api/v1/app/list?page=0&pageSize=20');
        }
    };
    isLogin();
    $scope.params = {
        ios: false,
        android: false,
        pc: false
    };
    $scope.role = $cookies['role'];

    $scope.createApp = function (data){
        console.log(data);
        data.avator = avator;
        data.ios = $scope.params.ios;
        data.android = $scope.params.android;
        data.pc = $scope.params.pc;
        api.addApp(data).then(function(resp) {
            console.log(resp,'resp');
            if(resp.data.success){
                $state.go('apps.note');
            }
        });
    };
    $scope.uploader = new FileUploader({
        url: '/api/v1/upload'
    });

    $scope.uploader.onCompleteItem = function(fileItem, response) {
        avator = response.data.path;
        console.log(avator);
        console.log(fileItem);
        return;
    };
    $scope.changePlatform = function(type){
        if(type === 'ios'){
            $scope.params.ios = !$scope.params.ios;
        } else if(type === 'android'){
            $scope.params.android = !$scope.params.android;
        } else if(type === 'pc'){
            $scope.params.pc = !$scope.params.pc;
        }
    };

}]);
