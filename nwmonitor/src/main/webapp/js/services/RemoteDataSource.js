var model = model || {};

model.RemoteDataSource = Class.extend({

	init: function(RestCallService, $interval){
		this.RestCallService = RestCallService;
		this.$interval = $interval;
		this.getServers();
	},
	
	getServers: function(){
		var self = this;
		this.$interval(function(){
			self.RestCallService.getServers().then(function(data){
				self.Servers = data;
			});
		}, 2000);
	
	},
	
	getOverviewGridData: function(){
			
			function getOverviewGridDataImpl(data){
				if (!data){
					return {};
				}
				var servers = data.data;
				
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
				
				return {
					cpuOkCount: cpuOkCount, cpuWarningCount : cpuWarningCount, cpuCriticalCount: cpuCriticalCount,			
					diskOkCount : diskOkCount, diskWarningCount : diskWarningCount, diskCriticalCount : diskCriticalCount,
					networkOkCount : networkOkCount, networkWarningCount : networkWarningCount, networkCriticalCount : networkCriticalCount
				};
			}
			

			return getOverviewGridDataImpl(this.Servers);
			 
	},
	
	/*
		Aggregation logic moved to Server.js, it returns an object 
		with the following fields :
		cpuAlert: "CRITICAL, WARNING OR OK" state
		diskAlert : "CRITICAL, WARNING OR OK" state
		networkAlert : : "CRITICAL, WARNING OR OK" state
		maxCpuPercent : maxCpuPercent
		maxDiskPercent : maxDiskPercent
		maxNetworkPercent :axNetworkPercent
	*/	
	getGaugeControlsData: function(){
	
		function getGaugeControlsDataImpl(data){
			if (!data){
				return {};
			}
			var servers = data.data;
			
			var cpuCriticalCount = 0;
			var cpuWarningCount = 0;
			var cpuOkCount = 0;			
			
			var diskCriticalCount = 0;
			var diskWarningCount = 0;
			var diskOkCount = 0;
			
			var networkCriticalCount = 0;
			var networkWarningCount = 0;
			var networkOkCount = 0;
			
			var maxCpuPercent = 0;
			var maxDiskPercent = 0;
			var maxNetworkPercent = 0;
			
						
			_.each(servers, function(server){
				var cpuUtilization = server.cpuUtilization;
				var cpuUtilizationPercent = server.cpuUtilizationPercent;
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
				
				if(cpuUtilizationPercent > maxCpuPercent ) 
				{
					maxCpuPercent = cpuUtilizationPercent;
				}
				
				var diskUsage = server.diskUsage;
				var diskUsagePercent = server.diskUsagePercent;
					
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
				if(diskUsagePercent > maxDiskPercent ) 
				{
					maxDiskPercent = diskUsagePercent;
				}
				
				var networkUtilization = server.networkUtilization;
				var networkUtilizationPercent = server.networkUtilizationPercent;
				
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
				if(networkUtilizationPercent > maxNetworkPercent ) 
				{
					maxNetworkPercent = networkUtilizationPercent;
				}
				
			});
			
			var cpuAlert;
			var diskAlert;
			var networkAlert;
			
			if(cpuCriticalCount > 0 )
			{
				cpuAlert = "CRITICAL";
			}
			else if(cpuWarningCount > 0)
			{
				cpuAlert = "WARNING";
			}
			else
			{
				cpuAlert = "OK";
			}
			
			if(diskCriticalCount > 0 )
			{
				diskAlert = "CRITICAL";
			}
			else if(diskWarningCount > 0)
			{
				diskAlert = "WARNING";
			}
			else
			{
				diskAlert = "OK";
			}
			
			if(networkCriticalCount > 0 )
			{
				networkAlert = "CRITICAL";
			}
			else if(networkWarningCount > 0)
			{
				networkAlert = "WARNING";
			}
			else
			{
				networkAlert = "OK";
			}
			
			return {
				cpuAlert : cpuAlert,
				diskAlert : diskAlert,
				networkAlert : networkAlert,
				maxCpuPercent : maxCpuPercent,
				maxDiskPercent : maxDiskPercent,
				maxNetworkPercent : maxNetworkPercent				
			};									
		};		
		
		return getGaugeControlsDataImpl(this.Servers);						
		
	},
	
	getBarChartData: function(measure, state){
	
		function getBarChartDataImpl(data){
			if (!data){
				return {};
			}
			var servers = data.data;	

			var resultServers = [];

			if(measure == "CPU")
			{
				if(state == "ALL")
				{
					resultServers = servers;
				}
				else
				{
					resultServers = _.filter(servers, function(server){ return server.cpuUtilization == state; });
				}

				resultServerNames = _.map(resultServers, function(server) {return server.id;});
				resultServerPercent = _.map(resultServers, function(server) {return server.cpuUtilizationPercent;});
			}
			else if(measure == "DISK")
			{
				if(state == "ALL")
				{
					resultServers = servers;
				}
				else
				{
					resultServers = _.filter(servers, function(server){ return server.diskUsage == state; });
				}
				resultServerNames = _.map(resultServers, function(server) {return server.id;});
				resultServerPercent = _.map(resultServers, function(server) {return server.diskUsagePercent;});
			}
			else if(measure == "NETWORK")
			{
				if(state == "ALL")
				{
					resultServers = servers;
				}
				else
				{
					resultServers = _.filter(servers, function(server){ return server.networkUtilization == state; });
				}
				resultServerNames = _.map(resultServers, function(server) {return server.id;});
				resultServerPercent = _.map(resultServers, function(server) {return server.networkUtilizationPercent;});
			}


			return {
				serverNames : resultServerNames,
				serverRates : resultServerPercent							
			};									
		};		

		return getBarChartDataImpl(this.Servers);					
	}
});

model.RemoteDataSource.injection = ['RestCallService','$interval',model.RemoteDataSource];