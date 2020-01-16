class Player{

    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.listCases = [];
    }

    play(column){
        ArrayUtils.forEach(column.listCases, c => {
            if(c.isEmpty()){
                c.player = this;
                this.listCases.push(c);
                console.log(this.name + " joue la case : Colonne " + (c.column.x + 1) + " Ligne " + (c.y + 1));
                return false;
            }
        });
    }

    hasCase(c) {
        if(!(c instanceof Case)) { return false; }
        return c.player == this;
    }
}