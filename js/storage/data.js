class Data{

  static save(game){
    var data = JSON.parse(sessionStorage.getItem("games"))
    if(data == null){
      data = [];
    }
    data.push(game);
    sessionStorage.setItem("games", JSON.stringify(data))
  }

  static getData(){
    if (JSON.parse(sessionStorage.getItem("games"))) {
      return JSON.parse(sessionStorage.getItem("games"))
  }
  }

  static clear(){
    localStorage.clear();
  }
}