
"use strict";

// min value = 4715.9
// max value = 14015.0

/* Get or create the application global variable */
var App = App || {};

var lineChart1 = function() {
// document.onload = linechart();

// window.onload = function linechart(){
//   var w = document.getElementById("linechart").clientWidth; 
// var h = document.getElementById("linechart").clientHeight; 
  var publiclyAvailable = {

  render: function(cell) {
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


      //function for cell label
      function getcell(d, cell){
        var cell = "cell1";
        // console.log(typeof(d.cell1));
        return d.cell1;
      }

      // console.log("getcell", getcell());
      // var columnma
      var cellname = cell;
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


      // append the svg obgect to the body of the page
      // appends a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = d3.select(".lineDiv").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
      // console.log(x,y);
      // Get the data
      d3.csv("data/time_courses.csv", function(error, data1) {
        d3.csv("data/Filtered.brain.csv", function(error, data2) {
        if (error) throw error;


        // console.log("data",data);
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
        // y1.domain([-4, 15]);
        
        // Add the valueline path.

        var hoverdiv = d3.select("body").append("div")   
      .attr("class", "tooltip")               
      .style("opacity", .8)
      .style('visibility', 'hidden');

      function tooltip(d){
        var stringvalue;
        stringvalue = d.cell1;
        return stringvalue;
      }

        var line = svg.append("path")
            .data(data1)
            .attr("class", "line")
            .attr("d", valueline1(data1));

        var line2 = svg.append("path")
            .data(data1)
            // .attr("class", "line2")
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("d", valueline2(data2));



            // console.log("data is", data);

    //     var focus = svg.append("g")
    //     .attr("class", "focus")
    //     .style("display", "none");



    // focus.append("line")
    //     .attr("class", "x-hover-line hover-line")
    //     .attr("y1", 0)
    //     .attr("y2", height);

    // focus.append("line")
    //     .attr("class", "y-hover-line hover-line")
    //     .attr("x1", 0)
    //     .attr("x2", width);

    // focus.append("circle")
    //     .attr("r", 7.5)
    //     .attr("stroke", "white");

    // focus.append("text")
    //     .attr("x", 15)
    //     .attr("dy", ".10em")
    //     .attr("stroke", "white");

    //     svg.append("rect")
    //     .data(data1)
    //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    //     .attr("class", "overlay")
    //     .attr("width", width)
    //     .attr("height", height)
    //     //.on("mouseover", function() { focus.style("display", null); })
    //     .on("mouseout", function() { focus.style("display", "none"); })
    //     .on("mouseover", mouseover(data1));

    //     function mouseover(d){
    //       // focus.select("text").text(function(d) { return valueline(data); });
    //       console.log("hello");
    //       focus.select("text").text(function(d) { console.log("d[i] is " +d); });
    //       focus.select("x-hover-line").attr("y2", height - 100);
    //       focus.select("y-hover-line").attr("x2", width);
    //       // console.log(valueline);
    //     }
      //
        //axis labels
        svg.append("text")
      .attr("class", "axisRed")
      // .attr("text-anchor", "end")
      .attr("x", width - 320)
      .attr("y", height +28)
      .attr("stroke", "grey")
      .text("Frame #");

      svg.append("text")
    .attr("class", "axisRed")
    .attr("text-anchor", "end")
    .attr("y0", 6)
    .attr("dy", ".75em")
    .attr("stroke", "grey")
    .attr("transform", "rotate(-90)")
    .text("Original signal amplitude");

    svg.append("text")
    .attr("class", "axisRed")
    .attr("text-anchor", "end")
    .attr("x", width -10)
    .attr("y1", 0)
    .attr("dy", "0.75em")
    .attr("stroke", "white")
    .attr("transform", "rotate(-90)")
    .text("Derivative of original signal");


        // Add the X Axis
      
            svg.append("g")
          .attr("class","axisRed")
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
        });
      });
      }


  };

  return publiclyAvailable;


  };

// }