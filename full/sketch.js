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
 * foxes[]              Array that holds foxes
 * timeBetweenSpawns    minimum time between fox spawns
 * currentTime          timer used to determine next spawn
 */


let foxes=[]; //fox array, we can have many on the scren at the same time
let timeBetweenSpawns=0.7;
let currentTime=0;

/**
 * Preloads images before the program starts
 */
function preload(){
    //for preloading the images in the future
}

/**
 * Creates the canvas and the player character
 */
function setup() {
    createCanvas(1024, 450);
    //create new player object
    c = new Chicken();
}

/**
 * Three spawn methods that spawn differnt
 * numbers of foxes.
 * When more than one fox is spawned
 * there is a small gap between them
 */
function spawnFox(){
    foxes.push(new Fox());
}
function doubleSpawn(){
    foxes.push(new Fox());
    foxes.push(new Fox());
    foxes[foxes.length-1].x+=60;
}
function tripleSpawn(){
    foxes.push(new Fox());
    foxes.push(new Fox());
    foxes[foxes.length-1].x+=60;
    foxes.push(new Fox());
    foxes[foxes.length-1].x+=60*2;

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
}

/**
 * Draw function is called on every screen refresh
 * Four main action take place
 * 1) Spawn foxes
 * 2) update chicken position
 * 3) update fox position
 * 4) check for bounding box collisions
 * 
 * This includes a performance improvement too,
 * when a fox leaves the screen area, it is popped
 * from the array and cleaned up by the 
 * garbage collector
 */
function draw(){
    //draw white background every time
    background(255);

    //randomly spawn foxes after a set time (timeBetweenSpawns)
    if(currentTime<=0){

        if(random(1)<0.1){
            let val=random(1);
            if(val<0.3){
                doubleSpawn();
            }else if(val<0.5){
                tripleSpawn();
            } else{
                spawnFox();
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
    //update every fox in the foxes array
    for (let i = 0; i < foxes.length; i++) {
        foxes[i].move();
        foxes[i].show();
        if(c.hits(foxes[i])){
            hit=true;
            break;
        }

        /**performace issue fix */
        if(foxes[i].x<-16){
            count++;
        }

    }
    /**performance issue fix */
    //remove count number of foxes
    for (let i = 0; i < count; i++) {
        foxes.shift();
    }
    //when hit is true, print game over to the console
    //and stop the game loop.
    //The user must refresh the page to play again.
    if(hit==true){
        console.log("Game Over!");
        noLoop();
    }
}