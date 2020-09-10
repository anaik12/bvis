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

        App.scene.addObject( particleSystem.removeParticleSystems());
           
        App.scene.render();
        
        const start = document.getElementById("start");
        const stop = document.getElementById("stop");
        const video = document.querySelector("video");
        let recorder, stream;

        async function startRecording() {
        stream = await navigator.mediaDevices.getDisplayMedia({
            video: { mediaSource: "screen" }
        });
        recorder = new MediaRecorder(stream);

        const chunks = [];
        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.onstop = e => {
            const completeBlob = new Blob(chunks, { type: chunks[0].type });
            video.src = URL.createObjectURL(completeBlob);
        };

        recorder.start();
        }

        start.addEventListener("click", () => {
        start.setAttribute("disabled", true);
        stop.removeAttribute("disabled");

        startRecording();
        });

        stop.addEventListener("click", () => {
        stop.setAttribute("disabled", true);
        start.removeAttribute("disabled");

        recorder.stop();
        stream.getVideoTracks()[0].stop();
        });

       

    };

}) ();