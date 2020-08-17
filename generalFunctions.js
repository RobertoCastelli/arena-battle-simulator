/**
 * TODO:
 * add better rules section
 * add ending scene
 * add ending recap score
 * add animation effect on special attack
 * add animation on death
 * add moster icons
 **/

// ************
// RESTART GAME
// ------------
const restartGame = () =>
  confirm("Your game is about to restart") && window.location.reload();

// *********
// DICE ROLL
// ---------
const diceRoll = (min, max) => Math.floor(Math.random() * (max - min) + min);

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

// **********************
// SHOW RULES OF THE GAME
// ----------------------
const rules = () =>
  alert("Get to the top og the tower. You got only one life. NdR");

// *******************
// PLAY A RANDOM SOUND
// -------------------
const playRandomSound = () => {
  let randomPick = diceRoll(0, sounds.length);
  randomSound = sounds[randomPick].play();
};
