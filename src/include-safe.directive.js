(function () {

  'use strict';

  angular.module('view.file')
  .directive('includeSafe', includeSafeDirective);

  includeSafeDirective.$inject = ['$http', '$sanitize'];

  function includeSafeDirective($http, $sanitize) {
    // directive factory creates a link function
    return function(scope, element, attrs) {
      scope.$watch(
        function(scope) {
          // watch the 'compile' expression for changes
          return scope.$eval(attrs.includeSafe);
        },
        function(value) {
          $http.get(value).then(function(response) {
            var html = response.data;
            // when the 'compile' expression changes
            // assign it into the current DOM
            element.html($sanitize(html));
          });
        }
      );
    };
  }


}());
