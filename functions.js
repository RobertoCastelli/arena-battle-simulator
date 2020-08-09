/**
 * TODO:
 * calibrate HP MP etc
 * add who starts to attack based on speed
 * add ending scene
 * add ending recap score
 * add animation progress bar
 * add animation effect on special attack
 * add animation on death
 *
 * |~~~~~~|
 * |INDICE|
 * |~~~~~~|
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~|
 * ------ USEFUL FUNCTIONS|
 * ~~~~~~~~~~~~~~~~~~~~~~~|
 * 1. Restart Game
 * 2. Dice Roll
 * 3. Set a Delay
 * 4. Stop and Reset Audio
 * ~~~~~~~~~~~~~~~~~~~|
 * ------ SELECT SCENE|
 * ~~~~~~~~~~~~~~~~~~~|
 * 5. Show Champion List from Data
 * 6. Get Champion from List
 * 7. Open Modal
 * 8. Close Modal
 * 9. Modal Template
 * ~~~~~~~~~~~~~~~~~~~|
 * ------ BATTLE SCENE|
 * ~~~~~~~~~~~~~~~~~~~|
 * 10. Set the Arena
 * 11. Get Enemy from Alive Array
 * 12. Set Player in the Arena
 * 13. Set Enemy in the Arena
 * 14. Display Player Stats
 * 15. Display Enemy Stats
 * 16. Display Buttons at Start
 * 17. Display Buttons when Dead
 * 18. Display Buttons when Fighting
 * ~~~~~~~~~~~~~~~~~~~~~|
 * ------ FIGHTING SCENE|
 * ~~~~~~~~~~~~~~~~~~~~~|
 * 19. Player Attack
 * 20. Enemy Attack
 * 21. Death Sequence
 * 22. Check for Vicotory
 **/

// ***************
// 1. RESTART GAME
//----------------
const restartGame = () =>
  confirm("Your game is about to restart") && window.location.reload();

// ************
// 2. DICE ROLL
// ------------
const diceRoll = (power) => Math.floor(Math.random() * power);

// **************
// 3. SET A DELAY
// --------------
const setDelay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// ***********************
// 4. STOP AND RESET AUDIO
// -----------------------
const resetAudio = () => {
  audioFight.pause();
  audioFight.currentTime = 0;
};

// *******************************
// 5. SHOW CHAMPION LIST FROM DATA
// -------------------------------
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

// ******************************************
// 6. GET PLAYER FROM SELECTION LIST AT START
// ------------------------------------------
const getPlayer = (name) =>
  (selectedPlayer = players.filter((player) => player.name === name));

// *************
// 7. OPEN MODAL
// -------------
const openPlayerModal = () => (getModalContainer.style.visibility = "visible");

// **************
// 8. CLOSE MODAL
// --------------
const closePlayerModal = () => (getModalContainer.style.visibility = "hidden");

// *****************
// 9. MODAL TEMPLATE
// -----------------
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

// ****************************
// 10. SET THE ARENA FOR BATTLE
//-----------------------------
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

// ****************************
// 11. GET ENEMY FROM DATA IF ALIVE
// ----------------------------
const getEnemy = () => {
  // GET A RANDOM ENEMY FROM ALIVE POOL
  let randomPick = diceRoll(getAliveEnemy.length);
  selectedEnemy = new Array(getAliveEnemy[randomPick]);
  return selectedEnemy;
};

// ****************************
// 12. SETS PLAYER IN THE ARENA
// ----------------------------
const setPlayer = (name) => {
  getPlayer(name);
  setPlayerStats();
  audioFight.play(); // <-< UNCOMMENT FOR MUSIC ON/OFF
  // START PLAYER APPEAR ANIMATION
  document.getElementById("player-avatar").classList.add("appear"); //FIXME:
};

// ****************************
// 13. SETS ENEMEY IN THE ARENA
// ----------------------------
const setEnemy = () => {
  getEnemy();
  setEnemyStats();
  // CLEAR SCORE AFTER SUMMONING ENEMY
  getScoreResult.innerHTML = "start fighting!";
  getPlayerScore.innerHTML = "...";
  getEnemyScore.innerHTML = "...";
  setFightScene();
  // START ENEMYY APPEAR ANIMATION
  // REMOVE PLAYER ATTACK ANIMATION
  document.getElementById("enemy-avatar").classList.add("appear"); //FIXME:
  document.getElementById("player-avatar").classList.remove("move-right"); //FIXME:
};

// ************************
// 14. DISPLAY PLAYER STATS
// ------------------------
const setPlayerStats = () => {
  playerNew = selectedPlayer.map((player) => {
    return `
    <img class="player-icon" src="${player.icon}"></img>
    <img id="player-avatar" class="player-avatar" src="${player.avatar}"></img>
    <h3 class="player-name">${player.name}</h3>
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
  getPlayerStats.innerHTML = playerNew;
};

// ***********************
// 15. DISPLAY ENEMY STATS
// -----------------------
const setEnemyStats = () => {
  enemyNew = selectedEnemy.map((enemy) => {
    return `
    <img class="enemy-icon" src="${enemy.icon}"></img>
    <img id="enemy-avatar" class="enemy-avatar" src="${enemy.avatar}"></img>
    <h3>${enemy.name}</h3>
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
  getEnemyStats.innerHTML = enemyNew;
};

// ****************************
// 16. BTN HEADER AT START TURN
// ----------------------------
const setStartScene = () => {
  // REMOVE ALL ADDITIONAL ANIMATION CLASSES
  // document.getElementById("player-avatar").classList.remove("move-right");
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
    <button class="btn-start" onclick="setEnemy()">summon demon</button>
    <button class="btn-restart" onclick="restartGame()">restart game</button>
    `;
  }
};

// ******************************
// 17. BTN HEADER AT PLAYER DEATH
// ------------------------------
const setDeathScene = () => {
  // ADD RESTART BTN SET
  getHeaderActions.innerHTML = `
  <p>You lose!</p>
  <button class="btn-restart" onclick="restartGame()">restart game</button>
  `;
};

// ****************************
// 18. BTN HEADER WHEN FIGHTING
// ----------------------------
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

// **************************
// 19. PLAYER ATTACK SEQUENCE
// --------------------------
const playerAttack = () => {
  // REMOVE PLAYER APPEAR ANIMATION
  // START PLAYER ATTACK ANIMATION
  document.getElementById("player-avatar").classList.remove("appear"); //FIXME:
  document.getElementById("player-avatar").classList.add("move-right"); //FIXME:
  // GENERATE HIT SOUND
  audioSword.play();
  // CALCULATE MAX DAMAGE
  let damage = selectedPlayer[0].strength;
  let energyConsume = 10;
  let playerDamage = diceRoll(damage);
  // INJECT HTML HIT SCORE
  getPlayerScore.innerHTML = `${selectedPlayer[0].name} hits for: ${playerDamage}`;
  // UPDATE HP
  selectedEnemy[0].health -= playerDamage;
  selectedPlayer[0].energy -= energyConsume;
};

// *************************
// 20. ENEMY ATTACK SEQUENCE
//-------------------------
const enemyAttack = () => {
  // START ENEMY ATTACK ANIMATION
  document.getElementById("enemy-avatar").classList.add("move-left"); //FIXME:
  // GENERATE HIT SOUND
  audioPunch.play();
  // GET DAMAGE + RANDOM
  let enemyDamage = diceRoll(selectedEnemy[0].strength);
  // INJECT HTML HIT SCORE
  getEnemyScore.innerHTML = `${selectedEnemy[0].name} hits for: ${enemyDamage}`;
  // UPDATE HP
  selectedPlayer[0].health -= enemyDamage;
};

// ******************
// 21. DEATH SEQUENCE
// ------------------
const checkDeath = (champion) => {
  if (champion[0].health <= 0) {
    // SHAKE SCREEN IF DEAD
    getArena.classList.add("shake");
    champion[0].health = 0;
    champion[0].icon = "./images/rip.jpg";
    champion[0].status = "dead";
    champion[0].avatar = "";
    // IF PLAYER DIES, RESTART
    // IF ENEMY DIES, CONTINUE GAME
    champion[0].type === "player"
      ? setDeathScene()
      : setDelay(2500).then(() => setStartScene());
  }
};

// ************************
// 22. CHECK VICOTRY STATUS
// ------------------------
const checkVictory = () => {
  if (selectedPlayer[0].health <= 0 && selectedEnemy[0].health > 0) {
    getScoreResult.innerHTML = `${selectedEnemy[0].name} slays ${selectedPlayer[0].name}`;
    setTimeout(() => {
      getScoreResult.innerHTML = "You are dead";
      resetAudio();
    }, 2500);
  } else if (selectedEnemy[0].health <= 0 && selectedPlayer[0].health > 0) {
    getScoreResult.innerHTML = `${selectedPlayer[0].name} slays ${selectedEnemy[0].name}`;
    setTimeout(() => {
      getScoreResult.innerHTML = "Make your choice!";
    }, 2500);
  } else {
    getScoreResult.innerHTML = `Keep Fighting!`;
  }
};
