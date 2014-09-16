/**
 * 
 */
/**
 * 
 */

var BarChartControllerModule = (function () {
	/*
	 * Constructor 
	 */
	function BarChartController($scope, $interval, $routeParams, Server)		
	{		
		var measureParam = $routeParams.measure;
		var stateParam = $routeParams.state;
		
		var measure = convertMeasureParam(measureParam);
		var state = convertStateParam(stateParam);
		
		
		Server.getBarChartData(measure, state).then(function(result){			
			$scope.measure = measure;
			$scope.state = state; 
			$scope.serverNames = result.serverNames;
			$scope.chartData = {id: "BarSeries" , data : result.serverRates, servers:result.serverNames };			
		});
				
		$interval( function(){			
			// For testing introduce changes	
			var newData = [];
			_.each($scope.chartData.data, function(value, idx){
				newData.push(100 - value);				
			});
			
			var serverNames = $scope.chartData.servers;
			
			$scope.chartData = {id: "BarSeries" , data : newData, servers: serverNames};
		}, 10000);
					        	       
	};	
	
	function convertMeasureParam (measure)
	{
		switch(measure)
		{
			case "0": return "CPU";
			case "1": return "DISK";
			case "2": return "NETWORK";
			default : return "CPU";
		}
				
	};
	
	
	function convertStateParam (state)
	{
		switch(state)
		{
			case "0": return "ALL";
			case "1": return "CRITICAL";
			case "2": return "WARNING";
			case "3": return "OK";
			default : return "ALL";
		}
				
	};

	/*
	 * Injection parameters
	 */
	BarChartController.injection = [
	                          '$scope',	  
	                          '$interval',
	                          '$routeParams',
	                          'Server',
	                          BarChartController
	                          ];	
	return BarChartController;
})();