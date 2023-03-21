
/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7; //set height
const HEIGHT = 6; //set width

let currPlayer = 1; // active player: 1 or 2
let board = [] // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let y = 0; y < HEIGHT; y++){      //loop over height
    board.push(Array.from({length: WIDTH}))  //makes an array matrix of null
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const board = document.getElementById('board')      //attaches the board to the
  // TODO: add comment for this code
  //make top click row for adding color to row
  const top = document.createElement("tr");           //creates a table row
  top.setAttribute("id", "top-column");               //sets the id of top column to created table row
  top.addEventListener("click", handleClick);         //adds a click event then runs function

  for (let x = 0; x < WIDTH; x++) {                  //loops over width
    const headCell = document.createElement("td");   //creates table data
    headCell.setAttribute("id", x);                  //sets id of x to the created table data
    top.append(headCell);                            //add headcell table data to top table row
  }
  board.append(top);                                 //add top table row to the game board

  // TODO: add comment for this code
  //create main board
  for (let y = 0; y < HEIGHT; y++) {                 //loop over height
    const row = document.createElement("tr");        // create new table row
    for (let x = 0; x < WIDTH; x++) {                //loop over width
      const cell = document.createElement("td");     //create new table data
      cell.setAttribute("id", `${y}-${x}`);          //set id of ?? to new table data
      row.append(cell);                              //adds new table data to new table row
    }
    board.append(row);                               //adds new table row to the game board
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

// function findSpotForCol(x) {
//   for(let y = 0; y < HEIGHT; y++) {
//     if(board[y][x]) {
//       if (x === 0) {
//         return null;
//       }
//       return board[y][x-1];
//     }
//   }
// }

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--){            //loop over height
    if(!board[y][x]){                               //if board spot y-x is not full
      return y                                      //return y
    }
  }
  return null                                       //return null if spot is full
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const piece = document.createElement('div')       //creates new div
  piece.classList.add('piece')                      //add class to new div
  piece.classList.add(`p${currPlayer}`)             //add class of current player
  // piece.style.top = -50 * (y + 2)                //still unknown

  const spot = document.getElementById(`${y}-${x}`) //grabs id from height and width
  spot.append(piece)                                //adds div to the height and width
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)                                        //pop up message saying win lose or tie
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;                         //get x from id of clicked cell

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer
  placeInTable(y, x);                               //adds piece to the board

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if(board.every(row => row.every(cell => cell))){
    return endGame('Tie!')
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

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

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {                                            //loop over height
    for (let x = 0; x < WIDTH; x++) {                                           //loop over width
      //look for 4 ways to win
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];               //check for four
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];                //check for four
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];  //check for four
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];  //check for four

      //check for winner
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {          //check for win
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
