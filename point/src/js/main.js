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
		
		 
         var cellarray=[];
         cellarray.push("none");
         var linechart1 = new lineChart1();
        linechart1.renderlinechart(cellarray, 0);
         
        
        // create a new scene
        App.scene = new Scene({container:"scene"});

        // initialize the particle system

        var particleSystem = new ParticleSystem();
        particleSystem.initialize('data/014_new.csv');
        // particleSystem.initialize('data/test3_4.csv', selected);

        // var d3canvas = new d3Canvas();
        // d3canvas.initialize('data/014_new.csv','-24.20', "proc_100_cor7");

        //removeParticleSystems the particle system to the scene
        App.scene.addObject( particleSystem.removeParticleSystems());
        //add the particle system to the scene
           // App.scene.removeObject( particleSystem.getParticleSystems());

            // render the scene


           
           App.scene.render();
        


       //  //add the particle system to the scene
       // App.scene.addObject( particleSystem.getParticleSystems());

       //  // render the scene
       
       // App.scene.render();
	   
	   

       

    };

}) ();