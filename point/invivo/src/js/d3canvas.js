	"use strict";

	/* Get or create the application global variable */
	var App = App || {};

	var d3Canvas = function() {


		var svgContainer;

		self.data = [];

		self.zvalueslider = 0.5;

		var showSimilar = false;

		var selected = "filtered";


		d3.select("#canvasDiv").selectAll("svg").remove();
		svgContainer = d3.select('#canvasDiv').append("svg")
										.attr("id", "mainsvg")
										// .attr("xmlns", "http://www.w3.org/2000/svg")
		                                  .attr("width", 696)
		                                   .attr("height", 520)
		                                   .attr("border", "10px solid white");
		                                   // .attr("float", "right")
		                                   // .attr("position", "absolute")
		                                   // .attr("border", "2px red");

		var imgs = svgContainer.selectAll('image').data([0]);
					imgs.enter()
					.append('svg:image')
					// .attr("width", 512)
					// .attr("height", 512)
					.attr("x", 20)
					.attr("y", 20)
					.attr("xlink:href", "https://anaik12.github.io/twintvis/results3.png")
					.attr("border", "10px solid white");

		
			

			// function drawcanvas(error, data){
		self.drawCanvas = function(selected, top5, cell, state){
	        
		
		// console.log("selfzvalueslider", self.zvalueslider);

		var renderDraw = function(selected, zvalueslider, cell, state){

			// console.log("zvalueslider", zvalueslider);
	
			var zvalues = d3.nest()
		  .key(function(d) { return (parseFloat(d.Y)).toFixed(2); })
		  // .key(function(d) { console.log(d); })
		  .entries(data);

		//   console.log("zvalues: ", zvalues);
		

		    function findPointZvalueY(key){
		  		for(var i in zvalues){
		  			// console.log(typeof(zvalues[i].key));
		  			if(zvalues[i].key == key){
		  			return zvalues[i].values;
		  			}
		  		}

		  	}
			  console.log("findPointZvalueY 0.99: ", findPointZvalueY("0.99"));

	     var keyvalues = findPointZvalueY(zvalueslider);
	    //  console.log("timeframe is ", keyvalues);

		 // var ts = 0;

	     var ts = Math.abs(keyvalues[0].timeframe);


	     document.getElementById('TS').innerHTML = 'Timestep = ' + ts;

	     function getcolor(concentration){
	     	var colormax = 357.19;   
	        var cy = 255 -  ( concentration * 1000 / colormax ) ;
	        return "rgb(" + cy + ",50,255)" ;

	     }

	     var first = 0;
	     var second = 1;
	     var third = 2;
	     var fourth = 3;
	     var fifth = 4;

	    var top5array = [];
	      top5array.push([0, 1,2,3,4]);
	      top5array.push([0, 1,2,3,4]);
	      top5array.push([0, 1,2,3,4]);
	      top5array.push([0, 1,2,3,4]);
	      top5array.push([16,25,24,10,23]);
	      top5array.push([22,14,6,38,37]);
	      top5array.push([0,19,26,74,93]);
	      top5array.push([4,21,3,20,19]);
	      top5array.push([12,10,5,16,6]);
	      top5array.push([42,52,39,49,30]);

	     if(top5==true){
	     		// console.log("top5 is ", top5);
	          if(selected == "comm0"){
	              first = top5array[0][0];
	              second = top5array[0][1];
	              third = top5array[0][2];
	              fourth = top5array[0][3];
	              fifth = top5array[0][4];
	          }
	          else if(selected == "comm1"){
	               first = top5array[1][0];
	              second = top5array[1][1];
	              third = top5array[1][2];
	              fourth = top5array[1][3];
	              fifth = top5array[1][4];
	          }
	          else if(selected == "comm2"){
	               first = top5array[2][0];
	              second = top5array[2][1];
	              third = top5array[2][2];
	              fourth = top5array[2][3];
	              fifth = top5array[2][4];
	          }
	          else if(selected == "comm3"){
	             first = top5array[3][0];
	              second = top5array[3][1];
	              third = top5array[3][2];
	              fourth = top5array[3][3];
	              fifth = top5array[3][4];
	          }
	          else if(selected == "proc_300_cor5"){
	               first = top5array[4][0];
	              second = top5array[4][1];
	              third = top5array[4][2];
	              fourth = top5array[4][3];
	              fifth = top5array[4][4];
	          }
	          else if(selected == "proc_300_cor7"){
	               first = top5array[5][0];
	              second = top5array[5][1];
	              third = top5array[5][2];
	              fourth = top5array[5][3];
	              fifth = top5array[5][4];
	          }
	          else if(selected == "proc_300_cor9"){
	               first = top5array[6][0];
	              second = top5array[6][1];
	              third = top5array[6][2];
	              fourth = top5array[6][3];
	              fifth = top5array[6][4];
	          }
	          else if(selected == "proc_100_cor5"){
	             first = top5array[7][0];
	              second = top5array[7][1];
	              third = top5array[7][2];
	              fourth = top5array[7][3];
	              fifth = top5array[7][4];
	          }
	          else if(selected == "proc_100_cor7"){
	               first = top5array[8][0];
	              second = top5array[8][1];
	              third = top5array[8][2];
	              fourth = top5array[8][3];
	              fifth = top5array[8][4];
	          }
	          else if(selected == "proc_100_cor9"){
	              first = top5array[9][0];
	              second = top5array[9][1];
	              third = top5array[9][2];
	              fourth = top5array[9][3];
	              fifth = top5array[9][4];
	          }
			  else if(selected == "filtered"){
				first = top5array[9][0];
				second = top5array[9][1];
				third = top5array[9][2];
				fourth = top5array[9][3];
				fifth = top5array[9][4];
			}
	          
	        }

	    var showSbutton = document.getElementById("showS");
	    showSbutton.onclick =function(){
	    	  // console.log("buttoncolor ", showSbutton.style.backgroundColor); 	
	          showSimilar = !showSimilar; 
	          // if(showSimilar) showSbutton.style.backgroundColor = "#B7B1B0";
	          // else showSbutton.style.backgroundColor = "#FCFCFC";
	          // console.log("showSimilar is ", showSimilar); 
	          linegraphall(keyvalues, d_selected, cell_);
	    }


	    function getcolor_comm(cell){
				
	     		// if(commdata[cell] == undefined){
	     		if(cell == undefined){
	     			return "none";
	     		
	     		}
	     		if (cell == first){
	     		// if (cell > 8000 && cell <= 9000){

	     				// return "red";
	     				// console.log("cell is", cell);
						 console.log("ingetcolor first");
	     				return "#1b9e77";
	     				
		     	}
		     	else if (cell == second){
		     	// else if (cell > 9000 && cell <= 10000){
		     			// return "green";
		     			return "#d95f02";
		     	}
		     	else if (cell == third){
		     	// else if (cell > 10000 && cell <= 11000){
		     			// return "blue";
		     			return "#7570b3";
		     	}
		     	else if (cell == fourth){
		     	// else if (cell > 11000 && cell <= 12000){
		     			// return "white";
		     			return "#e26eaa";
		     	}
		     	else if (cell == fifth){
		     	// else if (cell > 12000 && cell <= 15000){
		     			// return "cyan";
		     			return "#66a61e";
		     	}
		     	else {
		     		return "black";
		     	}
	     		// }
	     	
	     }	

	     var hoverdiv = d3.select("body").append("div")   
	        .attr("class", "tooltip")               
	        .style("opacity", 0);

	    var cell_ = "";
	    var d_selected = "";

	    var linegraphall = function(keyvalues, cellvalue, cell){
	    	cell_ = cell;
	    	d_selected = cellvalue;
	    	var similarCellArray = [];
	    	var cellname = "cell" + cell_;

	    	if(!showSimilar) similarCellArray.push(cellname);
	    	else{
	    		// var linechart1 = new lineChart1();
		    	var count = 0;
		    	
		    	for(var i in keyvalues){
		    		if(keyvalues[i][selected] == cellvalue){
		    			cellname = "cell" + keyvalues[i].cell;
		    			// // linechart1.render(cellname);
		    			// console.log("cellname is ", cellname);
		    			count++;
		    			similarCellArray.push(cellname);
		    		}
		    	}
		    	
	    	}
	    	// console.log("Similar cell array ", similarCellArray);
	    	// return(similarCellArray);
	    	var linechart1 = new lineChart1();
	        linechart1.renderlinechart(similarCellArray, ts, selected, zvalueslider, top5, data);
								// })

		}
		
		

		var circles = svgContainer.selectAll("g")
		                         .data(keyvalues)
		                         .enter()
		                         .append("circle")
		                         .attr("cx", function (d) {  return parseFloat(d.X) * 2.5 + 30; })
								.attr("cy",  function (d) {  return parseFloat(d.Z) * 2.5+ 30; })
								.attr("r", 8)
								.attr("stroke-width", "1.5px")
								.attr("opacity", 1)
								// .attr("stroke", function(d){ return getcolor_comm(d.comm1);})
								.attr("stroke", function(d){ return getcolor_comm(d[selected]);})
								// .attr("stroke", function(d){ return getcolor_comm(d.intensity);})
								.attr("fill", "none")
								.attr("id", function(d){ return d.cell;})
								// .on("mousemove" function(d) {
								// 	d3.select(this)
								// 	.style("fill", "green");
								// })
								.on("click", function(d){
									// linegraphall(keyvalues, d[selected]);
									var linechart1 = new lineChart1();
									// var cellname = "cell" + d.cell;
									document.getElementById('cellname').textContent = "Cell " + d.cell;
									linegraphall(keyvalues, d[selected], d.cell);
	        						// linechart1.renderlinechart(linegraphall(keyvalues, d[selected], d.cell), ts, selected, zvalueslider, top5, data);
								})
								.on("mouseover", function(d){
									d3.select(this).style("fill","red");
									// .style("opacity",0.5);

			            			d3.select(this).classed('active', true)
				                      hoverdiv.transition()      
					                .duration(200)      
					                .style("opacity", .9)     
					                hoverdiv .html(d.cell)  
					                .style("left", (d3.event.pageX + 10) + "px")     
					                .style("top", (d3.event.pageY) + "px");
								})
								.on("mouseout", function(d){
									d3.select(this).style("fill","none");
									// .style("opacity",1);
									d3.select(this).classed('active', true)
				                      hoverdiv.transition()		
					                .duration(500)		
					                .style("opacity", 0);	
								});
								
								if (document.getElementById("downloadall").checked){
									let name = selected + "-TS_" + ts + ".png"
									saveSvgAsPng(document.getElementsByTagName("svg")[2], name);
								}
								
								 

			            function handlemouseover(d,co){
			            	d3.select(co).style("fill","red");

			            	d3.select(co).classed('active', true)
				                      hoverdiv.transition()      
					                .duration(200)      
					                .style("opacity", .9)   
					                // .style("fill", "green")   
					                hoverdiv .html(d.cell)  
					                // div .html(htmlinfo(d))
					                .style("left", (d3.event.pageX + 10) + "px")     
					                .style("top", (d3.event.pageY) + "px");

				           }
			                  	
			            function handlemouseout(){
			            	d3.select(this).classed('active', false)
			                      hoverdiv.transition()      
				                .duration(500)      
				                .style("opacity", 0)
				                .style("pointer-events", "all");   
				    				d3.select(this)
									.style('fill', "none");
			            }
								

							
						
			if(state=="on") {
	
			var greencell = cell.substr(4);

			document.getElementById(greencell).setAttribute("fill","green");

			// $(".canvasDiv").triggerSVGEvent('mouseover');
			}
			d3.select("#downloadimg")
			.on('click', function(){
				// Get the d3js SVG element and save using saveSvgAsPng.js
				let name = selected + "-TS_" + ts + ".png"
				saveSvgAsPng(document.getElementsByTagName("svg")[2], name);
			});

			
			}	

			// console.log("378 zvalueslider", zvalueslider);
			
			renderDraw(selected, zvalueslider, cell, state);

		}

		
		// }

		// data loading function
	    self.loadData = function(file,zvalueslider,selected){
	        // read the csv file
	        d3.csv(file)
	        // iterate over the rows of the csv file
	            .row(function(d) {
	                // add the element to the data collection
	                data.push({
	                    // concentration density

	                     // concentration: Number(d[selected]),
	                    comm0: Number(d.comm0),
	                    // comm1: Number(d.comm1),
	                    // comm2: Number(d.comm2),
	                    // comm3: Number(d.comm3),
	                    filtered: Number(d.filtered),
	                    intensity: Number(d.intensity),
	                    // proc_300_cor5: Number(d.proc_300_cor5),
	                    // proc_300_cor7: Number(d.proc_300_cor7),
	                    // proc_300_cor9: Number(d.proc_300_cor9),
	                    // proc_100_cor5: Number(d.proc_100_cor5),
	                    // proc_100_cor7: Number(d.proc_100_cor7),
	                    // proc_100_cor9: Number(d.proc_100_cor9),
	                    cell:Number(d.cell),

	                    timeframe: Number(d.timeframe),

	                    // Position
	                    X: Number(d.Points0),
	                    Y: Number(d.Points1),
	                    Z: Number(d.Points2)

	                });
					// console.log("data now 	" + data);
	            })
	            // when done loading
	            .get(function(error, rows, data) {
					
	                self.zvalueslider = zvalueslider;
	                self.drawCanvas(selected);

	               
	            });
	            // console.log(data);
	    };


		var publiclyAvailable = {

			initialize: function(file,zvalueslider,selected){
	           
	    },

	    changeSelected: function(newdata,selected, top5){
	    	// self.drawCanvas(data, zvalueslider, selected);
	    	// var data_old = data;
	    	// var zvalueslider_old = self.zvalueslider;
	    	// data = self.data;
	    	self.data = newdata;
	    	// console.log("data now ", self.data);
	    	// self.zvalueslider = zvalueslider;
	    	self.drawCanvas(selected, top5);
	    },

	    pulsatecall: function(cell,state,selected, zvalueslider, top5, newdata){
	    	self.data = newdata;
	    	self.zvalueslider = zvalueslider;
	    	self.drawCanvas(selected, top5, cell, state);
	    	
	    },

	    getdata: function(){
	    	data = self.data;
	    	console.log(data);
	    },

	    clearCanvas: function(newdata, selected, zvalueslider, top5){
	    	// d3.selectAll("svg > *").remove();
	    	self.data = newdata;
	    	self.zvalueslider = zvalueslider;
	    	self.drawCanvas(selected, top5);
	    
	    }

	 

	   };

	   return publiclyAvailable;


	};


	   



