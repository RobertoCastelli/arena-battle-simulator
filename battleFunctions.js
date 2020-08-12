// ****************
// CHECK INITIATIVE
// ----------------
const checkInitiative = () => {
  setEnemy();
  let playerSpeed = selectedPlayer[0].speed + diceRoll(1, 20);
  let enemySpeed = selectedEnemy[0].speed + diceRoll(1, 20);
  console.log(playerSpeed, enemySpeed);
  if (playerSpeed > enemySpeed) {
    getScoreResult.innerHTML = "You move first";
  } else {
    getScoreResult.innerHTML = "Enemy moves first";
    enemyAttackSequence();
  }
};

// ******************
// DAMAGE CALCULATION
// ------------------
const damageCalculation = (attacker, defender) => {
  let strength = attacker[0].strength / 10 + diceRoll(0, 20);
  let defence = defender[0].defence / 10 + diceRoll(0, 20);
  let baseDamage = Math.floor(strength - (strength * defence) / 100);
  // DO NOT ACCEPT NEGATIVE VALUES
  if (baseDamage <= 0) baseDamage = 0;
  // HIT CHANCE: CRIT - MISS - NORMAL
  let hitChance = diceRoll(0, 20);
  console.log(`hitchance: ${hitChance}`);
  switch (hitChance) {
    case 0:
      damage = 0;
      console.log(`miss ${damage}`);
      break;
    case 19:
    case 20:
      damage = baseDamage * 2;
      console.log(`crit hit: ${damage}`);
      break;
    default:
      damage = baseDamage;
      console.log(`normal ${damage}`);
      break;
  }
};

// **********************
// PLAYER ATTACK SEQUENCE
// ----------------------
const playerAttack = () => {
  document.getElementById("player-avatar").classList.remove("appear"); //FIXME:
  document.getElementById("player-avatar").classList.add("move-right"); //FIXME:
  playRandomSound();
  damageCalculation(selectedPlayer, selectedEnemy);
  // INJECT HTML HIT SCORE
  getPlayerScore.innerHTML = `${selectedPlayer[0].name} hits for: <b>${damage}</b>`;
  // UPDATE HP
  selectedEnemy[0].health -= damage;
  document.querySelector(".enemy-health").value = selectedEnemy[0].health;
};

// *********************
// ENEMY ATTACK SEQUENCE
// ---------------------
const enemyAttack = () => {
  document.getElementById("enemy-avatar").classList.remove("appear"); //FIXME:
  document.getElementById("enemy-avatar").classList.add("move-left"); //FIXME:
  playRandomSound();
  damageCalculation(selectedEnemy, selectedPlayer);
  // INJECT HTML HIT SCORE
  getEnemyScore.innerHTML = `${selectedEnemy[0].name} hits for: <b>${damage}</b>`;
  // UPDATE HP
  selectedPlayer[0].health -= damage;
  document.querySelector(".player-health").value = selectedPlayer[0].health;
};

// ******************************
// CHECK DEATH & DISPLAY THE TEXT
// ------------------------------
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

// *******************
// CHECK BATTLE STATUS
// -------------------
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
    // getScoreResult.innerHTML = `°º¤ø,¸¸,ø¤º°°º¤ø,¸,ø¤º°`;
    // getScoreResult.innerHTML = `(∩ ͡° ͜ʖ ͡°)⊃━☆ﾟ. *`;
    getScoreResult.innerHTML = `(ง ͠° ͟ل͜ ͡°)ง ☆----☆ ლ( ͠°⏠ °ლ)`;
  }
};
