angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      
      StatusBar.styleDefault();
    }
    if(window.plugins.AdMob){
          window.plugins.AdMob.createBanner({
            adId:'ca-app-pub-4516508181024455/5621675327', 
            position:window.plugins.AdMob.AD_POSITION.BOTTOM_CENTER, 
            autoShow:true});
    }
   
      if(window.plugins.AdMob){
            window.plugins.AdMob.prepareInterstitial({
              adId: 'ca-app-pub-4516508181024455/7098408524',
              autoShow: true
          });
         
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
    .state('tab.results', {
      url: '/results',
      views: {
        'tab-results': {
          templateUrl: 'templates/results.html',
          controller: 'resultsCtrl'
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
    

    $urlRouterProvider.otherwise('/tab/table');
   });