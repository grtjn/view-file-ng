 /**
  * @ngdoc directive
  * @memberOf 'view.file'
  * @name view-file
  * @description
  *   Angular directive for viewing files. Leverages a.o. highlightjs, json-explorer, sanitize, videogular, x2js.
  *
  * @attr {String}    uri           Required. Url of file to be viewed.
  * @attr {String}    content-type  Required. Mime-type of file to be viewed.
  * @attr {String}    download-uri  Optional. Url of file for download purpose. Default: null.
  * @attr {String}    file-name     Optional. Filename for display. Default: uri portion after last /.
  * @attr {Boolean}   allow-modal   Optional. Allow opening of file in modal overlay. Default: true.
  * @attr {Boolean}   controls      Optional. Show controls on left. Default: true if download-uri or allow-modal.
  * @attr {Boolean}   show-code     Optional. Show raw code initially for JSON, HTML, Text, and XML. Default: false.
  * @attr {Boolean}   trust-uri     Optional. Apply trustAsResourceUrl on uri (not recommended). Default: false.
  *
  * @example
  * <view-file uri="ctrl.viewUri" download-uri="ctrl.downloadUri" content-type="ctrl.contentType"
  *   file-name="ctrl.fileName" allow-modal="true" controls="true" show-code="false" trust-uri="false">
  * </view-file>
  */

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
