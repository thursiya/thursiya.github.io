const nicoma = {};

function initNicoma() {
  currentApp = "Nicoma";
  gameLog.length = 0;
  document.getElementById("textInput").type = "text";
	
  updateLog(`<b>NICOMA</b><br><i>Based on the BASIC game by David Ahl</i><br><br>Boomerang Puzzle from Arithmetica of Nicomachus -- A.D. 90!`);
	
  submitNicoma("Intro");
}

function submitNicoma(state) {
  const data = textInput.value.toUpperCase();
  const num = parseInt(data);
  switch (state || gameState) {
    case "Intro":
      updateLog(`<hr>Please think of a number between 1 and 100.`);
      updateLog(`Your number divided by <b>3</b> has a remainder of:`);
      gameState = 3;
      break;
    case 3:
    case 5:
    case 7:
      if (num >= 0 && num < gameState) {
        appendLog(num);
        nicoma[gameState] = num;
        gameState += 2;
        if (gameState < 8) {
          updateLog(`Your number divided by <b>${gameState}</b> has a remainder of:`);
        } else {
          updateLog(`Let me think a moment...`);
          nicoma.num = nicoma[3] * 70 + nicoma[5] * 21 + nicoma[7] * 15;
          if (nicoma.num > 100) nicoma.num -= 105;
	  nicoma.timeout = () => updateLog(`Your number was <b>${nicoma.num}</b>, right?`);
	  setTimeout(nicoma.timeout, 3000);
          gameState = "Approve Guess";
        }
      }
      break;
    case "Approve Guess":
      appendLog(data[0] == "Y" ? "Yes" : "No");
      updateLog(data[0] == "Y" ? `How about that!!` : `I feel your arithmetic is in error.`);
      updateLog(`Let's try another!`);
      submitNicoma("Intro");
      break;
    default:
      updateLog(`<i>Reload the game to restart</i>`);
  }
  setInput();
}
