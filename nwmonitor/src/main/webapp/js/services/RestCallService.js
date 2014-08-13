
/**
 * Service written for making HTTP Rest calls to backend
 */

var RestCallService = (function () {

	/*
	 * Constructor 
	 */
	function RCService($http, $q)
	{
		this.$http = $http;
		this.$q = $q;
	};	


	/*
	 * Injection parameters
	 */
	RCService.injection = [
	                       '$http',	                                 
	                       '$q',
	                       RCService
	                       ];

	/*
	 * Get Servers call
	 */
	RCService.prototype.getServers = function () {
		return this.$http.get("/nwmonitor/api/servers").catch(this.logError);
	};

	return RCService;
})();
