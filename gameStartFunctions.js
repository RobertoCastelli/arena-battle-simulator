// ****************************
// SHOW CHAMPION LIST FROM DATA
// ----------------------------
const playersList = () => {
  players.forEach((player) => {
    const playersItem = `
      <li onclick="showPlayerModal('${player.name}')" class="champion-item">
      <img class="champion-image" src="${player.icon}" alt="avatar" />
      <h3 class="champion-name">${player.name}</h3>
      </li>
      `;
    let position = "beforeend";
    championList.insertAdjacentHTML(position, playersItem);
  });
};

// ***************************************
// GET PLAYER FROM SELECTION LIST AT START
// ---------------------------------------
const getPlayer = (name) =>
  (selectedPlayer = players.filter((player) => player.name === name));

// **********
// OPEN MODAL
// ----------
const openPlayerModal = () => (getModalContainer.style.visibility = "visible");

// ***********
// CLOSE MODAL
// -----------
const closePlayerModal = () => (getModalContainer.style.visibility = "hidden");

// **************
// MODAL TEMPLATE
// --------------
const setPlayerModal = () => {
  modalPlayer = selectedPlayer.map((player) => {
    return `
      <h2 class="player-name">${player.name}</h2>
      <img class="player-icon" src="${player.icon}"></img>
      <h3>${player.classe}</h3>
      <p class="player-description">${player.description}</p>
      <button class="btn-start" onclick="setGameStart('${player.name}')">Select</button>
      <button class="btn-restart" onclick="closePlayerModal()">Cancel</button>
      `;
  });
  getModalContent.innerHTML = modalPlayer;
};

// ************************
// SET THE ARENA FOR BATTLE
// ------------------------
const setArena = () => {
  // HIDE SELECT CHAMPION LIST
  championList.innerHTML = "";
  // SHOW ARENA AND STATS
  getArena.style.visibility = "visible";
  getStats.style.visibility = "visible";
  // DISPLAY ARENA DEFAULT TEXT
  getScoreCounterHeader.innerHTML = "ARENA LEVEL";
  getScoreLogHeader.innerHTML = "COMBAT LOGS";
  getEnemyScore.innerHTML = "...";
  getPlayerScore.innerHTML = "...";
  getScoreResultHeader.innerHTML = `<hr>`;
  getScoreResult.innerHTML = "summon a Demon!";
};

// ********************************
// 11. GET ENEMY FROM DATA IF ALIVE
// --------------------------------
const getEnemy = () => {
  // GET A RANDOM ENEMY FROM ALIVE POOL
  let randomPick = diceRoll(0, getAliveEnemy.length);
  selectedEnemy = new Array(getAliveEnemy[randomPick]);
  return selectedEnemy;
};

// ********************
// DISPLAY PLAYER STATS
// --------------------
const setPlayerStats = () => {
  playerNew = selectedPlayer.map((player) => {
    return `
      <img class="player-icon" src="${player.icon}"></img>
      <img id="player-avatar" class="player-avatar" src="${player.avatar}"></img>
      <h3 class="player-name">${player.name}</h3>
      <div class="progress-bar">
        <progress 
          class="player-health" 
          value="${player.health}" 
          max="100"
          data-lable="${player.health}">
        </progress>
        <progress 
          class="player-energy" 
          value="${player.energy}" 
        max="100"
          data-lable="${player.energy}">
        </progress>
        <label for="player-strength"><i class="fas fa-fist-raised fa-2x"></i></label>
        <div 
          class="player-strength" 
          value="${player.strength}" 
          max="100" 
         >${player.strength}
        </div>
        <label for="player-defence"><i class="fas fa-shield-alt fa-2x"></i></label>
        <div 
          class="player-defence" 
          value="${player.defence}" 
          max="100" 
          >${player.defence}
        </div>  
        <label for="player-speed"><i class="fas fa-running fa-2x"></i></label>
        <div 
          class="player-speed" 
          value="${player.speed}" 
          max="100" 
          >${player.speed}
        </div>
      </div>
     `;
  });
  getPlayerStats.innerHTML = playerNew;
};

// *******************
// DISPLAY ENEMY STATS
// -------------------
const setEnemyStats = () => {
  enemyNew = selectedEnemy.map((enemy) => {
    return `
      <img class="enemy-icon" src="${enemy.icon}"></img>
      <img id="enemy-avatar" class="enemy-avatar" src="${enemy.avatar}"></img>
      <h3>${enemy.name}</h3>
      <div class="progress-bar">
        <progress 
          class="enemy-health" 
          value="${enemy.health}" 
          max="100" 
          data-lable="${enemy.health}">
        </progress>
        <progress 
          class="enemy-energy" 
          value="${enemy.energy}" 
          max="100" 
          data-lable="${enemy.energy}">
        </progress>
        <label for="enemy-strength"><i class="fas fa-fist-raised fa-2x"></i></label>
        <div
        class="enemy-strength" 
          value="${enemy.strength}" 
          max="100" 
          >${enemy.strength}
        </div>
         <label for="enemy-defence"><i class="fas fa-shield-alt fa-2x"></i></label>
        <div
        class="enemy-defence" 
          value="${enemy.defence}" 
          max="100" 
          >${enemy.defence}
        </div>
        <label for="enemy-speed"><i class="fas fa-running fa-2x"></i></label>
        <div 
          class="enemy-speed" 
          value="${enemy.speed}" 
          max="100" 
          >${enemy.speed}
        </div>
        </div>
      `;
  });
  getEnemyStats.innerHTML = enemyNew;
};

// ************************
// SETS PLAYER IN THE ARENA
// ------------------------
const setPlayer = (name) => {
  getPlayer(name);
  setPlayerStats();
  // START BATTLE MUSIC
  // audioFight.play(); // <-< UNCOMMENT FOR MUSIC ON/OFF
  // START PLAYER APPEAR ANIMATION
  document.getElementById("player-avatar").classList.add("appear"); //FIXME:
  // START PLAYER SPAWN SOUND
  document.querySelector(".audio-player-spawn").play();
};

// ************************
// SETS ENEMEY IN THE ARENA
// ------------------------
const setEnemy = () => {
  getEnemy();
  setEnemyStats();
  // CLEAR SCORE AFTER SUMMONING ENEMY
  getPlayerScore.innerHTML = "...";
  getEnemyScore.innerHTML = "...";
  setFightScene();
  // START ENEMYY APPEAR ANIMATION
  document.getElementById("enemy-avatar").classList.add("appear"); //FIXME:
  // START MONSTER SPWAN SOUND
  document.querySelector(".audio-enemy-spawn").play();
};

// ************************
// BTN HEADER AT START TURN
// ------------------------
const setStartScene = () => {
  // REMOVE ALL ADDITIONAL ANIMATION CLASSES
  getArena.classList.remove("shake"); //FIXME:
  document.getElementById("player-avatar").classList.remove("move-right"); //FIXME:
  // UPDATE COUNTER
  getAliveEnemy = mobs.filter((mob) => mob.status === "alive");
  getScore.innerHTML = mobs.length - getAliveEnemy.length;
  // CHECK IF ALL ENEMY AREA DEAD
  if (getAliveEnemy.length === 0) {
    resetAudio();
    getHeaderActions.innerHTML = `
      <p>you WIN!</p>
      <button class="btn-restart" onclick="restartGame()">restart game</button>
      `;
  } else {
    getHeaderActions.innerHTML = `
      <p>Get ready!</p>
      <button class="btn-start" onclick="checkInitiative()">summon demon</button>
      <button class="btn-restart" onclick="restartGame()">restart game</button>
      <button class="btn-start" onclick="rules()">game rules</button>
      `;
  }
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
    <p>Action Panel</p>
    <button class="btn-attack" onclick="playerAttackSequence()">attack enemy</button>
    <button class="btn-defend" onclick="playerDefenceSequence()">defend stance</button>
    <button class="btn-rest" onclick="playerRestSequence()">rest stance</button>
    <button class="btn-special" onclick="playerLastResortSequence()">last resort</button>
    <button class="btn-restart" onclick="restartGame()">restart game</button>
    `;
};
