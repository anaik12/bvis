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
        particleSystem.initialize('data/main_invitro.csv');

        App.scene.addObject( particleSystem.removeParticleSystems());
           
        App.scene.render();
        

       

    };

}) ();