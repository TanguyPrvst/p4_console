class Data{

  static save(game){
    localStorage.setItem('game', JSON.stringify(game));
  }

  static getData(){
    var user = JSON.parse(localStorage.getItem('game'));
  }

  static clear(){
    localStorage.clear();
  }
}