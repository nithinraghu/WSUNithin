
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
		);						
		
		return [];
		
	};			
	
	/*
	 * Method returns data for gauge control section
	 */
	ServerService.prototype.getGaugeControlsData = function()
	{			
		return this.RestCallService.getServers().then(function(data){
			
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
		});		
		
		return [];				
	};
	
	
	
	return ServerService;
	
})();