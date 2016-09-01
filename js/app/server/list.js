app.controller('ServerListCtrl', ['$scope', '$http', '$state', 'isLogin', 'user', '$cookies', 
    function ($scope, $http, $state, isLogin, user, $cookies) {
    var api =   {
        getServerList: function(data){
            return $http.get('/pipeway/v1/app/list/:' + data.type + '?page=' + data.page + '&pageSize=' + data.pageSize);
        }
    };
    function getServerList(){
        var data = {
            type: 0,
            page: 1,
            pageSize: 10
        }
        api.getServerList(data).then(function(res){
            console.log(res.data.data);
        })
    }
    getServerList();
    // isLogin();
    // user.myself().then(function(r) {
    //     $scope.role = r.data['role'];
    // });
    // $scope.createApp = function (data){
    //     api.addApp(data).then(function(resp) {
    //         if(resp.data.success){
    //             $scope.selectApp();
    //             $scope.app = {};
    //         }
    //     });
    // };
    // $scope.selectApp = function() {
    //     api.selectApp().then(function(resp) {
    //         if(resp.data.success) {
    //             $scope.appList = resp.data.data.results;
    //             $scope.totalPage = resp.data.data.totalPage;
    //         }
    //     })
    // };
    // $scope.selectApp();

    // $scope.deleteNote = function (note) {
    //     $scope.notes.splice($scope.notes.indexOf(note), 1);
    //     if (note.selected) {
    //         $scope.note = $scope.notes[0];
    //         $scope.notes.length && ($scope.notes[0].selected = true);
    //     }
    // };

    // $scope.selectNote = function (note) {
    //     angular.forEach($scope.notes, function (note) {
    //         note.selected = false;
    //     });
    //     $scope.note = note;
    //     $scope.note.selected = true;
    // };
}]);
