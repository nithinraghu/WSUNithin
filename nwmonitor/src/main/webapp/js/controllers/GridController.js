var GridController = (function () {

	function GrController($scope,RestCallService)
	{		
		RestCallService.getServers().then(function(data){
			$scope.gridData = data.data;
		});										
	};	

	GrController.injection = [
	                          '$scope',
	                          'RestCallService',
	                          GrController
	                          ];
	return GrController;
})();