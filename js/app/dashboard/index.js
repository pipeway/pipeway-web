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

        function apiCount(data) {
            api.apiCount(data).then(function (res) {
                if (res.success) {
                    $scope.apiList = res.data;
                }
            })
        }
        setInterval(function() {
            apiCount(7);
        }, 5000);
    }]);
