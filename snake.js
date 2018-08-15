function Snake(died, fitness) {
    this.x = 180;
    this.y = 200;
    //console.log(this.x, "snake x");
    //console.log(this.y, "snake y");
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 2;
    this.tail = [createVector(this.x-10, this.y), createVector(this.x-10, this.y-10)];
    this.died = died;
    this.dirchanges = 0;
    this.fitness = fitness;
    this.movesremaining = 200;
    this.lifetime = 0;
    this.isbestsnake = false;
    

    this.dir = function(x,y) {
        if(Math.abs(this.xspeed) == Math.abs(x)){
            this.xspeed = this.xspeed;
        }
        else if(Math.abs(this.yspeed) == Math.abs(y)){
            this.yspeed = this.yspeed;
        } else{
            this.xspeed = x;
            this.yspeed = y;
        }
    }

    //check to see if snake died to wall or tail
    this.death = function() {
        if(this.died == true){
            return true
        }else{
            if(this.movesremaining < 0){
                this.died = true;
                return true;
            }else{
                for (var i = 0; i< this.tail.length; i++) {
                    var pos = this.tail[i];
                    var d = dist(this.x, this.y, pos.x, pos.y);
                    if(d < 1){
                        return true;
                    }
                }
            }
        }
    }

    this.update = function() {
        if(this.died != true){
            for (var i = 0; i < this.tail.length-1; i++){
                this.tail[i] = this.tail[i+1];
            }
            if(this.total >= 1){
                this.tail[this.total-1] = createVector(this.x, this.y);
            }
            if(this.died == false){
                this.x = this.x + this.xspeed*scl;
                this.y = this.y + this.yspeed*scl;
                this.lifetime++;
                this.movesremaining--;
                //if they dont turn, their own tail will kill them next frame because of this constrain...
                this.x = constrain(this.x,0, width-scl);
                this.y = constrain(this.y,0, height-scl);
            }
        }
    }

    this.show = function() {
        //if(this.died != true && this.isbestsnake == true){
        if(this.died != true){
            fill(255+this.total*10);
            for (var i = 0; i < this.tail.length; i++){
                //console.log(this.tail[i].x)
                rect(this.tail[i].x, this.tail[i].y, 10, 10);
            }
            rect(this.x, this.y, 10, 10);
        }
    }

    this.eatfood = function(f) {
        var d = dist(this.x, this.y, f.x, f.y);
        if(d === 0){
            this.total++;
            this.movesremaining += 300;
            return true;
        } else {
            return false;
        }
    }
    this.deadsnake = function (s, f) {
        this.calcfitness();
        var s2 = new Snake(true, this.fitness);
        delete s;
        var f2 = new Food();
        delete f;
        return(s2);
    }

    //BROKEN, FIX TOMORROW
    
    this.calcfitness = function() {
        if(this.total < 10){
            this.fitness = this.lifetime * this.lifetime * Math.pow(2,(floor(this.total)));
        } else {
            this.fitness = lifetime * lifetime;
            this.fitness *= Math.pow(2,10);
            this.fitness *=(this.total-9);
        }
    }
}


//--------------------------------------------------------------------------------------------------------------------------

function Food() {
    this.x = floor(Math.random()*grid_units)*scl;
    this.y = floor(Math.random()*grid_units)*scl;
    //console.log(Math.random());
    this.show = function() {
        fill(100, 0, 100);    ///turn off to see snakes only
        rect(this.x,this.y,10,10);
    }
}