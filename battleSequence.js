// **********************
// PLAYER ATTACK SEQUNECE
// ----------------------
const playerAttackSequence = () => {
  playerAttack();
  checkDeath(selectedEnemy);
  setEnemyStats();
  // STOP ENEMY HIT DEAD
  selectedEnemy[0].status !== "dead" &&
    setDelay(1000).then(() => {
      enemyAttackSequence();
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
