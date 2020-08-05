// ****************************
// GET SELECTED PLAYER AT START
// ----------------------------
const getPlayer = (classType) => {
  selectedPlayer = players.filter((mob) => mob.classe === classType);
  return selectedPlayer;
};

// ******************
// GET ENEMY IF ALIVE
// ------------------
const getEnemy = () => {
  getAliveEnemy = mobs.filter((mob) => mob.status === "alive");
  let counter = diceRoll(getAliveEnemy.length);
  selectedEnemy = new Array(getAliveEnemy[counter]);
  return selectedEnemy;
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
  <button onclick="restartGame()">restart</button>
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
  // audioFight.play(); <-< UNCOMMENT FOR MUSIC
  getEnemy();
  setEnemyStats();
  getHeaderActions.innerHTML = `
  <p>Choose your move!</p>
  <button onclick="attack()">attack</button>
  <button onclick="restartGame()">restart</button>
  `;
};

// ******************************
// SET UP GAME AFTER CHAMP SELECT
// ------------------------------
const setGameStart = (classType) => {
  setPlayer(classType);
  setArena();
};

// *****************************
// DISPLAY SELECTED PLAYER STATS
// -----------------------------
const setPlayerStats = () => {
  playerNew = selectedPlayer.map((player) => {
    return `
      <img class="player-icon" src="${player.icon}"></img>
      <img class="player-avatar" src="${player.avatar}"></img>
      <h2 class="player-name">${player.name}</h2>
      <progress 
        class="player-health" 
        value="${player.health}" 
        max="100"
        data-lable="HP">
      </progress>
      <progress 
        class="player-mana" 
        value="${player.mana}" 
        max="100"
        data-lable="MP">
      </progress>
      <progress 
        class="player-strength" 
        value="${player.strength}" 
        max="100" data-lable="STR">
      </progress>
      `;
  });
  getPlayerStats.innerHTML = `${playerNew}`;
};

// *****************************
// DISPLAY SELECTED ENEMY STATS
// -----------------------------
const setEnemyStats = () => {
  enemyNew = selectedEnemy.map((enemy) => {
    return `
      <img class="enemy-icon" src="${enemy.icon}"></img>
      <img class="enemy-avatar" src="${enemy.avatar}"></img>
      <h2>${enemy.name}</h2>
      <progress 
        class="enemy-health" 
        value="${enemy.health}" 
        max="100" 
        data-lable="HP">
      </progress>
      <progress 
        class="enemy-mana" 
        value="${enemy.mana}" 
        max="100" 
        data-lable="MP">
      </progress>
      <progress 
        class="enemy-strength" 
        value="${enemy.strength}" 
        max="100" 
        data-lable="STR">
      </progress>
      `;
  });
  getEnemyStats.innerHTML = `${enemyNew}`;
};
