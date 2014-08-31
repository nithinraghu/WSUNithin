/**
 * Controller for overview grid in home page 
 */

var GrControllerModule = (function () {

	/*
	 * Constructor 
	 */
	function GrController($scope,Server)
	{	
		$scope.gridOptions = { data: 'gridData', 
							   columnDefs: [{field: 'title', displayName: 'Title', width: "40%", resizable: false, enableCellSelection: false}, 
							                {field:'critical', displayName:'Critical',width: "20%",resizable: false, enableCellSelection: false},
							                {field:'warning', displayName:'Warning',width: "20%",resizable: false, enableCellSelection: false},
							                {field:'ok', displayName:'OK',width: "20%",resizable: false, enableCellSelection: false}							                
							   			   ]							   
							 }; 	
		Server.getOverviewGridData().then(function(data){
			var servers = data;
			
			var cpuCriticalCount = 0;
			var cpuWarningCount = 0;
			var cpuOkCount = 0;
			
			var diskCriticalCount = 0;
			var diskWarningCount = 0;
			var diskOkCount = 0;
			
			var networkCriticalCount = 0;
			var networkWarningCount = 0;
			var networkOkCount = 0;
			
			_.each(servers, function(server){
				var cpuUtilization = server.cpuUtilization;
				switch(cpuUtilization){
					case "OK":
						cpuOkCount++;
						break;
					case "WARNING":
						cpuWarningCount++;
						break;
					case "CRITICAL":
						cpuCriticalCount++;
						break;
				} 
				
				var diskUsage = server.diskUsage;
				switch(diskUsage){
					case "OK":
						diskOkCount++;
						break;
					case "WARNING":
						diskWarningCount++;
						break;
					case "CRITICAL":
						diskCriticalCount++;
						break;
				} 
				
				var networkUtilization = server.networkUtilization;
				switch(networkUtilization){
					case "OK":
						networkOkCount++;
						break;
					case "WARNING":
						networkWarningCount++;
						break;
					case "CRITICAL":
						networkCriticalCount++;
						break;
				} 
				
				
			});
			
			$scope.gridData = [{title : "CPU Utilization", critical: cpuCriticalCount, warning: cpuWarningCount, ok:cpuOkCount},
		                 {title : "Disk Usage", critical: diskCriticalCount, warning: diskWarningCount, ok:diskOkCount},
		                 {title : "Network Utilization", critical: networkCriticalCount, warning: networkWarningCount, ok:networkOkCount}
		                ];
			
			
			
		});
		
		
		
		
	};	

	/*
	 * Injection parameters
	 */
	GrController.injection = [
	                          '$scope',
	                          'Server',
	                          GrController
	                          ];	
	return GrController;
})();