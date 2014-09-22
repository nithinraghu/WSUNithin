var model = model || {};

model.MockDataSource = Class.extend({

	init: function($interval){
		this.$interval = $interval;
	},
	
	getOverviewGridData: function(){
		return [];
	},
	
	getGaugeControlsData: function(){
		
		
		return {
				cpuAlert : lights[Math.floor((Math.random() * 3))],
				diskAlert : lights[Math.floor((Math.random() * 3))],
				networkAlert : lights[Math.floor((Math.random() * 3))],
				maxCpuPercent : Math.round(Math.random(0,1) * 100),
				maxDiskPercent : Math.round(Math.random(0,1) * 100),
				maxNetworkPercent : Math.round(Math.random(0,1) * 100)				
			};		
	},
	
	getBarChartData: function(measure, state){
		/*
		$interval( function(){			
			// For testing introduce changes	
			var newData = [];
			_.each($scope.chartData.data, function(value, idx){
				newData.push(100 - value);				
			});
			
			var serverNames = $scope.chartData.servers;
			
			$scope.chartData = {id: "BarSeries" , data : newData, servers: serverNames};
		}, 3000);
		*/
		return [];
	}
});

model.MockDataSource.injection = ['$interval',model.MockDataSource];