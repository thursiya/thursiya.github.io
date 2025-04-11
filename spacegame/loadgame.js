const seed = Math.floor(Math.random() * 1e12);
const starmapWidth = screen.width < 700 ? screen.width : screen.width - 350; //1330; //screen.availWidth - 350;
document.querySelector('body').style.setProperty('--starmapWidth', `${starmapWidth}px`);
const starmapHeight = 770;
const tabsList = ['market', 'shipyard', 'notices', 'planet'];
//const totalPlanets = 32;		// Is this used?
const cellWidth = Math.floor(starmapWidth / 7);
const cellHeight = Math.floor((starmapHeight - 20) / 5); // Leave 20px for name under planet
const minDistance = 80;
const maxDistance = 192; //(cellWidth + cellHeight) * 0.6;
const travelSpeed = maxDistance / 24;
const differentFadables = 6;	// Number of different animation states for starlanes - set to 0 to keep all animations in sync
const world = [];
const starlane = [];

function World(coords) {
	this.x = coords.x;
	this.y = coords.y;
}
function Starlane(origin, dest) {
	const w1 = world[origin];
	const w2 = world[dest];
	this.origin = origin;
	this.dest = dest;
	this.x = Math.round((w1.x + w2.x) / 2);
	this.y = Math.round((w1.y + w2.y) / 2);
	this.distance = calculateDistance(w1, w2);
	this.known = -3;
	this.status = rnd(6) - 2;
}

function loadGame() {
	//loadAllFiles("data/corporations.txt", "data/goods.txt");

	populateGalaxy();
		
	// Layout galactic map, world info, etc.
	const startTime = performance.now();
	drawUI();
	console.log(`*** Finished Drawing User Interface... ${(performance.now() - startTime).toFixed(2)} ms`);
	
	// Set background music volume
	document.getElementById('bgMusic').volume = 0.1;
	
	// Display starting world and spaceship sprite
	document.getElementById(`planet${here}`).style.display = "block";
	let s = document.getElementById('spaceshipIcon');
		s.style.left = `${world[here].x}px`;
		s.style.top = `${world[here].y}px`;
		s.style.transition = "2s";
	world[here].known = 0;
		
	// Create ship
	for (const x of times(12)) {
		ship.push([]);
		for (const y of times(7)) ship[x].push({});
	}
	changeShip(0);
	drawShip();
	
	newsEvent(time.full - 12 - rnd(6));
	newsEvent(time.full - 3 - rnd(6));

	loadMissionFramework();
	
	systemArrival(here);
	document.getElementById('marketTabButton').click();
	updateTime();
	
	addMission('main');
}

function populateGalaxy() {
	// Add in old (established) corporations
	oldCorps = oldCorps.map(v => new Corporation(v.split(" ")[0], "", v.split(/ (.+)/)[1]));
	oldCorps[13].fullname = "Independent Consortium of Planets";
	oldCorps[13].type = "Consortium";
	
	generateWorlds();
	
	// Generate 25 new random corporations (in addition to the 24 old corps), then add them to #corp# data
	for (const i of times(25)) newCorps.push(rndCorporationName());
	storyFramework.corp = [...oldCorps.map(v => v.name), ...newCorps.map(v => v.name)];
	
	// Generate all characters
	const startTime = performance.now();
	for (const i of times(world.length)) {
		const popSupport = Math.floor(world[i].pop / 5 + 6);
		for (const j of times(popSupport)) person.push(new Role(i));
	}
	console.log(`*** Finished Generating Person Data in... ${(performance.now() - startTime).toFixed(2)} ms`);
}

function generateWorlds() {
	const focusList = ["Mining", "Mining", "Agricultural", "Industrial", "Manufacturing", "Terraforming", "Affluent", "Slum", "Slum", "High Tech", "Cultural", "Frontier", "Prison", "Mixed", "Mixed"];
	const scapeList = ["affluent", "busy", "city", "crossing", "dark", "dock", "factory", "field", "frontier", "hill", "jungle", "lantern", "ocean", "outpost", "rainy", "slum", "snow", "statue", "town"];
	let focuses = [];
	let scapes = [];
	let planetImg = [];
	
	storyFramework.world = [];
	
	// Generate world coordinates using modified Poisson-Disc Sampling
	const startTime = performance.now();
	const cellGrid = Array(Math.ceil(starmapWidth / 10)).fill(Array(Math.ceil(starmapHeight / 10)).fill(410));
	const xMax = (starmapWidth - 48) / 10;
	const yMax = (starmapHeight  - 68) / 10;
	while (true) {
		if (world.length == 0) {
			// First world randomly placed in middle third of screen
			world.push(new World({ x: Math.floor(rnd(starmapWidth / 30) + starmapWidth / 30), y: Math.floor(rnd((starmapHeight - 20) / 30) + (starmapHeight - 20) / 30) }));
		} else {
			const choices = [];
			for (const [xIndex, i] of cellGrid.entries()) {
				for (const [yIndex, j] of i.entries()) {
					if (j > ((minDistance + world.length) / 10) ** 2 && j < 400) choices.push({x: xIndex, y: yIndex});
				}
			}
			if (choices.length == 0) break;	// End while loop when there are no more legal world sites
			world.push(new World(rnd(choices)));
		}
		const w = world[world.length - 1];
		for (const i of times(41)) {
			for (const j of times(41)) {
				const x1 = w.x - 20 + i;
				const y1 = w.y - 20 + j;
				if (x1 < 1.6 || x1 > xMax || y1 < 1.6 || y1 > yMax) continue;
				const dist = calculateSimpleDistance(w, {x: x1, y: y1});
				if (dist <= 400 && cellGrid[x1][y1] > dist) cellGrid[x1][y1] = dist;
			}
		}
	}
	for (w of world) {w.x *= 10; w.y *= 10};
	console.log(`*** Finished Laying out Systems in... ${(performance.now() - startTime).toFixed(2)} ms`);

	// Add starlanes
	const startTime2 = performance.now();
	world.forEach((w, i) => { for (const j of times(i)) if (calculateSimpleDistance(w, world[j]) <= 40000) starlane.push(new Starlane(i, j)); });
	// Sort starlanes by length
	starlane.sort((a, b) => a.distance - b.distance);
	// Remove long lanes that cross short ones
	/*let i = 0;
	while (i < starlane.length) {
		let j = i;
		while (j < starlane.length) {
			if (doLanesCross(starlane[i], starlane[j]) starlane.splice(j, 1);
			j++;
		}
		i++;
	}*/
	
	for (let i = 0; i < starlane.length - 1; i++) for (let j = i + 1; j < starlane.length; j++) if (doLanesCross(starlane[i], starlane[j])) starlane.splice(j, 1);
	console.log(`*** Finished Generating Starlanes in... ${(performance.now() - startTime2).toFixed(2)} ms`);

	startTime = performance.now();
	// Generate additional world data (name, image, etc.)
	world.forEach((w, i) => {
		// Generate random name
		let workingName;
		do {
			workingName = generateName(1);
			for (let j = 0; j < i; j++) if (world[j].name.substring(0, workingName.length) == workingName) workingName = "FAIL";
		} while (workingName == "FAIL");  // Regenerate initial syllable if it matches any other planet name's initial syllable
		w.name = workingName + generateName(rnd([1,1,1,1,1,2,2,2,2,3])).toLowerCase();	// set planet name (by adding 1-3 syllables)		
		
		// Set planet images
		if (planetImg.length == 0) planetImg = shuffle([...Array(32).keys()]);
		w.planetImage = planetImg.pop() + 1;
		
		// Add locales to world
		//var possibleLocales = localeList.slice(0);
		//var possibleTexts = ["Clive's", "The Restaurant at the End of the Universe", "Our Lady of Perpetual Exemptions", "Terran Embassy", "Abandoned Chip Factory", "Sunrise Park", "Executive Hotel", "Joe's Place", "University of Mecklenburg", "Archeology Museum", "Astromedica HQ", "Local Police", "Deuterium Penitentiary", "Spaceport", "Doggy Magical Department Store", "Eunion Warehouse"];
		w.locales = [{}, {}, {}, {}];
		
		// Choose Focus (mining, farming, etc.)
		if (focuses.length < 1) focuses = shuffle(focusList.slice(0));
		w.focus = focuses.pop();
		
		// Choose Type
		let planetTypes = ["Rocky", "Rocky", "Desert", "Desert", "Ocean"];
		if (w.focus == "Mining") planetTypes.pop();
		if (w.focus.match(/^(Mining|Frontier|Prison)$/i)) planetTypes.push("Ice");
		w.type = rnd(planetTypes);
		
		// Choose Government
		let temp = rnd([0, 1, 1, 1, 2, 2, 3, 3, 4, 5]); // 10%, 30%, 20%, 20%, 10%, 10% odds
		w.gov = ["Anarchy", "Corporate", "Democracy", "Feudal", "Military", "Theocracy"][temp];
		w.govdesc = ["lawless", oldCorps[rnd(24) - 1].name, "democratic", "feudal", "military", "religious"][temp];
		
		// Choose Size (1 to 3)
		w.size = rnd(3);
		
		// Calculate population
		w.pop = ["Ice", "Ocean", "Rocky", "Desert"].indexOf(w.type) * 3 + w.size + (w.focus.match(/^(Mining|Terraforming|Prison|Frontier)$/i) ? 0 : w.focus.match(/^(Agricultural|Industrial|Manufacturing)$/i) ? 9 : 18);
		temp = rnd(10) - 1;
		//w.poptext = w.pop < 10 ? `${w.pop}${temp}0k` : w.pop < 19 ? `${w.pop - 9}.${temp}M` : (temp = Math.floor(1.8 ** (w.pop + temp / 10) / 12700), temp < 1000 ? `${temp}M` : `${(temp / 1000).toFixed(1)}B`);
		w.poptext = w.pop < 10 ? `${w.pop}${temp}0k` : 
			w.pop < 19 ? `${w.pop - 9}.${temp}M` : 
			(temp = Math.ceil((1.65 ** (w.pop - 18 + temp / 10) - 0.65) * 10), temp < 1000 ? `${temp}M` : `${(temp / 1000).toFixed(1)}B`);
		
		// Generate text description
		if (scapes.length < 1) scapes = shuffle(scapeList.slice(0));
		w.file = scapes.pop();
		w.text = generateDescription(w);
		
		// Add economic data
		w.goods = worldGoods(w);	// (goods.js)
		w.goods.sort((a, b) => a.name == b.name ? a.price - b.price : a.name > b.name ? 1 : -1);// Sort goods by name, then price
		w.goods.forEach(v => v.baseprice = v.price - Math.floor(v.price * (1 - w.pop / 100 + rnd(10) / 100) * v.supply / (v.supply + 10)));	// Range 0.01-0.30 (small worlds = greater price swing)
		w.tax = (rnd(w.gov == "Anarchy" ? 3 : 10) + (w.gov == "Democracy" ? 5 : 0)) / 100;	// Sales tax rate
		
		// Add settlement
		w.city = [];
		for (let j of times(w.pop / 5)) w.city.push(parse("#colonyName#"));
		
		// Add links
		w.links = [];
		for (let j of starlane) {
			if (j.origin == i) w.links.push(j.dest);
			if (j.dest == i) w.links.push(j.origin);
		}
		
		w.notices = [];
		
		// Add world to #world# data
		storyFramework.world.push(`${w.name}<${w.focus.toLowerCase()}><${w.pop < 12 ? 'small' : w.pop < 21 ? 'medium' : 'large'}>`);
		
		w.known = -3; // -3: unknown, -2: known, -1: seen, 0+ turns since last visited
	});
	console.log(`*** Finished Generating World Data in... ${(performance.now() - startTime).toFixed(2)} ms`);
}

function generateName (syllables = 3, pattern) {
	let name = "",
		onset = "ptkbdgmnlryw ",
		medial,
		nucleus = "aeiou",
		coda = "ptkbdgmnlryw          ",
		rhyme;
	switch (pattern) {
		case "en":		// English
			onset = [..." bcdfghjklmnprstvwyz".split(""),"bl","br","ch","cl","cr","dr","fl","fr","gl","gr","ph","pl","pr","qu","sc","scr","sh","shr","sl","sm","sn","sp","spl","spr","st","str","sw","th","thr","tr","tw"];
			nucleus = ["a","ai","au","e","ea","ee","i","o","oa","oi","oo","ou","u"];
			coda = [..." bdfgmnprstx".split(""),"ch","ck","dge","gh","ght","ke","lch","ld","lge","ll","lsh","lt","mp","nd","ng","nt","ph","rd","rf","rge","rk","rm","rn","rp","rse","rst","rt","rve","se","sh","st","tch","th","ve","ze"];
			//["#ea|ee|oa|oo|ou#ch", "#enVowel#ck", "#enVowel#dge", "#au|i|ou#gh#|t#", "#a|i|o|u#ke", "#e|i|u#lch", "#a|au|e|ea|i|o#ld", "#i|u#lge", "#enVowel#ll", "lsh","lt","mp","nd","ng","nt","ph","rd","rf","rge","rk","rm","rn","rp","rse","rst","rt","rve","se","sh","st","tch","th","ve","ze"
			
			break;
		case "ja":		// Japanese
			onset = " kstnhmyrwgzdbp";
			// actual ["a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko", "kya", "kyu", "kyo"...]
			medial = "        y";
			coda = "       n";
			break;
		case "zh":		// Chinese
			onset = [..."bcdqrstvwxyzhbn".split(""),"ch","sh","zh"];
			coda = [..."       n".split(""),"ng"];
			break;
		case "SWname":	// Star Wars name meme: first 3 chars of lastname + first 2 chars of firstname
			let swname = rndPersonName();
			name += swname.split(" ").slice(1).join(" ").slice(0,3) + swname.slice(0,2).toLowerCase();
			return capitalize(name.replace(/ /g, ''));
		default:
		case "simple":
			onset = [..." bdfghjklmnprstvwyz".split(""),"ch","sh","th"];
			coda = "";
			break;
	}
	for (let i of times(syllables)) {
		name += rnd(onset);
		if (medial) name += rnd(medial);
		if (rhyme) {
			name += rnd(rhyme);
		} else {
			name += rnd(nucleus);
			if (coda) name += rnd(coda);
		}
	}
	return capitalize(name.replace(/ /g, ''));	// Capitalize & remove whitespaces
}

function generateDescription (w) {
	let desc = `A${[" small", "n average", " large"][w.size - 1]} ${w.type.toLowerCase()} world${rnd(["", " with " + rnd(["no moons", "one large moon", "many small moons", "icy rings"])])}. `;

	switch (rnd(4)) {
		case 1:
			desc += w.pop > 9 ? "The large population are mostly crowded in massive cities." : "The people live in scattered settlements.";
			break;
		case 2:
			var temp = ["many winding rivers", "long mountain ranges", (w.type == "Rocky" ? "vast" : "tiny") + " seas", "scattered " + (w.type == "Rocky" ? "lakes" : "oases"), "vibrant forests", "dense jungles", "deep canyons", "rugged plateaus"];
			switch (w.type) {
				case "Ocean": desc += `Its indigenous sea life ${rnd(["provide abundant resources", "coexist with floating colonies scattered across the planet", "attract tourists and scientists"])}.`; break;
				case "Ice": desc += `Its brutally cold weather ${rnd(["attracts few visitors", "makes life rather miserable", "limits growth potential"])}.`; break;
				default: desc += `It is home to ${temp.splice(rnd(temp.length) - 1, 1)} and ${rnd(temp)}.`;
			}
			break;
		case 3:
			desc += ({
				"Mining": `${w.name} is famed for its rich ore veins.`,
				"Agricultural": `Its surface is covered with vast farmlands.`,
				"Industrial": `Its many refineries and smelters light up the night sky.`,
				"Terraforming": `It is in the process of becoming a green paradise.`,
				"Manufacturing": `Its factories mass produce whatever the galaxy demands.`,
				"High Tech": `Its well-educated people are at the nexus of innovation.`,
				"Affluent": `Citizens of ${w.name} tend to be rich and flaunt it.`,
				"Slum": `Most of its people just scrape by, impoverished by past generations.`,
				"Cultural": `${w.name} is a well-known name thanks to its many wonders.`,
				"Prison": `Almost all of the populous live behind bars or are employed in front of them.`,
				"Frontier": `A few sturdy settlers are hoping ${w.name} will become a major destination.`,
				"Mixed": `The cosmopoliton world of ${w.name} offers a little bit of everything.`
			})[w.focus];
			break;
		default:
			desc += ({
				"Anarchy": `It's the wild west amongst ${w.name}'s disjointed settlements.`,
				"Corporate": `On ${w.name} it is the rare few who do not work directly for ${w.govdesc}.`,
				"Democracy": `${w.name} politics are rife with constant intrigues and revelations.`,
				"Feudal": `The central government is only one of many players in the hectic politics here.`,
				"Military": `The high command carefully monitors all traffic in and out.`,
				"Theocracy": `The people and institutions on ${w.name} are very wary of foreign influences.`
			})[w.gov];
	}			

	desc += ` ${w.name}'s ${w.focus.toLowerCase()} economy is ${["primarily resource-based", "focused on services", "quite varied"][w.focus.match(/^(Affluent|High Tech|Cultural)$/i) ? 1 : w.focus.match(/^(Slum|Prison|Mixed)$/i) ? 2 : 0]}.`;
	// 3 parts: basics (size, composition), funfact, trade data
	return desc;
}

function drawUI () {
	let out = `<div id='starmap'>
			<div id='commScreen' class='commWindow'>
				<div id='commButtons'>
					<div style='float:right'>
						<img id='infoButton' class='commTab' src='images/buttons/info.png' draggable='false' onclick='displayComm(7)'> &nbsp;
						<img id='newsButton' class='commTab' src='images/buttons/news.png' draggable='false' onclick='displayComm(6)'> &nbsp;
						<img id='transactionButton' class='commTab' src='images/buttons/transaction.png' draggable='false' onclick='displayComm(5)'> &nbsp;
						<img id='manifestButton' class='commTab' src='images/buttons/manifest.png' draggable='false' onclick='displayComm(4)'> &nbsp;
						<img id='missionButton' class='commTab' src='images/buttons/mission.png' draggable='false' onclick='displayComm(3)'> &nbsp;
						<img id='contactsButton' class='commTab' src='images/buttons/address.png' draggable='false' onclick='displayComm(2)'> &nbsp;
						<img id='previousMessage' class='commTab' src='images/buttons/next.png' style='transform: rotate(180deg)' draggable='false' onclick='displayComm(1.1)'><img id='messagesButton' class='commTab' src='images/buttons/message.png' draggable='false' onclick='displayComm(1)'><img id='nextMessage' class='commTab' src='images/buttons/next.png' draggable='false' onclick='displayComm(1.2)'> &nbsp;
						<img src='images/buttons/close.png' class='commTab' draggable='false' onclick='hideComm()'>
					</div>
				</div>
				<div id='commContent'>
					<div id='commInfo' class='commSection' style='display:none'>
						<table><tr>
							<td style='width: 200px; vertical-align: top; overflow-y: auto'>
								<button class="collapsible">Corporations</button>
								<div class="collcontent">`;
									const corpABC = [...oldCorps, ...newCorps].sort((a,b)=>(a.name > b.name) ? 1 : -1);
									for (let i of corpABC) out+= `<div class='hoverable' onclick='displayInfo("corp","${i.name}")'>${i.name}</div>`;
							out += `</div>
								<button class="collapsible">Worlds</button>
								<div class="collcontent">`;
									const worldABC = world.slice().sort((a,b)=>(a.name > b.name) ? 1 : -1);
									for (let i of worldABC) out+= `<div class='hoverable' onclick='displayInfo("world","${i.name}")'>${i.name}</div>`;
							out += `</div>
								<button class="collapsible">Governments</button>
								<div class="collcontent">`;
									for (let i of ["Anarchy", "Corporate", "Democracy", "Feudal", "Military", "Theocracy"]) out += `<div class='hoverable' onclick='displayInfo("gov","${i}")'>${i}</div>`;
							out +=	`</div>
								<button class="collapsible">Economies</button>
								<div class="collcontent">`;
									for (let i of ["Affluent", "Agricultural", "Cultural", "Frontier", "High Tech", "Industrial", "Manufacturing", "Mining", "Mixed", "Prison", "Slum", "Terraforming"]) out += `<div class='hoverable' onclick='displayInfo("economy","${i}")'>${i}</div>`;
							out += `</div>
								<button class="collapsible">Goods</button>
								<div class="collcontent">`;
									for (let i of [...new Set(goods.map(g => g.name))].sort()) out += `<div class='hoverable' onclick='displayInfo("good","${i}")'>${i}</div>`;
							out += `</div>
								<button class="collapsible">Tutorials</button>
								<div class="collcontent">
									Forthcoming...
								</div>
							</td>
							<td id='infoDBText' style='vertical-align: top; overflow-y: auto; position: relative'>
							<br><br><i>Choose a topic to view information...</i>
							</td>
						</tr></table>
					</div>
					<div id='commNewsfeed' class='commSection' style='display:none'></div>
					<div id='commAccounts' class='commSection' style='display:none'>
						<h2 style='text-align: center'><i>... No Logged Transactions ...</i></h2>
					</div>
					<div id='commManifest' class='commSection' style='display:none'>
						<h2 style='text-align: center'><i>... Ship is Currently Empty ...</i></h2>
					</div>
					<div id='commMissions' class='commSection' style='display:none'>
						<h2 style='text-align: center'><i>... No Logged Missions ...</i></h2>
					</div>
					<div id='commContacts' class='commSection' style='display:none'>
						<h2 style='text-align: center'><i>... No Known Contacts ...</i></h2>
					</div>
					<div id='commCall' class='commSection' style='display:block'>
						<h2 style='text-align: center'><i>... Galaxy Loading ...</i></h2>
					</div>
				</div>
			</div>
			<canvas id='shipCanvas' class='' width='${starmapWidth}' height='${starmapHeight}'></canvas>
			<canvas id='starmapCanvas' class='' width='${starmapWidth}' height='${starmapHeight}'></canvas>
			<canvas id='animationCanvas' class='' width='${starmapWidth}' height='${starmapHeight}'></canvas>
			<div id='starlanes'>
				<img id='spaceshipIcon' src='images/icons/spaceship.png'>`;
				for (let [i, s] of starlane.entries()) {
					out += `<div id='starlane${i}div'>
								<img id='starlane${i}' class='fadable' draggable='false' style='position:absolute; left: ${s.x}px; top: ${s.y}px; display: none; animation-delay: ${Math.floor(Math.random() * -differentFadables)}s'>
							</div>`;	// animation-delay is negative so it starts midway
				}
	out += `</div>
			<div id='worlds'>`;
				for (let [i, w] of world.entries()) {
					out += `<div id='planet${i}' class='popup planet' style='left: ${w.x}px; top: ${w.y}px;' onmouseover='popupdisplay(${i})'>
								<img src='images/planets/planet${w.planetImage}.png' draggable='false' style='height: 32px; position: absolute; clip-path: circle(16px at ${16 * (i % 5 + 1)}px 50%); left: -${16 * (i % 5)}px;' onclick='displayCurrentSystem(${i})'>
								<p style='position: absolute; top: 20px; color: white'>
									<b>${w.name}</b>
								</p>
								<p id='planet${i}text' class='popuptext' style='position:absolute'>
									<b>${w.name}</b> <i>(${w.pop})</i><br>
									<span id='planet${i}info'></span>
								</p>
							</div>`;
				}
	out += `</div>
			<div id='spaceship' ondrop='dropGood(event, "ship")' ondragover='event.preventDefault()'></div>
		</div><div id='rightFrame'>
			<div id='worldbox'>
				<div id='worldboxdisplay'>
					<div id='wbdImage'>
						<img id='worldboxImg' class='worldImg' draggable='false' onclick='clickSelect("scape", this)'>
						<div id='localeContainer' class='localeContainer'></div>
					</div>
					<div id='wbdText'></div>
				</div>
				<div id='worldboxmenu'>
					<div class='tab'>`;
						for (let i of times(4)) {
							out += `<button id='${tabsList[i]}TabButton' class='tablink' onclick='chooseTab(event, ${i})' title='${capitalize(tabsList[i]) + (i == 3 ? " Info" : "")}'><img src='images/buttons/${tabsList[i]}.png' class='tab' draggable='false'></button>`;
						}
				out += `Tax: <b><span id='wbmTaxrate'></span>%</b>
					</div>
					<div id='markettab' class='tabcontent'></div>
					<div id='shipyardtab' class='tabcontent'></div>
					<div id='noticestab' class='tabcontent'></div>
					<div id='planettab' class='tabcontent'></div>
				</div>
			</div>
			<div id='menuButtons'>
				<img id='commButton' class='menubutton' src='images/buttons/message.png' onclick='displayComm()' draggable='false'>
				<img id='canvasButton' class='menubutton' src='images/buttons/ship.png' onclick='displayCanvas("ship")' draggable='false'>
				<img id='bgmusicButton' class='menubutton' src='images/buttons/music.png' onclick='muteMusic()' draggable='false'>
			</div>
			<div id='playerInfo'>
				<b>\u20B5</b>: <span id='playerInfoCredits' class='big'>${player.credits}</span><span id='playerInfoTime'>${time.year}-${time.day}.${("0" + time.hour).slice(-2)}</span>
			</div>
		</div>
		<audio id='bgMusic' autoplay loop></audio>`;
	document.getElementById('GameWindow').innerHTML = out;
	
	// Add drop-down functionality to info window topics
	for (let i of document.getElementsByClassName('collapsible')) {
		i.addEventListener("click", function() {
		this.classList.toggle("active");
		this.nextElementSibling.style.display = (this.nextElementSibling.style.display == "block") ? "none" : "block";});
	}
}

function* loadAllFiles () {
	for (let i of arguments) {
		yield loadFile(i);
	}
	loadGame();
}

function loadFile (url) {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", url);
	xhr.send();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			fileLoaded(url.match(/(.*\/)?(\..*?|.*?)(\.[^.]*?)?(#.*$|\?.*$|$)/)[2], xhr.responseText);
			loadAllFiles.next();
		}
	}
}

function fileLoaded (id, data) {
	switch (id) {
		case "corporations":
			oldCorps = data.split("\n");
			break;
		case "goods":
			goods = data.split("\n").map(v => {
				let g = v.split(",");
				let o = {name: g[0], type: g[2], file: g[3], price: +g[4]};
				if (g[1]) o.grade = +g[1];
				if (g[5]) o.stat = g[5];
				return o});
			break;
		case "missions":
			// not yet implemented
			missionFramework = data;
		default:
	}
}

function parseLoadedFile (data, method = "JSON") {
	switch (method) {
		case "Basic":
			data = data.split("\n");
		case "JSON":
			// Properly quote keys for JSON parsing
			data = data.replace(/(\s*{\s*|\s*,\s*)(['"])?(\w+)(['"])?:/g, '$1"$3":');
			// Remove final comma
			if (data.substr(-1) == ",") data = data.slice(0, -1);
			// Convert to array and parse
			let arr = [];
			data = data.split(",\n\n");
			for (let i of data) arr.push(JSON.parse(i));
			return arr;
		default:
	}
}
