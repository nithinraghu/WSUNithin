var RestCallService = (function () {

	function RCService($http, $q)
	{
		this.$http = $http;
		this.$q = $q;
	};	

	RCService.injection = [
	                       '$http',	                                 
	                       '$q',
	                       RCService
	                       ];

	RCService.prototype.getServers = function () {
		return this.$http.get("/nwmonitor/api/servers").catch(this.logError);
	};

	return RCService;
})();
