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