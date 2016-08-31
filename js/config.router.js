'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams', 
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider',
      function ($stateProvider,   $urlRouterProvider) {
          
          $urlRouterProvider
              .otherwise('client/list');
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: 'tpl/app.html'
              })
              .state('dashboard', {
                  abstract: true,
                  url: '/dashboard',
                  templateUrl: 'tpl/layout.html'
              })
              .state('dashboard.home', {
                  url: '/',
                  templateUrl: 'tpl/dashboard/index.html',
                  resolve: {
                      deps: ['$ocLazyLoad',
                          function( $ocLazyLoad ){
                              return $ocLazyLoad.load(['js/controllers/chart.js']);
                          }]
                  }
              })
              .state('client', {
                  abstract: true,
                  url: '/client',
                  templateUrl: 'tpl/layout.html'
              })
              .state('client.list', {
                  url: '/list',
                  templateUrl: 'tpl/client/list.html',
                  resolve: {
                      deps: ['uiLoad',
                          function( uiLoad ){
                              return uiLoad.load( ['js/app/client/list.js',
                                  'vendor/libs/moment.min.js'] );
                          }]
                  }
              })
              .state('server', {
                  abstract: true,
                  url: '/server',
                  templateUrl: 'tpl/layout.html'
              })
              .state('server.list', {
                  url: '/server',
                  templateUrl: 'tpl/server/list.html',
                  resolve: {
                      deps: ['uiLoad',
                          function( uiLoad ){
                              return uiLoad.load( ['js/app/server/list.js',
                                  'vendor/libs/moment.min.js'] );
                          }]
                  }
              })
              .state('server.add', {
                  url: '/add',
                  templateUrl: 'tpl/server/addServer.html',
                  resolve: {
                      deps: ['uiLoad', '$ocLazyLoad',
                          function( uiLoad, $ocLazyLoad){
                              return $ocLazyLoad.load('angularFileUpload').then(
                                  function() {
                                      return $ocLazyLoad.load(['js/app/server/addServer.js',
                                          'vendor/libs/moment.min.js'
                                      ]);
                                  }
                              );
                          }]
                  }
              })
              // others
              .state('lockme', {
                  url: '/lockme',
                  templateUrl: 'tpl/page_lockme.html'
              })
              .state('access', {
                  url: '/access',
                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
              })
              .state('access.signin', {
                  url: '/signin',
                  templateUrl: 'tpl/page_signin.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/signin.js'] );
                      }]
                  }
              })

              .state('access.signup', {
                  url: '/signup',
                  templateUrl: 'tpl/page_signup.html',
                  resolve: {
                      deps: ['uiLoad',
                        function( uiLoad ){
                          return uiLoad.load( ['js/controllers/signup.js'] );
                      }]
                  }
              })
              .state('access.forgotpwd', {
                  url: '/forgotpwd',
                  templateUrl: 'tpl/page_forgotpwd.html'
              })
              .state('access.404', {
                  url: '/404',
                  templateUrl: 'tpl/page_404.html'
              })

              .state('app.versionList', {
                  url: '/versionList/:appkey/:platform/:name',
                  templateUrl: 'tpl/apps_version_list.html',
                  //use resolve to load other dependences
                  resolve: {
                       deps: ['$ocLazyLoad', 'uiLoad',
                         function( $ocLazyLoad, uiLoad ){
                           return uiLoad.load(
                             [ 'js/app/version/version.js',
                               'vendor/jquery/fullcalendar/fullcalendar.css',
                               'vendor/jquery/fullcalendar/theme.css',
                               'vendor/jquery/jquery-ui-1.10.3.custom.min.js',
                               'vendor/libs/moment.min.js',
                               'vendor/jquery/fullcalendar/fullcalendar.min.js']
                           )
                       }]
                  }
              })
              .state('app.bundleList', {
                  url: '/bundleList/:appKey/:platform/:parentVersion',
                  templateUrl: 'tpl/apps_bundle_list.html',
                  //use resolve to load other dependences
                  resolve: {
                      deps: ['$ocLazyLoad', 'uiLoad',
                          function( $ocLazyLoad, uiLoad ){
                              return uiLoad.load(
                                  [ 'js/app/version/bundleVersion.js',
                                      'vendor/jquery/fullcalendar/fullcalendar.css',
                                      'vendor/jquery/fullcalendar/theme.css',
                                      'vendor/jquery/jquery-ui-1.10.3.custom.min.js',
                                      'vendor/libs/moment.min.js',
                                      'vendor/jquery/fullcalendar/fullcalendar.min.js']
                              )
                          }]
                  }
              })
              .state('app.user', {
                  url: '/user',
                  templateUrl: 'tpl/app_user.html',
                  resolve: {
                      deps: ['uiLoad',
                          function( uiLoad ){
                              return uiLoad.load( ['js/app/user/user.js'] );
                          }]
                  }
              })
              .state('apps.push', {
                  url: '/push/:_id',
                  templateUrl: 'tpl/apps_push.html',
                  resolve: {
                      deps: ['uiLoad',
                          function( uiLoad ){
                              return uiLoad.load( ['js/app/note/push.js'] );
                          }]
                  }
              })
              .state('apps.popup', {
                  url: '/popup',
                  templateUrl: 'tpl/popup.html'
              })
              .state('apps.create_user', {
                  url: '/create_user',
                  templateUrl: 'tpl/apps_create_user.html',
                  resolve: {
                      deps: ['uiLoad',
                          function( uiLoad ){
                              return uiLoad.load( ['js/app/user/create_user.js'] );
                          }]
                  }
              })
              .state('apps.create_version', {
                  url: '/create_version/:appKey',
                  templateUrl: 'tpl/apps_create_version.html',
                  resolve: {
                      deps: ['uiLoad', '$ocLazyLoad',
                          function( uiLoad, $ocLazyLoad){
                              return $ocLazyLoad.load('angularFileUpload').then(
                                  function() {
                                      return $ocLazyLoad.load(['js/app/version/createVersion.js',
                                                                'vendor/libs/moment.min.js'
                                      ])
                                  }
                              );
                          }]
                  }
              })
              .state('apps.create_bundle', {
                  url: '/create_bundle/:appKey/:platform/:parentVersion',
                  templateUrl: 'tpl/apps_create_bundle.html',
                  resolve: {
                      deps: ['uiLoad', '$ocLazyLoad',
                          function( uiLoad, $ocLazyLoad){
                              return $ocLazyLoad.load('angularFileUpload').then(
                                  function() {
                                      return $ocLazyLoad.load(['js/app/version/createBundle.js',
                                          'vendor/libs/moment.min.js'
                                      ])
                                  }
                              );
                          }]
                  }
              })


      }
    ]
  );