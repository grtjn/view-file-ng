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
        uri: '=',
      },
      templateUrl: '/view-file-ng/friendly-json.html',
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
  }

}());
