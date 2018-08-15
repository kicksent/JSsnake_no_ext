function NeuralNetwork(input, hidden, output) {
    //integer values for number of nodes
    this.num_input = input;
    this.num_hidden = hidden;
    this.num_output = output;
    this.in_neurons = [];
    this.whi = math.matrix(math.random([this.num_hidden, this.num_input+1], -1, 1));
    this.whh = math.matrix(math.random([this.num_hidden, this.num_hidden+1],-1, 1));
    this.woh = math.matrix(math.random([this.num_output, this.num_hidden+1], -1, 1));
    this.dir_array = ["left", "right", "up", "down"];
    this.printMatrix = function(m) {
        console.table(m._data);
    }
    
    this.getmatrices = function() {
        return [this.whi, this.whh, this.woh];
    }

    /*
    this function works, it appears that is doesn't when printing before and after the add to each index because the matrix gets sent to console later than the execution of the addition
    testing:
        setting .01 to .5, and adding 10 to each value shows that this works correctly, as the matrix will contain values which are much too large to have been there. Oh js, you are a creature of great complexity. 
        It was pointed out to me that I should be using promises here, this is indeed my first full js program so its been fun to learn and fuck it up badly as I go. 
    */

    this.crossover = function(parent) {
        var child = new NeuralNetwork(24,16,4);
        child.whi = child.whi.toArray();
        child.whh = child.whh.toArray();
        child.woh = child.woh.toArray();
        //convert to arrays to make it simpler
        var parentwhi = parent.whi.toArray();
        var parentwhh = parent.whh.toArray();
        var parentwoh = parent.woh.toArray();
        this.whi = this.whi.toArray();
        this.whh = this.whh.toArray();
        this.woh = this.woh.toArray();
        //perform crossover, selecting a random number of rows and columns from each. 

        var randRows = floor(random(parentwhi.length));
        var randCols = floor(random(parentwhi[0].length));
        var randside = random();
        for(var i=0;i<parentwhi.length ;i++){
            for(var j=0; j<parentwhi[0].length ;j++){
                if(randside < .5){
                    if((i< randRows)|| (i==randRows && j<=randCols)){
                        child.whi[i][j] = parentwhi[i][j];
                    }else{
                        child.whi[i][j] = this.whi[i][j];
                    }
                } else {
                    if((i< randRows)|| (i==randRows && j<=randCols)){
                        child.whi[i][j] = this.whi[i][j];
                    }else{
                        child.whi[i][j] = parentwhi[i][j];
                    }
                }

            }
        }
        var randRows = floor(random(parentwhh.length));
        var randCols = floor(random(parentwhh[0].length));
        var randside = random();
        for(var i=0;i<parentwhh.length ;i++){
            for(var j=0; j<parentwhh[0].length ;j++){
                if(randside < .5){
                    if((i< randRows)|| (i==randRows && j<=randCols)){
                        child.whh[i][j] = parentwhh[i][j];
                    }else{
                        child.whh[i][j] = this.whh[i][j];
                    }
                } else {
                    if((i< randRows)|| (i==randRows && j<=randCols)){
                        child.whi[i][j] = this.whi[i][j];
                    }else{
                        child.whi[i][j] = parentwhi[i][j];
                    }
                }
            }
        }
        var randRows = floor(random(parentwoh.length));
        var randCols = floor(random(parentwoh[0].length));
        var randside = random();
        for(var i=0;i<parentwoh.length ;i++){
            for(var j=0; j<parentwoh[0].length ;j++){
                if(randside < .5){   
                    if((i< randRows)|| (i==randRows && j<=randCols)){
                        child.woh[i][j] = parentwoh[i][j];
                    }else{
                        child.woh[i][j] = this.woh[i][j];
                    }
                } else {
                    if((i< randRows)|| (i==randRows && j<=randCols)){
                        child.whi[i][j] = this.whi[i][j];
                    }else{
                        child.whi[i][j] = parentwhi[i][j];
                    }
                }
            }
        }
        //convert child arrays back to matrix
        child.whi = math.matrix(child.whi);
        child.whh = math.matrix(child.whh);
        child.woh = math.matrix(child.woh);



        return child;
    }


    this.mutate = function () {
        this.whi = this.whi.toArray();
        var rand1 = Math.random();
        var rand2 = Math.random();
        var rand3 = Math.random();
        for(var i = 0; i<this.whi.length; i++){
            for(var j = 0; j<this.whi[0].length; j++){
                if(rand1 < .01){
                    this.whi[i][j] += (randomGaussian()/15);
                }
            }
        }
        this.whi = math.matrix(this.whi);
        this.whh = this.whh.toArray();
        for(var i = 0; i<this.whh.length; i++){
            for(var j = 0; j<this.whh[0].length; j++){
                if(rand2 < .01){
                    this.whh[i][j] += (randomGaussian()/15);
                }
            }
        }
        this.whh = math.matrix(this.whh);
        this.woh = this.woh.toArray();
        for(var i = 0; i<this.woh.length; i++){
            for(var j = 0; j<this.woh[0].length; j++){
                if(rand3 < .01){
                    this.woh[i][j] += (randomGaussian()/15);
                }
            }
        }
        this.woh = math.matrix(this.woh);
    }
    
    this.sigmoid = function(arr){
        for(var i = 0; i < arr.length; i++){
            arr[i] = 1/(1+Math.pow(Math.E, -arr[i]));
        }
        
    }
    this.clonebrain = function (bestbrain) {
        var clonedbrain = new NeuralNetwork(24,16,4);

        bestbrain.whi = bestbrain.whi.toArray();
        bestbrain.whh = bestbrain.whh.toArray();
        bestbrain.woh = bestbrain.woh.toArray();
        
        clonedbrain.whi = clonedbrain.whi.toArray();
        clonedbrain.whh = clonedbrain.whh.toArray();
        clonedbrain.woh = clonedbrain.woh.toArray();
        //console.log("bestbrain in clone", bestbrain);
        //console.log(clonedbrain);

        for(var i=0;i<clonedbrain.whi.length ;i++){
            for(var j=0; j<clonedbrain.whi[0].length ;j++){


                //console.log(bestbrain.whi[i][j]);


                clonedbrain.whi[i][j] = bestbrain.whi[i][j];
            }
        }
        for(var i=0;i<clonedbrain.whh.length ;i++){
            for(var j=0; j<clonedbrain.whh[0].length ;j++){
                clonedbrain.whh[i][j] = bestbrain.whh[i][j];
            }
        }
        for(var i=0;i<clonedbrain.woh.length ;i++){
            for(var j=0; j<clonedbrain.woh[0].length ;j++){
                clonedbrain.woh[i][j] = bestbrain.woh[i][j];
            }
        }
        clonedbrain.whi = math.matrix(clonedbrain.whi);
        clonedbrain.whh = math.matrix(clonedbrain.whh);
        clonedbrain.woh = math.matrix(clonedbrain.woh);

        bestbrain.whi = math.matrix(bestbrain.whi);
        bestbrain.whh = math.matrix(bestbrain.whh);
        bestbrain.woh = math.matrix(bestbrain.woh);
        return(clonedbrain);
    }
    

    this.input = function(wall, food, body) {
        // console.log(typeof(wall), typeof(food), typeof(body));
        // console.log(wall);
        // console.log(food);
        // console.log(body);
        var inputs = [].concat(wall,food,body);
        this.in_neurons = inputs;
    }

    this.output = function(inp, s) {
        //TODO
        //turn inputs into matrix and add BIAS
        var inputs = math.matrix(inp.concat([1]));
        //console.log("inputs", inputs);

        //apply layer 1 to weights
        //console.log("problem", this.whi);
        var res = math.multiply(this.whi, inputs);
        res = res.toArray();
        
        //pass through sigmoid
        this.sigmoid(res);

        //add bias res[this.num_hidden] = 1; or concat
        res = res.concat(1);
        //console.table(res);

        //apply layer 2 to weights
        var hidden1 = math.matrix(res);
        res = math.multiply(this.whh, hidden1);
        res = res.toArray();
        //console.table(res);

        //pass through sigmoid
        this.sigmoid(res);

        //add bias
        res = res.concat(1);
        //console.table(res);

        //apply layer 3 weights
        var hidden2 = math.matrix(res);
        res = math.multiply(this.woh, hidden2);
        res = res.toArray();

        //pass through sigmoid
        this.sigmoid(res);

        //convert to array and apply decision
        //console.log(res);
        var max = 0;
        var dir = i;
        for (var i = 0; i < 4; i ++){
            if(res[i] > max){
                max = res[i];
                dir = i;
            }
        }
        //console.log(dir);
        if(dir === 0){
            s.dir(1,0);
        }
        if(dir === 1){
            s.dir(-1,0);
        }
        if(dir === 2){
            s.dir(0,-1);
        }
        if(dir === 3){
            s.dir(0,1);
        }
        
        
    }

}