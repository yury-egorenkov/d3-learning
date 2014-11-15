'use strict';

/**
 * @ngdoc function
 * @name d3LearningApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the d3LearningApp
 */
angular.module('d3LearningApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
