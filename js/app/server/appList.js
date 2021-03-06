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
        //数据初始化
        $scope.data = {
            keywords: ''
        };
        $scope.updateOk = false;
        $scope.popupshow1 = false;
        $scope.currentPageHost = 0;
        $scope.totalItemsHost = 1;
        $scope.store = {
            upper: new Date(new Date("2017-01-01 00:00:00").getTime()),
            lower: new Date()
        };
        $scope.uppers = $scope.store.upper.getTime();
        $scope.lowers = $scope.store.lower.getTime();
        // $scope.store.upper = new Date(new Date("2017-01-01 00:00:00").getTime());
        // $scope.store.lower = new Date();
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
        $scope.maxSize = 5;
        $scope.currentPageApi = 0;
        $scope.totalItemsApi = 1;
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
            if ($scope.data.keywords !== '') {
                console.log($scope.data.keywords);
                searchParams.page = index;
                $scope.searchList($scope.data, $scope.store);
            } else {
                dataApi.page = index;
                getApiList(dataApi);
            }
        };
        //修改主机状态
         $scope.modifyStatus = function (id, status, name) {
             var data = {
                 id: id,
                 status: status
             };
             var r = confirm('你确定要修改主机的状态吗?');
             if (r == true) {
                 api.hostUpdate(data).then(function (res) {
                     if (res.success) {
                         alert(name +'修改成功');
                         getHostList(dataHost);
                         //$location.path('/server/appList/' + $scope.hostdetail.parentAppkey);
                     }
                 });
             }

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

        //搜索
        var searchParams = {
            appKey: appKey,
            page: 1,
            pageSize: 10,
        };
        $scope.searchList = function (keywords, store) {
            console.log(keywords);
            console.log(store);
            $scope.store = {
                upper: store.upper,
                lower: store.lower
            };
            searchParams.from = store.upper.getTime();
            searchParams.to = store.lower.getTime();
                api.search(searchParams, keywords).then(function (res) {
                    if (res.success) {
                        console.log(res,'搜索内容');
                        if (res.data.totalSize < 11) {
                            $scope.pagination2 = false;
                        } else {
                            $scope.pagination2 = true;
                        }
                        $scope.apiList = res.data.results;
                        $scope.totalItemsApi = res.data.totalSize;
                    } else {
                        getApiList(dataApi);
                    }
                });
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
        //按时间查询api列表
         $scope.searchByTime = function() {
             console.log($scope.data);
             $scope.searchList($scope.data, $scope.store);
        }
        //时间改变触发的事件
        $scope.timeChange = function(store) {
            $scope.uppers = store.upper.getTime();
            $scope.lowers = store.lower.getTime();
        }
    }]);
