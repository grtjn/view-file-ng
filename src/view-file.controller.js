(function () {
  'use strict';

  angular.module('view.file')
    .controller('ViewFileCtrl', ViewFileCtrl);

  ViewFileCtrl.$inject = ['$scope', '$sce', '$templateCache', '$http', 'ModalService'];

  function ViewFileCtrl($scope, $sce, $templateCache, $http, modal) {
    var ctrl = this;
    ctrl.trustUri = function(uri) {
      $sce.trustAsResourceUrl(uri);
    };
    ctrl.loadHljs = function(uri) {
      $scope.loading = !$templateCache.get(uri);

      if ($scope.loading) {
        $http.get(uri, {
          cache: $templateCache,
          transformResponse: function(data, headersGetter) {
            // Return the raw string, so $http doesn't parse it
            // if it's json.
            return data;
          }
        }).then(function (result) {
          $scope.loading = false;
          $scope.hljsUri = uri;
        });
      } else {
        $scope.hljsUri = uri;
      }
    };
    ctrl.showModal = function() {
      if ($scope.allowModal) {
        modal.show('/view-file-ng/show-file.modal.html', null, $scope);
      }
    };
    ctrl.toggleCode = function() {
      $scope.showCode = !$scope.showCode;
    };
  }
}());
