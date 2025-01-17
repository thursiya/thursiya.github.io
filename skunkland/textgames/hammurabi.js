let starved, totalStarved, starvedPercent;
let year, population, grain, acres;
let ratLoss, harvestYield, acrePrice, immigrants, plague;

function initHammurabi () {
	currentApp = "Hammurabi";
	gameLog.length = 0;
	document.getElementById("textInput").type = "number";
	
	starved = 0, totalStarved = 0, starvedPercent = 0;
	year = 0, population = 95, grain = 2800, acres = 1000;
	ratLoss = 200, harvestYield = 3, acrePrice, immigrants = 5, plague = false;
	
	updateLog(`<b>HAMMURABI</b><br><i>Based on the BASIC game by David Ahl</i><br><br>Try your hand at governing Ancient Sumeria for a ten-year term of office.`);
	updateSumer();
	announceState();
}

function submitHammurabi () {
	let data = parseInt(textInput.value) || 0;
	if (data <= 0) data = 0;
	setInput();
	switch (gameState) {
		case "Buying":
			if (data * acrePrice > grain) {
				gameError("grain shortage")
			} else if (data == 0) {
				gameState = "Selling";
			} else {
				grain -= data * acrePrice;
				acres += data;
				gameState = "Feeding";
			}
			break;
		case "Selling":
			if (data > acres) {
				gameError("land shortage");
			} else {
				acres -= data;
				grain += data * acrePrice;
				gameState = "Feeding";
			}
			break;
		case "Feeding":
			if (data > grain) {
				gameError("grain shortage");
			} else {
				grain -= data;
				starved = (data / 20 >= population) ? 0 : population - Math.floor(data / 20);
				gameState = "Planting";
			}
			break;
		case "Planting":
			if (data > acres) {
				gameError("land shortage");				
			} else if (data > grain) {
				gameError("grain shortage");
			} else if (data > population * 10) {
				gameError("worker shortage");
			} else {
				grain -= data;
				// Prepare for next year
				// Rats
				let rval = Math.ceil(Math.random() * 5);
				ratLoss = (rval % 2 == 0) ? Math.floor(grain / rval) : 0;
				grain -= ratLoss;
				// Immigrants
				immigrants = Math.floor((Math.random() * 5 + 1) * (20 * acres + grain) / population / 100 + 1);
				// Plague (15% chance)
				plague = Math.random() < 0.15;
				// Random harvest
				harvestYield = Math.ceil(Math.random() * 5);
				grain += data * harvestYield;	
				
				if (starved > population * 0.45) {
					updateLog(`You starved ${starved} in one year!!!`);
					gameState = "Game Results";
					starvedPercent = 50;
					announceState();
				} else {
					starvedPercent = ((year - 1) * starvedPercent + starved / population * 100) / year;
					totalStarved += starved;
					updateSumer();
				}
			}
			break;
		case "Restart":
			updateLog(`<i>Reload the game to restart</i>`);
			break;
		default:
			break;
	}
	announceState();
}

function updateSumer () {
	let out = `<hr><i>Hammurabi:</i> I beg to report to you in <b>Year ${++year}</b>...`;
	population -= starved;
	out += `<br> &nbsp; ${starved} people starved.`;
	population += immigrants;
	out += `<br> &nbsp; ${immigrants} ${immigrants == 1 ? "person" : "people"} came to the city.`;
	if (plague) {
		population = Math.floor(population / 2);
		out += `<br> &nbsp; A horrible plague struck! Half the people died.`;
	}
	out += `<br> &nbsp; Population is now <b>${population}</b>.`;
	out += `<br> &nbsp; The city now owns <b>${acres} acres</b>.`;
	out += `<br> &nbsp; You harvested ${harvestYield} bushels per acre.`;
	out += `<br> &nbsp; Rats ate ${ratLoss} bushels.`;
	out += `<br> &nbsp; You now have <span style="font-size: 125%"><b>${grain}</b></span> bushels in store.`;
	if (year > 10) {
		gameState = "Game Over";
	} else {
		acrePrice = Math.floor(Math.random() * 10 + 17);
		out += `<br> &nbsp; Land is trading at <b>${acrePrice} bushels per acre</b>.<br>`;
		gameState = "Buying";	
	}
	updateLog(out);
}

function announceState () {
	let land = acres / population;
	switch (gameState) {
		case "Buying":
			updateLog(`How many acres do you wish to buy? <i>(0 to sell)</i>`);
			break;
		case "Selling":
			updateLog(`How many acres do you wish to sell?`);
			break;
		case "Feeding":
			updateLog(`How many bushels do you wish to feed your people? <i>(20/person)</i>`);
			setInput((grain >= population * 20) ? population * 20 : Math.floor(grain / 20) * 20);
			break;
		case "Planting":
			updateLog(`How many acres do you wish to plant with seed? <i>(1/acre)</i>`);
			setInput((grain >= Math.min(acres, population * 10)) ? Math.min(acres, population * 10) : grain);
			break;
		case "Game Over":
			updateLog(`In your 10-year term of office, ${starvedPercent.toFixed(2)} percent of the population starved per year on the average, i.e. a total of ${totalStarved} people died!`);
			updateLog(`You started with 10 acres per person and ended with ${land.toFixed(2)} acres per person.`);
		case "Game Results":
			if (starvedPercent > 33 || land < 7) {
				updateLog(`Due to this extreme mismanagement you have not only been impeached and thrown out of office but you have also been declared national fink!!!!`);
			} else if (starvedPercent > 10 || land < 9) {
				updateLog(`Your heavy-handed performance smacks of Nero and Ivan IV. The people (remaining) find you an unpleasant ruler, and, frankly, hate your guts!!`);
			} else if (starvedPercent > 3 || land < 10) {
				updateLog(`Your performance could have been somewhat better, but really wasn't too bad at all. ${Math.floor(Math.random() * 0.8 * population)} people would dearly like to see you assassinated but we all have our trivial problems.`);
			} else {
				updateLog(`A fantastic performance!!! Charlemagne, Disraeli, and Jefferson combined could not have done better!`);
			}
			updateLog(`**********<br>So long for now.`);
			gameState = "Restart";
			break;
		default:
			break;
	}
}

function gameError (error) {
	let out = "";
	switch (error) {
		case "grain shortage":
			out = `Hammurabi: Think again. You have only ${grain} bushels of grain. Now then,`;
			break;
		case "land shortage":
			out = `Hammurabi: Think again. You own only ${acres} acres. Now then,`;
			break;
		case "worker shortage":
			out = `But you have only ${population} people to tend the fields (10 acres/person)! Now then,`;
		default:
			break;
	}
	updateLog(out);
}