//Variables-------------------------------------

//module
const module = document.getElementById('module');
//restart
const gameOverText = document.getElementById('game-over-text')
const restartBtn = document.getElementById('restart');
const restartMod = document.getElementById('restart-module');
//newGame
const selectX = document.getElementById('X');
const selectO = document.getElementById('O');
const selectMod = document.getElementById('selection-module');

//game
let gameOver = null;
let turn = 0;

//ai & player
let playerMark, aiMark, scores;
let currentPlayerMark = 'X';

//mustache
const template = document.getElementById('template').innerHTML;

//local storage & register
const submitPlayer = document.getElementById('submit-player');
const playerId = document.getElementById('playerId');
const loginMod = document.getElementById('login-module');
const welcome = document.getElementById('welcome');
const resetPlayer = document.getElementById('resetPlayer');

let player;
const localKey = 'Tic-tac-toe';
let storedData = localStorage.getItem(localKey);
if(storedData){
  player = JSON.parse(storedData);
  loginMod.classList.toggle('closed');
  selectMod.classList.toggle('closed');
  welcome.innerText = `Welcome back, ${player.id}`;
  setRecord(player);
} else{
  player = {
    X: {
      wins: 0,
      loses: 0,
      ties: 0
    },
    O: {
      wins: 0,
      loses: 0,
      ties: 0
    },
    id: null,
  }
}


//board
const squares = document.getElementsByClassName('square');
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]
let DOMboard = [
  [squares[0], squares[1], squares[2]],
  [squares[3], squares[4], squares[5]],
  [squares[6], squares[7], squares[8]]
]

//Events----------------------------------------

//submit player id
submitPlayer.addEventListener('click', () => {
  if(playerId.value !== '') {submitPlayerId()}
}); //submits user input when the button is pressed
playerId.addEventListener('keyup', (e) => {
  if(e.keyCode === 13){
    if(playerId.value !== '') {submitPlayerId()}
  }
}); //submits user input when spacebar is hit

//square being clicked
for (let i = 0; i < squares.length; i++) {
  let square = squares[i];
  square.addEventListener(
    "click",
    e => {
      squareClick(e.target);
    }
  );
} //adds event listeners for all squares

//restart
restartBtn.addEventListener('click', () => {
  restart();
}); //restarts and resets the game when pressed

//select buttons
selectX.addEventListener('click', ()=>{
  selectMark(selectX.id);
}); //allows user to choose the X mark for the game

selectO.addEventListener('click', ()=>{
  selectMark(selectO.id);
}); //allows user to choose the O mark for the game

//reset player
resetPlayer.addEventListener('click', () => {
  localStorage.removeItem(localKey);
  window.location.reload();
}); //allows the user to clear the local storage and refresh the page

//Functions---------------------------------------

function squareClick(targetedEl){
  if (targetedEl.dataset.mark === "" && gameOver === null) {
      updateSquares(parseInt(targetedEl.id), currentPlayerMark);
    }
} //checks the data coming in from the square element to ensure proper functionality before updating

function updateSquares(id, currentMark){
  squares[id].dataset.mark = currentMark;
  squares[id].innerText = currentMark;
  board[squares[id].dataset.row][squares[id].dataset.col] = currentMark;  
  endTurn();
} //updates all data for the square and moves the game to the end of turn

function endTurn(){
  currentPlayerMark = currentPlayerMark === 'X' ? 'O' : 'X';
  gameOver = checkWinner();
  if(!gameOver && currentPlayerMark === aiMark) {
    let coord = bestMove();
    aiMakesTurn(coord);
  } else if(gameOver) {
    endGame();
  }
  turn++;
} /*endTurn has several functions:
  (1) It changes the current active mark
  (2) It checks to see if the game has been won
  (3) It checks to see if it is the ai's turn
  (4) If it is the ai's turn it starts it*/

function aiMakesTurn(obj){
  let el = DOMboard[obj.i][obj.j];
  let elId = parseInt(el.id);
  updateSquares(elId, currentPlayerMark);
} //gets ai decision data into the form used by the human player for code resusability

function bestMove() {
  // AI to make its turn
  let bestScore = -Infinity;
  let move;
  let simulatedBoard = board;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot available?
      if (simulatedBoard[i][j] === '') {
        simulatedBoard[i][j] = currentPlayerMark;
        //let score = minimax(simulatedBoard, 0, false);
        let score = minimax(simulatedBoard, 9-turn, -Infinity, Infinity, false);
        simulatedBoard[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  return move;
} //allows the ai to start to make a decision

function minimax(board, depth, a, b, isMaximizing) {
  let result = checkWinner();
  if (depth === 0 || result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] === "") {
          board[i][j] = aiMark;
          let score = minimax(board, depth - 1, a, b, false);
          board[i][j] = "";
          bestScore = Math.max(score, bestScore);
          a = Math.max(a, bestScore);
          if(a >= b) {break;}
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] === "") {
          board[i][j] = playerMark;
          let score = minimax(board, depth - 1, a, b, true);
          board[i][j] = "";
          bestScore = Math.min(score, bestScore);
          b = Math.min(b, bestScore);
          if(a >= b) {break;}
        }
      }
    }
    return bestScore;
  }
} //minimax formula with alpha-beta trimming
//guides decision making of the ai

function equals3(a, b, c) {
  return a === b && b === c && a !== "";
}//checks if three variables are equal, but also that they are not empty

function checkWinner() {
  let winner = null;

  //horizontal
  for (let i = 0; i < 3; i++) {
    if (
      equals3(
        board[i][0],
        board[i][1],
        board[i][2]
      )
    ) {
      winner = board[i][0];
    }
  }

  //vertical
  for (let i = 0; i < 3; i++) {
    if (
      equals3(
        board[0][i],
        board[1][i],
        board[2][i]
      )
    ) {
      winner = board[0][i];
    }
  }

  //diagonal
  if (
    equals3(board[0][0], board[1][1], board[2][2])
  ) {
    winner = board[0][0];
  }
  if (
    equals3(board[2][0], board[1][1], board[0][2])
  ) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") {
        openSpots++;
      }
    }
  }

  if (openSpots === 0 && winner === null) {
    return "tie";
  } else {
    return winner;
  }
} //uses equals3 to evaluate if anyone has won the game or if it has come out as a tie

function endGame() {
  if(gameOver !== 'tie'){
    gameOverText.innerText = `Ah, dip! Looks like ${gameOver} wins!`; 
  } else{
    gameOverText.innerText = `Congrats on the tie, you mediocre beast!`;
  }
  module.classList.toggle('closed');
  restartMod.classList.toggle('closed');
  if(playerMark === gameOver){
    player[playerMark].wins++;
  } else if (aiMark === gameOver){
    player[playerMark].loses++;
  } else{
    player[playerMark].ties++;
  }
  setRecord(player);
  localStorage.setItem(localKey, JSON.stringify(player));
} //endGame updates local storage files and displays the next DOM elements for the player

function restart(){
  currentPlayerMark = 'X';
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++){
      DOMboard[i][j].dataset.mark = '';
      DOMboard[i][j].innerText = '';
    }
  }
  for(let k = 0; k < squares.length; k++){
    squares[k].dataset.mark = '';
  }
  gameOver = null;
  turn = 0;
  restartMod.classList.toggle('closed');
  selectMod.classList.toggle('closed');
} //restart ensures that all variables are reset for a new game

function newGame() {
  selectMod.classList.toggle('closed');
  module.classList.toggle('closed');
  if(currentPlayerMark === aiMark) {
    let coord = bestMove();
    aiMakesTurn(coord);
  }
} //newGame ensures that the ai will go first if it is X

function selectMark(id) {
  playerMark = id;
  aiMark = playerMark === 'X' ? 'O' : 'X';
  scores = {tie: 0};
  scores[aiMark] = 10;
  scores[playerMark] = -10;
  welcome.innerText = '';
  newGame();
}//selectmark is the first function that runs in a new game
//ensures that all mark variables belong to the correct player

function submitPlayerId(){
  player.id = playerId.value;
  loginMod.classList.toggle('closed');
  selectMod.classList.toggle('closed');
} //Player id is updated with this function

function setRecord(obj) {
  let rendered = Mustache.render(template, obj);
  document.getElementById('target').innerHTML = rendered;
} //ensures that the player's stats are recorded properly in the DOM