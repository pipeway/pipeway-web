app.controller('ClientListCtrl', ['$scope', '$http', '$state', 'isLogin', 'user','api' '$cookies',
    function ($scope, $http, $state, isLogin, user,api, $cookies) {
      var data = {
         type:0,
         page:1,
         pagesize:10
      }

    api.getServerList(data).then(function(res){
        console.log(res);

    })
}]);
