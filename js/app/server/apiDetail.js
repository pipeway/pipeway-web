app.controller('apiDetailCtrl', ['$scope', '$http', '$state', '$location', 'isLogin', 'user', '$cookies', 'api',
    function($scope, $http, $state, $location, isLogin, user, $cookies, api) {
        var url = $location.url();
        var path = url.split('/');
        var id = path[4];
        var params = {
            id: id
        };
        _.merge($scope, {
            popupshow1: false,
            popupshow2: false,
            cacheBtn: false,
            expireBtn: false,
            edit: false
        });

        //查询接口
        function apiDetail(params) {
            api.apiDetail(params).then(function(res) {
                if (res.success) {
                    $scope.apidetail = res.data;
                    $scope.name = res.data.name;
                    $scope.method = res.data.method;
                    $scope.requestUrl = res.data.requestUrl;
                    $scope.auth = res.data.auth;
                    $scope.buildIn = res.data.buildIn;
                    $scope.captchaRequired = res.data.captchaRequired;
                    $scope.rateLimitTtl = res.data.rateLimitTtl;
                    $scope.rateLimitNum = res.data.rateLimitNum;
                    $scope.cacheKey = res.data.cacheKey;
                    $scope.cacheTtl = res.data.cacheTtl;
                    $scope.description = res.data.description;
                }
                if (res.data.cacheKey) {
                    $scope.cacheBtn = true;
                }
                if (res.data.rateLimitTtl) {
                    $scope.expireBtn = true;
                }
            })
        };
        apiDetail(params);
        //修改接口
        var okUpdate = function() {
            var data = {
                id: id
            };
            if ($scope.name != $scope.apidetail.name) {
                data.name = $scope.apidetail.name;
            }
            if ($scope.requestUrl != $scope.apidetail.requestUrl) {
                data.requestUrl = $scope.apidetail.requestUrl;
            }
            if ($scope.group != $scope.apidetail.group) {
                data.group = $scope.apidetail.group;
            }
            if ($scope.method != $scope.apidetail.method) {
                data.method = $scope.apidetail.method;
            }
            if ($scope.auth != $scope.apidetail.auth) {
                data.auth = $scope.apidetail.auth;
            }
            if ($scope.buildIn != $scope.apidetail.buildIn) {
                data.buildIn = $scope.apidetail.buildIn;
            }
            if ($scope.captchaRequired != $scope.apidetail.captchaRequired) {
                data.captchaRequired = $scope.apidetail.captchaRequired;
            }
            if ($scope.rateLimitTtl != $scope.apidetail.rateLimitTtl) {
                data.rateLimitTtl = $scope.apidetail.rateLimitTtl;
            }
            if ($scope.rateLimitNum != $scope.apidetail.rateLimitNum) {
                data.rateLimitNum = $scope.apidetail.rateLimitNum;
            }
            if ($scope.cacheKey != $scope.apidetail.cacheKey) {
                data.cacheKey = $scope.apidetail.cacheKey;
            }
            if ($scope.cacheTtl != $scope.apidetail.cacheTtl) {
                data.cacheTtl = $scope.apidetail.cacheTtl;
            }
            if ($scope.description != $scope.apidetail.description) {
                data.description = $scope.apidetail.description;
            }
            api.apiUpdate(data).then(function(res) {
                console.log(data);
                console.log(res);
                if (res.success) {
                    $scope.popupshow1 = false;
                    $scope.apidetail = _.merge($scope.apidetail, data);
                    $location.path('/server/appList/' + $scope.apidetail.parentAppkey);
                }
            });
        };
        //删除接口
        var okDelete = function() {
            var data = {
                id: id
            };
            api.apiDelete(data).then(function(res) {
                console.log(data.id);
                console.log(res);
                if (res.success) {
                    $location.path('/server/appList/' + $scope.apidetail.parentAppkey);
                }
            });
        };
        //接口缓存
        var openCache = function() {
            $scope.cacheBtn = !$scope.cacheBtn;
            if (!$scope.cacheBtn) {
                $scope.apidetail.cacheKey = '';
                $scope.apidetail.cacheTtl = '';
            }
        };
        var openExpire = function() {
            $scope.expireBtn = !$scope.expireBtn;
            if (!$scope.expireBtn) {
                $scope.apidetail.rateLimitTtl = '';
                $scope.apidetail.rateLimitNum = '';
            }
        };
        var openAuth = function() {
            if ($scope.apidetail.auth) {
                $scope.apidetail.auth = 0;
            } else {
                $scope.apidetail.auth = 1;
            }
        };
        var openBuildIn = function() {
            if ($scope.apidetail.buildIn) {
                $scope.apidetail.buildIn = 0;
            } else {
                $scope.apidetail.buildIn = 1;
            }
        };
        var openCaptcha = function() {
            if ($scope.apidetail.captchaRequired) {
                $scope.apidetail.captchaRequired = 0;
            } else {
                $scope.apidetail.captchaRequired = 1;
            }
        };

        //检测缓存
        var checkCache = function() {
            if ($scope.apidetail.cacheKey) {
                if (!$scope.apidetail.cacheTtl) {
                    $scope.cacheError = '接口缓存时间不能为空'
                } else {
                    $scope.cacheError = '';
                }
            }
            if ($scope.apidetail.cacheTtl) {
                if (!$scope.apidetail.cacheKey) {
                    $scope.cacheError = '接口缓存key值不能为空'
                } else {
                    $scope.cacheError = '';
                }
            }
        };
        var checkExpire = function() {
            if ($scope.apidetail.rateLimitTtl) {
                if (!$scope.apidetail.rateLimitNum) {
                    $scope.expireError = '接口限制次数不能为空'
                } else {
                    $scope.expireError = '';
                }
            }
            if ($scope.apidetail.rateLimitNum) {
                if (!$scope.apidetail.rateLimitTtl) {
                    $scope.expireError = '接口访问过期时间不能为空';
                } else {
                    $scope.expireError = '';
                }
            }
        };
        //编辑
        var editApi = function() {
            $scope.edit = !$scope.edit;
        };
        var updateApp = function() {
            $scope.popupshow1 = true;
        };
        var deleteApp = function() {
            $scope.popupshow2 = true;
        };
        var noUpdate = function() {
            $scope.popupshow1 = false;
        };
        var noDelete = function() {
            $scope.popupshow2 = false;
        };
        var closePopup = function() {
            $scope.popupshow1 = false;
            $scope.popupshow2 = false;
        };
        _.merge($scope, {
            okUpdate: okUpdate,
            okDelete: okDelete,
            openCache: openCache,
            openExpire: openExpire,
            openAuth: openAuth,
            openBuildIn: openBuildIn,
            openCaptcha: openCaptcha,
            checkCache: checkCache,
            checkExpire: checkExpire,
            editApi: editApi,
            updateApp: updateApp,
            deleteApp: deleteApp,
            noUpdate: noUpdate,
            noDelete: noDelete,
            closePopup: closePopup
        })
    }
]);