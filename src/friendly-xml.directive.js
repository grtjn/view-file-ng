 /**
  * @ngdoc directive
  * @memberOf 'view.file'
  * @name friendly-xml
  * @description
  *   Angular directive for rendering nested JSON structures in a user-friendly way.
  *
  * @attr {String}    template      Optional. Url of HTML template to use for this directive.
  * @attr {String}    uri           Optional. Url of XML file to be rendered. Url must be trusted upfront.
  * @attr {String}    xml           Optional. XML contents to be rendered. Do not use together with uri.
  *
  * @example
  * <friendly-xml uri="ctrl.viewUri" template="/my/xml-template.html"></friendly-xml>
  * 
  * or
  * 
  * <friendly-xml xml="ctrl.xml" template="/my/xml-template.html"></friendly-xml>
  */

(function () {

  'use strict';

  angular.module('view.file')
  .directive('friendlyXml', friendlyXmlDirective);

  friendlyXmlDirective.$inject = ['RecursionHelper'];

  function friendlyXmlDirective(RecursionHelper) {
    return {
      restrict: 'E',
      controller: 'FriendlyXmlCtrl',
      controllerAs: 'ctrl',
      scope: {
        uri: '=?',
        xml: '=?'
      },
      templateUrl: template,
      compile: function(element) {
        // Use the compile function from the RecursionHelper,
        // And return the linking function(s) which it returns
        return RecursionHelper.compile(element, function ($scope, $elem, $attrs, ctrl) {
          $scope.loading = true;

          $scope.$watch('uri', function(newUri) {
            if (newUri) {
              ctrl.load(newUri);
            }
          });

          $scope.$watch('xml', function(newXML) {
            if (newXML) {
              ctrl.parse(newXML);
            }
          });
        });
      }
    };

    function template(element, attrs) {
      var url;

      if (attrs.template) {
        url = attrs.template;
      } else {
        url = '/view-file-ng/friendly-json.html';
      }

      return url;
    }
  }

}());
