/*to add 
separar en modulos
agrega ai
*/

board = [];
const playerX = "x";
const playerO = "o";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const fieldElements = document.querySelectorAll(".field");
const title = document.querySelector("#title");
let playerTurn;
let subTitle = document.querySelector("#SwapTurnTitle");
const resetButton = document.querySelector("#reset");

resetButton.addEventListener("click", reset);

for (let i = 0; i < fieldElements.length; i++) {
  fieldElements[i].addEventListener("click", function () {
    fieldElements[i].textContent = playerTurn ? playerO : playerX;
    const currentPlayerMarker = playerTurn ? playerO : playerX;

    subTitle.textContent = playerTurn ? "X" : "O";
    fieldElements[i].disabled = true;
    updateGameBoard();

    swapTurns();
    checkDraw();

    if (checkWinner(currentPlayerMarker)) {
      title.textContent = "Player " + currentPlayerMarker + " has won!";
      for (let i = 0; i < fieldElements.length; i++) {
        fieldElements[i].disabled = true;
      }
    }
  });
}

function updateGameBoard() {
  for (let i = 0; i < fieldElements.length; i++) {
    board[i] = fieldElements[i].textContent;
  }
}

function swapTurns() {
  playerTurn = !playerTurn;
}

function checkWinner(currentPlayerMarker) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return board[index].includes(currentPlayerMarker);
    });
  });
}

function checkDraw() {
  const isBelowThreshold = (currentValue) =>
    currentValue === playerX || currentValue === playerO;
  if (board.every(isBelowThreshold) === true) {
    title.textContent = "It's a draw!";
  }
}

function reset() {
  console.log("reset");
  for (let i = 0; i < fieldElements.length; i++) {
    fieldElements[i].disabled = false;

    fieldElements[i].textContent = "";
  }
  board.splice(0, board.length);
}
