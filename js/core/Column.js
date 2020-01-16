class Column{

    constructor(x, grid){
        this.x = x;
        this.grid = grid;
        this.listCases = [];
        this._initCases();
    }

    _initCases() 
    {
        for(let y = 0; y < this.grid.height; y++)
        {
            this.listCases.push(new Case(y, this));
        }
    }

    getCase(y){
        let output = null;
        ArrayUtils.forEach(this.listCases, c => {
            if(c.y == y) {
                output = c;
                return false;
            }
        })
        return output;
    }
}