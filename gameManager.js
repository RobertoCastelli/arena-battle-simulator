// ************
// RESTART GAME
//-------------
const resetGame = () => window.location.reload();

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
  let selectedEnemy = mobs.map((mob) => mob);
  let enemy = selectedEnemy.map((enemy) => {
    return `
        <img class="enemy-img" src="${enemy.src}"></img>
        <h3>${enemy.name}</h3>
        <p>HP: ${enemy.health}</p>
        <p>MP: ${enemy.mana}</p>
        <p>STR: ${enemy.strength}</p>
        `;
  });
  getEnemyStats.innerHTML = `${enemy}`;
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
  <button onclick="setEnemy()">start</button>
  <button onclick="resetGame()">reset</button>
  <p>Get ready!</p>
  `;
};
