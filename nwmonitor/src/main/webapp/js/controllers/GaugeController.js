/**
 * 
 */

var GaugeControllerModule = (function () {

	/*
	 * Constructor 
	 */
	function GaugeController($scope,$interval,Server)
	{	
		/*
		$scope.cpuUtilizationPercent = 90;
		$scope.diskUsagePercent = 70;
		$scope.networkUtilizationPercent = 40;
		*/

		// Aggregation logic moved to Server.js, it returns an object 
		// with the following fields :
		// cpuAlert: "CRITICAL, WARNING OR OK" state
		// diskAlert : "CRITICAL, WARNING OR OK" state
		// networkAlert : : "CRITICAL, WARNING OR OK" state
		// maxCpuPercent : maxCpuPercent
		// maxDiskPercent : maxDiskPercent
		// maxNetworkPercent :axNetworkPercent
		
		Server.getGaugeControlsData().then(function(data){			
			$scope.cpuAlert = data.cpuAlert;
			$scope.diskAlert = data.diskAlert;
			$scope.networkAlert = data.networkAlert;
			$scope.maxCpuPercent = data.maxCpuPercent;
			$scope.maxDiskPercent = data.maxDiskPercent;
			$scope.maxNetworkPercent = data.maxNetworkPercent;			
			
		});
		
		$interval( function(){
			
			// For testing introduce changes
			$scope.maxCpuPercent = 100 - $scope.maxCpuPercent;
			$scope.maxDiskPercent = 100-$scope.maxDiskPercent;
			$scope.maxNetworkPercent = 100 - $scope.maxNetworkPercent;
			
			var lights = ["OK", "CRITICAL", "WARNING" ];							
			$scope.cpuAlert = lights[Math.floor((Math.random() * 3))];
			$scope.diskAlert = lights[Math.floor((Math.random() * 3))];
			$scope.networkAlert = lights[Math.floor((Math.random() * 3))];
			
		}, 3000);
		
	};	

	/*
	 * Injection parameters
	 */
	GaugeController.injection = [
	                          '$scope',
	                          '$interval',
	                          'Server',
	                          GaugeController
	                          ];	
	return GaugeController;
})();