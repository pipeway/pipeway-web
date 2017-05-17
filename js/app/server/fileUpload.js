app.controller('fileUploadCtrl', ['$scope', '$http', '$state', '$location', '$modal', 'isLogin', 'user', '$cookies', 'api', '$cookieStore',
    function ($scope, $http, $state, $location, $modal, isLogin, user, $cookies, api, $cookieStore) {
        var url = $location.url();
        // console.log(url);
        var path = url.split('/');
        var pathx = path[3].split('#');
        console.log(pathx);
        var appKey = pathx[0];
        // var appKey = path[3];
        $scope.appKey = appKey;
        console.log(appKey);
        //调试
        var token = window.location.search;
        // console.log(token);
        if (token) {
            sessionStorage.setItem('token', token.slice(7));
        }
        //警告弹窗
        function warn (msg){
        var modalInstance = $modal.open({
            templateUrl: 'warn.html',
            controller: 'ModalInstanceCtrl',
            size: 'sm',
            resolve: {
                items: function () {
                    return msg;
                }
            }
        });
        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        });
    }
        $('button.upload').click(function(){
            var $input = $('#avatar');
            var files = $input.prop('files');
            if(!files.length) {
                var msg = '请选择要上传的文件!';
                warn(msg);
            } else {
                if(files[0].name.split('.')[1] !== 'csv'){
                    var msg = '对不起,您只能上传Excel文件!';
                    warn(msg);
                } else {
                    console.log(files[0]);
                    var token = sessionStorage.getItem("token");
                    var data = new FormData()
                    data.append('csv', files[0]);
                    console.log(token);
                    // data.append('token', sessionStorage.getItem("token"));
                    fetch('/pipeway/v1/api/import/', {
                        headers: {
                            'Authorization': 'Bearer' + ' ' + token
                        },
                        method: 'POST',
                        body: data
                    }).then(function(res) {
                        console.log(res);
                        if(res.status == '200') {
                            var msg = '导入成功';
                            warn(msg);
                        } else {
                            var msg = '导入失败';
                            warn(msg);
                        }
                    })
                }
            }
        });
}]);
