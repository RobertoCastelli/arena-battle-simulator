// **********************
// PLAYER GLOBAL VARIABLES
// ----------------------
let selectedPlayer;
let playerName;
let playerHealth;
let playerMana;
let playerStrength;

// **********************
// ENEMY GLOBAL VARIABLES
// ----------------------
let selectedEnemy;
let enemyName;
let enemyHealthd;
let enemyMana;
let enemyStrength;

// ******************************
// SET UP GAME AFTER CHAMP SELECT
// ------------------------------
const setGameStart = (classType) => {
  setPlayer(classType);
  setArena();
};

// *********************************
// SETS SELECTED PLAYER IN THE ARENA
// ---------------------------------
const setPlayer = (classType) => {
  const getPlayerStats = document.querySelector(".player-stats");
  getPlayer(classType);
  setPlayerTemplate();
  getPlayerStats.innerHTML = `${player}`;
};

// *************************
// SETS THE ARENA FOR BATTLE
//--------------------------
const setArena = () => {
  const championList = document.querySelector(".champion-list");
  const getHeaderActions = document.querySelector(".header-action");
  const arena = document.querySelector(".arena");
  const stats = document.querySelector(".stats");
  arena.style.visibility = "visible";
  stats.style.visibility = "visible";
  championList.innerHTML = "";
  getHeaderActions.innerHTML = `
  <p>Get ready!</p>
  <button onclick="setEnemy()">start</button>
  <button onclick="resetGame()">reset</button>
  `;
};

// ************************
// SETS ENEMEY IN THE ARENA
// ------------------------
const setEnemy = () => {
  const getEnemyStats = document.querySelector(".enemy-stats");
  const getHeaderActions = document.querySelector(".header-action");
  getEnemy();
  setEnemyTemplate();
  getEnemyStats.innerHTML = `${enemy}`;
  getHeaderActions.innerHTML = `
  <p>Choose your move!</p>
  <button onclick="attack()">attack</button>
  <button onclick="resetGame()">reset</button>
  `;
};
