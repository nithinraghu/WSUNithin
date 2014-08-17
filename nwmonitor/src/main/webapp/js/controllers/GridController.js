/**
 * Controller for overview grid in home page 
 */

var GridController = (function () {

	/*
	 * Constructor 
	 */
	function GrController($scope,Server)
	{		
		Server.getOverviewGridData().then(function(data){
			$scope.gridData = data;
		});
		
		$scope.gridData = [{title : "CPU Utilization", critical: 5, warning: 10, ok:5},
		                 {title : "Disk Usage", critical: 3, warning: 2, ok:5},
		                 {title : "Network Utilization", critical: 5, warning: 1, ok:5}
		                ];
		
		$scope.gridOptions = { data: 'gridData', 
							   columnDefs: [{field: 'title', displayName: 'Title'}, 
							                {field:'critical', displayName:'Critical'},
							                {field:'warning', displayName:'Warning'}
							                {field:'ok', displayName:'OK'}							                
							   			   ]
							 }; 
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