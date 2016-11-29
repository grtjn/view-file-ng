 /**
  * @ngdoc directive
  * @memberOf 'view.file'
  * @name friendly-json
  * @description
  *   Angular directive for rendering nested JSON structures in a user-friendly way.
  *
  * @attr {String}    json          Optional. JSON contents to be rendered. Do not use together with uri.
  * @attr {String}    template      Optional. Url of HTML template to use for this directive.
  * @attr {String}    uri           Optional. Url of JSON file to be rendered. Url must be trusted upfront.
  *
  * @example
  * <friendly-json uri="ctrl.viewUri" template="/my/json-template.html"></friendly-json>
  * 
  * or
  * 
  * <friendly-json json="ctrl.json" template="/my/json-template.html"></friendly-json>
  */

(function () {

  'use strict';

  angular.module('view.file')
  .directive('friendlyJson', friendlyJsonDirective)
  .filter('isObject', function() {
    return function(val) {
      return angular.isObject(val);
    };
  })
  .filter('isArray', function() {
    return function(val) {
      return angular.isArray(val);
    };
  })
  .filter('isFunction', function() {
    return function(val) {
      return angular.isFunction(val);
    };
  });

  friendlyJsonDirective.$inject = ['RecursionHelper'];

  function friendlyJsonDirective(RecursionHelper) {
    return {
      restrict: 'E',
      controller: 'FriendlyJsonCtrl',
      controllerAs: 'ctrl',
      scope: {
        uri: '=?',
        json: '=?'
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
