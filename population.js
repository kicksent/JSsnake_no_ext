function Population (num_snakes) {
    this.s = new Array(num_snakes);
    this.f = new Array(num_snakes);
    this.inp = new Array(num_snakes);
    this.n = new Array(num_snakes);
    this.numsnakes = num_snakes
    this.snakesalive = num_snakes;
    this.generation = 0;
    this.onlyshowleader = true; //NOT IMPLEMENTED
    this.bestbrainsofar = {fitness :  0};
    
    
    for(var i=0; i<num_snakes; i++){
        this.s[i] = new Snake(false, 0);
        this.s[i].isbestsnake = true;
        this.f[i] = new Food();
        this.inp[i] = new Inputs();
        this.n[i] = new NeuralNetwork(24,16,4);
    }

    this.update = function() {
        for(var i=0; i<this.s.length; i++){
            if(this.s[i].death()){
                this.s[i] = this.s[i].deadsnake(this.s[i],this.f[i]);
                
            }
            //console.log(i);
            if(this.s[i].eatfood(this.f[i])) {
                delete this.f[i];
                this.f[i] = new Food();
            }
            this.s[i].update();
            if(this.s[i].died == false){
                this.s[i].show();
                this.f[i].show();
            }
            this.n[i].input(this.inp[i].wall(this.s[i]), this.inp[i].food(this.s[i], this.f[i]), this.inp[i].body(this.s[i]));
            this.n[i].output(this.n[i].in_neurons, this.s[i]);
        }
    }
    //this can be optimized in snake.js, fix later
    this.allsnakesdead = function() {
        var all_dead = true;
        for(var i=0; i<this.numsnakes; i++){
            if(this.s[i].died === false){
                return false
            }
        }
        return true;
    }
    
  
    this.selectsnake = function() {
        var fitnesssum = 0;
        for(var i=0; i<this.numsnakes; i++){
            fitnesssum += this.s[i].fitness;
        }
        var randselection = floor(random()*fitnesssum);
        var sumsofar = 0;
        for(var i=0; i<this.numsnakes; i++){
            sumsofar += this.s[i].fitness;
            //console.log(this.s[i].fitness);
            if(sumsofar > randselection){
                var selectedbrain = this.n[i];
                return (selectedbrain);
            }
        }
    }

    this.getbestsnakebrain = function() {
        //highest fitness snake
        var bestsnake = this.s[0];
        var index = 0;
        for(var i=0; i<num_snakes; i++){
            if(this.s[i].fitness >= bestsnake.fitness){
                bestsnake = this.s[i]
                index = i;
            }
        }
        console.log(bestsnake.fitness);
        bestbrain = this.n[index];
        //console.log(bestbrain);        
        return bestbrain;
    }


    this.naturalselection = function () {
        this.snakesalive = this.numsnakes;
        var bestbrain = this.getbestsnakebrain()
        //store best snake brain in n[0]
        //console.log("bestbrain", bestbrain);
        this.n[0] = this.n[0].clonebrain(bestbrain);
        this.n[0]
        this.f[0] = new Food();
        this.inp[0] = new Inputs();
        for(var i=1; i<this.numsnakes; i++){
                var parent = this.selectsnake();
                
                //console.log(parent);
                
                this.n[i] = this.n[i].crossover(parent);
                this.n[i].mutate();
            if(this.n[i]===this.n[i-1]){
                console.log("same object, deep copy failed");
            } 
            this.f[i] = new Food();
            this.inp[i] = new Inputs();
        }
        //only AFTER copying their brains, spawn new snake objects with 0 fitness
        for(var i=0; i<this.numsnakes; i++){
            this.s[i] = new Snake(false, 0);
        }
        this.s[0].isbestsnake = true;

        this.generation++;
        
    }

    
}
