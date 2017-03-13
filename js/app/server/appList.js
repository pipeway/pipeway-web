app.controller('apiListCtrl', ['$scope', '$http', '$state', '$location', 'isLogin', 'user', '$cookies', '$cookieStore', 'api',
    function ($scope, $http, $state, $location, isLogin, user, $cookies, $cookieStore, api) {
        var url = $location.url();
        console.log(url);
        var path = url.split('/');
        var pathx = path[3].split('#');
        console.log(pathx);
        var appKey = pathx[0];
        // var appKey = path[3];
        $scope.appKey = appKey;
        console.log(appKey);
        //获取主机列表
        var dataHost = {
            appKey: appKey,
            page: 1,
            pageSize: 10
        };
        $scope.updateOk = false;
        $scope.popupshow1 = false;
        $scope.currentPageHost = 0;
        $scope.totalItemsHost = 1;
        function getHostList(data) {
            api.getHostList(data).then(function (res) {
                console.log(res.data.results);
                console.log(res.data.totalSize);
                if (res.data.totalSize < 11) {
                    $scope.pagination1 = false;
                }
                else {
                    $scope.pagination1 = true;
                }
                $scope.hostList = res.data.results;
                $scope.totalItemsHost = res.data.totalSize;
            })
        }

        getHostList(dataHost);
        $scope.pageChangedHost = function (index) {
            dataHost.page = index;
            getHostList(dataHost);
        };
        //获取api列表
        var dataApi = {
            appKey: appKey,
            page: 1,
            pageSize: 10
        };
        $scope.currentPageApi = 0;
        $scope.totalItemsApi = 1;
        // debugger;
        function getApiList(data) {
            api.getApiList(data).then(function (res) {
                if (res.data.totalSize < 11) {
                    $scope.pagination2 = false;
                }
                else {
                    $scope.pagination2 = true;
                }
                $scope.apiList = res.data.results;
                $scope.totalItemsApi = res.data.totalSize;
            })
        }

        getApiList(dataApi);
        $scope.pageChangedApi = function (index) {
            dataApi.page = index;
            getApiList(dataApi);
        };
        //修改主机状态
         $scope.modifyStatus = function (id, status, name) {
             var data = {
                 id: id,
                 status: status
             };
             api.hostUpdate(data).then(function (res) {
                 if (res.success) {
                     alert(name +'修改成功');
                     getHostList(dataHost);
                     //$location.path('/server/appList/' + $scope.hostdetail.parentAppkey);
                 }
             });

        };
        $scope.okUpdate = function () {
            $scope.updateOk = true;
            $scope.popupshow1 = false;
        };
        $scope.noUpdate = function () {
            $scope.updateOk = false;
            $scope.popupshow1 = false;
        };
        //获取用户信息
        function getUserInfo() {
            api.getUserInfo().then(function (res) {
                console.log(res.data);

            })
        }
        //getUserInfo();
        // (function getHash(){
        //   var hash = $location.hash();
        //   if(hash){
        //     $scope.actived1 = false;
        //     $scope.actived2 = true;
        //     hash = "";
        //   }
        // })();
        //搜索

        $scope.searchList = function (keywords) {
            var searchParams = {
                appKey: appKey,
                page: 1,
                pageSize: 10
            };
            console.log(keywords);
            if (keywords != '') {
                api.search(searchParams, keywords).then(function (res) {
                    console.log(res,'搜索内容');
                    if (res.data.totalSize < 11) {
                        $scope.pagination2 = false;
                    } else {
                        $scope.pagination2 = true;
                    }
                    $scope.apiList = res.data.results;
                    $scope.totalItemsApi = res.data.totalSize;
                });
            } else {
                getApiList(dataApi);
            }
        };
        $scope.changeActive = function (x) {
            var hostisviewed1 = 'hostisviewed1';
            var hostisviewed2 = 'hostisviewed2';
            var now = (new Date() - 0) + 60 * 24 * 30 * 60 * 1000;
            var exp = new Date(now);
            if (x == 'actived1') {
                $cookieStore.put('hostIsviewed1', hostisviewed1, {expires: exp});
                $cookieStore.remove('hostIsviewed2');
                $scope.search = false;
            }
            else {
                $cookieStore.put('hostIsviewed2', hostisviewed2, {expires: exp});
                $cookieStore.remove('hostIsviewed1');
                $scope.search = true;
            }
        };
        (function getCookies() {
            if ($cookieStore.get('hostIsviewed1')) {
                $scope.actived1 = true;
                $scope.actived2 = false;
                $scope.search = false;
            }
            if ($cookieStore.get('hostIsviewed2')) {
                $scope.actived1 = false;
                $scope.actived2 = true;
                $scope.search = true;
            }
        })();
    }]);
