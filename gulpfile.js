var gulp = require('gulp');
var connect = require('gulp-connect');
var modRewrite = require('connect-modrewrite');
var watch = require('gulp-watch');
var less = require('gulp-less');
var shell = require('gulp-shell');
var host = "http://10.99.97.141:8888";


gulp.task('connect', function () {
	connect.server({
		root: './',
		port: 10000,
		livereload: false,
		middleware: function (connect, o) {
			return [
				(function () {
					var url = require('url');
					var proxy = require('proxy-middleware');
					var options = url.parse(host + '/pipeway');
					options.route = '/pipeway';
					return proxy(options);
				})(),
				modRewrite([
					'!\\.html|\\.js|\\.css|\\.swf|\\.jp(e?)g|\\.png|\\.gif|\\.eot|\\.woff|\\.ttf|\\.svg$ /index.html'
				])
			];
		}
	});
});

gulp.task('dev', ['connect']);
