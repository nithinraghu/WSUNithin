function MainController($scope, $http) {
	
    $http.get('http://localhost:8080/nwmonitor/api/servers').
        success(function(data) {
            $scope.servers = data;
    	}
    );
}

