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
  let selectedPlayer = mobs.filter((mob) => mob.classe === classType);
  let player = selectedPlayer.map((player) => {
    return `
        <h3>${player.name}</h3>
        <p>HP: ${player.health}</p>
        <p>MP: ${player.mana}</p>
        <p>STR: ${player.strength}</p>
        `;
  });
  getPlayerStats.innerHTML = `${player}`;
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
  <button>start</button>
  <button onclick="resetGame()">reset</button>
  `;
};
