// ************
// RESTART GAME
//-------------
const resetGame = () => window.location.reload();

// ***********
// FIGHT SCENE
// -----------
const attack = () => {
  // **** TODO *****
  const score = document.querySelector(".score");
  score.innerHTML = "You attack the monster";
};

// **************************
// CALLS Fn TO START THE GAME
// --------------------------
const setGameStart = (classType) => {
  setPlayer(classType);
  setFight();
};

// ******************************
// SETS SELECTED PLAYER ON SCREEN
// ------------------------------
const setPlayer = (classType) => {
  const getPlayerStats = document.querySelector(".player-stats");
  let selectedPlayer = players.filter((mob) => mob.classe === classType);
  let player = selectedPlayer.map((player) => {
    return `
        <img class="player-img" src="${player.src}"></img>
        <img class="player-avatar" src="${player.avatar}"></img>
        <h3>${player.name}</h3>
        <p>HP: ${player.health}</p>
        <p>MP: ${player.mana}</p>
        <p>STR: ${player.strength}</p>
        `;
  });
  getPlayerStats.innerHTML = `${player}`;
};

// ******************************
// SETS ENEMEY ON SCREEN
// ------------------------------
const setEnemy = () => {
  const getEnemyStats = document.querySelector(".enemy-stats");
  const getHeaderActions = document.querySelector(".header-action");
  let selectedEnemy = mobs.map((mob) => mob);
  let enemy = selectedEnemy.map((enemy) => {
    return `
        <img class="enemy-img" src="${enemy.src}"></img>
        <img class="enemy-avatar" src="${enemy.avatar}"></img>
        <h3>${enemy.name}</h3>
        <p>HP: ${enemy.health}</p>
        <p>MP: ${enemy.mana}</p>
        <p>STR: ${enemy.strength}</p>
        `;
  });
  getEnemyStats.innerHTML = `${enemy}`;
  getHeaderActions.innerHTML = `
  <p>Choose your move!</p>
  <button onclick="attack()">attack</button>
  <button onclick="resetGame()">reset</button>
  `;
};

// *************************
// SETS THE ARENA FOR BATTLE
//--------------------------
const setFight = () => {
  const championList = document.querySelector(".champion-list");
  const getHeaderActions = document.querySelector(".header-action");
  const arena = document.querySelector(".arena");
  const stats = document.querySelector(".stats");

  arena.style.visibility = "visible";
  stats.style.visibility = "visible";
  championList.innerHTML = "";
  getHeaderActions.innerHTML = `
  <p>Get ready!</p>
  <button onclick="setEnemy()">start</button>
  <button onclick="resetGame()">reset</button>
  `;
};
