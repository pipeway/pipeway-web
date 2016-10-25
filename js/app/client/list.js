app.controller('ClientListCtrl', ['$scope', '$http', '$state', 'isLogin', 'user','api', '$cookies',
    function ($scope, $http, $state, isLogin, user,api, $cookies) {
      var data = {
         type:0,
         page:1,
         pagesize:8

      }
      $scope.currentPage = 0;
      $scope.totalItems = 1;
      $scope.pages = true
  function getserverList(data){
    api.getServerList(data).then(function(res){
        console.log(res.data);
        if(res.data.totalSize < 11){
          $scope.pages = false;
        }

        $scope.appList=res.data.results;
        $scope.totalItems=res.data.totalSize;
  })
}
    getserverList(data);
    $scope.pageChanged = function(index) {
        data.page = index;
        getserverList(data);
    };
}]);
