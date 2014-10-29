// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tab.table', {
      url: '/table',
      views: {
        'tab-table': {
          templateUrl: 'templates/table.html',
          controller: 'tableCtrl'
        }
      }
    })
    .state('tab.news', {
      url: '/news',
      views: {
        'tab-news': {
          templateUrl: 'templates/news.html',
          controller: 'newsCtrl'
        }
      }
    })
    .state('tab.fixtures', {
      url: '/fixtures',
      views: {
        'tab-fixtures': {
          templateUrl: 'templates/fixtures.html',
          controller: 'fixturesCtrl'
        }
      }
    })
    .state('tab.detail', {
      url: '/news/:id',
      views: {
        'tab-news': {
          templateUrl: 'templates/detail.html',
          controller: 'detailCtrl'
        }
      }
    });
    // setup an abstract state for the tabs directive

    $urlRouterProvider.otherwise('/tab/table');
   });