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
  let strength = attacker[0].strength + diceRoll(0, 10);
  let defence = defender[0].defence + diceRoll(0, 10);
  let defenceMod = strength * (defence / 100);
  let baseDamage = Math.floor((strength - defenceMod) * energyMod(attacker));
  // DO NOT ACCEPT NEGATIVE VALUES
  console.log(`baseDMG: ${baseDamage}`);
  return baseDamage <= 0 ? (damage = 0) : (damage = baseDamage * mod);
};

const energyMod = (attacker) => {
  let energy = attacker[0].energy;
  if (energy >= 60) {
    energyModifier = 1;
  } else if (energy >= 5 && energy <= 59) {
    energyModifier = 0.5;
  } else {
    energyModifier = 0.2;
  }
  console.log(`energyMod: ${energyModifier}`);
  return energyModifier;
};

// ********************
// CHAMP SPEED MODIFIER
// --------------------
const speedMod = (champion) => {
  if (champion[0].speed >= 80) {
    speedModifier = 4;
  } else if (champion[0].speed >= 60 && champion[0].speed <= 79) {
    speedModifier = 2;
  } else {
    speedModifier = 0;
  }
  console.log(`speedMod: ${speedModifier}`);
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
    case 3:
    case 4:
    case 5:
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
  console.log(`hitchance: ${hitChance}`);
  return mod;
};

// ***********************
// PLAYER DEFENCE SEQUENCE
// -----------------------
let playerDefended = false;
const playerDefence = () => {
  selectedPlayer[0].defence += 1000;
  selectedPlayer[0].energy -= diceRoll(10, 50);
  document.querySelector(".player-energy").value = selectedPlayer[0].energy;
  playerDefended = true;
};

// ***********************
// PLAYER REST SEQUENCE
// -----------------------
let playerRested = false;
const playerRest = () => {
  // UPDATE PLAYER STATS
  selectedPlayer[0].energy += diceRoll(5, 30);
  selectedPlayer[0].health += diceRoll(5, 20);
  // IF RESTING LOSE DEFENCE
  selectedPlayer[0].defence -= 10;
  playerRested = true;
  // DO NOT ACCEPT NUMBERS > 100
  selectedPlayer[0].energy > 100 && (selectedPlayer[0].energy = 100);
  selectedPlayer[0].health > 100 && (selectedPlayer[0].health = 100);
  // UPDATE PROGRESS BAR
  document.querySelector(".player-energy").value = selectedPlayer[0].energy;
  document.querySelector(".player-health").value = selectedPlayer[0].health;
};

// **********************
// PLAYER ATTACK SEQUENCE
// ----------------------
const playerAttack = () => {
  // GIVE BACK DEFENCE IF PLAYER RESTED
  // playerRested === true && (selectedPlayer[0].defence += 8);
  // playerRested = false;

  // RESET DEFENCE STATE IF PLAYYER DEFENDED ROUND BEFORE
  playerDefended === true && (selectedPlayer[0].defence -= 1000);
  playerDefended = false;
  // ANIMATIONS
  getArena.classList.remove("shake"); //FIXME:
  document.getElementById("player-avatar").classList.remove("appear"); //FIXME:
  document.getElementById("player-avatar").classList.add("move-right"); //FIXME:
  playRandomSound();
  hitChance(selectedPlayer);
  damageCalculation(selectedPlayer, selectedEnemy);
  // INJECT HTML HIT SCORE (MISS-CRITS-NORMAL)
  if (mod === 0) {
    getPlayerScore.innerHTML = `${selectedPlayer[0].name} <b>MISS!</b>`;
  } else if (mod === 2) {
    getArena.classList.add("shake");
    getPlayerScore.innerHTML = `${selectedPlayer[0].name} <b>CRITS</b> for: <b>${damage}</b>`;
  } else {
    getPlayerScore.innerHTML = `${selectedPlayer[0].name} hits for: <b>${damage}</b>`;
  }
  // UPDATE STATS HP
  selectedEnemy[0].health -= damage;
  selectedPlayer[0].energy -= Math.floor(damage / 2);
  checkEnergyNegatives(selectedPlayer);
  // UPDATE PROGRESS BAR
  document.querySelector(".enemy-health").value = selectedEnemy[0].health;
  document.querySelector(".player-energy").value = selectedPlayer[0].energy;
};

// *********************
// ENEMY ATTACK SEQUENCE
// ---------------------
const enemyAttack = () => {
  getArena.classList.remove("shake"); //FIXME:
  document.getElementById("enemy-avatar").classList.remove("appear"); //FIXME:
  document.getElementById("enemy-avatar").classList.add("move-left"); //FIXME:
  playRandomSound();
  hitChance(selectedEnemy);
  damageCalculation(selectedEnemy, selectedPlayer);
  // INJECT HTML HIT SCORE (MISS-CRITS-NORMAL)
  if (mod === 0) {
    getEnemyScore.innerHTML = `${selectedEnemy[0].name} <b>MISS!</b>`;
  } else if (mod === 2) {
    getArena.classList.add("shake");
    getEnemyScore.innerHTML = `${selectedEnemy[0].name} <b>CRITS</b> for: <b>${damage}</b>`;
  } else {
    getEnemyScore.innerHTML = `${selectedEnemy[0].name} hits for: <b>${damage}</b>`;
  }
  // UPDATE HP
  selectedPlayer[0].health -= damage;
  selectedEnemy[0].energy -= Math.floor(damage / 2);
  checkEnergyNegatives(selectedEnemy);
  // UPDATE PROGRESS BAR
  document.querySelector(".player-health").value = selectedPlayer[0].health;
  document.querySelector(".enemy-energy").value = selectedEnemy[0].energy;
};

// ******************
// CHECK DEATH STATUS
// ------------------
const checkDeathStatus = (champion) => {
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
// CHECK ENERGY STATUS
// -------------------
const checkEnergyNegatives = (champion) =>
  champion[0].energy <= 0 && (champion[0].energy = 0);

// *******************
// CHECK HEALTH STATUS
// -------------------
const checkHealthStatus = () => {
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
