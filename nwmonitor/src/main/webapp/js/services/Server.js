
/**
 * Server class implemented to serve data to the view.
 * Internally uses RestCallService to make actual HTTP calls.
 * Consolidates the data obtained from rest service calls and returns back to 
 * controller for presenting to UI.
 */
var Server = (function() {
	
	/*
	 * Constructor 
	 */
	function ServerService($q, RestCallService)
	{		
		this.$q = $q;
		this.RestCallService = RestCallService;		
	};
	
	/*
	 * Injection parameters
	 */
	ServerService.injection = [
	                           '$q',
		                       'RestCallService',
		                       ServerService
		                       ];
	
	/*
	 * Method returns data for overview grid
	 */
	ServerService.prototype.getOverviewGridData = function()
	{			
		return this.RestCallService.getServers().then(function(data){
			return data.data;			
		});		
		
		return [];				
	};
	
	return ServerService;
	
})();