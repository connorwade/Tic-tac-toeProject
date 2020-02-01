//Variables

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

//events
//square being clicked
for (let i = 0; i < squares.length; i++) {
  let square = squares[i];
  square.addEventListener(
    "click",
    e => {
      squareClick(e.target);
    }
  );
} 

//restart
restartBtn.addEventListener('click', () => {
  restart();
});

//select buttons
selectX.addEventListener('click', ()=>{
  selectMark(selectX.id);
});

selectO.addEventListener('click', ()=>{
  selectMark(selectO.id);
});

//functions

function squareClick(targetedEl){
  if (targetedEl.dataset.mark === "" && gameOver === null) {
      updateSquares(parseInt(targetedEl.id), currentPlayerMark);
    }
}

function updateSquares(id, currentMark){
  squares[id].dataset.mark = currentMark;
  squares[id].innerText = currentMark;
  board[squares[id].dataset.row][squares[id].dataset.col] = currentMark;  
  endTurn();
}

function endTurn(){
  currentPlayerMark = currentPlayerMark === 'X' ? 'O' : 'X';
  gameOver = checkWinner();
  if(!gameOver && currentPlayerMark === aiMark) {
    //let coord = selectMove();
    let coord = bestMove();
    aiMakesTurn(coord);
  } else if(gameOver) {
    endGame();
  }
  turn++;
}

function aiMakesTurn(obj){
  let el = DOMboard[obj.i][obj.j];
  let elId = parseInt(el.id);
  updateSquares(elId, currentPlayerMark);
}

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
}

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
}


function selectMove() {
  let available = availableMoves();
  return available[Math.floor(Math.random() * available.length)];
}

function availableMoves() {
  let availArr = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        availArr.push({ i, j });
      }
    }
  }
  return availArr;
}

function equals3(a, b, c) {
  return a == b && b == c && a !== "";
}

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
}

function endGame() {
  if(gameOver !== 'tie'){
    gameOverText.innerText = `Ah, dip! Looks like ${gameOver} wins!`; 
  } else{
    gameOverText.innerText = `Congrats on the tie, you mediocre beast!`;
  }
  module.classList.toggle('closed');
  restartMod.classList.toggle('closed');
}

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
}

function newGame() {
  selectMod.classList.toggle('closed');
  module.classList.toggle('closed');
  console.log(scores, aiMark, playerMark);
  if(currentPlayerMark === aiMark) {
    let coord = bestMove();
    aiMakesTurn(coord);
  }
}

function selectMark(id) {
  playerMark = id;
  aiMark = playerMark === 'X' ? 'O' : 'X';
  scores = {tie: 0};
  scores[aiMark] = 10;
  scores[playerMark] = -10;
  console.log(scores, aiMark, playerMark);
  newGame();
}