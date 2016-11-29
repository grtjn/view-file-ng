(function(module) {
try {
  module = angular.module('viewFileNgDemo.Tpls');
} catch (e) {
  module = angular.module('viewFileNgDemo.Tpls', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/api.html',
    '<iframe src="api/" style="width: 100%; height: 90%; border: none; margin: 0; padding: 0; position: fixed; top: 52px; left: 0px; bottom: 0px; right: 0px;"></iframe>');
}]);
})();

(function(module) {
try {
  module = angular.module('viewFileNgDemo.Tpls');
} catch (e) {
  module = angular.module('viewFileNgDemo.Tpls', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/home.html',
    '<h1 class="page-header" itemprop="name">View Files in Angular</h1><div class="home row"><h4>Key features</h4><ul><li>One directive to view files</li><li>Friendly content display of Audio, HTML, JSON, PDF, Text, Video, and XML</li><li>Pretty source display for JSON, HTML, Text, and XML</li><li>Optional controlbar with buttons for modal display and download</li><li>Highly configurable, make sure to also look at the <a ui-sref="api" rel="api">API documentation</a></li></ul><h4>Examples</h4><uib-tabset><uib-tab heading="View by URI"><div id="uri-{{file.type}}" class="row" ng-repeat="file in ctrl.files"><div class="col-md-10 col-md-offset-1"><h5>{{ file.uri.split(\'/\').pop() }} - {{ file.type }}</h5><view-file uri="file.uri" content-type="file.type" download-uri="file.uri"></view-file></div></div></uib-tab><uib-tab heading="View by Data"><div id="data-{{file.type}}" class="row" ng-repeat="file in ctrl.files"><div class="col-md-10 col-md-offset-1"><h5>{{ file.uri.split(\'/\').pop() }} - {{ file.type }}</h5><view-file data="file.data" content-type="file.type" download-uri="file.uri"></view-file></div></div></uib-tab></uib-tabset></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('viewFileNgDemo.Tpls');
} catch (e) {
  module = angular.module('viewFileNgDemo.Tpls', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/quickstart.html',
    '<h1 class="page-header">Quickstart</h1><div class="row"><div class="col-md-12"><p>To start viewing files in Angular, follow these simple steps to get started. Once you\'re up and running, visit the <a ui-sref="api">API documentation</a> to learn how to get the most out of it.</p><ol class="steps"><li><p>Download <a href="https://raw.github.com/grtjn/view-file-ng/master/dist/view-file-ng.js">view-file-ng.js</a> (<a href="https://raw.github.com/grtjn/view-file-ng/master/dist/view-file-ng.min.js">minified version</a>) and put it with your other scripts. Alternatively, you can use Bower to install it automatically:</p><div hljs="" no-escape="" language="bash">bower install [--save] view-file-ng</div><p>Or if you prefer bleeding edge:</p><div hljs="" no-escape="" language="bash">bower install [--save] git@github.com:grtjn/view-file-ng.git</div><p>If not using Bower, you\'ll also need to fetch yourself:</p><ul><li>angular-x2js (*)</li><li>bootstrap (~3.3.5)</li><li>font-awesome (^4.6.3)</li><li>highlightjs (~8.7.0)</li><li>ng-json-explorer (8c2a0f9104)</li><li>vkbeautify-wrapper (*)</li><li>angular-sanitize (>1.3.1)</li><li>videogular (^1.4.4)</li><li>videogular-controls (^1.4.4)</li><li>videogular-themes-default (^1.4.4)</li><li>angular-recursion (^1.0.5)</li></ul><p></p></li><li><p>Load view-file-ng.js and dependencies into your HTML page (typically in the end of the <em>BODY</em> of your HTML):</p><pre hljs="" no-escape="" language="html">\n' +
    '&lt;script src="/bower_components/highlightjs/highlight.pack.js">&lt;/script>\n' +
    '&lt;script src="/bower_components/angular-highlightjs/build/angular-highlightjs.js">&lt;/script>\n' +
    '&lt;script src="/bower_components/x2js/xml2json.min.js">&lt;/script>\n' +
    '&lt;script src="/bower_components/angular-x2js/dist/x2js.min.js">&lt;/script>\n' +
    '&lt;script src="/bower_components/ng-json-explorer/dist/angular-json-explorer.js">&lt;/script>\n' +
    '&lt;script src="/bower_components/vkbeautify-wrapper/dist/vkbeautify.0.99.00.beta.js">&lt;/script>\n' +
    '&lt;script src="/bower_components/angular-sanitize/angular-sanitize.js">&lt;/script>\n' +
    '&lt;script src="/bower_components/angular-recursion/angular-recursion.js">&lt;/script>\n' +
    '&lt;script src="/bower_components/videogular/videogular.js">&lt;/script>\n' +
    '&lt;script src="/bower_components/videogular-controls/vg-controls.js">&lt;/script>\n' +
    '&lt;script src=\'/bower_components/view-file-ng/dist/view-file-ng[.min].js\'>&lt;/script></pre><p class="text-muted">Note: You can simplify this by making use of <a href="https://www.npmjs.com/package/wiredep" rel="external">wiredep</a>, optionally together with <a href="https://www.npmjs.com/package/gulp-useref" rel="external">gulp-useref</a>.</p></li><li><p>Load view-file-ng.css into your HTML page (typically in the end of the <em>HEAD</em> of your HTML):</p><pre hljs="" no-escape="" language="html">\n' +
    '&lt;link rel="stylesheet" href="/bower_components/highlightjs/styles/github.css" />\n' +
    '&lt;link rel="stylesheet" href="/bower_components/ng-json-explorer/dist/angular-json-explorer.css" />\n' +
    '&lt;link rel="stylesheet" href="/bower_components/videogular-themes-default/videogular.css" />\n' +
    '&lt;link rel="stylesheet" href="/bower_components/view-file-ng/dist/view-file-ng[.min].css"></pre><p class="text-muted">Note: You can simplify this by making use of <a href="https://www.npmjs.com/package/wiredep" rel="external">wiredep</a>, optionally together with <a href="https://www.npmjs.com/package/gulp-useref" rel="external">gulp-useref</a>.</p></li><li><p>Make your application module depend on the <code>view-file-ng</code> module:</p><div hljs="" no-escape="" language="js">angular.module(\'myApplicationModule\', [\'view.file\']);</div></li><li><p>Expose files configuration in your Angular controller:</p><pre hljs="" no-escape="" language="js">\n' +
    'MyCtrl.$inject = [\'$scope\'];\n' +
    '\n' +
    'function MyCtrl($scope) {\n' +
    '  var ctrl = this;\n' +
    '\n' +
    '  ctrl.files = [{\n' +
    '    uri: \'https://grtjn.github.io/view-file-ng/data/sample-music.mp3\',\n' +
    '    type: \'audio/mpeg\'\n' +
    '  },{\n' +
    '    uri: \'https://grtjn.github.io/view-file-ng/data/quickstart.html\',\n' +
    '    type: \'text/html\'\n' +
    '  },{\n' +
    '    uri: \'https://grtjn.github.io/view-file-ng/data/bower.json\',\n' +
    '    type: \'application/json\'\n' +
    '  },{\n' +
    '    uri: \'https://grtjn.github.io/view-file-ng/data/installation-guide.pdf\',\n' +
    '    type: \'application/pdf\'\n' +
    '  },{\n' +
    '    uri: \'https://grtjn.github.io/view-file-ng/data/install.txt\',\n' +
    '    type: \'text/plain\'\n' +
    '  },{\n' +
    '    uri: \'https://grtjn.github.io/view-file-ng/data/Video%20Sample%201%20%28Small%29.m4v\',\n' +
    '    type: \'video/mpeg\'\n' +
    '  },{\n' +
    '    uri: \'https://grtjn.github.io/view-file-ng/data/Atom_Example.xml\',\n' +
    '    type: \'application/atom+xml\'\n' +
    '  }];\n' +
    '\n' +
    '}\n' +
    '</pre></li><li><p>Add a <code>&lt;view-file&gt;</code> element in your template like so:</p><pre hljs="" no-escape="" language="html">\n' +
    '&lt;div ng-repeat="file in ctrl.files">\n' +
    '  &lt;view-file uri="file.uri" content-type="file.type">&lt;/view-file></pre>&lt;/div></li></ol></div></div>');
}]);
})();
