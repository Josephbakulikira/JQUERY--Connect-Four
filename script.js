  var player1 = prompt("Player One: Enter your name , you will be blue");
  var player1Color = 'rgb(0, 153, 255)';

  var player2 = prompt("Player One: Enter your name , you will be blue");
  var player2Color = 'rgb(255, 13, 45)';

  var background_color = 'rgba(41, 41, 41, 0.3)'
  var game_on = true;
  var table = $("table tr");

  var current_player = 1;
  var current_name = player1;
  var current_color = player1Color;

  $("h3").text(player1 + " it is your turn, pick a column to drop in!")

  $(".board button").on("click", function(){
    var col = $(this).closest("td").index();
    var bottomAvail = checkBottom(col);
    switch_color(bottomAvail, col, current_color);
    if(Check_Horizontal_win() || Check_Vertical_win() || Check_Diagonal_win()){
      $("h1").text(current_name + " won the game")
      $("h2").fadeOut("fast");
      $("h3").fadeOut("fast");
    }
    current_player = current_player * -1 ;
    if (current_player === 1){
      current_name = player1;
      $("h3").text(current_name + " it's your turn.")
      current_color = player1Color
    }else{
      current_name = player2;
      $("h3").text(current_name + " it's your turn.")
      current_color = player2Color
    }
  })

  function reportWin(row_index, col_index){
    console.log("you won starting at this row, col");
    console.log(row_index);
    console.log(col_index);
  }
  function switch_color(row_index, col_index, color){
    return table.eq(row_index).find("td").eq(col_index).find('button').css("background-color", color);
  }
  function returnColor(row_index, col_index){
    return table.eq(row_index).find("td").eq(col_index).find('button').css("background-color");
  }
  function checkBottom(col_index){
    var colorReport = returnColor(5, col_index);
    for (var i = 5; i > -1; i--) {
      colorReport = returnColor(i, col_index);
      if (colorReport === background_color){
        return i;
      }
    }
  }

  function CheckColorMatch(one, two, three, four){
    return (one === two && one === three && one === four && one !== background_color && one !== undefined)
  }

  function Check_Horizontal_win() {
    for (var x = 0; x < 6; x++){
      for (var y = 0; y < 4; y++) {
        if (CheckColorMatch(returnColor(x, y), returnColor(x, y+1), returnColor(x, y+2), returnColor(x, y+3))){
          console.log("horizontal");
          reportWin(x, y)
          return true;
        }else{
          continue;
        }
      }
    }
  }

  function Check_Vertical_win() {
    for (var y = 0; y < 7; y++){
      for (var x = 0; x < 3; x++) {
        if (CheckColorMatch(returnColor(x, y), returnColor(x + 1, y), returnColor(x + 2, y), returnColor(x + 3, y))){
          console.log("vertical");
          reportWin(x, y)
          return true;
        }else{
          continue;
        }
      }
    }
  }

  function Check_Diagonal_win() {
    for (var y = 0; y < 5; y++){
      for (var x = 0; x < 7; x++) {
        if (CheckColorMatch(returnColor(x, y), returnColor(x + 1, y+1), returnColor(x + 2, y + 2), returnColor(x + 3, y + 3))){
          console.log("diagonal");
          reportWin(x, y)
          return true;
        }else if(CheckColorMatch(returnColor(x, y), returnColor(x - 1, y - 1), returnColor(x - 2, y - 2), returnColor(x - 3, y - 3)))
        {
          console.log("diagonal inversed");
          reportWin(x, y)
          return true;
        }else
        {
          continue;
        }
      }
    }
  }
