app.controller('createUserCtrl', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    var api = {
        addUsers: function(data){
            return $http.post('/api/v1/users/add',data);
        }
    };
    $scope.saveUser = function (data) {
        api.addUsers(data).then(function(resp) {
            if(resp.data.success){
                $scope.user = {};
                $state.go('app.user')
            } else {
                $scope.message = resp.data.message;
            }
        });
    }
}]);
