/**
 * TODO:
 * add who starts to attack based on speed
 * add progress bar animation
 * remove combat log when enemy dies
 * add ending scene
 * add counydown
 * add continue battle button
 * add restart when you die
 * upgrade animations
 * add more champions and mobs
 * calibrate HP MP etc
 * add defence, specia attack
 * add combat sounds
 * add animation effect on special attack
 **/

// **************
// FIGHT SEQUENCE
// --------------
const attack = () => {
  playerAttack();
  checkDeath(selectedEnemy);
  setEnemyStats();
  // STOP ENEMY HIT IF ENEMY DIES
  selectedEnemy[0].status !== "dead" &&
    setDelay(2000).then(() => {
      enemyAttack();
      checkDeath(selectedPlayer);
      setPlayerStats();
      checkVictory();
    });
  // INIT OUT OF Fn IF ENEMY IS ALREADY DEAD
  checkVictory();
};

// **********************
// PLAYER ATTACK SEQUENCE
// ----------------------
const playerAttack = () => {
  // START BATTLE ANIMATION
  document.getElementById("player-avatar").classList.add("move-right"); //FIXME:
  // GET DAMAGE + RANDOM
  let playerDamage = diceRoll(selectedPlayer[0].strength);
  // INJECT HTML HIT SCORE
  getPlayerScore.innerHTML = `${selectedPlayer[0].name} hits for: ${playerDamage}`;
  // UPDATE HP
  selectedEnemy[0].health -= playerDamage;
};

// *********************
// ENEMY ATTACK SEQUENCE
//---------------------
const enemyAttack = () => {
  // START BATTLE ANIMATION
  document.getElementById("enemy-avatar").classList.add("move-left"); //FIXME:
  // GET DAMAGE + RANDOM
  let enemyDamage = diceRoll(selectedEnemy[0].strength);
  // INJECT HTML HIT SCORE
  getEnemyScore.innerHTML = `${selectedEnemy[0].name} hits for: ${enemyDamage}`;
  // UPDATE HP
  selectedPlayer[0].health -= enemyDamage;
};

// **************
// DEATH SEQUENCE
// --------------
const checkDeath = (champion) => {
  if (champion[0].health <= 0) {
    // DISPLAY DEATH TEMPLATE IN STATS SECTION
    resetAudio();
    champion[0].health = 0;
    champion[0].icon = "./images/rip.png";
    champion[0].status = "dead";
    champion[0].avatar = "";
    // IF PLAYER DIES >-> RESTART
    // IF ENEMY DIES, >-> CONTINUE GAME
    champion[0].type === "player"
      ? setDeathScene()
      : setDelay(2500).then(() => setStartScene());
  }
};

// ********************
// CHECK VICOTRY STATUS
// --------------------
const checkVictory = () => {
  if (selectedPlayer[0].health <= 0 && selectedEnemy[0].health > 0) {
    getScoreResult.innerHTML = `${selectedEnemy[0].name} slays ${selectedPlayer[0].name}, You Lose!`;
  } else if (selectedEnemy[0].health <= 0 && selectedPlayer[0].health > 0) {
    getScoreResult.innerHTML = `${selectedPlayer[0].name} slays ${selectedEnemy[0].name}, You Win!`;
  } else {
    getScoreResult.innerHTML = `Keep Fighting!`;
  }
};
