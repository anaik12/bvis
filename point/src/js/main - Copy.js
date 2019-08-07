"use strict";

/* Get or create the application global variable */
var App = App || {};

/* IIFE to initialize the main entry of the application*/
(function() {

    // setup the pointer to the scope 'this' variable
    var self = this;

    /* Entry point of the application */
    App.start = function()
    {
		
		 var linechart1 = new lineChart1();
        linechart1.render("cell1");
         
        
        // create a new scene
        App.scene = new Scene({container:"scene"});

        // initialize the particle system
        // var selected;
        d3.select("select")
        .on("change",function(d){
        var selected = d3.select("#d3-dropdown").node().value;
        console.log( selected );
        d3.select("#selected-dropdown").text(selected);
        var particleSystem = new ParticleSystem();
        particleSystem.initialize('data/014_new.csv', selected);

        //removeParticleSystems the particle system to the scene
        App.scene.addObject( particleSystem.removeParticleSystems());
        //add the particle system to the scene
           // App.scene.removeObject( particleSystem.getParticleSystems());

            // render the scene
           
           App.scene.render();
        })
        // var particleSystem = new ParticleSystem();
        // particleSystem.initialize('data/014_new.csv', selected);
       // particleSystem.initialize('data/014_new.csv', "filtered");


       //  //add the particle system to the scene
       // App.scene.addObject( particleSystem.getParticleSystems());

       //  // render the scene
       
       // App.scene.render();
	   
	   var d3canvas = new d3Canvas();
        d3canvas.render("-3.2");

       

    };

}) ();