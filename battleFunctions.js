// ****************
// CHECK INITIATIVE
// ----------------
const checkInitiative = () => {
  setEnemy();
  let playerSpeed = selectedPlayer[0].speed + diceRoll(1, 20);
  let enemySpeed = selectedEnemy[0].speed + diceRoll(1, 20);
  console.log(`initiative player:${playerSpeed} enemy:${enemySpeed}`);
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
  return baseDamage <= 0 ? (damage = 0) : (damage = baseDamage * mod);
};

// ********************
// CHAMP SPEED MODIFIER
// --------------------
const speedMod = (champion) => {
  if (champion[0].speed >= 80) {
    speedModifier = 5;
  } else if (champion[0].speed >= 60 <= 79) {
    speedModifier = 2;
  } else {
    speedModifier = 0;
  }
  return speedModifier;
};

// *******************
// HIT CHANCE MODIFIER
// -------------------
const hitChance = (champion) => {
  let hitChance = diceRoll(0, 20) + speedMod(champion);
  switch (hitChance) {
    // MISS
    case 0:
    case 1:
    case 2:
      mod = 0;
      break;
    // CRITICAL
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
      mod = 2;
      break;
    // NORMAL
    default:
      mod = 1;
      break;
  }
  return mod;
};

// **********************
// PLAYER ATTACK SEQUENCE
// ----------------------
const playerAttack = () => {
  document.getElementById("player-avatar").classList.remove("appear"); //FIXME:
  document.getElementById("player-avatar").classList.add("move-right"); //FIXME:
  playRandomSound();
  hitChance(selectedPlayer);
  damageCalculation(selectedPlayer, selectedEnemy);
  // INJECT HTML HIT SCORE (MISS-CRITS-NORMAL)
  if (mod === 0) {
    getPlayerScore.innerHTML = `${selectedPlayer[0].name} <b>MISS!</b>`;
  } else if (mod === 2) {
    getPlayerScore.innerHTML = `${selectedPlayer[0].name} <b>CRITS</b> for: <b>${damage}</b>`;
  } else {
    getPlayerScore.innerHTML = `${selectedPlayer[0].name} hits for: <b>${damage}</b>`;
  }
  // UPDATE HP
  selectedEnemy[0].health -= damage;
  // UPDATE PROGRESS BAR
  document.querySelector(".enemy-health").value = selectedEnemy[0].health;
};

// *********************
// ENEMY ATTACK SEQUENCE
// ---------------------
const enemyAttack = () => {
  document.getElementById("enemy-avatar").classList.remove("appear"); //FIXME:
  document.getElementById("enemy-avatar").classList.add("move-left"); //FIXME:
  playRandomSound();
  hitChance(selectedEnemy);
  damageCalculation(selectedEnemy, selectedPlayer);
  // INJECT HTML HIT SCORE (MISS-CRITS-NORMAL)
  if (mod === 0) {
    getEnemyScore.innerHTML = `${selectedEnemy[0].name} <b>MISS!</b>`;
  } else if (mod === 2) {
    getEnemyScore.innerHTML = `${selectedEnemy[0].name} <b>CRITS</b> for: <b>${damage}</b>`;
  } else {
    getEnemyScore.innerHTML = `${selectedEnemy[0].name} hits for: <b>${damage}</b>`;
  }
  // UPDATE HP
  selectedPlayer[0].health -= damage;
  // UPDATE PROGRESS BAR
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
    champion[0].type === "player"
      ? // IF PLAYER DIES, RESTART
        setDeathScene()
      : // IF ENEMY DIES, CONTINUE GAME
        setDelay(2500).then(() => setStartScene());
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
    // BATTLE SEQUENCE
  } else {
    // getScoreResult.innerHTML = `°º¤ø,¸¸,ø¤º°°º¤ø,¸,ø¤º°`;
    // getScoreResult.innerHTML = `(∩ ͡° ͜ʖ ͡°)⊃━☆ﾟ. *`;
    getScoreResult.innerHTML = `(ง ͠° ͟ل͜ ͡°)ง ☆ ლ( ͠°⏠ °ლ)`;
  }
};
