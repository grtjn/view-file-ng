(function(){
  'use strict';
  
  angular
    .module('viewFileNgDemo', [
      'ui.router',
      'ui.bootstrap',
      'hljs',
      'view.file',
      'viewFileNgDemo.Tpls'
    ])
    
    .config([
      '$locationProvider',
      '$urlRouterProvider',
      '$stateProvider',
      App
    ]);

  function App($locationProvider, $urlRouterProvider, $stateProvider) {

    //$locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'viewFileNgDemo.HomeCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/home.html',
        resolve: {
        }
      })
      .state('quickstart', {
        url: '/quickstart',
        controller: 'viewFileNgDemo.HomeCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/quickstart.html',
        resolve: {
        }
      })
      .state('api', {
        url: '/api',
        controller: 'viewFileNgDemo.HomeCtrl',
        controllerAs: 'ctrl',
        templateUrl: '/api.html',
        resolve: {
        }
      })
    ;
      
  }
})();
