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
          /* jshint camelcase: false */
          /* jscs: disable requireCamelCaseOrUpperCaseIdentifiers*/
          $scope.json = x2js.xml_str2json(response.data);
          /* jscs: enable requireCamelCaseOrUpperCaseIdentifiers*/
          /* jshint camelcase: true */
        });
      } else if (angular.isArray(xml)){
        $scope.loading = false;
        /* jshint camelcase: false */
        /* jscs: disable requireCamelCaseOrUpperCaseIdentifiers*/
        $scope.json = x2js.xml_str2json(xml[1]);
        /* jscs: enable requireCamelCaseOrUpperCaseIdentifiers*/
        /* jshint camelcase: true */
      } else {
        xml.then(function(response) {
          $scope.loading = false;
          /* jshint camelcase: false */
          /* jscs: disable requireCamelCaseOrUpperCaseIdentifiers*/
          $scope.json = x2js.xml_str2json(response.data);
          /* jscs: enable requireCamelCaseOrUpperCaseIdentifiers*/
          /* jshint camelcase: true */
        });
      }
    };
  }
}());
