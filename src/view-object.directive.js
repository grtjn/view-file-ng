(function () {
  'use strict';

  angular.module('view.file')
    .directive('viewObject', function() {
      return {
        restrict: 'E',
        transclude: true,
        link: function(scope, element, attrs) {
          var data = ' data="' + scope.$eval(attrs.data) + '"';
          var type = attrs.type ? (' type="' + scope.$eval(attrs.type) + '"') : '';
          var height = attrs.height ? (' height="' + scope.$eval(attrs.height) + '"') : '';
          var width = attrs.width ? (' width="' + scope.$eval(attrs.width) + '"') : '';
          element.append('<object " ' + height + width + type + data + ' ng-transclude></object>');
        }
      };
    });

}());