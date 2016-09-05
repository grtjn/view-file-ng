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

(function () {
  'use strict';

  angular.module('viewFileNgDemo')

    .controller('viewFileNgDemo.HomeCtrl', [
      '$scope',
      HomeCtrl
    ]);

  function HomeCtrl($scope) {
    var ctrl = this;
    $scope.ctrl = ctrl;

    ctrl.files = [{
      uri: 'https://grtjn.github.io/view-file-ng/data/sample-music.mp3',
      type: 'audio/mpeg'
    },{
      uri: 'https://grtjn.github.io/view-file-ng/data/quickstart.html',
      type: 'text/html'
    },{
      uri: 'https://grtjn.github.io/view-file-ng/data/bower.json',
      type: 'application/json'
    },{
      uri: 'https://grtjn.github.io/view-file-ng/data/installation-guide.pdf',
      type: 'application/pdf'
    },{
      uri: 'https://grtjn.github.io/view-file-ng/data/install.txt',
      type: 'text/plain'
    },{
      uri: 'https://grtjn.github.io/view-file-ng/data/Video%20Sample%201%20%28Small%29.m4v',
      type: 'video/mpeg'
    },{
      uri: 'https://grtjn.github.io/view-file-ng/data/Atom_Example.xml',
      type: 'application/atom+xml'
    }];

  }

}());
