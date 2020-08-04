// *******************
// GET SELECTED PLAYER
// -------------------
const getPlayer = (classType) => {
  selectedPlayer = players.filter((mob) => mob.classe === classType);
  return selectedPlayer;
};

// *********
// GET ENEMY
// ---------
const getEnemy = () => {
  selectedEnemy = mobs.map((mob) => mob);
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
           <p>HP: ${enemy.health}</p>
           <p>MP: ${enemy.mana}</p>
           <p>STR: ${enemy.strength}</p>
           `;
  });
  getEnemyStats.innerHTML = `${enemyNew}`;
};

// *****************************
// DISPLAY SELECTED PLAYER STATS
// -----------------------------
const setPlayerStats = () => {
  playerNew = selectedPlayer.map((player) => {
    return `
    <img class="player-icon" src="${player.icon}"></img>
    <img class="player-avatar" src="${player.avatar}"></img>
    <h2>${player.name}</h2>
    <p class="player-health">HP: ${player.health}</p>
    <p>MP: ${player.mana}</p>
    <p>STR: ${player.strength}</p>
    `;
  });
  getPlayerStats.innerHTML = `${playerNew}`;
};

// ************
// RESTART GAME
//-------------
const resetGame = () => window.location.reload();

// CHECK SPEED -> WHO ATTACKS FIRST
// ATTACK SEQUENCE Att/Def -> Def/Att -> CHECK DEATH
// CHECK ENERGY -> WHO ATTACKS
// ATTACK SEQUENCE Att/Def -> Def/Att -> CHECK DEAT

// ****************
// DICE ROLL RANDOM
// ----------------
const diceRoll = (power) => Math.floor(Math.random() * power);

// ***********
// CHECK DEATH
// -----------
const checkNegativeHp = (champion) => {
  if (champion[0].health <= 0) champion[0].health = 0;
};

const checkVictory = () => {
  if (selectedPlayer[0].health <= 0 && selectedEnemy[0].health <= 0) {
    getScoreResult.innerHTML = `You both Die!`;
  } else if (selectedPlayer[0].health <= 0 && selectedEnemy[0].health > 0) {
    getScoreResult.innerHTML = `${selectedEnemy[0].name} slays ${selectedPlayer[0].name}, You Lose!`;
  } else if (selectedEnemy[0].health <= 0 && selectedPlayer[0].health > 0) {
    getScoreResult.innerHTML = `${selectedPlayer[0].name} slays ${selectedEnemy[0].name}, You Win!`;
  } else {
    getScoreResult.innerHTML = `Keep Fighting!`;
  }
};

// **********************
// PLAYER ATTACK SEQUENCE
// ----------------------
const playerAttack = () => {
  let playerDamage = diceRoll(selectedPlayer[0].strength);
  getPlayerScore.innerHTML = `${selectedPlayer[0].name} hits for: ${playerDamage}`;
  selectedEnemy[0].health -= playerDamage;
};

// *********************
// ENEMY ATTACK SEQUENCE
//---------------------
const enemyAttack = () => {
  let enemyDamage = diceRoll(selectedEnemy[0].strength);
  getEnemyScore.innerHTML = `${selectedEnemy[0].name} hits for: ${enemyDamage}`;
  selectedPlayer[0].health -= enemyDamage;
};

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// ***********
// FIGHT SCENE
// -----------

const attack = () => {
  playerAttack();
  checkNegativeHp(selectedEnemy);
  setEnemyStats();
  delay(2000).then(() => {
    enemyAttack();
    checkNegativeHp(selectedPlayer);
    setPlayerStats();
    checkVictory();
  });
};
