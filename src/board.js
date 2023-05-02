const squares = document.getElementsByClassName("square");

for (let square of squares) {
  square.addEventListener("click", (e) => {
    squareClick(e.target);
  });
}

let board = [
  [
    { value: "", dom: squares[0] },
    { value: "", dom: squares[1] },
    { value: "", dom: squares[2] },
  ],
  [
    { value: "", dom: squares[3] },
    { value: "", dom: squares[4] },
    { value: "", dom: squares[5] },
  ],
  [
    { value: "", dom: squares[6] },
    { value: "", dom: squares[7] },
    { value: "", dom: squares[8] },
  ],
];




