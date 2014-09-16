
var labelState = function() {
	return function(input) {
		var className;
		switch (input) {
			case "OK":
				className = "success";
				break;
			case "WARNING":
				className = "warning";
				break;
			case "CRITICAL":
				className = "important";
				break;
			case "ALL":
				className = "notice";
				break;
		}
		return className;
	};
};