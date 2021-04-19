'use strict';

let secretNumer = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;

document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);
  let message = document.querySelector('.message');
  let scoreMessage = document.querySelector('.score');

  if (!guess) {
    message.textContent = '⛔️ No number';
  } else if (guess === secretNumer) {
    message.textContent = '✅ Correct Answer!';
    document.querySelector('.number').textContent = secretNumer;
    document.querySelector('.number').style.width = '25rem';
    document.querySelector('body').style.backgroundColor = '#60b347';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else if (guess !== secretNumer) {
    if (score > 1) {
      message.textContent =
        guess > secretNumer ? '📈 Too high!' : '📉 Too low!';
      score--;
      scoreMessage.textContent = score;
    } else {
      message.textContent = 'Game Over!';
      scoreMessage.textContent = 0;
      document.querySelector('body').style.backgroundColor = '#f00';
    }
  }
});

document.querySelector('.again').addEventListener('click', () => {
  secretNumer = Math.trunc(Math.random() * 20 + 1);
  score = 20;

  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = score;
});
