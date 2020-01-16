class Case{

    constructor(y, column){
        this.y = y;
        this.column = column;
        this.player = null;
    }

    isEmpty(){ return this.player === null; }
}