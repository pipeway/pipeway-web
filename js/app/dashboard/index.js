app.controller('DashboardCtrl', ['$scope', '$http', '$state', 'isLogin', 'user','api', '$cookies',
    function ($scope, $http, $state, isLogin, user,api, $cookies) {

        function initChartsAll(legend, series, xAxis) {
            var myChart = echarts.init(document.getElementById('all'));
            option = {
                title: {
                    text: '应用访问统计图',
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data: legend,
                    top:'40px'
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    top:'120px',
                    left: '3%',
                    right: '4%',
                    bottom: '0%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : xAxis.reverse()
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : series
            };
            myChart.setOption(option);
        }
        function initChartCache(legend, series, xAxis) {
            var myChart = echarts.init(document.getElementById('cached'));
            option = {
                title: {
                    text: '应用访问统计图',
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data: legend,
                    top:'40px'
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    top:'120px',
                    left: '3%',
                    right: '4%',
                    bottom: '0%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : xAxis.reverse()
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : series
            };
            myChart.setOption(option);
        }
        function initChartOrigin(legend, series, xAxis) {
            var myChart = echarts.init(document.getElementById('origin'));
            option = {
                title: {
                    text: '应用访问统计图',
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data: legend,
                    top:'40px'
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    top:'120px',
                    left: '3%',
                    right: '4%',
                    bottom: '0%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : xAxis.reverse()
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : series
            };
            myChart.setOption(option);
        }
        $scope.init = function (data) {
            if (data == 'all') {
                api.accessLogs(data).then(function(r) {
                    initChartsAll(r.legend, r.series, r.xAxis);
                });
            } else if (data == 'cached') {
                api.accessLogs(data).then(function(r) {
                    initChartCache(r.legend, r.series, r.xAxis);
                });
            } else if (data == 'origin') {
                api.accessLogs(data).then(function(r) {
                    initChartOrigin(r.legend, r.series, r.xAxis);
                });
            }

        };
        $scope.init('all');
        setInterval(function() {
            if (moment().format('ss') === '00') {
                init();
            }
        }, 1000);
        var apiList = [];
        var sortField = 'count';
        var sortFlag = -1;
        function apiCount(data) {
            api.apiCount(data).then(function (res) {
                if (res.success) {
                    apiList = res.data;
                    if (sortField == 'count') {
                        $scope.countSort(sortFlag);
                    }
                    if (sortField == 'avgTime') {
                        $scope.avgTimeSort(sortFlag);
                    }
                    //$scope.apiList = res.data;
                }
            })
        }
        $scope.countSort = function(flag) {
            sortField = 'count';
            sortFlag = flag;
            if (flag == -1) {
                $scope.apiList = apiList.sort(function (a, b) {
                    if (a.count > b.count) {
                        return -1;
                    }
                    if (a.count < b.count) {
                        return 1;
                    }
                    return 0;
                });
            } else {
                $scope.apiList = apiList.sort(function (a, b) {
                    if (a.count > b.count) {
                        return 1;
                    }
                    if (a.count < b.count) {
                        return -1;
                    }
                    return 0;
                });
            }
            console.log($scope.apiList);
        };
        $scope.avgTimeSort = function(flag) {
            sortField = 'avgTime';
            sortFlag = flag;
            if (flag == -1) {
                $scope.apiList = apiList.sort(function (a, b) {
                    if (a.avgTime > b.avgTime) {
                        return -1;
                    }
                    if (a.avgTime < b.avgTime) {
                        return 1;
                    }
                    return 0;
                });
            } else {
                $scope.apiList = apiList.sort(function (a, b) {
                    if (a.avgTime > b.avgTime) {
                        return 1;
                    }
                    if (a.avgTime < b.avgTime) {
                        return -1;
                    }
                    return 0;
                });
            }
        };
        setInterval(function() {
            apiCount(7);
        }, 5000);
    }]);
