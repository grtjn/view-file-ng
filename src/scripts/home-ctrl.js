(function () {
  'use strict';

  angular.module('viewFileNgDemo')

    .controller('viewFileNgDemo.HomeCtrl', [
      '$scope',
      '$http',
      HomeCtrl
    ]);

  function HomeCtrl($scope, $http) {
    var ctrl = this;
    $scope.ctrl = ctrl;

    ctrl.files = [{
      uri: 'https://grtjn.github.io/view-file-ng/data/sample-music.mp3',
      data: 'fake',
      type: 'audio/mpeg'
    },{
      uri: 'https://grtjn.github.io/view-file-ng/data/quickstart.html',
      data: null,
      type: 'text/html'
    },{
      uri: 'https://grtjn.github.io/view-file-ng/data/bower.json',
      data: null,
      type: 'application/json'
    },{
      uri: 'https://grtjn.github.io/view-file-ng/data/installation-guide.pdf',
      data: 'fake',
      type: 'application/pdf'
    },{
      uri: 'https://grtjn.github.io/view-file-ng/data/install.txt',
      data: null,
      type: 'text/plain'
    },{
      uri: 'https://grtjn.github.io/view-file-ng/data/Video%20Sample%201%20%28Small%29.m4v',
      data: 'fake',
      type: 'video/mpeg'
    },{
      uri: 'https://grtjn.github.io/view-file-ng/data/Atom_Example.xml',
      data: null,
      type: 'application/atom+xml'
    },{
      uri: 'https://grtjn.github.io/view-file-ng/data/other-binary.xxx',
      data: 'fake',
      type: 'application/octet-stream'
    }];

    angular.forEach(ctrl.files, function(file, index) {
      if (!file.data) {
        $http.get(file.uri).then(function(data) {
          file.data = data.data;
        });
      }
    });

  }

}());
