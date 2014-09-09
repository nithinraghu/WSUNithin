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
							
							//var chartData1 = [50,90,25,10,5,35,45,75,65,89,90,95];
							//var chartData2 = [40,70,15,5,2,25,25,65,55,79,80,85];
							
							_.each(chartData, function(data, idx){
								lineChart.addSeries("CPU - Server"+ (idx+1),data);
							});
						
							//lineChart.addSeries("CPU - Server1",chartData1);
							//lineChart.addSeries("CPU - Server2",chartData2);
							
							// Create the tooltip
						    var tip = new Tooltip(lineChart,"default");
						    
						    // Create the magnifier
						    var mag = new Magnify(lineChart,"default");
							
							// Render the chart!
							lineChart.render();	
			    			
							// Create the legend
						    var legend = new Legend({ chart: lineChart },"legend");
						    
						    
						    scope.$watch("myData", function (newData) {						  
						    	_.each(newData, function(data, idx){
									lineChart.updateSeries("CPU - Server"+ (idx+1),data);
								});
						    	
						    	lineChart.render();	
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