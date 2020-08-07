// ****************************
// SHOW CHAMPION LIST FROM DATA
// ----------------------------
const playersList = () => {
  players.forEach((player) => {
    const playersItem = `
    <li onclick="setGameStart('${player.name}')" class="champion-item">
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
const getPlayer = (name) => {
  selectedPlayer = players.filter((player) => player.name === name);
  return selectedPlayer;
};

// ***********
// SET UP GAME
// -----------
const setGameStart = (name) => {
  setPlayer(name);
  setArena();
  setStartScene();
};

// *************************
// SETS THE ARENA FOR BATTLE
//--------------------------
const setArena = () => {
  // HIDE SELECT CHAMPION LIST
  championList.innerHTML = "";
  // SHOW ARENA AND STATS
  getArena.style.visibility = "visible";
  getStats.style.visibility = "visible";
  // DISPLAY ARENA DEFAULT TEXT
  getScoreCounterHeader.innerHTML = "ENEMY COUNTER";
  getScore.innerHTML = "?";
  getScoreLogHeader.innerHTML = "COMBAT LOGS";
  getEnemyScore.innerHTML = "...";
  getPlayerScore.innerHTML = "...";
  getScoreResultHeader.innerHTML = "ARENA SPEAKER";
  getScoreResult.innerHTML = "start fighting!";
};

// ****************************
// GET ENEMY FROM DATA IF ALIVE
// ----------------------------
const getEnemy = () => {
  // GET A RANDOM ENEMY FROM ALIVE POOL
  let counter = diceRoll(getAliveEnemy.length);
  selectedEnemy = new Array(getAliveEnemy[counter]);
  return selectedEnemy;
};

// ************************
// SETS PLAYER IN THE ARENA
// ------------------------
const setPlayer = (name) => {
  getPlayer(name);
  setPlayerStats();
};

// ************************
// SETS ENEMEY IN THE ARENA
// ------------------------
const setEnemy = () => {
  // audioFight.play(); // <-< UNCOMMENT FOR MUSIC
  getEnemy();
  setEnemyStats();
  // CLEAR SCORE AFTER SUMMONING ENEMY
  getScoreResult.innerHTML = "start fighting!";
  getPlayerScore.innerHTML = "...";
  getEnemyScore.innerHTML = "...";
  setFightScene();
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
      <label for="player-health">HP</label>
      <progress 
        class="player-health" 
        value="${player.health}" 
        max="100"
        data-lable="${player.health}">
      </progress>
      <label for="player-energy">EP</label>
      <progress 
        class="player-energy" 
        value="${player.energy}" 
        max="100"
        data-lable="${player.energy}">
      </progress>
      <label for="player-strength">ST</label>
      <progress 
        class="player-strength" 
        value="${player.strength}" 
        max="100" 
        data-lable="${player.strength}">
      </progress>
      <label for="player-speed">SP</label>
      <progress 
        class="player-speed" 
        value="${player.speed}" 
        max="100" 
        data-lable="${player.speed}">
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

// ************************
// BTN HEADER AT START GAME
// ------------------------
const setStartScene = () => {
  // REMOVE ALL ADDITIONAL ANIMATION CLASSES
  document.getElementById("player-avatar").classList.remove("move-right");
  // UPDATE COUNTER
  getAliveEnemy = mobs.filter((mob) => mob.status === "alive");
  getScore.innerHTML = getAliveEnemy.length;
  // ADD START BTN SET
  getHeaderActions.innerHTML = `
  <p>Get ready!</p>
  <button class="btn-start" onclick="setEnemy()">summon demon</button>
  <button class="btn-restart" onclick="restartGame()">restart game</button>
  `;
};

// **************************
// BTN HEADER AT PLAYER DEATH
// --------------------------
const setDeathScene = () => {
  // ADD RESTART BTN SET
  getHeaderActions.innerHTML = `
      <p>You lose!</p>
      <button class="btn-restart" onclick="restartGame()">restart game</button>
  `;
};

// ************************
// BTN HEADER WHEN FIGHTING
// ------------------------
const setFightScene = () => {
  // ADD FIGHTIN BTN SET
  getHeaderActions.innerHTML = `
  <p>Make your move!</p>
  <button class="btn-attack" onclick="attack()">attack enemy</button>
  <button class="btn-defend" onclick="attack()">defend stance</button>
  <button class="btn-rest" onclick="attack()">rest stance</button>
  <button class="btn-special" onclick="attack()">special attack</button>
  <button class="btn-restart" onclick="restartGame()">restart game</button>
  `;
};
