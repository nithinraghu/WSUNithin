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
			    			
			    			
			    			attrs.$observe('value', function (newValue) {
			    				glossyCircular.set("value", newValue); 
			    			});
			    			
			    			
			    			/*
			    			scope.$watch(attrs.value, function (newVal, oldVal, scope){			    				
			    				glossyCircular.set("value", newVal); 
			    			}, false);
	      					*/
			    						    						    			
			    		    
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