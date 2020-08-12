// **********************
// PLAYER ATTACK SEQUNECE
// ----------------------
const playerAttackSequence = () => {
  playerAttack();
  checkDeath(selectedEnemy);
  // PLAYER HIT --> UPDATE STATS AFTER 500ms
  setDelay(800).then(() => setEnemyStats());
  // IF ENEMY IS NOT DEAD --> ENEMY HIT
  selectedEnemy[0].status !== "dead" &&
    setDelay(1000).then(() => enemyAttackSequence());
  // IF ENEMY IS DEAD --> UPDATE BATTLE STATUS
  checkBattleStatus();
};

// *********************
// ENEMY ATTACK SEQUENCE
// ---------------------
const enemyAttackSequence = () => {
  setDelay(2000).then(() => {
    enemyAttack();
    checkDeath(selectedPlayer);
    // ENEMY HIT --> UPDATE STATS AFTER 500ms
    setDelay(800).then(() => setPlayerStats());
    checkBattleStatus();
  });
};
