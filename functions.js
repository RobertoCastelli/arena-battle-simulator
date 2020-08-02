// *******************
// GET SELECTED PLAYER
// -------------------
const getPlayer = (classType) => {
  selectedPlayer = players.filter((mob) => mob.classe === classType);
  return selectedPlayer;
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
  let playerAttack = diceroll();
};

const attack = () => {
  // **** TODO *****
  const score = document.querySelector(".score");
  score.innerHTML = "You attack the monster";
};
