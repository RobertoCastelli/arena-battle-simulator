// ******************************
// SET UP GAME AFTER CHAMP SELECT
// ------------------------------
const setGameStart = (classType) => {
  setPlayer(classType);
  setArena();
};

// *************************
// SETS THE ARENA FOR BATTLE
//--------------------------
const setArena = () => {
  // REMOVE SELECT CHAMPION LIST
  championList.innerHTML = "";
  // DISPLAY ARENA AND STATS
  getArena.style.visibility = "visible";
  getStats.style.visibility = "visible";
  // DISPLAY ARENA HEADERS
  getScoreResult.innerHTML = "start fighting!";
  getScoreResultHeader.innerHTML = "ARENA SPEAKER";
  getScoreHeader.innerHTML = "COMBAT LOGS";
  // ADD START AND RESET BUTTONS
  getHeaderActions.innerHTML = `
  <p>Get ready!</p>
  <button onclick="setEnemy()">start</button>
  <button onclick="restartGame()">reset</button>
  `;
};

// *********************************
// SETS SELECTED PLAYER IN THE ARENA
// ---------------------------------
const setPlayer = (classType) => {
  getPlayer(classType);
  setPlayerStats();
};

// ************************
// SETS ENEMEY IN THE ARENA
// ------------------------
const setEnemy = () => {
  audioFight.play();
  getEnemy();
  setEnemyStats();
  getHeaderActions.innerHTML = `
  <p>Choose your move!</p>
  <button onclick="attack()">attack</button>
  <button onclick="resetGame()">reset</button>
  `;
};
