(function () {
  'use strict';

  angular.module('view.file')
    .controller('FriendlyJsonCtrl', FriendlyJsonCtrl);

  FriendlyJsonCtrl.$inject = ['$scope', '$sce', '$templateCache', '$http'];

  function FriendlyJsonCtrl($scope, $sce, $templateCache, $http) {
    var ctrl = this;
    ctrl.trustUri = function(uri) {
      $sce.trustAsResourceUrl(uri);
    };
    ctrl.load = function(uri) {
      var json = $templateCache.get(uri);

      if (!json) {
        $http.get(uri, {
          cache: $templateCache,
          transformResponse: function(data, headersGetter) {
            // Return the raw string, so $http doesn't parse it
            // if it's json.
            return data;
          }
        }).then(function (response) {
          $scope.loading = false;
          $scope.json = JSON.parse(response.data);
        });
      } else if (angular.isArray(json)) {
        $scope.loading = false;
        $scope.json = JSON.parse(json[1]);
      } else {
        json.then(function(response) {
          $scope.json = JSON.parse(response.data);
        });
      }
    };
  }
}());
