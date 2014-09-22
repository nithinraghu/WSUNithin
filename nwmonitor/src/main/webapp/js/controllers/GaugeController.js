/**
 * 
 */

var GaugeControllerModule = (function () {

	var gaugeViewUpdateTime = 5000;

	/*
	 * Constructor 
	 */
	function GaugeController($scope,$interval,Server)
	{	
		
		function fetchAndUpdate(){
			var data = Server.getGaugeControlsData();
			$scope.cpuAlert = data.cpuAlert;
			$scope.diskAlert = data.diskAlert;
			$scope.networkAlert = data.networkAlert;
			$scope.maxCpuPercent = data.maxCpuPercent;
			$scope.maxDiskPercent = data.maxDiskPercent;
			$scope.maxNetworkPercent = data.maxNetworkPercent;
		}
			
		$interval(fetchAndUpdate, gaugeViewUpdateTime);
			
		
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