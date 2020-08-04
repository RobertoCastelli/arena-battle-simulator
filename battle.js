// **************
// FIGHT SEQUENCE
// --------------

const attack = () => {
  playerAttack();
  checkDeath(selectedEnemy);
  setEnemyStats();
  setDelay(2000).then(() => {
    enemyAttack();
    checkDeath(selectedPlayer);
    setPlayerStats();
    checkVictory();
  });
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

// **************
// DEATH SEQUENCE
// --------------
const checkDeath = (champion) => {
  if (champion[0].health <= 0) {
    champion[0].health = 0;
    champion[0].icon = "./images/rip.png";
    champion[0].status = "dead";
    champion[0].avatar = "";
    setDelay(2000).then(() => setArena());
  }
};

// ********************
// CHECK VICOTRY STATUS
// --------------------
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
