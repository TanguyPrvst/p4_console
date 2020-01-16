class Game{

    constructor(round, aligned, width, height){
        this.max_round = round;
        this.aligned = aligned;
        this.listPlayers = [];
        this.grid = new Grid(width, height);

        this.winner = null;
        this.round = 0;
        this.turn = 0;

        this.current_player = null;
        this.current_round = null;
        this.listRounds = [];
        this.listRoundsWin = [];

        this._init();
    }

    _init(){
        for(let i = 0; i < this.max_round; i++){
            this.listRounds.push(new Round(this, i+1));
        }
    }

    _start(){
        //current_player = this.listPlayers[MathHelper.random(0, this.listPlayers.length - 1)];
        this.current_player = this.listPlayers[0];
        this.current_round = this.listRounds[0];
        console.log("Manche " + this.current_round.number);
    }

    _nextRound(){
        this.current_round.winner = this.winner;
        this.listRoundsWin.push(this.current_round.winner);

        if(this.listRoundsWin.length < this.max_round){
            this.current_round = this.listRounds[this.current_round.number];
            this._reset();
            console.log("Manche " + this.current_round.number);
        }else{
            this._end();
        }

    }

    _turn(){
        this.turn++;
        this.current_player = this.listPlayers[this.turn%2];
    }

    _reset(){
        this.grid = new Grid(7, 7)
        ArrayUtils.forEach(this.listPlayers, player => {
            player.listCases = [];
        })
    }

    play(x){
        let column = this.grid.getColumn(x);
        if(column != null){
            this.current_player.play(column);
            if(this.hasAWinner()){
                this.winner = this.current_player;
                console.log(this.winner.name + " gagne la manche");
                this._nextRound();
            };
            this._turn();
        }
    }

    _end(){
        let count = 0;
        ArrayUtils.forEach(this.listRoundsWin, player => {
            if(player == this.current_player){
                count ++;
            }
        })
        if(count < this.max_round / 2){ this._turn(); }
        console.log(this.current_player.name + " gagne la partie");
        // Sauvegarde la partie
        Data.save(this);
        this._reset();
    }




    hasAWinner(){
        let output = false;
        ArrayUtils.forEach(this.current_player.listCases, c => {
            let flags = [];

            //Horizontal
            output |= this.analyseFlags(flags, (f, i) => {
                let column = this.grid.getColumn(c.column.x - i);
                if(column == null){
                     f.push(false);
                } else {
                    f.push(this.current_player.hasCase(column.getCase(c.y)))
                }
            })

            //Vertical
            output |= this.analyseFlags(flags, (f, i) => {
                let x_case = this.grid.getColumn(c.column.x).getCase(i);
                if(x_case == null){
                    flags.push(false);
                } else {
                    f.push(this.current_player.hasCase(x_case))
                }
            })

            //Diagonal right
            output |= this.analyseFlags(flags, (f, i) => {
                let r_column = this.grid.getColumn(c.column.x + i);
                if(r_column != null){
                    let r_case = r_column.getCase(c.y + i);
                    if(r_case == null){
                        flags.push(false);
                    } else {
                        f.push(this.current_player.hasCase(r_case))
                    }
                }else{
                    f.push(false);
                }
            })

            //Diagonal left
            output |= this.analyseFlags(flags, (f, i) => {
                let l_column = this.grid.getColumn(c.column.x + i);
                if(l_column != null){
                    let l_case = l_column.getCase(c.y - i);
                    if(l_case == null){
                        f.push(false);
                    } else {
                        f.push(this.current_player.hasCase(l_case))
                    }
                }else{
                    f.push(false);
                }
            })
        })
        return output;
    }

    analyseFlags(flags, callback){
        for(let i = ((this.aligned - 1) - ((this.aligned - 1) * 2)); i <= this.aligned - 1; i++){
            if(i == 0) { continue; }
            callback(flags, i);
        }
        return this.verifyFlags(flags)
    }

    verifyFlags(flags){
        let output = false;
        let number = 0;
        ArrayUtils.forEach(flags, f => {
            if(f) {
                number ++;
                if(number >= this.aligned - 1){
                   output = true;
                   return false;
                }
            }else{
                number = 0;
            }

        })

        return output;
    }

}