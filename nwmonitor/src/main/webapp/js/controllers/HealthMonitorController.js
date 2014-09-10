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
	                    	{id: "CPU-Server1" , data : [50,90,25,10,5,35,45,75,65,89,90,95]},
	                    	{id: "CPU-Server2", data : [40,70,15,5,2,25,25,65,55,79,80,85]}				                    
	                    ];
		
		$scope.onSelectionChange = function(){
			
			var currType = $scope.currentType.id;
			
			switch(currType)
			{
			case 1:
				$scope.chartData = [
				                    	{id: "CPU-Server1" , data : [50,90,25,10,5,35,45,75,65,89,90,95]},
				                    	{id: "CPU-Server2" , data : [40,70,15,5,2,25,25,65,55,79,80,85]}			                    
				                    ];
				break;
			case 2:
				$scope.chartData = [
			                    	{id: "Disk-Server1" , data :[40,77,20,10,5,35,45,75,65,89,90,95]},
			                    	{id: "Disk-Server2" , data :[50,65,10,5,2,25,25,65,55,79,80,85]}				                    
			                    ];
				break;
			case 3:
				$scope.chartData = [
			                    	{id: "Network-Server1" , data :[90,77,20,10,5,35,65,75,65,79,20,15]},
			                    	{id: "Network-Server2" , data : [70,65,10,5,2,25,15,65,55,49,60,25]}				                    
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