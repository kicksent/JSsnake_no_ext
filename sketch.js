var s;
var scl = 10;
var window_dim = 400; //must divide evenly into 10
var grid_units = window_dim/scl;
var populationnum = 5000;

function setup() {
    createCanvas(window_dim,window_dim);
    // s = new Snake();
    // f = new Food();
    // inp = new Inputs();
    // n = new NeuralNetwork(24,16,4);
    p = new Population(populationnum);
    console.log("setup called");
    frameRate(300);
}

function draw(){
    
    background(35);
    //background(51);

    p.update();
    if(p.allsnakesdead() === true){
        p.naturalselection();
    }
    fill(0,250,250);
    textSize(20);
    text("generation "+p.generation, 5, 30);





    
    // //snake1
    // if(s.death()){
    //     console.log("YOU DIED");
    //     s = new Snake();
    //     f = new Food();
    // }
    // if(s.eatfood(f)) {
    //     delete f;
    //     f = new Food();
    // }
    // s.update();
    // s.show();
    // f.show();
    // s.test();
    // n.input(inp.wall(s), inp.food(s, f), inp.body(s));
    // n.output(n.in_neurons, s);

    //n.printMatrix(n.whi()); WORKS!
    
    
    // console.log("drawing");
}

function keyPressed(){
    if(keyCode === UP_ARROW){
        s2.dir(0,-1);
        //s2.dir(0,-1);
    } else if(keyCode === DOWN_ARROW ) {
        s2.dir(0,1);
        //s2.dir(0,1);
    } else if(keyCode === LEFT_ARROW){
        s2.dir(-1,0);
        //s2.dir(-1,0);
    } else if(keyCode === RIGHT_ARROW){
        s2.dir(1,0);
        //s2.dir(1,0);
    }
    if(keyCode == 32) {
        for(var i =0; i<populationnum; i++){
            p.s[i].total++;
        }

    }
}
