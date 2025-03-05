const hammurabi = {};

function initHammurabi() {
	currentApp = "Hammurabi";
	gameLog.length = 0;
	document.getElementById("textInput").type = "number";

	Object.keys(hammurabi).forEach(key => delete hammurabi[key]);
	Object.assign(hammurabi, { starved: 0, totalStarved: 0, starvedPercent: 0, year: 0, pop: 95, grain: 2800, acres: 1000, ratLoss: 200, harvestYield: 3, immigrants: 5, plague: false,
				 error: { get grain() {return `Hammurabi: Think again. You have only ${hammurabi.grain} bushels of grain. Now then,`}, 
					get land() {return `Hammurabi: Think again. You own only ${hammurabi.acres} acres. Now then,`},
					get worker() {return `But you have only ${hammurabi.pop} people to tend the fields (10 acres/person)! Now then,`} } });
	
	updateLog(`<b>HAMMURABI</b><br><i>Based on the BASIC game by David Ahl</i><br><br>Try your hand at governing Ancient Sumeria for a ten-year term of office.`);
	updateSumer();
	announceHammurabi();
}

function submitHammurabi() {
	const num = parseInt(textInput.value) > 0 ? parseInt(textInput.value) : 0;
	setInput();
	switch (gameState) {
		case "Buying":
			if (num * hammurabi.acrePrice > hammurabi.grain) {
				updateLog(hammurabi.error.grain);
			} else if (num == 0) {
				gameState = "Selling";
			} else {
				hammurabi.grain -= num * hammurabi.acrePrice;
				hammurabi.acres += num;
				gameState = "Feeding";
			}
			break;
		case "Selling":
			if (num > hammurabi.acres) {
				updateLog(hammurabi.error.land);
			} else {
				hammurabi.acres -= num;
				hammurabi.grain += num * hammurabi.acrePrice;
				gameState = "Feeding";
			}
			break;
		case "Feeding":
			if (num > hammurabi.grain) {
				updateLog(hammurabi.error.grain);
			} else {
				hammurabi.grain -= num;
				hammurabi.starved = (num / 20 >= hammurabi.pop) ? 0 : hammurabi.pop - ~~(num / 20);
				gameState = "Planting";
			}
			break;
		case "Planting":
			if (num > hammurabi.acres) {
				updateLog(hammurabi.error.land);
			} else if (num > hammurabi.grain) {
				updateLog(hammurabi.error.grain);
			} else if (num > hammurabi.pop * 10) {
				updateLog(hammurabi.error.worker);
			} else {
				hammurabi.grain -= num;
				// Prepare for next year
				// Rats
				const rval = Math.ceil(Math.random() * 5);
				hammurabi.ratLoss = (rval % 2 == 0) ? ~~(hammurabi.grain / rval) : 0;
				hammurabi.grain -= hammurabi.ratLoss;
				// Immigrants
				hammurabi.immigrants = ~~((Math.random() * 5 + 1) * (20 * hammurabi.acres + hammurabi.grain) / hammurabi.pop / 100 + 1);
				// Plague (15% chance)
				hammurabi.plague = Math.random() < 0.15;
				// Random harvest
				hammurabi.harvestYield = Math.ceil(Math.random() * 5);
				hammurabi.grain += num * hammurabi.harvestYield;	
				
				if (hammurabi.starved > hammurabi.pop * 0.45) {
					updateLog(`You starved ${hammurabi.starved} in one year!!!`);
					gameState = "GameResults";
					hammurabi.starvedPercent = 50;
				} else {
					hammurabi.starvedPercent = ((hammurabi.year - 1) * hammurabi.starvedPercent + hammurabi.starved / hammurabi.pop * 100) / hammurabi.year;
					hammurabi.totalStarved += hammurabi.starved;
					updateSumer();
				}
			}
			break;
		default:
			updateLog(`<i>Reload the game to restart</i>`);
	}
	announceHammurabi();
}

function updateSumer() {
	hammurabi.pop += hammurabi.immigrants - hammurabi.starved;
	if (hammurabi.plague) hammurabi.pop = ~~(hammurabi.pop / 2);
	hammurabi.acrePrice = ~~(Math.random() * 10 + 17);
	updateLog(`<hr><i>Hammurabi:</i> I beg to report to you in <b>Year ${++hammurabi.year}</b>...
		<br> &nbsp; ${hammurabi.starved} people starved.
    		<br> &nbsp; ${hammurabi.immigrants} ${hammurabi.immigrants == 1 ? "person" : "people"} came to the city.
		${hammurabi.plague ? "<br> &nbsp; A horrible plague struck! Half the people died." : ""}
		<br> &nbsp; Population is now <b>${hammurabi.pop}</b>.
   		<br> &nbsp; The city now owns <b>${hammurabi.acres} acres</b>.
       		<br> &nbsp; You harvested ${hammurabi.harvestYield} bushels per acre.
		<br> &nbsp; Rats ate ${hammurabi.ratLoss} bushels.
       		<br> &nbsp; You now have <span style="font-size: 125%"><b>${hammurabi.grain}</b></span> bushels in store.
	   	${hammurabi.year < 11 ? `<br> &nbsp; Land is trading at <b>${hammurabi.acrePrice} bushels per acre</b>.<br>` : ""}`);
	gameState = (year > 10) ? "GameOver" : "Buying";
}

function announceHammurabi() {
	const hammurabiLand = hammurabi.acres / hammurabi.pop;
	switch (gameState) {
		case "Buying":
			updateLog(`How many acres do you wish to buy? <i>(0 to sell)</i>`);
			break;
		case "Selling":
			updateLog(`How many acres do you wish to sell?`);
			break;
		case "Feeding":
			updateLog(`How many bushels do you wish to feed your people? <i>(20/person)</i>`);
			setInput((hammurabi.grain >= hammurabi.pop * 20) ? hammurabi.pop * 20 : Math.floor(hammurabi.grain / 20) * 20);
			break;
		case "Planting":
			updateLog(`How many acres do you wish to plant with seed? <i>(1/acre)</i>`);
			setInput((hammurabi.grain >= Math.min(hammurabi.acres, hammurabi.pop * 10)) ? Math.min(hammurabi.acres, hammurabi.pop * 10) : hammurabi.grain);
			break;
		case "GameOver":
			updateLog(`In your 10-year term of office, ${hammurabi.starvedPercent.toFixed(2)} percent of the population starved per year on the average, i.e. a total of ${hammurabi.totalStarved} people died!`);
			updateLog(`You started with 10 acres per person and ended with ${hammurabiLand.toFixed(2)} acres per person.`);
		case "GameResults":
			updateLog(hammurabi.starvedPercent > 33 || hammurabiLand < 7 ? `Due to this extreme mismanagement, you have not only been impeached and thrown out of office, but you have also been declared national fink!!!!` :
				hammurabi.starvedPercent > 10 || hammurabiLand < 9 ? `Your heavy-handed performance smacks of Nero and Ivan IV. The people (remaining) find you an unpleasant ruler, and, frankly, hate your guts!!` : 
				hammurabi.starvedPercent > 3 || hammurabiLand < 10 ? `Your performance could have been somewhat better, but really wasn't too bad at all. ${~~(Math.random() * 0.8 * hammurabi.pop)} people would dearly like to see you assassinated, but we all have our trivial problems.` :
				`A fantastic performance!!! Charlemagne, Disraeli, and Jefferson combined could not have done better!`);
			updateLog(`**********<br>So long for now.`);
		default:
			break;
	}
}
