/**
 * Main Script for the dino run clone
 * Copyright (C) 2019 by Micah Schuster
 * 
 * This code is licensed under the GPL
 * 
 * This script contains the setup
 * and draw functions to actually
 * play the game.
 * 
 * 
 * 
 * PROPERTIES:
 * eggs[]              Array that holds eggs
 * timeBetweenSpawns    minimum time between egg spawns
 * currentTime          timer used to determine next spawn
 * Cimage1              frame 1 of the chicken sprite
 * Cimage2              frame 2 of the chicken sprite
 * Eimage               egg image
 */

let eggs=[]; //egg array, we can have many on the scren at the same time
let timeBetweenSpawns=0.7;
let currentTime=0;
let Cimage1;
let Cimage2;
let Eimage;

/**
 * Preloads images before the program starts
 */
function preload(){
    //for preloading the images
    Cimage1=loadImage('graphics/chicken1.png')
    Cimage2=loadImage('graphics/chicken2.png')
    Eimage=loadImage('graphics/egg.png')

}

/**
 * Creates the canvas and the player character
 */
function setup() {
    createCanvas(1024, 450);
    //create new player object (global variable)
    c = new Chicken();
}

/**
 * Three spawn methods that spawn differnt
 * numbers of eggss.
 * 
 * These spawn functions and their uses
 * are not discussed in the workshop
 * presentation.
 * 
 * When more than one egg is spawned
 * there is a small gap between them
 */
function spawnEgg(){
    eggs.push(new Egg());
}
function doubleSpawn(){
    eggs.push(new Egg());
    eggs.push(new Egg());
    eggs[eggs.length-1].x+=60;
}
function tripleSpawn(){
    eggs.push(new Egg());
    eggs.push(new Egg());
    eggs[eggs.length-1].x+=60;
    eggs.push(new Egg());
    eggs[eggs.length-1].x+=60*2;

}

/**
 * keyPressed method checks for keyboard
 * input.
 * When space is pressed, the player character jumps
 */
function keyPressed() {
    //space to jump
    if (key == ' ') {
        c.jump();
    }
    return false;
}

/**
 * Draw function is called on every screen refresh
 * Four main action take place
 * 1) Spawn eggs
 * 2) update chicken position
 * 3) update egg position
 * 4) check for bounding box collisions
 * 
 * This includes a performance improvement too,
 * when a egg leaves the screen area, it is shifted
 * from the array and cleaned up by the 
 * garbage collector
 */
function draw(){
    //draw white background every time
    background(255);

    //draw line for ground
    strokeWeight(2);
    line(0,height,width,height);

    //randomly spawn egg after a set time (timeBetweenSpawns)
    if(currentTime<=0){

        if(random(1)<0.1){
            let val=random(1);
            if(val<0.3){
                doubleSpawn();
            }else if(val<0.5){
                tripleSpawn();
            } else{
                spawnEgg();
            }
            currentTime=timeBetweenSpawns;
        }
    } else {
        currentTime-=deltaTime/1000.0;
    }

    //update chicken
    c.move();
    c.show();


    let count=0;
    let hit=false;
    //update every egg in the eggs array
    for (let i = 0; i < eggs.length; i++) {
        eggs[i].move();
        eggs[i].show();
        if(c.hits(eggs[i])){
            hit=true;
        }

        /**performace issue fix */
        if(eggs[i].x < -16){
            count++;
        }

    }
    /*performance issue fix */
    //remove count number of eggs
    for (let i = 0; i < count; i++) {
        eggs.shift();
    }
    //when hit is true, print game over to the console
    //and stop the game loop.
    //The user must refresh the page to play again.
    if(hit==true){
        console.log("Game Over!");
        noLoop();
    }
}