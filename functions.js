// *******************
// GET SELECTED PLAYER
// -------------------
const getPlayer = (classType) => {
  selectedPlayer = players.filter((mob) => mob.classe === classType);
  return selectedPlayer;
};

// *********
// GET ENEMY
// ---------
const getEnemy = () => {
  selectedEnemy = mobs.map((mob) => mob);
};

// *****************************
// DISPLAY SELECTED ENEMY STATS
// -----------------------------
const setEnemyTemplate = () => {
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
const setPlayerTemplate = () => {
  playerNew = selectedPlayer.map((player) => {
    return `
    <img class="player-icon" src="${player.icon}"></img>
    <img class="player-avatar" src="${player.avatar}"></img>
    <h3>${player.name}</h3>
    <p class="player-health">HP: ${player.health}</p>
    <p>MP: ${player.mana}</p>
    <p>STR: ${player.strength}</p>
    `;
  });
  getPlayerStats.innerHTML = `${playerNew}`;
};

// ****************
// DICE ROLL RANDOM
// ----------------
const diceRoll = (power) => Math.floor(Math.random() * power);

// ************
// RESTART GAME
//-------------
const resetGame = () => window.location.reload();

// ***********
// FIGHT SCENE
// -----------

// CHECK SPEED -> WHO ATTACKS FIRST
// ATTACK SEQUENCE Att/Def -> Def/Att -> CHECK DEATH
// CHECK ENERGY -> WHO ATTACKS
// ATTACK SEQUENCE Att/Def -> Def/Att -> CHECK DEAT

const attack = () => {
  let playerDamage = diceRoll(selectedPlayer[0].strength);
  selectedEnemy[0].health -= playerDamage;
  setEnemyTemplate();
};
