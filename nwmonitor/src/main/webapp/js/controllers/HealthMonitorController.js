/**
 * 
 */

var HealthMonitorControllerModule = (function () {

	/*
	 * Constructor 
	 */
	function HealthMonitorController($scope,$interval,Server)
	{	
		
		$scope.measures = [ {id: 1, type: "CPU"},
		                    {id: 2, type: "Disk"},
		                    {id: 3, type: "Network"}
		                   ];		
		
		$scope.currentType = $scope.measures[0];
		
		$scope.chartData = [
	                    	[50,90,25,10,5,35,45,75,65,89,90,95],
	                    	[40,70,15,5,2,25,25,65,55,79,80,85]				                    
	                    ];
		
		$scope.onSelectionChange = function(){
			
			var currType = $scope.currentType.id;
			
			switch(currType)
			{
			case 1:
				$scope.chartData = [
				                    	[50,90,25,10,5,35,45,75,65,89,90,95],
				                    	[40,70,15,5,2,25,25,65,55,79,80,85]				                    
				                    ];
				break;
			case 2:
				$scope.chartData = [
			                    	[40,77,20,10,5,35,45,75,65,89,90,95],
			                    	[50,65,10,5,2,25,25,65,55,79,80,85]				                    
			                    ];
				break;
			case 3:
				$scope.chartData = [
			                    	[90,77,20,10,5,35,65,75,65,79,20,15],
			                    	[70,65,10,5,2,25,15,65,55,49,60,25]				                    
			                    ];
				break;
			}						
			
		};
	};	

	/*
	 * Injection parameters
	 */
	HealthMonitorController.injection = [
	                          '$scope',
	                          '$interval',
	                          'Server',
	                          HealthMonitorController
	                          ];	
	
	return HealthMonitorController;
	
})();