# Tic-Tac-Toe
By Connor

## Description

This Tic-tac-toe project is a browser game played against an AI opponent. The AI opponent in this game is unbeatable because it is using the minimax formula combined with alpha-beta trimming (for efficiency, not that it is needed in this case).

The pseudocode for the minimax formula I used to write this came from this wikipedia article: https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning#Pseudocode

This project also makes use of local storage for the game. It is recommended to clear your local storage after playing either by pressing the "Reset Player Info" and not entering any information or by using the browser's console. To delete the storage using the browser's console just type the following in:

```
localStorage.removeItem(localKey);
```
or use: 

`localStorage.removeItem('Tic-tac-toe');`
