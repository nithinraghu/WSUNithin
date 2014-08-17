'use strict';

/* App Module */

var myApp = angular.module('myApp',['ngGrid']);

myApp.service('RestCallService', RestCallService.injection)
.service('Server', Server.injection)
.controller('GridController', GridController.injection);