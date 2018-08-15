function calc (){
    this.sigmoid = function(t){
        return 1/(1+Math.pow(Math.E, -t));
    }
}