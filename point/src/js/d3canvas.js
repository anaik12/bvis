"use strict";

/* Get or create the application global variable */
var App = App || {};

var d3Canvas = function() {
	var svgContainer;

	self.data = [];

	self.zvalueslider = 25;

	var selected = "comm0";

	d3.select(".canvasDiv").selectAll("svg").remove();
	svgContainer = d3.select('.canvasDiv').append("svg")
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
				.attr("x", 0)
				.attr("y", 0)
				.attr("xlink:href", "https://anaik3.people.uic.edu/bvis/brainImg.png")
				.attr("border", "10px solid white");



	// var function renderDraw();
	// var slider = document.getElementById("slider");
 //        // console.log(slider);
 //        slider.addEventListener("input", movePlane);


 // 	 function movePlane(e){
 //          var target = (e.target) ? e.target : e.srcElement;
 //          // console.log("target value ", target.value);
 //          var newz = target.value;
 //          // zvalueslider = (parseFloat(newz)).toFixed(2);
 //          self.zvalueslider = target.value;

 //          // console.log("zvalueslider", zvalueslider);

 //          drawCanvas(selected, top5);   
 //        } 

	// function drawcanvas(error, data){
	self.drawCanvas = function(selected, top5){
        
	// console.log("zvalueslider", zvalueslider);
	// console.log("selfzvalueslider", self.zvalueslider);

	var renderDraw = function(selected){
		// console.log(zvalueslider);
		var zvalues = d3.nest()
	  .key(function(d) { return (parseFloat(d.Y)).toFixed(2); })
	  // .key(function(d) { console.log(d); })
	  .entries(data);

	

	    function findPointZvalueY(key){
	  		for(var i in zvalues){
	  			// console.log(typeof(key));
	  			if(zvalues[i].key == key){
	  			return zvalues[i].values;
	  			}
	  		}

	  }

     var keyvalues = findPointZvalueY(zvalueslider);
     // console.log("timeframe is ", keyvalues[0].timeframe);

     // var ts = 0;

     var ts = Math.abs(keyvalues[0].timeframe);
     // console.log(	)

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

	var circles = svgContainer.selectAll("circle")
	                         .data(keyvalues)
	                         .enter()
	                         .append("circle")
	                         .attr("cx", function (d) {  return parseFloat(d.X)*30 + 0; })
							.attr("cy",  function (d) {  return parseFloat(d.Z)*30 + 0; })
							.attr("r", 9)
							.attr("stroke-width", "2px")
							.attr("opacity", 1)
							// .attr("stroke", function(d){ return getcolor_comm(d.comm1);})
							.attr("stroke", function(d){ return getcolor_comm(d[selected]);})
							// .attr("stroke", function(d){ return getcolor_comm(d.intensity);})
							.attr("fill", "none")
							// .on("click", function(d){
								
							// })
							.on("mouseover", function(d){   
			                      d3.select(this).classed('active', true)
			                      hoverdiv.transition()      
			                .duration(200)      
			                .style("opacity", .9);      
			                hoverdiv .html(d.cell)  
			                // div .html(htmlinfo(d))
			                .style("left", (d3.event.pageX + 10) + "px")     
			                .style("top", (d3.event.pageY) + "px");
			           
								        let selected_circles = d3.select(this);
								        pulsate(selected_circles, "on");


								var linechart1 = new lineChart1();
								var cellname = "cell" + d.cell;
								document.getElementById('cellname').textContent = "Cell " + d.cell;
        						linechart1.render(cellname);
                })
					.on("mouseout", function(d){
                      d3.select(this).classed('active', false)
                      hoverdiv.transition()      
	                .duration(500)      
	                .style("opacity", 0);   
	                let selected_circles = d3.select(this);
					pulsate(selected_circles, "off");
                  })
							.style("pointer-events", "all");

						
					function pulsate(selection, state) {
					if(state == "on") recursive_transitions_on();
				    else recursive_transitions_off();

				    function recursive_transitions_on() {
				      // if (selection.data()[0].pulse) {
				        selection.transition()
				            .duration(400)
				            .attr("stroke-width", 2)
				            .attr("r", 8)
				            // .attr("fill", "lightblue")
				            .attr("opacity","0.7")
				            .ease(d3.easeSin)
				            .transition()
				            .duration(800)
				            .attr('stroke-width', 3)
				            .attr("r", 12)
				            .ease(d3.easeBounce)
				            .on("end", recursive_transitions_on);
				      	// }
				      } 
				      function recursive_transitions_off(){
				        // transition back to normal
				        selection.transition()
				            .duration(200)
				            .attr("r", "none")
				            // attr("stroke", function(d){ return getcolor_comm(d.comm1);})
				            .attr("stroke", function(d){ return getcolor_comm(d[selected]);})
				            // .attr("stroke", function(d){ return getcolor_comm(d.intensity);})
				            .attr("r", 9 )
				            .attr("stroke-width", "1px")
				            .attr("opacity", 1)
				            .attr("fill", "none");
				            // .attr("stroke-dasharray", "1, 0");
				      }
				    // }
				}
		}
		renderDraw(selected, zvalueslider);

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
                    comm1: Number(d.comm1),
                    comm2: Number(d.comm2),
                    comm3: Number(d.comm3),
                    filtered: Number(d.filtered),
                    intensity: Number(d.intensity),
                    proc_300_cor5: Number(d.proc_300_cor5),
                    proc_300_cor7: Number(d.proc_300_cor7),
                    proc_300_cor9: Number(d.proc_300_cor9),
                    proc_100_cor5: Number(d.proc_100_cor5),
                    proc_100_cor7: Number(d.proc_100_cor7),
                    proc_100_cor9: Number(d.proc_100_cor9),
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
				// console.log("d is in can ", rows.values);
                // draw the containment cylinder
                // TODO: Remove after the data has been rendered
                // console.log(data);
                self.zvalueslider = zvalueslider;
                self.drawCanvas(selected);

                // create the particle system
                // self.createParticleSystem();
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

    getdata: function(){
    	data = self.data;
    	console.log(data);
    },

    clearCanvas: function(newdata, selected, zvalueslider, top5){
    	// d3.selectAll("svg > *").remove();
    	self.data = newdata;
    	self.zvalueslider = zvalueslider;
    	self.drawCanvas(selected, top5);
    	// var linechart = new linechart();
    	// linechart.linechartcall();
    }

    // render("-4.2");

   };

   return publiclyAvailable;


};


   



