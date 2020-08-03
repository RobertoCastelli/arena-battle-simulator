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
  arena.style.visibility = "visible";
  stats.style.visibility = "visible";
  // ADD START AND RESET BUTTONS
  getHeaderActions.innerHTML = `
  <p>Get ready!</p>
  <button onclick="setEnemy()">start</button>
  <button onclick="resetGame()">reset</button>
  `;
};

// *********************************
// SETS SELECTED PLAYER IN THE ARENA
// ---------------------------------
const setPlayer = (classType) => {
  getPlayer(classType);
  setPlayerTemplate();
};

// ************************
// SETS ENEMEY IN THE ARENA
// ------------------------
const setEnemy = () => {
  const getHeaderActions = document.querySelector(".header-action");
  getEnemy();
  setEnemyTemplate();
  getHeaderActions.innerHTML = `
  <p>Choose your move!</p>
  <button onclick="attack()">attack</button>
  <button onclick="resetGame()">reset</button>
  `;
};
