
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
	function ServerService($interval, DataSource)
	{	
		this.$interval = $interval;	
		this.DataSource = DataSource;
	};
	
	/*
	 * Injection parameters
	 */
	ServerService.injection = [
							   '$interval',
	                           'DataSource',
		                       ServerService
		                       ];
	
	/*
	 * Method returns data for overview grid
	 */
	ServerService.prototype.getOverviewGridData = function()
	{	
		return this.DataSource.getOverviewGridData();
		
	};			
	
	/*
	 * Method returns data for gauge control section
	 */
	ServerService.prototype.getGaugeControlsData = function()
	{			
		return this.DataSource.getGaugeControlsData();
	};
	
	
	/*
	 * Method returns data for bar chart page
	 */
	ServerService.prototype.getBarChartData = function(measure, state)
	{			
		return this.DataSource.getBarChartData(measure, state);
	};


	return ServerService;

})();