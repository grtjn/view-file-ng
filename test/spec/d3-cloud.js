/* global describe, beforeEach, module, it, expect, inject */

describe('D3Cloud', function () {
  'use strict';

  var factory, $httpBackend, $q, $location;

  beforeEach(module('d3.cloud'));

  beforeEach(inject(function ($injector) {
    $q = $injector.get('$q');
    $httpBackend = $injector.get('$httpBackend');
    $location = $injector.get('$location');

    factory = $injector.get('D3Cloud', $q, $httpBackend);
  }));


});
