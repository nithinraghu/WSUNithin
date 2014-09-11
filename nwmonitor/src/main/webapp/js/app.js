'use strict';

/* App Module */

var myApp = angular.module('myApp',['ngRoute','ngGrid']);

myApp.config(function($routeProvider) {
	  $routeProvider
	   .when('/Home', {
	    templateUrl: 'partials/homePage.html',
	    controller: 'HomeController'       
	  })
	  .when('/BarChart', {
	    templateUrl: 'partials/barChart.html',
	    controller: 'BarChartController'
	  })
	  .otherwise({redirectTo: '/Home'});  
	});


myApp.service('RestCallService', RestCallService.injection)
.service('Server', Server.injection)
.controller('HomeController', HomeControllerModule.injection)
.controller('BarChartController', BarChartControllerModule.injection)
.controller('GridController', GridControllerModule.injection)
.controller('GaugeController', GaugeControllerModule.injection)
.controller('HealthMonitorController', HealthMonitorControllerModule.injection)
.directive('gaugeWidget', GaugeWidgetModule.injection)
.directive('lineChart', LineChartModule.injection)
.filter('indicator', indicator);



