(function () {
  'use strict';

  angular.module('view.file')
    .controller('FriendlyXmlCtrl', FriendlyXmlCtrl);

  FriendlyXmlCtrl.$inject = ['$scope', '$sce', '$templateCache', '$http', 'x2js'];

  function FriendlyXmlCtrl($scope, $sce, $templateCache, $http, x2js) {
    var ctrl = this;

    ctrl.trustUri = function(uri) {
      $sce.trustAsResourceUrl(uri);
    };

    ctrl.load = function(uri) {
      var xml = $templateCache.get(uri);

      if (!xml) {
        $http.get(uri, {
          cache: $templateCache,
          transformResponse: function(data, headersGetter) {
            // Return the raw string, so $http doesn't parse it
            // if it's json.
            return data;
          }
        }).then(function (response) {
          $scope.loading = false;
          ctrl.parse(response.data);
        });
      } else if (angular.isArray(xml)){
        $scope.loading = false;
        ctrl.parse(xml[1]);
      } else {
        xml.then(function(response) {
          $scope.loading = false;
          ctrl.parse(response.data);
        });
      }
    };

    ctrl.parse = function(xml) {
      /* jshint camelcase: false */
      /* jscs: disable requireCamelCaseOrUpperCaseIdentifiers*/
      $scope.json = x2js.xml_str2json(xml);
      /* jscs: enable requireCamelCaseOrUpperCaseIdentifiers*/
      /* jshint camelcase: true */
    };
  }
}());
