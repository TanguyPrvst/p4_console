class Grid{

    constructor(width, height){
        this.width = width;
        this.height = height;
        this.listColomns = [];
        this._initColumns();
    }

    _initColumns() 
    {
        for(let x = 0; x < this.width; x++)
        {
            this.listColomns.push(new Column(x, this));
        }
    }

    getColumn(x){
        let output = null;
        ArrayUtils.forEach(this.listColomns, column => {
            if (column.x == x) { 
                output = column;
                return false;
            }
        })
        return output;
    }
}