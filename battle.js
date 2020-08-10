// **********************
// PLAYER ATTACK SEQUNECE
// ----------------------
const attackPlayerSequence = () => {
  playerAttack();
  checkDeath(selectedEnemy);
  setEnemyStats();
  // STOP ENEMY HIT DEAD
  selectedEnemy[0].status !== "dead" &&
    setDelay(1000).then(() => {
      enemyAttackSequence();
      // checkBattleStatus();
    });
  // CHECK VICTORY Fn IF ENEMY IS ALREADY DEAD
  checkBattleStatus();
};

// *********************
// ENEMY ATTACK SEQUENCE
// ---------------------
const enemyAttackSequence = () => {
  setDelay(2000).then(() => {
    enemyAttack();
    checkDeath(selectedPlayer);
    setPlayerStats();
    checkBattleStatus();
  });
};
