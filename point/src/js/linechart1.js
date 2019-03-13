
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

      // parse the date / time
      // var parseTime = d3.timeParse("%d-%b-%y");

      // set the ranges
      // var x = d3.scaleTime().range([0, width]);
      // var y = d3.scaleLinear().range([height, 0]);

      var x = d3.scaleLinear()
              // .domain([1,6004])
              .range([0,width]);

      var y = d3.scaleLinear()
              // .domain([0, 14015])
              .range([height, 0]);



      function getcell(d, cell){
        // var cell = "cell1";
        // console.log(typeof(d.cell1));
        return d.cell1;
      }

      // console.log("getcell", getcell());
      // var columnma
      var cellname = cell;
      // define the line
      var valueline = d3.line()
          .x(function(d,i) { return x(i); })
          .y(function(d) { return y(d[cellname]); });


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
      d3.csv("data/time_courses.csv", function(error, data) {
        if (error) throw error;


        // console.log("data",data);
        // format the data
        data.forEach(function(d,i) {
            i = i;
            d.cell1 = +d.cell1;
            // console.log("i and d.cell1", i, d.cell1);
        });

        // // Scale the range of the data
        x.domain(d3.extent(data, function(d, i) { return i; }));
        y.domain([0, d3.max(data, function(d) { return d.cell1; })]);
        
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
            .data(data)
            .attr("class", "line")
            .attr("d", valueline(data));


            // .attr("stroke", "1px solid red");
        //     line.on("mouseover",function(d){  
        //       // console.log("d", d) ;
        //       d3.select(this).classed('active', true)
        //       hoverdiv.transition()      
        //   .duration(20)      
        //   .style("visibility", 'visible')
        //   hoverdiv.html(tooltip(d))
        //   .style("left", (d3.event.pageX) + 10 + "px")     
        //   .style("top", (d3.event.pageY) + 10 + "px");
        //   //  .style("left","50px")     
        //   // .style("top","50px");
        // })
        // .on("mouseout", function(d){
        //       d3.select(this).classed('active', false)
        //       hoverdiv.transition()      
        //   .duration(50)      
        //   .style("visibility", 'hidden');   
        //     });

        // Add the X Axis
        svg.append("g")
          .attr("class","axisRed")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));


        // // Add the Y Axis
        svg.append("g")
            .attr("class","axisRed")
            .call(d3.axisLeft(y));

            var mouseG = svg.append("g")
      .attr("class", "mouse-over-effects");

    mouseG.append("path") // this is the black vertical line to follow mouse
      .attr("class", "mouse-line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", "0");
      
    var lines = document.getElementsByClassName('line');

    var mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(data)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");

    mousePerLine.append("circle")
      .attr("r", 7)
      .style("stroke", function(d) {
        return color(d.name);
      })
      .style("fill", "none")
      .style("stroke-width", "1px")
      .style("opacity", "0");

    mousePerLine.append("text")
      .attr("transform", "translate(10,3)");

       

      });
      }


  };

  return publiclyAvailable;


  };

// }