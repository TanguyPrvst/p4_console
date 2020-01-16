class Main{

    static _define(){
        //let grid = new Grid(7, 7);
        this.game = new Game(3, 4, 7, 7);
        this.game.listPlayers.push(new Player("Joueur 1", "red"));
        this.game.listPlayers.push(new Player("Joueur 2", "blue"));

        this.game._start();
    }

    static onClick(){
        let value = document.getElementById("column").value - 1;
        this.game.play(value);
    }
}