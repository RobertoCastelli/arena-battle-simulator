// **********************
// PLAYER ATTACK SEQUNECE
// ----------------------
const playerAttackSequence = () => {
  playerAttack();
  checkDeath(selectedEnemy);
  setDelay(800).then(() => setEnemyStats());
  // IF ENEMY IS NOT DEAD --> ENEMY HIT SEQUENCE
  selectedEnemy[0].status !== "dead" &&
    setDelay(1000).then(() => enemyAttackSequence());
  checkBattleStatus();
};

// *********************
// ENEMY ATTACK SEQUENCE
// ---------------------
const enemyAttackSequence = () => {
  setDelay(1500).then(() => {
    enemyAttack();
    checkDeath(selectedPlayer);
    setDelay(800).then(() => setPlayerStats());
    checkBattleStatus();
  });
};
