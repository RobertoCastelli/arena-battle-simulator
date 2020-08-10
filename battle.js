// **************
// FIGHT SEQUENCE
// --------------
const attackPlayerSequence = () => {
  playerAttack();
  checkDeath(selectedEnemy);
  setEnemyStats();

  // STOP ENEMY HIT DEAD
  selectedEnemy[0].status !== "dead" &&
    setDelay(1000).then(() => {
      enemyAttackSequence();
      checkVictory();
    });
  // CHECK VICTORY Fn IF ENEMY IS ALREADY DEAD
  checkVictory();
};

const enemyAttackSequence = () => {
  setDelay(2000).then(() => {
    enemyAttack();
    checkDeath(selectedPlayer);
    setPlayerStats();
    checkVictory();
  });
};
