var GaugeWidgetModule = (function () {

	function GaugeWidget(){
		
		
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
		        										 	id: gaugeId,
													        width: 150,
													        height: 150
												        },parent[0]);
		
			    			glossyCircular.startup();			  					
							
			    			
					});
				}				
	      		
	    };
	}

	GaugeWidget.injection = [
                              GaugeWidget
                            ];
	
	return GaugeWidget;
})();