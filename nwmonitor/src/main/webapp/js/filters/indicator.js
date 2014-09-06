
var indicator = function() {
	return function(input) {
		var className;
		switch (input) {
			case "OK":
				className = "ui-state-success";
				break;
			case "WARNING":
				className = "ui-state-highlight";
				break;
			case "CRITICAL":
				className = "ui-state-error";
				break;
		}
		return className;
	};
};