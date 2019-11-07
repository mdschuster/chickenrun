/**
 * Egg class for dino run clone
 * Copyright (C) 2019 by Micah Schuster
 * 
 * This code is licensed under the GPL
 * 
 * The Egg class stores the data and
 * draws the graphics for the obsticals
 * in our dino run clone
 * 
 * PROPERTIES:
 * this.d       the diameter of the circle bounding box
 * this.size    The size of the sprite, should be a little bigger than the bounding box
 * this.x       x position of the center of the bounding box
 * this.y       y position of the center of the bounding box
 */

class Egg{
    //sets the initial values
    constructor(){
        this.d=40;                  //diameter of the circle
        this.size=60;               //size of sprite
        this.x=width+this.size;     //starting x position (location width)
        this.y=height-this.d/2-5;   //y position, height-the radius (down is positive y)
    }

    /**
     * moves the "egg" by 16 pixels per time step
     * in the x direction only
     */
    move(){
        this.x-=16; //move 16 pixels per tick (adjust as needed)
    }

    /**
     * displays the egg
     */
    show(){
        //display the bounding box of the egg
        /*
        fill(255,50);
        ellipseMode(CENTER);
        ellipse(this.x, this.y,this.d,this.d);
        */

        //display the image of the egg
        image(Eimage, this.x-this.size/2, this.y-this.size/2, this.size, this.size);
    }
}