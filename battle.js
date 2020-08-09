// **************
// FIGHT SEQUENCE
// --------------
const attack = () => {
  playerAttack();
  checkDeath(selectedEnemy);
  setEnemyStats();

  // STOP ENEMY HIT DEAD
  selectedEnemy[0].status !== "dead" &&
    setDelay(2000).then(() => {
      enemyAttack();
      checkDeath(selectedPlayer);
      setPlayerStats();
      checkVictory();
    });
  // CHECK VICTORY Fn IF ENEMY IS ALREADY DEAD
  checkVictory();
};
