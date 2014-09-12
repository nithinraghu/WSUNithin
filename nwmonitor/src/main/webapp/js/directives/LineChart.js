var LineChartModule = (function () {

	function LineChartModule($interval){
		
		
		return {
	      restrict: 'E',	      
	      scope: {
	    	  myData: '='
	        },
	       
	      template: '<div class="line2DChart"></div>',
	      link: function(scope, element, attrs)
	      		{
	      			require([
	      			    "dojo/query", 
	      				"dojox/charting/Chart2D", 	  
	      				"dojox/charting/themes/Claro",
	      				"dojox/charting/action2d/Tooltip",
	      				"dojox/charting/action2d/Magnify",
	      				"dojox/charting/widget/Legend",
	      				"dojo/domReady!"
 					], function(query, Chart2D,Claro,Tooltip, Magnify, Legend) {
 					 				 	
	      					var customElementId = element.attr('id');	      					
	      					var parent = query("#"+customElementId+" .line2DChart");
						
							var lineChart = new Chart2D(								
								parent[0]
							);
							
							 // Set the theme
							lineChart.setTheme(Claro);
							
							// Add the only/default plot
							lineChart.addPlot("default", {
						        type: "Lines",
						        markers: true
						    });
						 						    
							 // Add axes
							lineChart.addAxis("x");
							lineChart.addAxis("y", { min: 0, max: 100, vertical: true, fixLower: "major", fixUpper: "major" });
						 
							var chartData = scope.myData;							
														
							_.each(chartData, function(chartItem, idx){
								lineChart.addSeries(chartItem.id, chartItem.data);
							});
													
							// Create the tooltip
						    var tip = new Tooltip(lineChart,"default");
						    
						    // Create the magnifier
						    var mag = new Magnify(lineChart,"default");
							
							// Render the chart!
							lineChart.render();	
			    			
							// Create the legend
						    var legend = new Legend({ chart: lineChart },"legend");
						    
						    
						    scope.$watch("myData", function (newChartData, oldChartData) {						  
						    	_.each(oldChartData, function(chartData){
									lineChart.removeSeries(chartData.id);
								});								    							    							    
						    	_.each(newChartData, function(chartData){
									lineChart.addSeries(chartData.id, chartData.data);
								});
						    	
						    	lineChart.render();	
						    	legend.refresh();
						    	
			                });
			                
			                scope.$on('$destroy', function() {
					            var stackedAreaLegend = dijit.byId("legend");
								if (stackedAreaLegend) {
								   stackedAreaLegend.destroyRecursive(true);
								}
					            
					        });
					});
				}				
	      		
	    };
	}

	LineChartModule.injection = [
	                         '$interval',
	                         LineChartModule
                            ];
	
	return LineChartModule;
})();