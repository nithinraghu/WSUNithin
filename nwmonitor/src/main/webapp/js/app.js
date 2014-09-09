'use strict';

/* App Module */

var myApp = angular.module('myApp',['ngGrid']);

myApp.service('RestCallService', RestCallService.injection)
.service('Server', Server.injection)
.controller('GridController', GridControllerModule.injection)
.controller('GaugeController', GaugeControllerModule.injection)
.controller('HealthMonitorController', HealthMonitorControllerModule.injection)
.directive('gaugeWidget', GaugeWidgetModule.injection)
.directive('lineChart', LineChartModule.injection)
.filter('indicator', indicator);



