const submitPlayer = document.getElementById("submit-player");
const playerId = document.getElementById("playerId");

submitPlayer.addEventListener("click", () => {
  if (playerId.value !== "") {
    submitPlayerId();
  }
}); //submits user input when the button is pressed

playerId.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    if (playerId.value !== "") {
      submitPlayerId();
    }
  }
}); //submits user input when spacebar is hit

function submitPlayerId() {
  player.id = playerId.value;
  loginMod.classList.toggle("closed");
  selectMod.classList.toggle("closed");
} //Player id is updated with this function


