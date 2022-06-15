/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
let form = document.getElementById('form');
form.addEventListener("submit", function(e) {
  e.preventDefault();
  let WIDTH = document.getElementById("width").value;
  let HEIGHT = document.getElementById("height").value;
  
  //validate input
  function validateInput(w, h){
    if (isNaN(w) || w === null ||
        (w > 12) || w <6) {
        alert('Please enter appropiate values..');        
        WIDTH = null;
        HEIGHT = null;
        form.reset();
      }
    else if (isNaN(h) || h === null ||
            h > 12 || h <6) {
        alert('Please enter appropiate values..');        
        WIDTH = null;
        HEIGHT = null;
        form.reset();
      }
    else document.getElementById('go').disabled = true;
    }
  


const board = [];   // memory board

let currPlayer = 1; // active player: 1 or 2

//create memory-board
function makeBoard() {
  for (let row = 0; row < HEIGHT; row ++){
    board.push([]);  //expanding board to the numbers of rows from input
  }
  for (let row = 0; row < HEIGHT; row ++){  
  for (let col = 0; col < WIDTH; col ++){
    board[row].push(null);  //initializing board with 'null'
    }
  }
}


function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  let htmlBoard = document.getElementById('board');
  // TODO: add top the table row with an id of "column-top" and add event listener
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);   //adds WIDTH number of cells on top row
  }
  htmlBoard.append(top);

  // TODO: create all rows and data cells and set id to [y][x] format
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  for (let y = HEIGHT-1; y >= 0; y--){
    if (board[y][x] === null)
      return y;
    
  }
}

// update DOM to place piece into HTML table of board

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  let div = document.createElement('div');
  div.classList.add('piece', `p${currPlayer}`);
  document.getElementById(`${y}-${x}`).append(div);
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
  const top = document.getElementById('column-top');
  top.removeEventListener('click', handleClick);
}


function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === undefined) {
    return;
  }

  // place piece in board and add to HTML table
  placeInTable(y, x);
  board[y][x] = currPlayer;
  
  //check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  if (board[0].every( val => typeof(val) == 'number')) {
    endGame ("It's a draw!");
  }
 
  // switch players
  currPlayer = (currPlayer === 1) ? 2 : 1;
}


function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // starting bottom left, check from each board position 3 positions:
  //to the right, upwards, upward-right diagonal and upward-left diagonal

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}
validateInput(WIDTH, HEIGHT);
makeBoard();
makeHtmlBoard();
})