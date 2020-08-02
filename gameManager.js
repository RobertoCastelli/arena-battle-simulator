const setGameStart = (classType) => {
  setPlayer(classType);
  setFight();
};

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

const setFight = () => {
  const championList = document.querySelector(".champion-list");
  const getHeaderActions = document.querySelector(".header-action");
  const arena = document.querySelector(".arena");
  arena.style.visibility = "visible";
  championList.innerHTML = "";
  getHeaderActions.innerHTML = `
  <p>Get ready!</p>
  <button>start</button>
  <button>reset</button>
  `;
};
