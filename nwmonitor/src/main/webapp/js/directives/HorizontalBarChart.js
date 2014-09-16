var HorizontalBarChartModule = (function () {

	function HorizontalBarChartModule($interval){		
		
		return {
	      restrict: 'E',	      
	      scope: {
	    	  myData: '='
	        },
	       
	      template: '<div class="horiBarChart"></div>',
	      link: function(scope, element, attrs)
	      		{
	      			require([
	      			    "dojo/query", 
	      				"dojox/charting/Chart2D", 	  
	      				"dojox/charting/themes/Claro",
	      				"dojox/charting/action2d/Tooltip",	      			
	      				"dojox/charting/widget/Legend",	      				
	      				"dojo/domReady!"
 					], function(query, Chart2D,Claro,Tooltip, Legend) {
 					 				 	
	      					var customElementId = element.attr('id');	      					
	      					var parent = query("#"+customElementId+" .horiBarChart");
						
							var barChart = new Chart2D(								
								parent[0]
							);
							
							 // Set the theme
							barChart.setTheme(Claro);
							
							// Add the only/default plot
							barChart.addPlot("default", {
						        type: "Bars",
						        gap: 5,
						        animate: { duration: 1500}
						    });
							
							// Create the tooltip
						    var tip = new Tooltip(barChart,"default");							 				
									
						    var chartDataInput = scope.myData;
						    
						    if(chartDataInput)
						    {
						    	chartRender(chartDataInput);
						    }
						    
						    var chartRender = function(chartData){
						    							    										
								// Create the labels for Y axes
								var labels = [];
								labels.push({value: 0, text: ""});
								_.each(chartData.servers, function(server, idx){
									labels.push({value : idx+1, text : server});
								});
								
								 // Add axes
								barChart.addAxis("x", 
												{ 
													min: 0, 
													max:100								
												});
								barChart.addAxis("y", {vertical: true,
												 labels: labels		                           				 
													 });						 							
								
								barChart.addSeries(chartData.id, chartData.data);							
																										    						   							
								// Render the chart!
							    barChart.render();	
						    };
						    
						   
						    						    
						    scope.$watch("myData", function (newChartData, oldChartData) {						  
						    	
						    	if(oldChartData)
						    	{
						    		barChart.removeSeries(oldChartData.id);
						    	}
						    	
						    	if(newChartData)
						    	{
						    		chartRender(newChartData);
						    	}
			                });			                						
					});
				}				
	      		
	    };
	}

	HorizontalBarChartModule.injection = [
	                         '$interval',
	                         HorizontalBarChartModule
                            ];
	
	return HorizontalBarChartModule;
})();