// ************
// RESTART GAME
//-------------
const restartGame = () => window.location.reload();

// *********
// DICE ROLL
// ---------
const diceRoll = (power) => Math.floor(Math.random() * power);

// ***********
// SET A DELAY
// -----------
const setDelay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// ********************
// STOP AND RESET AUDIO
// --------------------
const resetAudio = () => {
  audioFight.pause();
  audioFight.currentTime = 0;
};

// ****************************
// GET SELECTED PLAYER AT START
// ----------------------------
const getPlayer = (classType) => {
  selectedPlayer = players.filter((mob) => mob.classe === classType);
  return selectedPlayer;
};

// *************************
// GET ENEMY FROM ALIVE POOL
// -------------------------
const getEnemy = () => {
  getAliveEnemy = mobs.filter((mob) => mob.status === "alive");
  let counter = diceRoll(getAliveEnemy.length);
  selectedEnemy = new Array(getAliveEnemy[counter]);
  return selectedEnemy;
};

// *****************************
// DISPLAY SELECTED ENEMY STATS
// -----------------------------
const setEnemyStats = () => {
  enemyNew = selectedEnemy.map((enemy) => {
    return `
           <img class="enemy-icon" src="${enemy.icon}"></img>
           <img class="enemy-avatar" src="${enemy.avatar}"></img>
          <h2>${enemy.name}</h2>
           <p>HP: ${enemy.health}</p>
           <p>MP: ${enemy.mana}</p>
           <p>STR: ${enemy.strength}</p>
           `;
  });
  getEnemyStats.innerHTML = `${enemyNew}`;
};

// *****************************
// DISPLAY SELECTED PLAYER STATS
// -----------------------------
const setPlayerStats = () => {
  playerNew = selectedPlayer.map((player) => {
    return `
    <img class="player-icon" src="${player.icon}"></img>
    <img class="player-avatar" src="${player.avatar}"></img>
    <h2>${player.name}</h2>
    <p class="player-health">HP: ${player.health}</p>
    <p>MP: ${player.mana}</p>
    <p>STR: ${player.strength}</p>
    `;
  });
  getPlayerStats.innerHTML = `${playerNew}`;
};
