// *******************
// GET SELECTED PLAYER
// -------------------
const getPlayer = (classType) => {
  selectedPlayer = players.filter((mob) => mob.classe === classType);
  return selectedPlayer;
};

// ******************
// GET SELECTED ENEMY
// ------------------
const getEnemy = () => {
  selectedEnemy = mobs.map((mob) => mob);
};

// *****************************
// DISPLAY SELECTED ENEMY STATS
// -----------------------------
const setEnemyTemplate = () => {
  enemy = selectedEnemy.map((enemy) => {
    enemyName = enemy.name;
    enemyHealth = enemy.health;
    enemyMana = enemy.mana;
    enemyStrength = enemy.strength;
    return `
        <img class="enemy-img" src="${enemy.src}"></img>
        <img class="enemy-avatar" src="${enemy.avatar}"></img>
        <h3>${enemyName}</h3>
        <p>HP: ${enemyHealth}</p>
        <p>MP: ${enemyMana}</p>
        <p>STR: ${enemyStrength}</p>
        `;
  });
};

// *****************************
// DISPLAY SELECTED PLAYER STATS
// -----------------------------
const setPlayerTemplate = () => {
  player = selectedPlayer.map((player) => {
    playerName = player.name;
    playerHealth = player.health;
    playerMana = player.mana;
    playerStrength = player.strength;
    return `
        <img class="player-img" src="${player.src}"></img>
        <img class="player-avatar" src="${player.avatar}"></img>
        <h3>${playerName}</h3>
        <p>HP: ${playerHealth}</p>
        <p>MP: ${playerMana}</p>
        <p>STR: ${playerStrength}</p>
        `;
  });
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
const playerAttack = () => {
  let playerAttack = diceRoll(playerStrength);
  return playerAttack;
};

const attack = () => {
  const score = document.querySelector(".score");
  score.innerHTML = `${playerName} hits for: ${playerAttack()}`;
};
