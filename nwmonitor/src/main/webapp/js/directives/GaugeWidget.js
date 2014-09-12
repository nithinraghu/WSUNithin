var GaugeWidgetModule = (function () {

	function GaugeWidget($interval){
		
		
		return {
	      restrict: 'E',
	      scope: {
      		gaugeId: '@'
    	  },
	      link: function(scope, element, attrs)
	      		{
	      			require([
	      				"dojox/gauges/GlossyCircularGauge", "dojo/domReady!"

 					], function( GlossyCircularGauge) {
 							var gaugeId = scope.gaugeId;
 					 				
 					 		var glossyCircular = new GlossyCircularGauge({
										background: [255, 255, 255, 0],
									 	title: 'Value',
									 	id: gaugeId,
						        		width: 150,
						        		height: 150
					        }, element[0]).startup();
			    			
			    			
			    			attrs.$observe('value', function (newValue) {
			    				if (glossyCircular){
			    					glossyCircular.set("value", newValue);
			    				}
			    				 
			    			});
			    			
			    			scope.$on('$destroy', function() {
					            dojo.destroy(gaugeId);
					            
					        });
			    			
			    		
			    						    						    			
			    		    
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