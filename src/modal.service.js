(function () {
  'use strict';

  angular.module('view.file')
  .service('ModalService', ModalService);

  ModalService.$inject = ['$uibModal'];

  function ModalService($modal) {

    var service = {
      show: showModal
    };

    return service;

    function showModal(template, title, ctrl, validate, modalOptions) {
      return $modal.open(
        angular.extend({
          templateUrl: template+'',
          controller: ['$scope', '$uibModalInstance', 'title', 'ctrl', 'validate', function ($scope, $modalInstance, title, ctrl, validate) {
            $scope.title = title;
            $scope.ctrl = ctrl;
            $scope.alerts = [];
            $scope.ok = function () {
              if (validate) {
                $scope.alerts = validate($scope);
              }
              if ($scope.alerts.length === 0) {
                $modalInstance.close($scope.model);
              }
            };
            $scope.cancel = function () {
              $modalInstance.dismiss('cancel');
            };
          }],
          size: 'lg',
          resolve: {
            title: function () {
              return title;
            },
            ctrl: function () {
              return ctrl;
            },
            validate: function () {
              return validate || function($s) {
                var errors = [];
                if ($s.form) {
                  angular.forEach($s.form.$error, function(err, key) {
                    angular.forEach(err, function(e, index) {
                      errors.push(key + ': ' + (e.$name || index));
                    });
                  });
                }
                return errors;
              };
            }
          }
        }, modalOptions)
      ).result;
    }
  }
}());
