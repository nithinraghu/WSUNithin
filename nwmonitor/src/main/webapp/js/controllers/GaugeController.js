/**
 * 
 */

var GaugeControllerModule = (function () {

	/*
	 * Constructor 
	 */
	function GaugeController($scope,$interval,Server)
	{	
		
		$scope.cpuUtilizationPercent = 90;
		$scope.diskUsagePercent = 70;
		$scope.networkUtilizationPercent = 40;
		
		$interval( function(){
			
			$scope.cpuUtilizationPercent = 100 - $scope.cpuUtilizationPercent;
			$scope.diskUsagePercent = 100-$scope.diskUsagePercent;
			$scope.networkUtilizationPercent = 100 - $scope.networkUtilizationPercent;
			
		}, 3000);
		
	};	

	/*
	 * Injection parameters
	 */
	GaugeController.injection = [
	                          '$scope',
	                          '$interval',
	                          GaugeController
	                          ];	
	return GaugeController;
})();