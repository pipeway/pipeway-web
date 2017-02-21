app.controller('DashboardCtrl', ['$scope', '$http', '$state', 'isLogin', 'user','api', '$cookies',
    function ($scope, $http, $state, isLogin, user,api, $cookies) {

        init();
        function initCharts(legend, series, xAxis) {
            var myChart = echarts.init(document.getElementById('main'));
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

        function init() {
            api.accessLogs().then(function(r) {
                initCharts(r.legend, r.series, r.xAxis);
            });
        }

        setInterval(function() {
            if (moment().format('ss') === '00') {
                init();
            }
        }, 1000);

        /*function getApiList(data) {
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
        }*/
        function apiCount(data) {
            api.apiCount(data).then(function (res) {
                if (res.success) {
                    console.log(res.data);
                    $scope.apiList = res.data;
                }

            })
        }
        setInterval(function() {
            apiCount(7);
        }, 5000);
    }]);
