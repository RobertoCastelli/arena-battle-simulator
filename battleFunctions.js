// ********************
// 19. CHECK INITIATIVE
// --------------------
const checkInitiative = () => {
  setEnemy();
  let playerSpeed = selectedPlayer[0].speed + diceRoll(1, 10);
  let enemySpeed = selectedEnemy[0].speed + diceRoll(1, 10);
  console.log(playerSpeed, enemySpeed);
  if (playerSpeed > enemySpeed) {
    getScoreResult.innerHTML = "You move first";
  } else {
    getScoreResult.innerHTML = "Enemy moves first";
    enemyAttackSequence();
  }
};

// **********************
// 19. DAMAGE CALCULATION
// ----------------------

const damageCalculation = (attacker, defender) => {
  damage = Math.abs(
    Math.floor(
      attacker[0].strength - (attacker[0].strength * defender[0].defence) / 100
    )
  );
  console.log(damage);
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
  playRandomSound();
  // CALCULATE MAX DAMAGE
  damageCalculation(selectedPlayer, selectedEnemy);
  // INJECT HTML HIT SCORE
  getPlayerScore.innerHTML = `${selectedPlayer[0].name} hits for: <b>${damage}</b>`;
  // UPDATE HP
  selectedEnemy[0].health -= damage;
};

// *************************
// 20. ENEMY ATTACK SEQUENCE
//-------------------------
const enemyAttack = () => {
  // REMOVE ENEMY APPEAR ANIMATION
  // START ENEMY ATTACK ANIMATION
  document.getElementById("enemy-avatar").classList.remove("appear"); //FIXME:
  document.getElementById("enemy-avatar").classList.add("move-left"); //FIXME:
  // GENERATE HIT SOUND
  playRandomSound();
  // GET DAMAGE + RANDOM
  damageCalculation(selectedEnemy, selectedPlayer);
  // INJECT HTML HIT SCORE
  getEnemyScore.innerHTML = `${selectedEnemy[0].name} hits for: <b>${damage}</b>`;
  // UPDATE HP
  selectedPlayer[0].health -= damage;
};

// ************************
// 21. CHECK DEATH & DISPLAY THE TEXT
// ------------------------
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
// 22. CHECK BATTLE STATUS
// ------------------------
const checkBattleStatus = () => {
  // PLAYER DIES TEXT
  if (selectedPlayer[0].health <= 0 && selectedEnemy[0].health > 0) {
    getScoreResult.innerHTML = `${selectedEnemy[0].name} slays ${selectedPlayer[0].name}`;
    setTimeout(() => {
      getScoreResult.innerHTML = "You are dead";
      resetAudio();
    }, 2500);
    // ENEMY DIES TEXT
  } else if (selectedEnemy[0].health <= 0 && selectedPlayer[0].health > 0) {
    getScoreResult.innerHTML = `${selectedPlayer[0].name} slays ${selectedEnemy[0].name}`;
    setTimeout(() => {
      getScoreResult.innerHTML = "Make your choice!";
    }, 2500);
    // NOONE DIES SEQUENCE
  } else {
    getScoreResult.innerHTML = `°º¤ø,¸¸,ø¤º°°º¤ø,¸,ø¤º°`;
  }
};
