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
        appCreate: function(data) {
            return httpPost('/pipeway/v1/app/create', data);
        }
    };

    function httpGet(url) {
        return $http.get(url).then(function(r) {
            return r.data;
        });
    }
    function httpPost(url, data) {
        return $http.post(url, param(data), {
            headers: WWW_FORM_HEADER
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
