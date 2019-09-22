/**
 * Fox class for dino run clone
 * Copyright (C) 2019 by Micah Schuster
 * 
 * This code is licensed under the GPL
 * 
 * The Fox class stores the data and
 * draws the graphics for the obsticals
 * in our dino run clone
 * 
 * PROPERTIES:
 * this.d   the diameter of the circle bounding box
 * this.x   x position of the center of the bounding box
 * this.y   y position of the center of the bounding box
 */

class Fox{
    //sets the initial values
    constructor(){
        this.d=50;                  //diameter of the circle
        this.x=width+this.d;        //starting x position (location width)
        this.y=height-this.d/2;     //y position, height-the radius (down is positive y)
    }

    /**
     * moves the "fox" by 16 pixels per time step
     * in the x direction only
     */
    move(){
        this.x-=16; //move 16 pixels per tick (might be too fast)
    }

    /**
     * displays the fox
     * FIXME: use an actual image rather than the bounding box
     */
    show(){
        //display the "Fox" as a circle for now
        fill(255,50);
        ellipseMode(CENTER);
        ellipse(this.x, this.y,this.d,this.d);
    }
}