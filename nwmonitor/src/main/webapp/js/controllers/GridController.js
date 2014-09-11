/**
 * Controller for overview grid in home page 
 */

var GridControllerModule = (function () {

	/*
	 * Constructor 
	 */
	function GrController($scope,Server)
	{	
		$scope.gridOptions = { data: 'gridData', 
							   columnDefs: [{field: 'title', displayName: 'Title', width: "40%", resizable: false, enableCellSelection: false,
								   				cellTemplate: '<a href="./#/BarChart">{{row.getProperty(col.field)}}</a>'}, 
							                {field:'critical', displayName:'Critical',width: "20%",resizable: false, enableCellSelection: false, 
								   				cellTemplate: '<a href="./#/BarChart">{{row.getProperty(col.field)}}</a>'							    
							            	},
							                {field:'warning', displayName:'Warning',width: "20%",resizable: false, enableCellSelection: false,
							            		cellTemplate: '<a href="./#/BarChart">{{row.getProperty(col.field)}}</a>'},
							                {field:'ok', displayName:'OK',width: "20%",resizable: false, enableCellSelection: false,
							            		cellTemplate: '<a href="./#/BarChart">{{row.getProperty(col.field)}}</a>'}							                
							   			   ]							   
							 }; 	
		var gridData = [];
		
		Server.getOverviewGridData().then(function(data){
			
			var cpuCriticalCount = data.cpuCriticalCount;
			var cpuWarningCount = data.cpuWarningCount;
			var cpuOkCount = data.cpuOkCount;
			var diskCriticalCount = data.diskCriticalCount;
			var diskWarningCount = data.diskWarningCount;
			var diskOkCount = data.diskOkCount;
			var networkCriticalCount = data.networkCriticalCount;
			var networkWarningCount = data.networkWarningCount;
			var networkOkCount = data.networkOkCount;
			
			$scope.gridData = [  {title : "CPU Utilization", critical: cpuCriticalCount, warning: cpuWarningCount, ok:cpuOkCount},
				                 {title : "Disk Usage", critical: diskCriticalCount, warning: diskWarningCount, ok:diskOkCount},
				                 {title : "Network Utilization", critical: networkCriticalCount, warning: networkWarningCount, ok:networkOkCount}
				                ];
				
			});
			
			$scope.gridData = gridData;
									
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