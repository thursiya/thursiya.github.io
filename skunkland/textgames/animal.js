let animalDB = [{text: "Does it swim?", yes: 1, no: 2}, {text: "fish"}, {text: "bird"}];
let animalArrayStage;
let guessedAnimal, animalQuestion;

function initAnimal () {
	currentApp = "Animal";
	gameLog.length = 0;
	document.getElementById("textInput").type = "text";
	
	updateLog(`<b>ANIMAL</b><br><i>Based on the BASIC game by David Ahl</i><br><br>Play 'Guess the Animal'.<br>Think of an animal and the computer will try to guess it.`);
	gameState = "Intro";
	announceAnimal();
}

function submitAnimal() {
	let data = textInput.value.toUpperCase();
	if (!data) return;
	switch (gameState) {
		case "Intro":
			if (data[0] == "Y") {
				gameState = "Questions";
			} else {
				updateLog(`Animals I already know are:<br><b>${animalDB.filter(v => !v.yes).map(v => v.text).join(", ")}</b>`);
			}
			break;
		case "Questions":
			if (animalDB[animalArrayStage].yes) {
				animalArrayStage = (data[0] == "Y") ? animalDB[animalArrayStage].yes : animalDB[animalArrayStage].no;
			} else {
				if (data[0] == "Y") {
					updateLog(`Why not try another animal?`);
					gameState = "Intro";	
				} else {
					gameState = "Reveal Animal";
				}
			}
			break;
		case "Reveal Animal":
			if (data.substring(0,2) == "A " || data.substring(0,3) == "AN ") data = data.split(" ").slice(1).join(" ");
			guessedAnimal = data.toLowerCase();
			gameState = "Distinguish";
			break;
		case "Distinguish":
			if (data[data.length - 1] != "?") data += "?";
			data = data[0] + data.slice(1).toLowerCase();
			animalQuestion = data;
			gameState = "Distinguish 2";
			break;
		case "Distinguish 2":
			// Copy old entry to new array position
			animalDB.push(animalDB[animalArrayStage]);
			// Add new entry to new array position
			animalDB.push({text: guessedAnimal});
			// Change original entry to new question
			animalDB[animalArrayStage] = {text: animalQuestion, yes: (data[0] == "Y" ? animalDB.length - 1 : animalDB.length - 2), no: (data[0] == "Y" ? animalDB.length - 2 : animalDB.length - 1)};
			gameState = "Intro";
			break;
		default:
			break;
	}
	announceAnimal();
}

function announceAnimal() {
	switch (gameState) {
		case "Intro":
			updateLog(`<hr>Are you thinking of an animal?`);
			animalArrayStage = 0;
			break;
		case "Questions":
			if (animalDB[animalArrayStage].yes) {
				updateLog(animalDB[animalArrayStage].text);
			} else {
				updateLog(`Is it ${animalDB[animalArrayStage].text.match(/^[aeiouAEIOU]/) ? "an" : "a"} ${animalDB[animalArrayStage].text}?`);
			}
			break;
		case "Reveal Animal":
			updateLog(`The animal you were thinking of was a...`);
			break;
		case "Distinguish":
			updateLog(`Please type in a question that would distinguish ${guessedAnimal.match(/^[aeiouAEIOU]/) ? "an" : "a"} ${guessedAnimal} from ${animalDB[animalArrayStage].text.match(/^[aeiouAEIOU]/) ? "an" : "a"} ${animalDB[animalArrayStage].text}.`);
			break;
		case "Distinguish 2":
			updateLog(`For ${guessedAnimal.match(/^[aeiouAEIOU]/) ? "an" : "a"} ${guessedAnimal} the answer would be?`);
			break;
		default:
			break;
	}
	setInput();
}