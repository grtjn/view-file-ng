(function() {
  'use strict';

  angular.module('view.file', [
    'view.file.tpls',
    'cb.x2js',
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls',
    'hljs',
    'ngSanitize',
    'RecursionHelper'
  ]);

}());

(function () {
  'use strict';

  angular.module('view.file')
    .controller('FriendlyJsonCtrl', FriendlyJsonCtrl);

  FriendlyJsonCtrl.$inject = ['$scope', '$sce', '$templateCache', '$http'];

  function FriendlyJsonCtrl($scope, $sce, $templateCache, $http) {
    var ctrl = this;
    ctrl.trustUri = function(uri) {
      $sce.trustAsResourceUrl(uri);
    };
    ctrl.load = function(uri) {
      var json = $templateCache.get(uri);

      if (!json) {
        $http.get(uri, {
          cache: $templateCache,
          transformResponse: function(data, headersGetter) {
            // Return the raw string, so $http doesn't parse it
            // if it's json.
            return data;
          }
        }).then(function (response) {
          $scope.loading = false;
          $scope.json = JSON.parse(response.data);
        });
      } else if (angular.isArray(json)) {
        $scope.loading = false;
        $scope.json = JSON.parse(json[1]);
      } else {
        json.then(function(response) {
          $scope.json = JSON.parse(response.data);
        });
      }
    };
  }
}());

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

(function () {
  'use strict';

  angular.module('view.file')
    .controller('ViewFileCtrl', ViewFileCtrl);

  ViewFileCtrl.$inject = ['$scope', '$sce', '$templateCache', '$http', 'ModalService'];

  function ViewFileCtrl($scope, $sce, $templateCache, $http, modal) {
    var ctrl = this;
    ctrl.trustUri = function(uri) {
      $sce.trustAsResourceUrl(uri);
    };
    ctrl.loadHljs = function(uri) {
      $scope.loading = !$templateCache.get(uri);

      if ($scope.loading) {
        $http.get(uri, {
          cache: $templateCache,
          transformResponse: function(data, headersGetter) {
            // Return the raw string, so $http doesn't parse it
            // if it's json.
            return data;
          }
        }).then(function (result) {
          $scope.loading = false;
          $scope.hljsUri = uri;
        });
      } else {
        $scope.hljsUri = uri;
      }
    };
    ctrl.showModal = function() {
      if ($scope.allowModal) {
        modal.show('/view-file-ng/show-file.modal.html', null, $scope);
      }
    };
    ctrl.toggleCode = function() {
      $scope.showCode = !$scope.showCode;
    };
  }
}());

(function () {

  'use strict';

  angular.module('view.file')
  .directive('viewFile', viewFileDirective);

  function viewFileDirective() {

    function isTrue(b, def) {
      if (b !== undefined) {
        return b === true || b === 'true';
      } else {
        return def;
      }
    }

    function getFileType(contentType) {
      var type = 'other';
      if (/\/[x]?html/.test(contentType)) {
        type = 'html';
      } else if (/[\+\/]json$/.test(contentType)) {
        type = 'json';
      } else if (/[\+\/]xml$/.test(contentType)) {
        type = 'xml';
      } else if (/^(audio|image|text|video|xml)\//.test(contentType)) {
        type = contentType.split('/')[0];
      } else if (/^application\//.test(contentType)) {
        // TODO
      }
      return type;
    }

    return {
      restrict: 'E',
      controller: 'ViewFileCtrl',
      controllerAs: 'ctrl',
      scope: {
        uri: '=',
        downloadUri: '=?',
        contentType: '=',
        fileName: '=?',
        _allowModal: '@allowModal',
        _controls: '@controls',
        _showCode: '@showCode',
        _trustUri: '@trustUri'
      },
      templateUrl: '/view-file-ng/view-file.html',
      link: function ($scope, $elem, $attrs, ctrl) {

        $scope.allowModal = isTrue($scope._allowModal, true);
        $scope.controls = isTrue($scope._controls, $scope.allowModal || !!$scope.downloadUri);
        $scope.showCode = isTrue($scope._showCode, false);
        $scope.trustUri = isTrue($scope._trustUri, false);
        $scope.loading = true;

        $scope.$watch('uri', function(newUri) {
          if (newUri) {
            $scope.fileName = $scope.fileName || newUri.split('/').pop();
            $scope.fileType = getFileType($scope.contentType);

            if ($scope.trustUri) {
              ctrl.trustUri(newUri);
            }
            if ($scope.fileType === 'xml') {
              ctrl.loadHljs(newUri);
            } else {
              $scope.loading = false;
            }
          }
        });
      }
    };
  }

}());

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
(function(module) {
try {
  module = angular.module('view.file.tpls');
} catch (e) {
  module = angular.module('view.file.tpls', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/view-file-ng/friendly-json.html',
    '<dl class="dl-horizontal">\n' +
    '  <span ng-repeat="(key,val) in json track by $index" ng-hide="(val | isFunction) || (key.startsWith(\'_\') && key !== \'__text\')">\n' +
    '    <dt>{{ key.startsWith(\'__\') ? key.replace(\'__\', \'\') : key }}</dt>\n' +
    '    <!-- simple value -->\n' +
    '    <dd ng-if="!(val | isObject)">{{ val !== \'\' ? val : \'&#160;\' }}</dd>\n' +
    '    <!-- array or object -->\n' +
    '    <span ng-if="(val | isObject)">\n' +
    '      <!-- array with simple values -->\n' +
    '      <dd ng-if="(val | isArray) && !(val[0] | isObject)">{{ val.join(\', \') }}</dd>\n' +
    '      <!-- add nbsp for better alignment of values -->\n' +
    '      <dd ng-if="!(val | isArray) || (val[0] | isObject)">&#160;</dd>\n' +
    '      <!-- object, recurse -->\n' +
    '      <dd ng-if="!(val | isArray)">\n' +
    '        <!--span ng-init="json = val" ng-include="\'/view-file-ng/friendly-json.html\'"></span-->\n' +
    '        <friendly-json--recursion json="val"></friendly-json--recursion>\n' +
    '      </dd>\n' +
    '      <!-- array of object, repeat recurse -->\n' +
    '      <dd ng-if="(val | isArray) && (val[0] | isObject)" ng-repeat="v in val track by $index">\n' +
    '        <!--span ng-repeat="json in val track by $index" ng-include="\'/view-file-ng/friendly-json.html\'"></span-->\n' +
    '        <friendly-json--recursion json="v"></friendly-json--recursion>\n' +
    '      </dd>\n' +
    '    </span>\n' +
    '  </span>\n' +
    '</dl>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('view.file.tpls');
} catch (e) {
  module = angular.module('view.file.tpls', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/view-file-ng/show-file.modal.html',
    '<form class="form" role="form">\n' +
    '  <div class="modal-header">\n' +
    '    <h3 class="modal-title">{{ ctrl.fileName }}</h3>\n' +
    '  </div>\n' +
    '  <div ng-cloak class="modal-body clearfix">\n' +
    '    <view-file uri="ctrl.uri" content-type="ctrl.contentType" controls="false" show-code="{{ctrl.showCode}}"></view-file>\n' +
    '  </div>\n' +
    '  <div class="modal-footer">\n' +
    '    <button class="btn btn-primary pull-right" ng-click="cancel()">Close</button>\n' +
    '  </div>\n' +
    '</form>');
}]);
})();

(function(module) {
try {
  module = angular.module('view.file.tpls');
} catch (e) {
  module = angular.module('view.file.tpls', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/view-file-ng/view-file.html',
    '<div class="view-file row" style="padding-right: 30px">\n' +
    '\n' +
    '  <div class="col-sm-1 text-right" ng-if="controls && (((fileType === \'xml\') || (fileType === \'json\') || (fileType === \'html\') || (fileType === \'text\')) || allowModal || downloadUri)" class="pull-left controls">\n' +
    '    <div class="code-control">\n' +
    '      <a ng-if="(fileType === \'xml\') || (fileType === \'json\') || (fileType === \'html\') || (fileType === \'text\')" class="btn btn-default" ng-click="ctrl.toggleCode()">\n' +
    '        <span ng-show="!showCode && ((fileType === \'json\') || (fileType === \'text\'))">{ }</span>\n' +
    '        <i ng-show="!showCode && ((fileType === \'html\') || (fileType === \'xml\'))" class="fa fa-code"></i>\n' +
    '        <i ng-show="showCode" class="fa fa-align-left"></i>\n' +
    '      </a>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="modal-control">\n' +
    '      <a ng-if="allowModal && fileType !== \'audio\'" class="btn btn-default" ng-click="ctrl.showModal()"><i class="glyphicon glyphicon-resize-full"></i></a>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="download-control">\n' +
    '      <a ng-if="downloadUri" class="btn btn-default" ng-href="{{downloadUri}}"><i class="glyphicon glyphicon-download-alt"></i></a>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '  <div ng-class="{\'col-sm-11\': controls, \'col-sm-12\': !controls}" style="min-height: 600px">\n' +
    '    <div class="loading" style="position: absolute">\n' +
    '      Loading... <i class="fa fa-spinner fa-spin"></i>\n' +
    '    </div>\n' +
    '\n' +
    '    <div class="viewer" ng-if="!loading" style="position: absolute; width: 100%; min-height: 600px; background-color: white">\n' +
    '      <!-- audio / video -->\n' +
    '      <videogular ng-if="fileType === \'audio\' || fileType === \'video\'" style="{{ fileType === \'audio\' ? \'height: 50px;\' : \'\' }}">\n' +
    '        <vg-media vg-src="uri"></vg-media>\n' +
    '        <vg-controls>\n' +
    '          <vg-play-pause-button></vg-play-pause-button>\n' +
    '          <vg-time-display>{{ currentTime | date:\'mm:ss\' }}</vg-time-display>\n' +
    '          <vg-scrub-bar>\n' +
    '            <vg-scrub-bar-current-time></vg-scrub-bar-current-time>\n' +
    '          </vg-scrub-bar>\n' +
    '          <vg-time-display>{{ timeLeft | date:\'mm:ss\' }}</vg-time-display>\n' +
    '          <vg-volume>\n' +
    '            <vg-mute-button></vg-mute-button>\n' +
    '            <vg-volume-bar></vg-volume-bar>\n' +
    '          </vg-volume>\n' +
    '          <vg-fullscreen-button ng-show="fileType === \'video\'"></vg-fullscreen-button>\n' +
    '        </vg-controls>\n' +
    '      </videogular>\n' +
    '\n' +
    '      <!-- html / text -->\n' +
    '      <div ng-if="(fileType === \'html\') || (fileType === \'text\')">\n' +
    '        <div class="source" ng-show="!showCode" include-safe="uri"></div>\n' +
    '        <hljs ng-show="showCode" hljs-include="uri"></hljs>\n' +
    '      </div>\n' +
    '\n' +
    '      <!-- image -->\n' +
    '      <img ng-if="fileType === \'image\'" ng-src="{{uri}}">\n' +
    '\n' +
    '      <!-- json -->\n' +
    '      <div ng-if="fileType === \'json\'">\n' +
    '        <friendly-json class="source" ng-show="!showCode" uri="uri"></friendly-json>\n' +
    '        <json-explorer class="source" ng-show="showCode" url="uri"></json-explorer>\n' +
    '      </div>\n' +
    '\n' +
    '      <!-- xml -->\n' +
    '      <div ng-if="fileType === \'xml\'">\n' +
    '        <friendly-xml ng-show="!showCode" class="source" uri="uri"></friendly-xml>\n' +
    '        <hljs ng-show="showCode" hljs-include="hljsUri"></hljs>\n' +
    '      </div>\n' +
    '\n' +
    '      <!-- other -->\n' +
    '      <view-object ng-if="fileType === \'other\'" data="uri" type="contentType" height="\'600px\'" width="\'100%\'">\n' +
    '        <a ng-show="downloadUri" class="btn btn-default" ng-href="{{downloadUri}}">Download</a>\n' +
    '        <div class="alert alert-danger" ng-show="!downloadUri">Alert: Cannot display this file!</div>\n' +
    '      </view-object>\n' +
    '    </div>\n' +
    '  </div>\n' +
    '\n' +
    '</div>');
}]);
})();
