//let animalDB = [{text: "Does it swim?", yes: 1, no: 2}, {text: "fish"}, {text: "bird"}];
//let animalArrayStage;
//let guessedAnimal, animalQuestion;
const animal = {};

function initAnimal () {
	currentApp = "Animal";
	gameLog.length = 0;
	document.getElementById("textInput").type = "text";

	Object.keys(animal).forEach(key => delete animal[key]);
	Object.assign(animal, { db: [{ text: "Does it swim", yes: 1, no: 2 }, { text: "fish" }, { text: "bird" }] });
	
	updateLog(`<b>ANIMAL</b><br><i>Based on the BASIC game by David Ahl</i><br><br>Play 'Guess the Animal'.<br>Think of an animal and the computer will try to guess it.`);
	gameState = "Intro";
	announceAnimal();
}

function submitAnimal() {
	const data = textInput.value.toUpperCase();
	if (!data) return;
	switch (gameState) {
		case "Intro":
			if (data[0] == "Y") {
				gameState = "Questions";
			} else {
				updateLog(`Animals I already know are:<br><b>${animal.db.filter(v => !v.yes).map(v => v.text).join(", ")}</b>`);
			}
			break;
		case "Questions":
			if (animal.db[animal.stage].yes) {
				animal.stage = animal.db[animal.stage][data[0] == "Y" ? "yes" : "no"];
			} else {
				if (data[0] == "Y") updateLog(`Why not try another animal?`);
				gameState = data[0] == "Y" ? "Intro" : "Reveal Animal";
			}
			break;
		case "Reveal Animal":
			//if (data.substring(0,2) == "A " || data.substring(0,3) == "AN ") data = data.split(" ").slice(1).join(" ");
			//guessedAnimal = data.toLowerCase();
			animal.guess = data.match(/(A |AN )*(.+)/i)[2].toLowerCase();
			gameState = "Distinguish";
			break;
		case "Distinguish":
			//if (data[data.length - 1] != "?") data += "?";
			//data = data[0] + data.slice(1).toLowerCase();
			//animalQuestion = data;
			animal.question = data.match(/\W*(\w)/)[1] + data.replace(/\W*\w((\w|\s)+)\W*/, "$1").toLowerCase() + "?";
			gameState = "Distinguish 2";
			break;
		case "Distinguish 2":
			// Copy old entry to new array position
			//animalDB.push(animalDB[animalArrayStage]);
			animal.db.push(animal.db[animal.stage]);
			// Add new entry to new array position
			//animalDB.push({text: guessedAnimal});
			animal.db.push({ text: animal.guess });
			// Change original entry to new question
			//animalDB[animalArrayStage] = {text: animalQuestion, yes: (data[0] == "Y" ? animalDB.length - 1 : animalDB.length - 2), no: (data[0] == "Y" ? animalDB.length - 2 : animalDB.length - 1)};
			animal.db[animal.stage] = { text: animal.question, yes: animal.db.length - (data[0] == "Y" ? 1 : 2), no: animal.db.length - (data[0] == "Y" ? 2 : 1) };
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
			animal.stage = 0;
			break;
		case "Questions":
			updateLog(animal.db[animal.stage].yes ? `${animal.db[animal.stage].text}?` : `Is it ${animal.db[animal.stage].text.match(/^[aeiouAEIOU]/) ? "an" : "a"} ${animal.db[animal.stage].text}?`);
			break;
		case "Reveal Animal":
			updateLog(`The animal you were thinking of was a...`);
			break;
		case "Distinguish":
			updateLog(`Please type in a question that would distinguish ${animal.guess.match(/^[aeiouAEIOU]/) ? "an" : "a"} ${animal.guess} from ${animal.db[animal.stage].text.match(/^[aeiouAEIOU]/) ? "an" : "a"} ${animal.db[animal.stage].text}.`);
			break;
		case "Distinguish 2":
			updateLog(`For ${animal.guess.match(/^[aeiouAEIOU]/) ? "an" : "a"} ${animal.guess} the answer would be?`);
			break;
		default:
			break;
	}
	setInput();
}
