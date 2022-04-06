const wordList = require("wordle-wordlist");
const answers = wordList.cache.answers;
const all = wordList.cache.all;

function getRandomWord() {
  return answers[Math.floor(Math.random() * answers.length)];
}

function isValidWord(guess) {
  return all.indexOf(guess) > -1;
}

module.exports = { getRandomWord, isValidWord };
