(function () {

  'use strict';

  angular.module('view.file')
  .directive('viewFile', viewFileDirective);

  function viewFileDirective() {

    function isTrue(b, def) {
      if (b !== undefined) {
        return b === true || b === 'true';
      } else {
        return def;
      }
    }

    function getFileType(contentType) {
      var type = 'other';
      if (/\/[x]?html/.test(contentType)) {
        type = 'html';
      } else if (/[\+\/]json$/.test(contentType)) {
        type = 'json';
      } else if (/[\+\/]xml$/.test(contentType)) {
        type = 'xml';
      } else if (/^(audio|image|text|video|xml)\//.test(contentType)) {
        type = contentType.split('/')[0];
      } else if (/^application\//.test(contentType)) {
        // TODO
      }
      return type;
    }

    return {
      restrict: 'E',
      controller: 'ViewFileCtrl',
      controllerAs: 'ctrl',
      scope: {
        uri: '=',
        downloadUri: '=?',
        contentType: '=',
        fileName: '=?',
        _allowModal: '@allowModal',
        _controls: '@controls',
        _showCode: '@showCode',
        _trustUri: '@trustUri'
      },
      templateUrl: '/view-file-ng/view-file.html',
      link: function ($scope, $elem, $attrs, ctrl) {

        $scope.allowModal = isTrue($scope._allowModal, true);
        $scope.controls = isTrue($scope._controls, $scope.allowModal || !!$scope.downloadUri);
        $scope.showCode = isTrue($scope._showCode, false);
        $scope.trustUri = isTrue($scope._trustUri, false);
        $scope.loading = true;

        $scope.$watch('uri', function(newUri) {
          if (newUri) {
            $scope.fileName = $scope.fileName || newUri.split('/').pop();
            $scope.fileType = getFileType($scope.contentType);

            if ($scope.trustUri) {
              ctrl.trustUri(newUri);
            }
            if ($scope.fileType === 'xml') {
              ctrl.loadHljs(newUri);
            } else {
              $scope.loading = false;
            }
          }
        });
      }
    };
  }

}());
