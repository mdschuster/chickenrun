/**
 * Chicken class for dino run clone
 * Copyright (C) 2019 by Micah Schuster
 * 
 * This code is licensed under the GPL
 * 
 * The Chicken class stores the data and
 * draws the graphics for the chicken in
 * our dino run clone.
 * 
 * 
 * 
 * PROPERTIES:
 * this.d       the diameter of the circle bounding box
 * this.x       x position of the center of the bounding box
 * this.y       y position of the center of the bounding box
 * this.vy      velocity in the y direction
 * this.gravity constant value for gravity
 */


class Chicken{
    constructor(){
        this.d = 100;                   //diameter of bounding box circle
        this.x = 50 + this.d/2;         //x position, 50 pix+the radius from the edge
        this.y = height - this.d/2;     //y position, bottom (height)-the radius
        this.vy = 0;                    //y velocity
        this.gravity = 3;               //gravity acceleration
    }

    /**
     * Adds large value to the y velocity (this.vy)
     * so that the chicken will jump.
     * 
     * The chicken will not jump if it is not
     * currently on the ground.
     */
    jump() {
        //if the y position is on the "ground"; you can't repeatedly jump!
        if (this.y == height - this.d/2) {
            //add to y velocity
            this.vy = -35;
        }
    }

    /**
     * moves the chicken based on y velocity.
     * The chicken is stationary in the x direction.
     */
    move() {
        //update y position based on y velocity
        this.y += this.vy;
        //update y velocity based on gravity
        this.vy += this.gravity;
        //ensure that we don't fall through the ground
        this.y = constrain(this.y, 0, height - this.d/2);
    }

    /**
     * displays the chicken
     * FIXME: use an actual image rather than the bounding box
     */
    show() {
        //image(uImg, this.x, this.y, this.r, this.r);
        
        fill(255, 50);
        ellipseMode(CENTER);
        ellipse(this.x, this.y, this.d, this.d);  
    }

    
    /**
     * Tests if the input's bounding box
     * intersects with the chicken's bounding box
     * 
     * @param {Fox} fox object to test
     */
    hits(fox){
        //compute distance between center of chicken and fox.
        let distance=dist(this.x,this.y,fox.x,fox.y);

        //if the distance is less than the sum of the radii, there is a collision
        if(distance<(this.d+fox.d)*0.5){
            return true;
        } else {
            return false;
        }
    }



}