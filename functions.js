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
