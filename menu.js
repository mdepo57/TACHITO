document.getElementById('startGame').addEventListener('click', () => {
  const name = document.getElementById('playerName').value;
  const mode = document.getElementById('modeSelect').value;
  const difficulty = document.getElementById('botDifficulty').value;
  localStorage.setItem('playerName', name);
  localStorage.setItem('mode', mode);
  localStorage.setItem('difficulty', difficulty);
  window.location.href = 'game.html';
});
