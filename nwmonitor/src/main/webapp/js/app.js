'use strict';

/* App Module */

var myApp = angular.module('myApp',[]);

myApp.service('RestCallService', RestCallService.injection)
.controller('GridController', GridController.injection);