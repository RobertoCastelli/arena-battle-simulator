// ********************************
// GENERATE CHAMPION LIST FROM DATA
// --------------------------------
const playersList = () => {
  players.forEach((player) => {
    const playersItem = `
    <li onclick="setGameStart('${player.classe}')" class="champion-item">
      <img class="champion-image" src="${player.icon}" alt="avatar" />
      <h3 class="champion-name">${player.name}</h3>
    </li>
    `;
    let position = "beforeend";
    championList.insertAdjacentHTML(position, playersItem);
  });
};
playersList();

// *****************************
// GET PLAYER FROM LIST AT START
// -----------------------------
const getPlayer = (classType) => {
  selectedPlayer = players.filter((player) => player.classe === classType);
  return selectedPlayer;
};

// ***********
// SET UP GAME
// -----------
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
  getScoreCounterHeader.innerHTML = "ENEMY COUNTER";
  getScore.innerHTML = "???";
  getScoreLogHeader.innerHTML = "COMBAT LOGS";
  getPlayerScore.innerHTML = "...";
  getEnemyScore.innerHTML = "...";
  getScoreResultHeader.innerHTML = "ARENA SPEAKER";
  getScoreResult.innerHTML = "start fighting!";
  // REMOVE ALL ADDITIONAL ANIMATION CLASSES
  document.getElementById("player-avatar").classList.remove("move-right");
  // ADD START AND RESET BUTTONS
  getHeaderActions.innerHTML = `
  <p>Get ready!</p>
  <button class="btn-start" onclick="setEnemy()">start game</button>
  <button class="btn-restart" onclick="restartGame()">restart game</button>
  `;
};

// ****************************
// GET ENEMY FROM LIST IF ALIVE
// ----------------------------
const getEnemy = () => {
  getAliveEnemy = mobs.filter((mob) => mob.status === "alive");
  getScore.innerHTML = getAliveEnemy.length;
  let counter = diceRoll(getAliveEnemy.length);
  selectedEnemy = new Array(getAliveEnemy[counter]);
  return selectedEnemy;
};

// ************************
// SETS PLAYER IN THE ARENA
// ------------------------
const setPlayer = (classType) => {
  getPlayer(classType);
  setPlayerStats();
};

// ************************
// SETS ENEMEY IN THE ARENA
// ------------------------
const setEnemy = () => {
  // audioFight.play(); // <-< UNCOMMENT FOR MUSIC
  getEnemy();
  setEnemyStats();
  getHeaderActions.innerHTML = `
  <p>Choose your move!</p>
  <button class="btn-attack" onclick="attack()">attack enemy</button>
  <button class="btn-defend" onclick="attack()">defend stance</button>
  <button class="btn-rest" onclick="attack()">rest stance</button>
  <button class="btn-special" onclick="attack()">special attack</button>
  <button class="btn-restart" onclick="restartGame()">restart game</button>
  `;
};

// ********************
// DISPLAY PLAYER STATS
// --------------------
const setPlayerStats = () => {
  playerNew = selectedPlayer.map((player) => {
    return `
      <img class="player-icon" src="${player.icon}"></img>
      <img id="player-avatar" class="player-avatar" src="${player.avatar}"></img>
      <h2 class="player-name">${player.name}</h2>
      <progress 
        class="player-health" 
        value="${player.health}" 
        max="100"
        data-lable="HP">
      </progress>
      <progress 
        class="player-energy" 
        value="${player.energy}" 
        max="100"
        data-lable="EP">
      </progress>
      <progress 
        class="player-strength" 
        value="${player.strength}" 
        max="100" 
        data-lable="STR">
      </progress>
      <progress 
        class="player-speed" 
        value="${player.speed}" 
        max="100" 
        data-lable="SPD">
      </progress>
      `;
  });
  getPlayerStats.innerHTML = `${playerNew}`;
};

// *******************
// DISPLAY ENEMY STATS
// -------------------
const setEnemyStats = () => {
  enemyNew = selectedEnemy.map((enemy) => {
    return `
      <img class="enemy-icon" src="${enemy.icon}"></img>
      <img id="enemy-avatar" class="enemy-avatar" src="${enemy.avatar}"></img>
      <h2>${enemy.name}</h2>
      <label for="enemy-health">HP</label>
      <progress 
        class="enemy-health" 
        value="${enemy.health}" 
        max="100" 
        data-lable="${enemy.health}">
      </progress>
    
      <label for="enemy-energy">EP</label>
      <progress 
        class="enemy-energy" 
        value="${enemy.energy}" 
        max="100" 
        data-lable="${enemy.energy}">
      </progress>
      <label for="enemy-strength">ST</label>
      <progress 
        class="enemy-strength" 
        value="${enemy.strength}" 
        max="100" 
        data-lable="${enemy.strength}">
      </progress>
      <label for="enemy-speed">SP</label>
      <progress 
        class="enemy-speed" 
        value="${enemy.speed}" 
        max="100" 
        data-lable="${enemy.speed}">
      </progress>
      `;
  });
  getEnemyStats.innerHTML = `${enemyNew}`;
};
