app.controller('DashboardCtrl', ['$scope', '$http', '$state', 'isLogin', 'user','api', '$cookies',
    function ($scope, $http, $state, isLogin, user,api, $cookies) {

        init();
        function initCharts(legend, series, xAxis) {
            var myChart = echarts.init(document.getElementById('main'));
            option = {
                title: {
                    text: '应用访问统计图'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data: legend
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
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

    }]);
