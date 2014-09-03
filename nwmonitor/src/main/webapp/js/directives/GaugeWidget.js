var GaugeWidgetModule = (function () {

	function GaugeWidget($interval){
		
		
		return {
	      restrict: 'E',
	      template: '<div class="specialGauge"></div>',
	      link: function(scope, element, attrs)
	      		{
	      			require([
	      				"dojo/query", "dojox/gauges/GlossyCircularGauge", "dojo/domReady!"

 					], function( query, GlossyCircularGauge) {
 					 				
 					 		var customElementId = element.attr('id');
							var gaugeId = customElementId + "-glossyGuage";
							var parent = query("#"+customElementId+" .specialGauge");							
						
							var glossyCircular = new GlossyCircularGauge(
		      											{
			      											background: [255, 255, 255, 0],
		        										 	title: 'Value',
		        										 	value: attrs.value,
		        										 	id: gaugeId,
													        width: 150,
													        height: 150
												        },parent[0]);
		
			    			glossyCircular.startup();		
			    		
			    			
			    			// start the UI update process; save the timeoutId for canceling
			    		    timeoutId = $interval(function() {
			    		    	glossyCircular.set("value", attrs.value); // update DOM
			    		    }, 3000);
							
			    			
					});
				}				
	      		
	    };
	}

	GaugeWidget.injection = [
	                         '$interval',
                              GaugeWidget
                            ];
	
	return GaugeWidget;
})();