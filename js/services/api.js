'use strict';
angular.module('app').service('api', ['$http', api]);

var WWW_FORM_HEADER = {
    'Content-Type': 'application/x-www-form-urlencoded'
};

function api($http) {

    return {
        signIn: function(url, data) {
            return httpPost(url, data);
        },
        loginConfig: function() {
            return httpGet('/pipeway/v1/clientConfligs');
        },
        appCreate: function(data) {
            return httpPost('/pipeway/v1/app/create', data);
        },
        getServerList: function(data) {
            return httpGet('/pipeway/v1/app/list/' + data.type + '?page=' + data.page + '&pageSize=' + data.pageSize);
        },
        createApi: function(data) {
            return httpPost('/pipeway/v1/api/create', data);
        },
        getApiList: function(data) {
            // data.appKey = data.appKey.replace('#hash', '');
            return httpGet('/pipeway/v1/api/list/' + data.appKey + '?page=' + data.page + '&pageSize=' + data.pageSize);
        },
        apiUpdate: function(data) {
            return httpPost('/pipeway/v1/api/update/' + data.id, data);
        },
        apiDelete: function(data) {
            return httpPost('/pipeway/v1/api/delete/' + data.id);
        },
        getAppDetail: function(data) {
            return httpGet('/pipeway/v1/app/' + data.appKey);
        },
        appUpdate: function(data) {
            return httpPost('/pipeway/v1/app/update/' + data.appKey, data);
        },
        appDelete: function(data) {
            return httpPost('/pipeway/v1/app/delete/' + data.appKey);
        },
        apiDetail: function(data) {
            return httpGet('/pipeway/v1/api/' + data.id);
        },
        createHost: function(data) {
            return httpPost('/pipeway/v1/host/create', data);
        },
        getHostList: function(data) {
            data.appKey = data.appKey.replace('#hash', '');
            return httpGet('/pipeway/v1/host/list/' + data.appKey + '?page=' + data.page + '&pageSize=' + data.pageSize);
        },
        hostDetail: function(data) {
            return httpGet('/pipeway/v1/host/' + data.id);
        },
        hostUpdate: function(data) {
            return httpPost('/pipeway/v1/host/update/' + data.id, data);
        },
        hostDelete: function(data) {
            return httpPost('/pipeway/v1/host/delete/' + data.id);
        },
        accessLogs: function(data) {
            return httpGet('/pipeway/v1/analysis/app/count?type=' + data);
        },
        search: function(searchParams, keywords) {
            return httpPost('/pipeway/v1/api/search/' + searchParams.appKey + '?page=' + searchParams.page + '&pageSize=' + searchParams.pageSize + '&from=' + searchParams.from + '&to=' + searchParams.to, keywords);
        },
        ///pipeway/v1/analysis/api/count?span=1
        apiCount: function(data) {
            return httpGet('/pipeway/v1/analysis/api/count?span=' + data);
        },
        getAlarmConfig: function() {
            return httpGet('/pipeway/v1/alarm/detail');
        },
        createAlarmConfig: function(params) {
            return httpPost('/pipeway/v1/alarm/create', params);
        },
        getUserInfo: function() {
            return httpGet('/pipeway/v1/user/MYSELF');
        },
        configReload: function() {
            return httpGet('/pipeway/v1/config/reload');
        }
    };

    function httpGet(url) {
        var token = sessionStorage.getItem('token');
        return $http.get(url, {
            headers: {
                'Authorization': 'Bearer' + ' ' + token
            }
        }).then(function(r) {
            return r.data;
        });
    }

    function httpPost(url, data) {
        var token = sessionStorage.getItem('token');
        return $http.post(url, param(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer' + ' ' + token,
            }
        }).then(function(r) {
            return r.data;
        });
    }
}

function param(obj) {
    var str = [];
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    }
    return str.join("&");
}