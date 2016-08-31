app.controller('ServerListCtrl', ['$scope', '$http', '$state', 'isLogin', 'user', '$cookies', function ($scope, $http, $state, isLogin, user, $cookies) {
    var api =   {
        addApp: function(data){
            return $http.post('/api/v1/app/add',data);
        },
        selectApp: function() {
            return $http.get('/api/v1/app/list?page=0&pageSize=20');
        }
    };
    isLogin();
    user.myself().then(function(r) {
        $scope.role = r.data['role'];
    });
    $scope.createApp = function (data){
        api.addApp(data).then(function(resp) {
            if(resp.data.success){
                $scope.selectApp();
                $scope.app = {};
            }
        });
    };
    $scope.selectApp = function() {
        api.selectApp().then(function(resp) {
            if(resp.data.success) {
                $scope.appList = resp.data.data.results;
                $scope.totalPage = resp.data.data.totalPage;
            }
        })
    };
    $scope.selectApp();

    $scope.deleteNote = function (note) {
        $scope.notes.splice($scope.notes.indexOf(note), 1);
        if (note.selected) {
            $scope.note = $scope.notes[0];
            $scope.notes.length && ($scope.notes[0].selected = true);
        }
    };

    $scope.selectNote = function (note) {
        angular.forEach($scope.notes, function (note) {
            note.selected = false;
        });
        $scope.note = note;
        $scope.note.selected = true;
    };
}]);
