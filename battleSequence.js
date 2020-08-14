// **********************
// PLAYER ATTACK SEQUNECE
// ----------------------
const playerAttackSequence = () => {
  playerAttack();
  checkDeathStatus(selectedEnemy);
  setDelay(800).then(() => {
    setEnemyStats();
    setPlayerStats();
  });
  // IF ENEMY IS NOT DEAD --> ENEMY HIT SEQUENCE
  selectedEnemy[0].status !== "dead" && enemyAttackSequence();
  checkHealthStatus();
};

// ********************
// PLAYER REST SEQUENCE
// --------------------
const playerRestSequence = () => {
  playerRest();
  setDelay(800).then(() => setPlayerStats());
  // IF ENEMY IS NOT DEAD --> ENEMY HIT SEQUENCE
  enemyAttackSequence();
};

// *********************
// ENEMY ATTACK SEQUENCE
// ---------------------
const enemyAttackSequence = () => {
  setDelay(1800).then(() => {
    enemyAttack();
    checkDeathStatus(selectedPlayer);
    setDelay(800).then(() => {
      setPlayerStats();
      setEnemyStats();
    });
  });
};
