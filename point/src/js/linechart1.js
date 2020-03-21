
"use strict";

// min value = 4715.9
// max value = 14015.0

/* Get or create the application global variable */
var App = App || {};

var lineChart1 = function() {

   // cellarray.push("cell1");
  // var margin = {top: 20, right: 20, bottom: 30, left: 50};
  //         var width = 600; //document.getElementsByClassName("lineDiv").clientWidth;
  //         var height = 150;
  // var svg = d3.select(".lineDiv").append("svg")
  //         .attr("width", width + margin.left + margin.right)
  //         .attr("height", height + margin.top + margin.bottom)
  //       .append("g")
  //         .attr("transform",
  //               "translate(" + margin.left + "," + margin.top + ")");

  var publiclyAvailable = {

  // cellarray = [];


  renderlinechart: function(cellarray, ts) {
    
      d3.select(".lineDiv").selectAll("svg").remove(); 
      /* var w = 960;
      var h = 500; */

      var margin = {top: 20, right: 20, bottom: 30, left: 50};
          var width = 600; //document.getElementsByClassName("lineDiv").clientWidth;
          var height = 150;


      var x = d3.scaleLinear()
              // .domain([1,6004])
              .range([0,width]);

      var y0 = d3.scaleLinear()
              // .domain([0, 14015])
              .range([height, 0]);

      var y1 = d3.scaleLinear()
              // .domain([0, 14015])
              .range([height, 0]);


      // append the svg obgect to the body of the page
      // appends a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = d3.select(".lineDiv").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
      
      // Get the data
      d3.csv("data/time_courses.csv", function(error, data1) {
        d3.csv("data/Filtered.brain.csv", function(error, data2) {
        if (error) throw error;

        // format the data
        data1.forEach(function(d,i) {
            i = i;
            d.cell1 = +d.cell1;
            // console.log("i and d.cell1", i, d.cell3);
        });

        // // Scale the range of the data
        x.domain(d3.extent(data1, function(d, i) { return i; }));
        y0.domain([0, d3.max(data1, function(d) { return d.cell1; })]);
        // y1.domain([-4, d3.max(data2, function(d) { return d.cell1; })]);
        y1.domain([-4, 68]);
     
        
        // Add the valueline path.

        var hoverdiv = d3.select("body").append("div")   
      .attr("class", "tooltip")               
      .style("opacity", .8)
      .style('visibility', 'hidden');

      // function tooltip(d){
      //   var stringvalue;
      //   stringvalue = d.cell1;
      //   return stringvalue;
      // }

      

      var lineOpacity = "0.25";
      var lineOpacityHover = "0.85";
      var otherLinesOpacityHover = "0.2";
      var lineStroke = "1px";
      var lineStrokeHover = "2.5px";

      var circleOpacity = '0.85';
      var circleOpacityOnLineHover = "0.25"
      var circleRadius = 3;
      var circleRadiusHover = 6;

      if(cellarray.length!=0){
      for(var i=0; i<cellarray.length; i++){
      var cellname = cellarray[i];
      // console.log(cellname);
      // var cellname = cell;
      // define the line
      var valueline1 = d3.line()
          .x(function(d,i) { return x(i); })
          .y(function(d) { 
            // console.log("value is" + (d[cellname])); 
            return y0(d[cellname]); });

      var valueline2 = d3.line()
          .x(function(d,i) { return x(i); })
          .y(function(d) { 
            // console.log("value is" + (d[cellname])); 
            return y1(d[cellname]); });

      // var lines = svg.append('g')
      // .attr('class', 'line-group') 
      // // .on("mouseover", function(d, i) {
      // svg.append("text")
      //   .attr("class", "title-text")
      //   .style("fill", "black")        
      //   .text(cellname)
      //   .attr("text-anchor", "middle")
      //   .attr("x", (width)/2)
      //   .attr("y", 5)
      //   .attr("opacity",0)
      // // })
      // // .on("mouseout", function(d) {
      // //   svg.select(".title-text").remove();
      // // })
      // // .data(data1)
      // svg.append('path')
      // .attr('class', 'line')
      // .attr("opacity", 0.7)
      // .attr("d", valueline1(data1))
      // // .append("text")
      // // .text(cellname)
      // // .attr("class", "title-text")
      // // .attr("text-anchor", "middle")
      // //   .attr("x", (width)/2)
      // //   .attr("y", 5)
      // //   .style("fill", "black")  
      // // .attr("visibility", "hidden");
      // // .style("cursor", all)
      // .on("mouseover", function(d) {
      //         d3.selectAll('.line')
      //           .style('opacity', otherLinesOpacityHover);
      //         d3.selectAll('.circle')
      //           .style('opacity', circleOpacityOnLineHover);
      //         d3.select(this)
      //           .style('opacity', lineOpacityHover)
      //           .style("stroke-width", lineStrokeHover)
      //           .style("cursor", "pointer");
      //         // d3.selectAll('.title-text')
      //         //   .style('opacity', 0)
      //         // d3.select('.title-text')
      //         //   .style("opacity", "0.5")
      // })
      // .on("mouseout", function(d) {
      //       d3.selectAll(".line")
      //           .style('opacity', lineOpacity);
      //       d3.selectAll('.circle')
      //           .style('opacity', circleOpacity);
      //       d3.select(this)
      //         .style("stroke-width", lineStroke)
      //         .style("cursor", "none")
      //       // d3.select('.title-text')
      //       //     .style('opacity', 0);
            
      // });



        // var line = 
        //     svg.append("text")
        //     .attr("class", "title-text")
        //     .style("stroke", "black")        
        //     .text(cellname)
        //     .attr("text-anchor", "middle")
        //     .attr("x", width/2)
        //     .attr("y", 5)
        //     .attr("opacity",0)
        //     svg.append("path")
        //     .data(data1)
        //     .attr("class", "line")
        //     .attr("opacity", 0.5)
        //     .attr("d", valueline1(data1))
        //     .on("mouseover", function(d) {
        //       d3.selectAll('.line')
        //         .style('opacity', otherLinesOpacityHover);
        //       d3.selectAll('.circle')
        //         .style('opacity', circleOpacityOnLineHover);
        //       d3.select(this)
        //         .style('opacity', lineOpacityHover)
        //         .style("stroke-width", lineStrokeHover)
        //         .style("cursor", "all");
        //         d3.selectAll(".title-text")
        //         .style("opacity", 0.9);
        //         // d3.select(this)
        //         // .style("opacity", 0.9);
        //     })
        //     .on("mouseout", function(d) {
        //     d3.selectAll(".line")
        //         .style('opacity', lineOpacity);
        //     d3.selectAll('.circle')
        //         .style('opacity', circleOpacity);
        //     d3.select(this)
        //       .style("stroke-width", lineStroke)
        //       .style("cursor", "all");
        //     d3.select("title-text")
        //     .style("opacity", 0);
        //     });
        //     svg.append("text")
        // .attr("class", "title-text")
        // .style("stroke", "black")        
        // .text(cellname)
        // .attr("text-anchor", "middle")
        // .attr("x", width/2)
        // .attr("y", 5)
        // .attr("opacity",0.1);
        // .on("mouseover", function(d) {
        //   d3.selectAll("title-text")
        //   .style("opacity", 0);
        //   d3.select(this)
        //   .style("opacity", 0.9);
        // })
        // .on("mouseout", function(d) {
        //     d3.selectAll("title-text")
        //     .style("opacity", 0);
        // });

        var line1 = svg.append("path")
            // .data(data1)
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("opacity", 0.7)
            .attr("d", valueline1(data1))
            .on("mouseover", function(d) {
            d3.selectAll('.line2')
              .style('opacity', otherLinesOpacityHover);
            d3.selectAll('.circle')
              .style('opacity', circleOpacityOnLineHover);
            d3.select(this)
              .style('opacity', lineOpacityHover)
              .style("stroke-width", lineStrokeHover)
              .style("stroke", "lightgreen")
              .style("cursor", "pointer");
            })
            .on("mouseout", function(d) {
            d3.selectAll(".line")
                .style("stroke", "steelblue")
                .style('opacity', lineOpacity);
            d3.selectAll('.circle')
                .style('opacity', circleOpacity);
            d3.select(this)
              .style("stroke-width", lineStroke)
              .style("cursor", "none");
            });
        
            

        var line2 = svg.append("path")
            // .data(data2)
            .attr("class", "line2")
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("opacity", 0.7)
            .attr("d", valueline2(data2))
            .on("mouseover", function(d) {
            d3.selectAll('.line2')
              .style('opacity', otherLinesOpacityHover);
            d3.selectAll('.circle')
              .style('opacity', circleOpacityOnLineHover);
            d3.select(this)
              .style('opacity', lineOpacityHover)
              .style("stroke-width", lineStrokeHover)
              .style("cursor", "pointer");
            })
            .on("mouseout", function(d) {
            d3.selectAll(".line2")
                .style('opacity', lineOpacity);
            d3.selectAll('.circle')
                .style('opacity', circleOpacity);
            d3.select(this)
              .style("stroke-width", lineStroke)
              .style("cursor", "none");
            });

        }
      }

        //axis labels
      svg.append("text")
      .attr("class", "axisRed")
      // .attr("text-anchor", "end")
      .attr("x", width - 320)
      .attr("y", height +28)
      .attr("stroke", "grey")
      .text("Timeframe");

      svg.append("text")
    .attr("class", "axisRed")
    .attr("text-anchor", "end")
    .attr("x", 2)
    .attr("y0", 30)
    .attr("dy", ".75em")
    .attr("stroke", "grey")
    .attr("transform", "rotate(-90)")
    .text("Original signal amplitude");

    svg.append("text")
    .attr("class", "axisRed")
    .attr("text-anchor", "end")
    .attr("x", -10)
    .attr("y", 585)
    .attr("dy", "0.70em")
    .attr("stroke", "grey")
    .attr("transform", "rotate(-90)")
    .text("dy/dx of original signal");


        // Add the X Axis
      
            svg.append("g")
          .attr("class","axisWhite")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x));


        // // Add the Y Axis
        svg.append("g")
            .attr("class","axisRed")
            .call(d3.axisLeft(y0));

        svg.append("g")
            .attr("class","axisgrey")
            // .attr("class", "y axis")  
            .attr("transform", "translate(" + width + " ,2)") 
            // .style("fill", "red")   
            // .call(yAxisRight);
            .call(d3.axisRight(y1));

        var verticalLine = svg.append('line')
    // .attr('transform', 'translate(100, 50)')
        .attr('x1', ts/10)
        .attr('y1', 0)
        .attr('x2', ts/10)
        .attr('y2', height)
        .attr("stroke", "grey")
        .attr('class', 'verticalLine');

        });
      });

      
      }

    //   line: function(ts) {
    //     // var verticalLine = d3.select(".lineDiv").append("line")
    // // .attr('transform', 'translate(100, 50)')
    //     .attr('x1', ts/10)
    //     .attr('y1', 0)
    //     .attr('x2', ts/10)
    //     .attr('y2', height)
    //     .attr("stroke", "black")
    //     .attr('class', 'verticalLine');
    //   }


  };

  return publiclyAvailable;


  };

// }