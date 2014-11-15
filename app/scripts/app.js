'use strict';

/**
 * @ngdoc overview
 * @name d3LearningApp
 * @description
 * # d3LearningApp
 *
 * Main module of the application.
 */
angular
  .module('d3LearningApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/d3', {
        templateUrl: 'views/d3.html',
        controller: 'D3Ctrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
