 /**
  * @ngdoc service
  * @memberOf 'view.file'
  * @name ModalService
  * @param {service}  $uibModal     angular-bootstrap modal service
  * @description
  *   Angular helper service displaying, and handling modal overlays. Wraps around $uibModal.
  */

(function () {
  'use strict';

  angular.module('view.file')
  .service('ModalService', ['$uibModal', ModalService]);

  function ModalService($modal) {

    var service = {
      show: showModal
    };

    return service;

    /**
     * Show a modal for given template, title, and data.
     * @memberof ModalService
     * @param {String}     template      Required. Url of modal template.
     * @param {String}     title         Optional. Title for modal overlay.
     * @param {Object}     ctrl          Optional. Object with data and callbacks for use on modal. For instance link to parent Ctrl.
     * @param {function}   validate      Optional. Callback function to validate input before closing modal. Expected to return an Array of Strings.
     * @param {Object}     modalOptions  Optional. Additional modal options.
     * @returns {Promise}  result        Promise for updated ctrl if ok was selected, or null if cancel.
     */
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
                $modalInstance.close($scope.ctrl);
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
