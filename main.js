let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];

const squares = document.getElementsByClassName('square');
let gameOver = null;

let domBoard = [
    [squares[0], squares[1], squares[2]],
    [squares[3], squares[4], squares[5]],
    [squares[6], squares[7], squares[8]],
]

for(let i = 0; i < squares.length; i++){
    let square = squares[i];
    square.addEventListener('click', (e)=>{handleClick(e.target)}, {once: 'true'});
  }

  function handleClick(targetedEl) {
      if(targetedEl.dataset.mark === '' && gameOver === null){
            targetedEl.innerText = human;
            targetedEl.dataset.mark = human;
            updateGameState();
      }
  }

  function reset() {
      domBoard.forEach(row => 
        {row.forEach(el => {
            el.dataset.mark = '';
            el.innerText = '';
      })
    });
    board.forEach( row => {
        row = ['','',''];
    });
    console.log(board);
  }

  function updateGameState(){
      
    board = [
        [squares[0].dataset.mark, squares[1].dataset.mark, squares[2].dataset.mark],
        [squares[3].dataset.mark, squares[4].dataset.mark, squares[5].dataset.mark],
        [squares[6].dataset.mark, squares[7].dataset.mark, squares[8].dataset.mark]
    ];

    gameOver = checkWinner();

    if(gameOver === null) {
        currentPlayer = ai;
        bestMove();
    } else {
        console.log(`Looks like ${gameOver} wins!`)
        reset();
    }
  }

let w;
let h;

let ai = 'X';
let human = 'O';
let currentPlayer = human;

// function setup() {
//     createCanvas(400,400);
//     w = width / 3;
//     h = height / 3;
//     bestMove();
// }

function equals3(a, b, c) {
    return a == b && b == c && a !== '';
}

function checkWinner() {
    let winner = null;

    //horizontal
    for (let i = 0; i < 3; i++) {
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
    }

    //vertical
    for (let i = 0; i < 3; i++) {
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
    }

    //diagonal
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }
    if (equals3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++) {
            if(board[i][j] == '') {
                openSpots++;
            }
        }
    }

    if (winner === null && openSpots === 0) {
        return 'tie';
    } else {
        return winner;
    }
}

// function mousePress() {
//     if(currentPlayer === human) {
//         let i = floor(mouseX / w);
//         let j = floor(mouseY / h);

//         if(board[i][j] === '') {
//             board[i][j] = human;
//             currentPlayer = ai;
//             bestMove();
//         }
//     }
// }

// function draw() {
//     background(255);
//     strokeweight(4);

//     line(w, 0, w, height);
//     line(w * 2, 0, w * 2, height);
//     line(0, h, width, h);
//     line(0, h * 2, width, h * 2);

//     for (let i = 0; i < 3; i++) {
//         for (let j = 0; j < 3; j++) {
//             let x = w * i + w / 2;
//             let y = h * j + h / 2;
//             let spot = board[i][j];
//             textSize(32);
//             let r = w / 4;
//             if(spot === human) {
//                 noFill();
//                 ellipse(x, y, r*2);
//             } else if (spot === ai) {
//                 line(x - r, y - r, x + r, y + r);
//                 line(x + r, y - r, x - r, y + r);

//             }
//         }
//     }

//     let result = checkWinner();
//     if (result !== null) {
//         noLoop();
//         let resultP = createP('');
//         resultP.style('font-size', '32pt');
//         if (result === 'tie') {
//             resultP.html('Tie!');
//         } else {
//             resultP.html(`${result} wins!`)
//         }
//     }

// }

// function bestMove() {
//     //AI to make its turn
//     let bestScore = -Infinity;
//     let move;
//     for (let i = 0; i < 3; i++) {
//         for (let j = 0; j < 3; j++){
//             // Is the spot available?
//             if (board[i][j] === '') {
//                 board[i][j] = ai;
//                 let score = minimax(board, 0, false);
//                 console.log(score);
//                 board[i][j] = '';
//                 if (score > bestScore) {
//                     bestScore = score;
//                     console.log(bestScore);
//                     move = { i, j };
//                 }
//             }
//             board[move.i][move.j] = ai;
//             domBoard[move.i][move.j].dataset.mark = ai;
//             domBoard[move.i][move.j].innerText = ai;
//         }
//     }
//     currentPlayer = human;
// }

// let scores = {
//     'X' : 1,
//     'O' : -1,
//     'tie' : 0
// }

// function minimax(board, depth, isMaximizing) {
//     let result = checkWinner();
//     if (result !== null){
//         return scores[result];
//     }

//     if (isMaximizing) {
//         let bestScore = -Infinity;
//         for (let i = 0; i < 3; i++) {
//             for (let j = 0; j < 3; j++){
//                 // Is the spot available?
//                 if (board[i][j] == '') {
//                     board[i][j] = ai;
//                     let score = minimax(board, depth + 1, false);
//                     board[i][j] = '';
//                     bestScore = Math.max(score, bestScore);
//                 }
//             }
//         }
//         return bestScore;
//     } else {
//         let bestScore = Infinity;
//         for (let i = 0; i < 3; i++) {
//             for (let j = 0; j < 3; j++){
//                 // Is the spot available?
//                 if (board[i][j] == '') {
//                     board[i][j] = human;
//                     let score = minimax(board, depth + 1, true);
//                     board[i][j] = '';
//                    bestScore = Math.min(score, bestScore);
//                 }
//             }
//         }
//         return bestScore;

//     }
//     return 1;
// }

function bestMove() {
    let available = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++){
            if (board[i][j] === '') {
                available.push({i , j});
            }
        }
    }

    console.log(available);

    let move = available[Math.floor(Math.random()*available.length)];
    let i = move.i;
    let j = move.j;

    board[i][j] = ai;
    domBoard[i][j].dataset.mark = ai;
    domBoard[i][j].innerText = ai;
    currentPlayer = human;

    console.log(board);

    gameOver = checkWinner();

    if(gameOver === null) {
        currentPlayer = ai;
    } else {
        console.log(`Looks like ${gameOver} wins!`);
        reset();
    }
}