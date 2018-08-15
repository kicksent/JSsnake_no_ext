/*
Brain-
24 input neurons:
    distance in all directions to itself, wall, food
hidden neurons:

4 output neurons:
    right, left, up, down
diagonal cases:
    using dist() gives 10*sqrt(2) for each diagonal distance, 
    this means that 4 diagonally is 40sqrt(2)=56, but i want 
    these numbers to be small, so I calculate ONLY the x->vector distance and divide by 10

*/



function Inputs() {


    this.wall = function(snake) {
        var left = 1/(dist(snake.x, snake.y, 0, snake.y)/10);
        var right = 1/(dist(snake.x, snake.y, window_dim, snake.y)/10);
        var up = 1/(dist(snake.x, snake.y, snake.x, 0)/10);
        var down = 1/(dist(snake.x, snake.y, snake.x, window_dim)/10);
        // true distances
        //var left_down = dist(snake.x, snake.y, 0, window_dim);
        //var right_down = dist(snake.x, snake.y, window_dim, window_dim);
        //var left_up = dist(snake.x, snake.y, 0, 0);
        //var right_up = dist(snake.x, snake.y, 600, 0);
        //modified distances
        var left_down = 1/((dist(snake.x, snake.y, 0, snake.y)/10));
        var right_down = 1/((dist(snake.x, snake.y, window_dim, snake.y)/10));
        var left_up = 1/((dist(snake.x, snake.y, 0, snake.y)/10));
        var right_up = 1/((dist(snake.x, snake.y, window_dim, snake.y)/10));

        
        return([left, right, up, down, left_down, right_down, left_up, right_up])
    }
    this.food = function(snake, food) {
        
        var left=0;
        var right=0;
        var up = 0;
        var down = 0;
        var left_up = 0;
        var left_down = 0;
        var right_up = 0;
        var right_down = 0;
        if(snake.y === food.y){ 
            if(snake.x - food.x > 0){
                left = 1/dist(snake.x, snake.y, food.x, food.y);
                //left = 1;
            } else {
                right = 1/dist(snake.x, snake.y, food.x, food.y);
                //right = 1;
            }
        }
        else if(snake.x === food.x){
            if(snake.y - food.y > 0){
                up = 1/dist(snake.x, snake.y, food.x, food.y);
                //up = 1;
            }else {
                down = 1/dist(snake.x, snake.y, food.x, food.y);
                //down = 1;
            }
        }
        //check if diagonal
        else if( round(snake.x - food.x)  ===  round(snake.y - food.y) ){
            if(snake.x - food.x > 0){
                //console.log("food left_up");
                left_up = 1/dist(snake.x, snake.y, food.x, food.y);
                //left_up = 1;
            } else if (snake.x - food.x < 0) {
                //console.log("food right_down");
                right_down = 1/dist(snake.x, snake.y, food.x, food.y);
                //right_down = 1;
            }
            
        }
        //check if diagonal
        else if( -1 * round(snake.x - food.x)  ===  round(snake.y - food.y) ){
            if(snake.x - food.x < 0){
                //console.log("food right up");
                right_up = 1/dist(snake.x, snake.y, food.x, food.y);
                //right_up = 1;
            } else if (snake.x - food.x > 0) {
                //console.log("food left down");
                left_down = 1/dist(snake.x, snake.y, food.x, food.y);
                //left_down = 1;
            }
        }
        //console.log(left, right, up, down, left_down, right_down, left_up, right_up)
        return([left, right, up, down, left_down, right_down, left_up, right_up])
    }
    this.body = function(snake) {
        //console.log("body called");
        var left=0;
        var right=0;
        var up = 0;
        var down = 0;
        var left_up = 0;
        var left_down = 0;
        var right_up = 0;
        var right_down = 0;
        for(var i = 0; i < snake.tail.length; i++){
            if(snake.y === snake.tail[i].y){
                if(snake.x - snake.tail[i].x > 0){
                    //console.log("tail left");
                    //left = 1/dist(snake.x, snake.y, snake.tail[i].x, snake.tail[i].y);
                    left = 1/(dist(snake.x, snake.y, snake.tail[i].x, snake.tail[i].y)/10);
                    
                } 
                if(snake.x - snake.tail[i].x < 0) {
                    //console.log("tail right");
                    //right = 1/dist(snake.x, snake.y, snake.tail[i].x, snake.tail[i].y);
                    right = 1/(dist(snake.x, snake.y, snake.tail[i].x, snake.tail[i].y)/10);
                }
            }
            if(snake.x === snake.tail[i].x){
                if(snake.y - snake.tail[i].y > 0){
                    //console.log("tail up");
                    //up = 1/dist(snake.x, snake.y, snake.tail[i].x, snake.tail[i].y);
                    up = 1/(dist(snake.x, snake.y, snake.tail[i].x, snake.tail[i].y)/10);
                }
                if(snake.y - snake.tail[i].y < 0) {
                    //console.log("tail down");
                    //down = 1/dist(snake.x, snake.y, snake.tail[i].x, snake.tail[i].y);
                    down = 1/(dist(snake.x, snake.y, snake.tail[i].x, snake.tail[i].y)/10);
                }
            }

            //check if diagonal
            if( round(snake.x - snake.tail[i].x)  ===  round(snake.y - snake.tail[i].y) ){
                if(snake.x - snake.tail[i].x > 0){
                    //console.log("tail left_up");
                    //left_up = 1/dist(snake.x, snake.y, snake.tail[i].x, snake.tail[i].y); //true dist
                    left_up = 1/((dist(snake.x, snake.y, snake.tail[i].x, snake.y)/10)); //modified dist for diag case
                } 
                if (snake.x - snake.tail[i].x < 0) {
                    //console.log("tail right_down");
                    //right_down = 1/dist(snake.x, snake.y, snake.tail[i].x, snake.tail[i].y); //true dist
                    right_down = 1/((dist(snake.x, snake.y, snake.tail[i].x, snake.y)/10)); //modified dist for diag case
                }
                
            }
            //check if diagonal
            if( -1 * round(snake.x - snake.tail[i].x)  ===  round(snake.y - snake.tail[i].y) ){
                if(snake.x - snake.tail[i].x < 0){
                    //console.log("tail right up");
                    //right_up = 1/dist(snake.x, snake.y, snake.tail[i].x, snake.tail[i].y); //true dist
                    right_up = 1/((dist(snake.x, snake.y, snake.tail[i].x, snake.y)/10)); //modified dist for diag case
                } 
                if (snake.x - snake.tail[i].x > 0) {
                    //console.log("tail left down");
                    //left_down = 1/dist(snake.x, snake.y, snake.tail[i].x, snake.tail[i].y); //true dist
                    left_down = 1/((dist(snake.x, snake.y, snake.tail[i].x, snake.y)/10)); //modified dist for diag case
                }
            }
            //console.log(left, right, up, down, left_down, right_down, left_up, right_up)
            
        }
        return([left, right, up, down, left_down, right_down, left_up, right_up])

    }
}