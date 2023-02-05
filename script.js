// bringing in all the elments form HTML
const cells= document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const resetBtn = document.querySelector("#resetBtn");
// setting up an array with the win conditions
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
// an array to make sure the is no string within a cell
let options = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;

startGame();

function startGame() {
  // checking every cell to see if they are clicked 
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
  // seeing if the reset button has been selected to start a new game
    resetBtn.addEventListener("click", resetGame);
  // displaying the current players turn
    statusText.textContent = `${currentPlayer}'s turn`;
  // starting the game
  running = true;
}
function cellClicked() {
  // bringing in the cellIndex attribute to assign 
  const cellIndex = this.getAttribute('cellIndex');
  // using if state to determine if a cell has a empty string or that the game is not running
  if (options[cellIndex] != "" || !running) {
    return;
  } 
  updateCell(this, cellIndex);

 checkWinner() 
}
function updateCell(cell, index) {
  // putting the string from current player to display
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}
function changePlayer() {
  // checking whos turn it has become x or o
    currentPlayer = (currentPlayer =="X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner() {
  // seeing if the round has been won by either player
     let roundWon = false;
  // using a for loop to go through all conditions to see if either player won
    for(let i =0; i < winConditions.length; i++) {
        const condition = winConditions[i];
      const cellA = options[condition[0]];
      const cellB = options[condition[1]];
      const cellC = options[condition[2]];
      // checking if  the cells are empty 
      if (cellA == "" || cellB == "" || cellC == "") {
          continue;
      } // checking if the cells are the same string
      if(cellA == cellB && cellB == cellC) {
        roundWon = true;
        break;
      }
      
    }// displaying if the round is won to who won 
  if(roundWon) {
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
  }// if no one got 3 in a row displays Draw
  else if (!options.includes("")){
    statusText.textContent = `Draw!`;
  }
  else {// moves to the other players turn 
    changePlayer();
  }
}
// making all cells blank, putting the turn back to assigned turn
function resetGame() {
  currentPlayer = "X";
 options = ["","","","","","","","",""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach(cell => cell.textContent = "")
  running = true;
}