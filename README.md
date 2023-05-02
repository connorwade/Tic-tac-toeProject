# Tic-Tac-Toe
By Connor

## 4 year update

I made this project 4 years ago while I was learning web development and freshly graduated from an engineering program. I recently opened it up for some colleagues and realized that I was lacking anyway of running it with a package manager. I used Yarn to add a package manager to it and then dropped in Parcel. With Parcel I could remove Sass. I probably won't update the JS anymore than where it is at currently because I don't have the time. However, the code could be modularized and organized in a better way.

Anyways, I hope you enjoy getting beaten by my unbeatable AI.

## Description

This Tic-tac-toe project is a browser game played against an AI opponent. The AI opponent in this game is unbeatable because it is using the minimax formula combined with alpha-beta trimming (for efficiency, not that it is needed in this case).

The pseudocode for the minimax formula I used to write this came from this wikipedia article: https://en.wikipedia.org/wiki/Alpha%E2%80%93beta_pruning#Pseudocode

This project also makes use of local storage for the game. It is recommended to clear your local storage after playing either by pressing the "Reset Player Info" and not entering any information or by using the browser's console. To delete the storage using the browser's console just type the following in:

```
localStorage.removeItem(localKey);
```
or use: 

`localStorage.removeItem('Tic-tac-toe');`
