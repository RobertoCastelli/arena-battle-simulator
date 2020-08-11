// ****************************
// SHOW CHAMPION LIST FROM DATA
// ----------------------------
playersList();

// *************************
// SHOW SELECTED PLAYER INFO
// -------------------------
const showPlayerModal = (name) => {
  openPlayerModal();
  getPlayer(name);
  setPlayerModal();
};

// **********************************
// SET UP GAME AFTER PLAYER SELECTION
// ----------------------------------
const setGameStart = (name) => {
  closePlayerModal();
  setPlayer(name);
  setArena();
  setStartScene();
};
