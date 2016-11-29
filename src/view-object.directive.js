 /**
  * @ngdoc directive
  * @memberOf 'view.file'
  * @name view-object
  * @description
  *   Angular directive for including HTML object tag dynamically.
  *
  * @attr {String}    data          Required. Url of file to be viewed. Url must be trusted upfront.
  * @attr {String}    type          Optional. Mime-type of file to be viewed.
  * @attr {String}    height        Optional. Height value to be applied to object tag.
  * @attr {String}    width         Optional. Width value to be applied to object tag.
  *
  * @example
  * <view-object data="ctrl.viewUri" type="ctrl.contentType" height="'600px'" width="'100%'"></view-object>
  */

(function () {
  'use strict';

  angular.module('view.file')
    .directive('viewObject', ['$compile', function($compile) {
      return {
        restrict: 'E',
        link: function(scope, element, attrs) {
          // prepare object tag attributes
          var data = ' data="' + scope.$eval(attrs.data) + '"';
          var type = attrs.type ? (' type="' + scope.$eval(attrs.type) + '"') : '';
          var height = attrs.height ? (' height="' + scope.$eval(attrs.height) + '"') : '';
          var width = attrs.width ? (' width="' + scope.$eval(attrs.width) + '"') : '';

          // tried transclude before, but that didn't seem to work..
          var innerHtml = element.html();
          element.html('<object " ' + height + width + type + data + '>' + innerHtml + '</object>');
          $compile(element.contents())(scope);
        }
      };
    }]);

}());