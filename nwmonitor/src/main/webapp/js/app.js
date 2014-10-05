'use strict';

/* App Module */

var myApp = angular.module('myApp',['ngRoute','ngGrid']);
var $injector = angular.injector();

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
	  .when('/Server', {
	    templateUrl: 'partials/server.html'	    
	  })
	  .otherwise({redirectTo: '/Home'});  
	});



myApp
.service('RemoteDataSource', model.RemoteDataSource.injection)
.service('MockDataSource',model.MockDataSource.injection)
.factory('DataSource', function($injector) {
  var localSource = localStorage.getItem("localSource");
  if (localSource) {
    return $injector.get('MockDataSource');
  } else {
    return $injector.get('RemoteDataSource');
  }
})
.service('RestCallService', RestCallService.injection)
.service('Server', Server.injection)
.controller('HomeController', HomeControllerModule.injection)
.controller('BarChartController', BarChartControllerModule.injection)
.controller('GridController', GridControllerModule.injection)
.controller('GaugeController', GaugeControllerModule.injection)
.controller('HealthMonitorController', HealthMonitorControllerModule.injection)
.directive('gaugeWidget', GaugeWidgetModule.injection)
.directive('horiBarChart',HorizontalBarChartModule.injection)
.directive('lineChart', LineChartModule.injection)
.filter('indicator', indicator)
.filter('labelState', labelState);



