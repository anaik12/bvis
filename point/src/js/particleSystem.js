"use strict";

/* Get or create the application global variable */
var App = App || {};

var ParticleSystem = function() {

    // setup the pointer to the scope 'this' variable
    var self = this;

    // data container
    var data = [];



    // scene graph group for the particle system
    var sceneObject = new THREE.Group();

    // bounds of the data
    var bounds = {};

    var pi = 3.147;
    var cylinder;

    // create the containment box.
    // This cylinder is only to guide development.
    // TODO: Remove after the data has been rendered
    self.drawContainment = function() {

        // get the radius and height based on the data bounds
        // var radius = (bounds.maxX - bounds.minX)/2.0 + 2;
        var radius = (bounds.maxX - bounds.minX)/2; // /2.0;
        var height = (bounds.maxY - bounds.minY)/5;
        // console.log("in containment" + selected);

        // create a cylinder to contain the particle system
        //var geometry = new THREE.CylinderBufferGeometry( radius, radius, height, 32 );
        // var geometry = new THREE.CylinderGeometry( radius, radius, height, 32 );
        var geometry = new THREE.BufferGeometry( radius, radius, height);
        // var material = new THREE.MeshNormalMaterial( {color: 0xffff00, wireframe: true} );
        // var cylinder = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );

        // var geometry = new THREE.BufferGeometry();

        var positions = [];
        var colors = [];
        // console.log("in containment "+ radius + "" + height);

        // var boundingBox = new THREE.Box3();

        var color = new THREE.Color();
        var n = 1000, n2 = n / 2;
        var material = [];      

        var totalcount = 0;
        var zero = 0;
            var one = 0;
            var two = 0;
            var three = 0;
            var four = 0;

        // var filtered_intensity_range =   rangeslider.range(0,10);
        var ftr_begin = 0;
        var ftr_end = 68;

        var ftr = [ftr_begin, ftr_end];


        var rangeslider = createD3RangeSlider(0, 68, "#slider-container", true);  
        rangeslider.range(0,1);

        rangeslider.onChange(function(newRange){
            d3.select("#range-label").text(newRange.begin + " - " + newRange.end);
            ftr = [newRange.begin, newRange.end];
            reset(radius,height,red,green,blue,white,cyan,all,selected, scell, ecell, ftr);
        });


        var selected = "filtered";
  
        var buttonred = document.getElementById("red");
            var buttongreen = document.getElementById("green");
            var buttonblue = document.getElementById("blue");
            var buttonwhite = document.getElementById("white");
            var buttoncyan = document.getElementById("cyan");
            var buttonall = document.getElementById("all");
            var buttondeleteall = document.getElementById("deleteall");
            // var top5 = document.getElementById("top5");

            var rednumber = document.getElementById("rednumber");
            var greennumber = document.getElementById("greennumber");
            var bluenumber = document.getElementById("bluenumber");
            var whitenumber = document.getElementById("whitenumber");
            var cyannumber = document.getElementById("cyannumber");
            var allnumber = document.getElementById("allnumber");
            

            var red = true;
            var green = true;
            var blue = true;
            var white = true;
            var cyan = true;
            var all = true;

            // reset(radius,height,red,green,blue,all);

            var scell = 0;
            var ecell = 6000;

            var buttonshow = document.getElementById("show");

            buttonshow.onclick = function(){
              scell = document.getElementById("scell").value;
              ecell = document.getElementById("ecell").value;
              reset(radius,height,red,green,blue,white,cyan,all,selected, scell, ecell, ftr, top5);
            }

            d3.select("select")
           .on("change",function(d){
            selected = d3.select("#d3-dropdown").node().value;
            // console.log( selected );
            d3.select("#selected-dropdown").text(selected);
            // console.log("data is", data);
            var d3canvas = new d3Canvas();
            reset(radius,height,red,green,blue,white,cyan,all,selected, scell, ecell, ftr, top5);
            d3canvas.changeSelected(data,selected, top5);

            
            })


           var top5 = false;
           var top5button = document.getElementById("top5");
            top5button.onclick =function(){
              top5 = !top5;
              reset(radius,height,red,green,blue,white,cyan,all,selected, scell, ecell, ftr, top5);
              if(top5) top5button.value = "0-4";
              else top5button.value = "Top 5";
              var d3canvas = new d3Canvas();
            d3canvas.changeSelected(data,selected, top5);
            }


            buttonred.onclick= function (){
                // sceneObject.remove(cylinder); 
                // sceneObject.remove(plane);
                deleteall();
                red = true;
                green =false;
                blue = false;
                white = false;
                cyan = false;
                all = false;
                // reset(radius,height,red,green,blue,all,selected);
                reset(radius,height,red,green,blue,white,cyan,all,selected, scell, ecell, ftr, top5);

            }

            buttongreen.onclick= function (){
                // sceneObject.remove(cylinder); 
                // sceneObject.remove(plane);
                deleteall();
                red = false;
                green = true;
                blue = false;
                white = false;
                cyan = false;
                all = false;
                reset(radius,height,red,green,blue,white,cyan,all,selected, scell, ecell, ftr, top5);
            }

            buttonblue.onclick= function (){
                // sceneObject.remove(cylinder); 
                // sceneObject.remove(plane);
                totalcount = zero = one = two = three = four = 0;
                deleteall();
                red = false;
                green = false;
                blue = true;
                white = false;
                cyan = false;
                all = false;
                reset(radius,height,red,green,blue,white,cyan,all,selected, scell, ecell, ftr, top5);
            }

            buttonwhite.onclick= function (){
                // sceneObject.remove(cylinder); 
                // sceneObject.remove(plane);
                deleteall();
                red = false;
                green = false;
                blue = false;
                white = true;
                cyan = false;
                all = false;
                reset(radius,height,red,green,blue,white,cyan,all,selected, scell, ecell, ftr, top5);
            }

            buttoncyan.onclick= function (){
                // sceneObject.remove(cylinder); 
                // sceneObject.remove(plane);
                deleteall();
                red = false;
                green = false;
                blue = false;
                white = false;
                cyan = true;
                all = false;
                reset(radius,height,red,green,blue,white,cyan,all,selected, scell, ecell, top5);
            }

             buttonall.onclick= function (){
                // sceneObject.remove(cylinder); 
                // sceneObject.remove(plane);
                deleteall();
                red = true;
                green = true;
                blue = true;
                white = true;
                cyan = true;
                all = true;
                totalcount = zero = one = two = three = four = 0;
                reset(radius,height,red,green,blue,white,cyan,all,selected, scell, ecell, ftr, top5);

            }

            buttondeleteall.onclick =function(){
              totalcount = zero = one = two = three = four = 0;
              deleteall();
            }

        console.log("0=" +zero + " 1=" + one + " 2= " + two + " 3= "  + three + " 4=" + four);

        var textureLoader = new THREE.TextureLoader();

        var sprite = textureLoader.load( 'data/disc.png');
    // var sprite = textureLoader.load( 'data/snowflake1.png' );

        

        cylinder = new THREE.Points(geometry, material);

        var geometry2 = new THREE.BoxGeometry( radius * 1.9, radius * 1.5, radius * 5);

      	var color = new THREE.Color("rgb(100,100,0)");
      	var material = new THREE.MeshPhongMaterial( {color: 0x0000ff, transparent:true, opacity: 0.2});

      	var cube = new THREE.Mesh( geometry2, material );
      	var edges = new THREE.EdgesGeometry( geometry2 );
      	// var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x4F34B8, opacity: 1.0} ) );
      	// var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x00FFFF, opacity: 1.0} ) );
        var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x339BFF, opacity: 1.0} ) );
      	sceneObject.add( line );
          // sceneObject.add(cube);
         
        var slider = document.getElementById("slider");
        // console.log(slider);
        slider.addEventListener("input", movePlane);

        // var d3canvas = new d3Canvas();
        var play = false;
        var playbutton = document.getElementById("play");
        playbutton.onclick =function(){
              play = !play;
             
                // var playincrement = 0;
                // plane.position.z = 25;
                var refreshId = setInterval(function(){

                  if(play){
                    if(plane.position.z <= -25) plane.position.z = 25;
                    playbutton.value = "Pause";
                    // playincrement += 0.01;
                    plane.position.z -= 0.01;
                    var d3canvas = new d3Canvas();
                    d3canvas.clearCanvas(data, selected, (parseFloat(plane.position.z)).toFixed(2), top5);  
                  }
                  else {
                    clearInterval(refreshId);
                    playbutton.value = "Play";
                    // console.log("hello");
                  } 
                }, 3000);
              // }
              
        }


        function movePlane(e){
          var target = (e.target) ? e.target : e.srcElement;
          // console.log("target value ", target.value);
          plane.position.z = target.value;
          var d3canvas = new d3Canvas();
          d3canvas.clearCanvas(data, selected, (parseFloat(plane.position.z)).toFixed(2), top5);    
        } 

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

      console.log(top5array[0][2]);

   

    function deleteall(){
        sceneObject.remove(cylinder); 
        sceneObject.remove(plane);
    }

    function reset(radius,height,red,green,blue,white,cyan,all,selected, scell, ecell, ftr, top5){
        // console.log(selected);
        // console.log("filetered");
        // console.log(ecell);
        var first = 0;
        var second = 1;
        var third = 2;
        var fourth = 3;
        var fifth = 4;

        if(top5==true){

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

        console.log(first, second, third, fourth, fifth);
        sceneObject.remove(cylinder); 
        sceneObject.remove(plane);
        positions = [];
        colors = [];
        var color = new THREE.Color();
        zero = one = two = three = four = 0;
        var n = 1000, n2 = n / 2;
        // cylinder = new THREE.Points(geometry, material);
        var material = [];    
        var geometry = new THREE.BufferGeometry( radius, radius, radius);
        // geometry.position.set(0, 0, 0);
        // console.log("inreset selected is ");
        var count = 0;
        var cellstartnumber = scell*139;
        var cellendnumber = ecell*139;
        var xadjust = 12;
        var yadjust = 5;
        var zadjust = 0;
        // var textureLoader = new THREE.TextureLoader();
        // var sprite = textureLoader.load( 'data/disc.png');
        // for(var i = 0; i< data.length; i++) {
          for(var i = cellstartnumber; i< cellendnumber; i++) {
            
            if(selected == 'intensity'){
            //for raw intensities

  	      		   var color_cz = d3.scaleLinear()
  	              .domain([4715, 14015])
  	              .range([0.0, 1.0]);
                  // console.log("yesso");
                  // console.log("hello" + data[i]);

  	             var cz = color_cz(data[i][selected]);
  	             // color.setHSL( cz, cz, cz );
                 color.setRGB( cz, cz, cz );
  	             colors.push( cz, cz, cz);
                 var x = (data[i].X - xadjust) ;//* height + 2 * pi * radius * radius  ;
                 var y = (data[i].Y - zadjust);
                 var z = (data[i].Z - height/2 - yadjust);//*Math.PI)/radius ;//* height + 2 * pi * radius * radius  ;
                 positions.push( x, z, -y );
            }
            else if(selected == 'filtered' ){
                // console.log("infiltered");  
        	   //for filtered intensities
  	        	  var color_cz = d3.scaleLinear()
  	              .domain([-5, 68])
  	              .range([0.0, 1.0]);

  	            var cz_val = color_cz(data[i][selected]) * 10;

  	            if(data[i][selected]  < ftr[0] || data[i][selected] > ftr[1]){
  	            	cz = null;
                  // cz = 0.0;
  	            }
  	            else{

  	            	cz = cz_val;
  	            }
                color.setRGB( cz, cz, cz );
  	            colors.push( cz, cz, cz);
                var x = (data[i].X - xadjust) ;//* height + 2 * pi * radius * radius  ;
                var y = (data[i].Y - zadjust);
                var z = (data[i].Z - height/2 - yadjust);//*Math.PI)/radius ;//* height + 2 * pi * radius * radius  ;
                if(cz != null){
                  positions.push( x, z, -y );
                }
                // positions.push( x, z, y );
        	 }
        	 else {

        		// console.log("comm0");
    
	            // var colorvalues = [{r:1.0, g:0.0, b:0.0},{r:0.0, g:1.0, b:0.0},{r:0.0, g:0.0, b:1.0}, {r:1.0, g:1.0, b:1.0}, {r:0.0, g:1.0, b:1.0}];
	            // var colorvalues = [{r:0.7, g:0.0, b:0.0},{r:0.0, g:0.7, b:0.0},{r:0.0, g:0.0, b:0.7}, {r:0.8, g:0.8, b:0.8}, {r:0.0, g:0.8, b:0.8}];
              var colorvalues = [{r:0.4, g:0.760, b:0.647},{r:0.988, g:0.552, b:0.384},{r:0.552, g:0.627, b:0.796},{r:0.886, g:0.431, b:0.666},{r:0.650, g:0.847, b:0.329}];

	            if(data[i][selected] == first && (red == true || all==true)){
	            // if(data[i].concentration > 8000 && data[i].concentration <= 9000 && (red == true|| all==true)){
	            // console.log(typeof(data[i].concentration));
	            // console.log(typeof(7000));
	            var cx = colorvalues[0].r;
	            var cy = colorvalues[0].g;
	            var cz = colorvalues[0].b;
	            zero = zero + 1;

	            }
	            else if(data[i][selected] == second && (green == true || all==true)){
	             // if(data[i].concentration > 9000 && data[i].concentration <= 10000 && (green == true|| all==true)){   
	            var cx = colorvalues[1].r;
	            var cy = colorvalues[1].g;
	            var cz = colorvalues[1].b;
	            one = one + 1;

              // sprite = textureLoader.load( 'data/disc.png');
	            }
	            else if(data[i][selected] == third && (blue == true || all==true)){
	            // if(data[i].concentration > 10000 && data[i].concentration <= 11000 && (blue == true|| all==true)){
	            var cx = colorvalues[2].r;
	            var cy = colorvalues[2].g;
	            var cz = colorvalues[2].b;
	            two = two + 1;
              // sprite = textureLoader.load( 'data/disc.png');
	            }
	            else if(data[i][selected] == fourth && (white == true || all==true)){
	            // if(data[i].concentration > 11000 && data[i].concentration <= 12000){
	            var cx = colorvalues[3].r;
	            var cy = colorvalues[3].g;
	            var cz = colorvalues[3].b;
	            three = three + 1;
              // sprite = textureLoader.load( 'data/disc.png');
	            }
	            else if(data[i][selected] == fifth &&(cyan == true || all==true)){
	            // if(data[i].concentration > 12000 && data[i].concentration <= 15000){
	            var cx = colorvalues[4].r;
	            var cy = colorvalues[4].g;
	            var cz = colorvalues[4].b;
              // var cx = 1.0;
              // var cy = 1.0;
              // var cz = 1.0;
	            four = four + 1;
              // var sprite = textureLoader.load( 'data/disc.png');
	            }
	            else if(data[i][selected] <=36){
	                var cx = null;
	                var cy = null;
	                var cz = null;
                  // sprite = null;
	            }
	            
	            
              var x = (data[i].X - xadjust) ;//* height + 2 * pi * radius * radius  ;
              var y = (data[i].Y - zadjust);
              var z = (data[i].Z - height/2 - yadjust);//*Math.PI)/radius ;//* height + 2 * pi * radius * radius  ;
              if(cz != null){
                color.setRGB( cx, cy, cz );
              // color.setHSL( cx, cy, cz );
              colors.push( color.r, color.g, color.b );
                positions.push( x, z, -y );
              }
           }
      		// var x = (data[i].X - 11) ;//* height + 2 * pi * radius * radius  ;
        //   var y = (data[i].Y - 1.5);
        //   var z = (data[i].Z - height/2 - 3);//*Math.PI)/radius ;//* height + 2 * pi * radius * radius  ;
        //   positions.push( x, z, y );

        }

        // console.log("Total points " + count);

        totalcount = zero + one + two + three + four; 
	        // console.log("TC = " + totalcount);
	      rednumber.innerHTML = zero;
	      greennumber.innerHTML = one;
	      bluenumber.innerHTML = two;
	      whitenumber.innerHTML = three;
	      cyannumber.innerHTML = four;
	      allnumber.innerHTML = totalcount;

        // console.log(document.getElementById("allnumber").innerHTML);
	       geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
	       geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
	    // geometry.computeBoundingSphere();

	        // material= new THREE.PointsMaterial({size:0.0005, color:"red", opacity:0.3});
  	     var textureLoader = new THREE.TextureLoader();

  	     var sprite = textureLoader.load( 'data/disc.png');
    // var sprite = textureLoader.load( 'data/snowflake1.png' );

        // map:sprite, vertexColors: THREE.VertexColors,
   		   material = new THREE.PointsMaterial({ size:0.35, map:sprite, vertexColors: THREE.VertexColors, opacity:1.0});//, opacity:0.5});
    
    // var sprite = new THREE.TextureLoader().load( 'data/disc.png' );
          cylinder = new THREE.Points(geometry, material);

          sceneObject.add(cylinder);
          //starting plane position at 0 depth (not z=0) for autoplay
          plane.position.z = 25;
          sceneObject.add(plane);
          console.log("plane pos :", plane.position);

    }

    var planeG = new THREE.PlaneGeometry(24, 20);
	  var imgMaterial = new THREE.MeshBasicMaterial({ //CHANGED to MeshBasicMaterial
	  map: new THREE.TextureLoader().load('https://anaik12.github.io/bvis/point/brainImg.png'), side: THREE.DoubleSide});
	  var plane = new THREE.Mesh(planeG, imgMaterial);
	// plane.overdraw = true;
	// sceneObject.add(plane);


     

    function updatecylinder(radius, height, zvalue){
        positions = [];
        colors = [];
        var color = new THREE.Color();
        var n = 1000, n2 = n / 2;
        var material = [];    
        var geometry = new THREE.BufferGeometry( radius, radius, height, 32 );
        console.log(parseFloat(zvalue));
        var zvalueleft = parseFloat(zvalue) + 1.3;
        var zvalueright = parseFloat(zvalue) + 1.7;
        // console.log(zvalue, zvalueleft, zvalueright);
        // console.log(data);
        for(var i = 0; i< data.length; i++) {

            var x = (data[i].X - 11) ;//* height + 2 * pi * radius * radius  ;
            var y = (data[i].Y - 1.5);///radius ;//* height + 2 * pi * radius * radius  ;
            var z = (data[i].Z - height/2 - 3);//*Math.PI)/radius ;//* height + 2 * pi * radius * radius  ;
            // positions.push( x, z, y );
        //             // colors
            var colormax = 357.19;
            var colormin = 0;
            // if(data[i].Y > zvalueleft  && data[i].Y < zvalueright){
            // var colorvalues = [{r:1.0, g:0.0, b:0.0},{r:0.0, g:1.0, b:0.0},{r:0.0, g:0.0, b:1.0}, {r:1.0, g:1.0, b:1.0}, {r:0.0, g:1.0, b:1.0}];
            var colorvalues = [{r:0.8, g:0.0, b:0.0},{r:0.0, g:0.8, b:0.0},{r:0.0, g:0.0, b:0.8}, {r:0.9, g:0.2, b:0.5}, {r:0.0, g:0.8, b:0.8}];
            
            if(data[i].concentration == 0 && (red == true|| all==true)){
            var cx = colorvalues[0].r;
            var cy = colorvalues[0].g;
            var cz = colorvalues[0].b;
            zero = zero + 1;
            }
            else
             if(data[i].concentration == 1 && (green == true|| all==true)){
            // if(data[i].concentration > 9000 && data[i].concentration <= 10000 && (green == true|| all==true)){
            var cx = colorvalues[1].r;
            var cy = colorvalues[1].g;
            var cz = colorvalues[1].b;
            one = one + 1;
            }
            else 
            if(data[i].concentration == 2 && (blue == true|| all==true)){
            // if(data[i].concentration > 10000 && data[i].concentration <= 11000 && (blue == true|| all==true)){
            var cx = colorvalues[2].r;
            var cy = colorvalues[2].g;
            var cz = colorvalues[2].b;
            two = two + 1;
            }
            else 
            if(data[i].concentration == 3 && (white == true|| all==true)){
            // if(data[i].concentration > 11000 && data[i].concentration <= 12000){
            var cx = colorvalues[3].r;
            var cy = colorvalues[3].g;
            var cz = colorvalues[3].b;
            three = three + 1;
            }
            else 
            if(data[i].concentration == 4 && (cyan == true|| all==true)){
            // if(data[i].concentration > 12000 && data[i].concentration <= 15000){
                var cx = colorvalues[4].r;
                var cy = colorvalues[4].g;
                var cz = colorvalues[4].b;

                four = four + 1;
               }
                else{
                    var cx = null;
                    var cy = null;
                    var cz = null;
                }
             positions.push( x, z, y );  
            
            color.setRGB( cx, cy, cz );
            colors.push( color.r, color.g, color.b );

            

        }
    geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
    geometry.addAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );
    geometry.computeBoundingSphere();

        // material= new THREE.PointsMaterial({size:0.0005, color:"red", opacity:0.3});
        
    var textureLoader = new THREE.TextureLoader();

    var sprite = textureLoader.load( 'data/disc.png');
    // var sprite = textureLoader.load( 'data/snowflake1.png' );

       
    material = new THREE.PointsMaterial({ size:0.35, map:sprite, vertexColors: THREE.VertexColors, transparent:true, opacity:0.5});//, opacity:0.3});
    
    cylinder = new THREE.Points(geometry, material);

    }


    };

    // creates the particle system
    // self.createParticleSystem = function() {
    self.removeParticleSystem = function() {
        
    	if(sceneObject.children.length > 0){
	    	for( var i = scene.children.length - 1; i >= 0; i--) { 
	    		var obj = scene.children[i];
	     		sceneObject.remove(obj);
	    	}	
	    }
    
    };

    // data loading function
    self.loadData = function(file,selected){

        

        // read the csv file
        d3.csv(file)
        // iterate over the rows of the csv file
            .row(function(d) {
                // console.log(typeof(d.comm0));
                // get the min bounds
                bounds.minX = Math.min(bounds.minX || Infinity, d.Points0);
                bounds.minY = Math.min(bounds.minY || Infinity, d.Points1);
                bounds.minZ = Math.min(bounds.minZ || Infinity, d.Points2 - 1);

                // get the max bounds
                bounds.maxX = Math.max(bounds.maxX || -Infinity, d.Points0);
                bounds.maxY = Math.max(bounds.maxY || -Infinity, d.Points1);
                bounds.maxZ = Math.max(bounds.maxY || -Infinity, d.Points2 + 1);

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

                    // Position
                    X: Number(d.Points0),
                    Y: Number(d.Points1),
                    Z: Number(d.Points2),

                    //timeframe
                    timeframe: Number(d.timeframe),
                    // Velocity
                    U: Number(d.velocity0),
                    V: Number(d.velocity1),
                    W: Number(d.velocity2)
                });
				// console.log(data);
            })
            // when done loading
            .get(function(error, rows, data) {
				// console.log("d is in part", rows.values );
                // draw the containment cylinder
                // TODO: Remove after the data has been rendered
                // console.log(data);
                self.drawContainment(selected);

                // create the particle system
                // self.createParticleSystem();
            });
            // console.log(data);
    };
	
    // publicly available functions
    var publiclyAvailable = {

        // load the data and setup the system
        // initialize: function(file,selected){
          initialize: function(file){
            // var comm = "comm0";
            self.removeParticleSystem();
            self.loadData(file);
        },

        // accessor for the particle system
        getParticleSystems : function() {
            return sceneObject;
        },

        removeParticleSystems : function() {
            if(sceneObject){
              return sceneObject;
            }
        }
    };
	
	// console.log("final",self.data);

    return publiclyAvailable;

};