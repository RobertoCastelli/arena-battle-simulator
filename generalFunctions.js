/**
 * TODO:
 * calibrate HP MP etc
 * BUTTON DEF SPECIAL ATK
 * add random sounds when hitting
 * add better rules section
 * add ending scene
 * add ending recap score
 * add animation progress bar
 * add animation effect on special attack
 * add animation on death
 **/

// ***************
// 1. RESTART GAME
//----------------
const restartGame = () =>
  confirm("Your game is about to restart") && window.location.reload();

// ************
// 2. DICE ROLL
// ------------
const diceRoll = (min, max) => Math.floor(Math.random() * (max - min) + min);

// **************
// 3. SET A DELAY
// --------------
const setDelay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// ***********************
// 4. STOP AND RESET AUDIO
// -----------------------
const resetAudio = () => {
  audioFight.pause();
  audioFight.currentTime = 0;
};

// *************************
// 5. SHOW RULES OF THE GAME
// -------------------------
const rules = () =>
  alert("Get to the top og the tower. You got only one life. NdR");

// **********************
// 5. PLAY A RANDOM SOUND
// ----------------------
const playRandomSound = () => {
  let randomPick = diceRoll(0, sounds.length);
  randomSound = sounds[randomPick];
  randomSound.play();
};
