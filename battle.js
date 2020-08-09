// **************
// FIGHT SEQUENCE
// --------------
const attack = () => {
  playerAttack();
  checkDeath(selectedEnemy);
  setEnemyStats();
  // STOP ENEMY HIT IF ENEMY DIES
  selectedEnemy[0].status !== "dead" &&
    setDelay(3000).then(() => {
      enemyAttack();
      checkDeath(selectedPlayer);
      setPlayerStats();
      checkVictory();
    });
  // CHECK VICTORY Fn IF ENEMY IS ALREADY DEAD
  checkVictory();
};
