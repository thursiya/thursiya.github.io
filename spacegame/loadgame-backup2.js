const seed = Math.floor(Math.random() * 1e12);
const starmapWidth = 1330; //screen.availWidth - 350;
const starmapHeight = 770;
const tabsList = ['market', 'shipyard', 'notices', 'planet'];
const totalPlanets = 32;
const cellWidth = Math.floor(starmapWidth / 7);
const cellHeight = Math.floor((starmapHeight - 20) / 5); // Leave 20px for name under planet
const minDistance = 80;
const maxDistance = 192; //(cellWidth + cellHeight) * 0.6;
const travelSpeed = maxDistance / 24;
const differentFadables = 6;	// Number of different animation states for starlanes - set to 0 to keep all animations in sync

let world = [];
var starlane = {};		// Collection of [p1,p2] keys with name, status, etc. (i.e. starlane[16,17].name)
// switch to array of objects:
function StellarLink (origin, dest) {
	let w1 = world[origin], w2 = world[dest];
	this.name = `${w1.name}-${w2.name} Starlane`;
	this.origin = origin;
	this.dest = dest;
	this.x = Math.round((w1.x + w2.x) / 2);
	this.y = Math.round((w1.y + w2.y) / 2);
	this.distance = calculateDistance(w1, w2);
	this.known = -3;
	this.status = rnd(6) - 2;
}

function loadGame () {
	populateGalaxy();
	// Reload page if galaxy is too small
	if (!adjacentSystem(5)) location.reload();
	
	// Layout galactic map, world info, etc.
	drawUI();
	
	// Set background music volume
	document.getElementById('bgMusic').volume = 0.1;
	
	// Display starting world and spaceship sprite
	document.getElementById("planet" + here).style.display = "block";
	let s = document.getElementById('spaceshipIcon');
		s.style.left = `${world[here].x}px`;
		s.style.top = `${world[here].y}px`;
		s.style.transition = '2s';
	world[here].known = 0;
		
	// Create ship
	for (let x of times(12)) {
		ship.push([]);
		for (let y of times(7)) ship[x].push({name: "", file: "", hull: "", price: 0, origin: ""});
	}
	changeShip(0);
	drawShip();
	
	//person[0] = new Role(0,"Unembarkable Placeholder");
	person[1] = new Role(90);
	loadNewsFramework();
	newsEvent(time.full - 12 - rnd(6));
	newsEvent(time.full - 3 - rnd(6));
	console.log("About to load main mission");
	loadMissionFramework();
	addMission('main', undefined, 1);
	
	systemArrival(here);
	document.getElementById('marketTabButton').click();
	updateTime();
}

function populateGalaxy () {
	// Add in old (established) corporations
	oldCorps = oldCorps.map(v => new Corporation(v.split(" ")[0], "", v.split(/ (.+)/)[1]));
	oldCorps[13].fullname = "Independent Consortium of Planets";
	oldCorps[13].type = "Consortium";
	
	generateWorlds();
	
	// Add links & starlane data
	for (let [i, w] of world.entries()) {
		w.links = [];
		for (let [j, w2] of world.entries()) if (calculateDistance(w, w2) < maxDistance && w2 != w) w.links.push(j);
		w.links.forEach(v => {if (v > i) starlane[[i, v]] = {name: `${w.name}-${world[v].name} Link`, known: -3, status: rnd(6) - 2, x: Math.round((w.x + world[v].x) / 2), y: Math.round((w.y + world[v].y) / 2), distance: calculateDistance(w, world[v])}});
	}
	
	
	// Generate 25 new random corporations (in addition to the 24 old corps), then add them to #corp# data
	for (let i of times(25)) newCorps.push(rndCorporationName());
	storyFramework.corp = [...oldCorps.map(v => v.name), ...newCorps.map(v => v.name)];
}

let planetRoster = [];
let routes = [];
let stellarLinks = [];

function drawRoutes() {
	let c = document.getElementById("starmapCanvas").getContext("2d");
	c.clearRect(0, 0, starmapWidth, starmapHeight);
	for (let i of routes) {
		c.beginPath();
		c.moveTo(i[0].x + 16, i[0].y + 16);
		c.lineTo(i[1].x + 16, i[1].y + 16);
		c.stroke();
	}
}

function generateWorlds () {
	const focusList = ["Mining", "Mining", "Agricultural", "Industrial", "Manufacturing", "Terraforming", "Affluent", "Slum", "Slum", "High Tech", "Cultural", "Frontier", "Prison", "Mixed", "Mixed"];
	const scapeList = ["affluent", "busy", "city", "crossing", "dark", "dock", "factory", "field", "frontier", "hill", "jungle", "lantern", "ocean", "outpost", "rainy", "slum", "snow", "statue", "town"];
	let focuses = [], scapes = [], planetImg = [];
	
	storyFramework.world = [];
	
	let cellGrid = Array(starmapWidth).fill(0).map(v => Array(starmapHeight).fill(200));
	function fillCells (x, y, min_radius = 80, max_radius = 192) {
		for (let i of times(max_radius * 2)) {
			for (let j of times(max_radius * 2)) {
				let x1 = x - max_radius + i;
				let y1 = y - max_radius + j;
				if (x1 < 16 || x1 > starmapWidth - 48 || y1 < 16 || y1 > starmapHeight  - 68) continue;
				let dist = calculateDistance({x: x, y: y},{x: x1, y: y1});
				if (dist <= max_radius && cellGrid[x1][y1] > dist) cellGrid[x1][y1] = dist;
			}
		}
	}
	// Generate world coordinates using modified Poisson-Disc Sampling
	for (let i of times(256)) {
		if (i == 0) {
			// First world randomly placed in middle third of screen
			planetRoster.push([Math.floor(rnd(Math.floor(starmapWidth / 3)) + starmapWidth / 3), Math.floor(rnd(Math.floor((starmapHeight - 20) / 3)) + (starmapHeight - 20) / 3)]);
		} else {
			let choices = [];
			for (let [jIndex, j] of cellGrid.entries()) {
				for (let [kIndex, k] of j.entries()) {
					if (k > 80 + i && k < 192) choices.push({x: jIndex, y: kIndex});
				}
			}
			if (choices.length == 0) break;
			let choice = rnd(choices);
			planetRoster.push([choice.x, choice.y]);
			for (let j = 0; j < planetRoster.length - 1; j++) {
				let orig = {x: planetRoster[i][0], y: planetRoster[i][1]};
				let dest = {x: planetRoster[j][0], y: planetRoster[j][1]};
				if (calculateDistance(orig, dest) <= 192) {routes.push([orig, dest, calculateDistance(orig, dest)]);stellarLinks.push(new StellarLink(orig, dest))}
			}
		}
		fillCells(planetRoster[i][0], planetRoster[i][1]);
	}
	// Sort routes by length
	routes.sort((a, b) => a[2] > b[2] ? 1 : -1);
	stellarLinks.sort((a, b) => a.distance > b.distance ? 1 : -1);
	// Remove long routes that cross short ones
	for (let i = 0; i < routes.length - 1; i++) {
		for (let j = i + 1; j < routes.length; j++) {
			if (doLanesCross(routes[i][0], routes[i][1], routes[j][0], routes[j][1])) routes.splice(j, 1);
		}
	}

	for (let i of times(totalPlanets)) {
		world.push([]);
		let w = world[i];
				
		// Generate random name
		let workingName;
		do {
			workingName = generateName(1, "simple");
			for (let j = 0; j < i; j++) if (world[j].name.substring(0, workingName.length) == workingName) workingName = "FAIL";
		} while (workingName == "FAIL");  // Regenerate initial syllable if it matches any other planet name's initial syllable
		w.name = workingName + generateName(rnd([1,1,1,1,1,2,2,2,2,3]), "simple").toLowerCase();	// set planet name (by adding 1-3 syllables)
		
		// Set coordinates
		w.x = Math.ceil(Math.random() * (cellWidth - 64)) + (i % 13 * cellWidth + (i % 13 < 6 ? cellWidth / 2 : cellWidth * -6)) + 16; // set x coord
		w.y = Math.ceil(Math.random() * (cellHeight - 64)) + ((Math.floor(i / 13) * 2 + (i % 13 < 6 ? 0 : 1)) * cellHeight) + 16; // set y coord
		
		// Set planet images
		if (planetImg.length == 0) planetImg = shuffle([...Array(32).keys()]);
		w.planetImage = planetImg.pop() + 1;
		
		// Add locales to world
		//var possibleLocales = localeList.slice(0);
		//var possibleTexts = ["Clive's", "The Restaurant at the End of the Universe", "Our Lady of Perpetual Exemptions", "Terran Embassy", "Abandoned Chip Factory", "Sunrise Park", "Executive Hotel", "Joe's Place", "University of Mecklenburg", "Archeology Museum", "Astromedica HQ", "Local Police", "Deuterium Penitentiary", "Spaceport", "Doggy Magical Department Store", "Eunion Warehouse"];
		w.locales = [];
		for (let j of times(4)) w.locales.push({file: "", name: "", comm: [{speaker: -1, text: "", choice: 0}]});
		
		// Choose Focus (mining, farming, etc.)
		if (focuses.length < 1) focuses = focusList.slice(0);
		w.focus = focuses.splice(rnd(focuses.length) - 1, 1)[0];
		
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
		w.poptext = w.pop < 10 ? `${w.pop}${temp}0k` : w.pop < 19 ? `${w.pop - 9}.${temp}M` : (temp = Math.floor(1.8 ** (w.pop + temp / 10) / 12700), temp < 1000 ? `${temp}M` : `${(temp / 1000).toFixed(1)}B`);
		
		// Generate text description
		if (scapes.length < 1) scapes = scapeList.slice(0);
		w.file = scapes.splice(rnd(scapes.length) - 1, 1)[0];
		w.text = generateDescription(w);
		
		// Add economic data
		w.goods = worldGoods(w);	// (goods.js)
		w.goods.sort((a, b) => a.name == b.name ? a.price - b.price : a.name > b.name ? 1 : -1);// Sort goods by name, then price
		w.goods.forEach(v => v.baseprice = v.price - Math.floor(v.price * (1 - w.pop / 100 + rnd(10) / 100) * v.supply / (v.supply + 10)));	// Range 0.01-0.30 (small worlds = greater price swing)
		w.tax = (rnd(w.gov == "Anarchy" ? 3 : 10) + (w.gov == "Democracy" ? 5 : 0)) / 100;	// Sales tax rate
		
		// Add settlement
		w.city = [];
		for (let i of times(w.pop / 5)) w.city.push(parse("#colonyName#"));
		
		// Add world to #world# data
		storyFramework.world.push(`${w.name}<${w.focus.toLowerCase()}><${w.pop < 12 ? 'small' : w.pop < 21 ? 'medium' : 'large'}>`);
		
		w.known = -3; // -3: unknown, -2: known, -1: seen, 0+ turns since last visited
	}
	console.log(`<p>Finished adding system data.</p> (${performance.now()})`);
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
		case "simple":
			onset = [..." bdfghjklmnprstvwyz".split(""),"ch","sh","th"];
			coda = "";
			break;
		case "SWname":	// Star Wars name meme: first 3 chars of lastname + first 2 chars of firstname
			let swname = rndPersonName();
			name += swname.split(" ").slice(1).join(" ").slice(0,3) + swname.slice(0,2).toLowerCase();
			return capitalize(name.replace(/ /g, ''))
		default:
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
			if (w.type.match(/^(Rocky|Desert)$/i)) desc += `It is home to ${temp.splice(rnd(temp.length) - 1, 1)} and ${rnd(temp)}.`;
			if (w.type == "Ocean") desc += `Its indigenous sea life ${rnd(["provide abundant resources", "coexist with floating colonies scattered across the planet", "attract tourists and scientists"])}.`;
			if (w.type == "Ice") desc += `Its brutally cold weather ${rnd(["attracts few visitors", "makes life rather miserable", "limits growth potential"])}.`;
			break;
		case 3:
			if (w.focus == "Mining") desc += `${w.name} is famed for its rich ore veins.`;
			if (w.focus == "Agricultural") desc += `Its surface is covered with vast farmlands.`;
			if (w.focus == "Industrial") desc += `Its many factories light up the night sky.`;
			if (w.focus == "Terraforming") desc += `It is in the process of becoming a green paradise.`;
			if (w.focus == "High Tech") desc += `Its well-educated people are at the nexus of innovation.`;
			if (w.focus == "Affluent") desc += `Citizens of ${w.name} tend to be rich and flaunt it.`;
			if (w.focus == "Slum") desc += `Most of its people just scrape by, impoverished by past generations.`;
			if (w.focus == "Cultural") desc += `${w.name} is a well-known name thanks to its many wonders.`;
			if (w.focus == "Prison") desc += `Almost all of the populous live behind bars or are employed in front of them.`;
			if (w.focus == "Frontier") desc += `A few sturdy settlers are hoping ${w.name} will become a major destination.`;
			if (w.focus == "Mixed") desc += `The cosmopoliton world of ${w.name} offers a little bit of everything.`;
			break;
		default:
			if (w.gov == "Anarchy") desc += `It's the wild west amongst ${w.name}'s disjointed settlements.`;
			if (w.gov == "Corporate") desc += `On ${w.name} it is the rare few who do not work directly for ${w.govdesc}.`;
			if (w.gov == "Democracy") desc += `${w.name} politics are rife with constant intrigues and revelations.`;
			if (w.gov == "Feudal") desc += `The central government is only one of many players in the hectic politics here.`;
			if (w.gov == "Military") desc += `The high command carefully monitors all traffic in and out.`;
			if (w.gov == "Theocracy") desc += `The people and institutions on ${w.name} are very wary of foreign influences.`;
	}
	desc += ` ${w.name}'s ${w.focus.toLowerCase()} economy is ${["primarily resource-based", "focused on services", "quite varied"][w.focus.match(/^(Affluent|High Tech|Cultural)$/i) ? 1 : w.focus.match(/^(Slum|Prison|Mixed)$/i) ? 2 : 0]}.`;
	// 3 parts: basics (size, composition), funfact, trade data
	//"Mining", "Agricultural", "Industrial", "Terraforming", "Affluent", "Slum", "High Tech", "Cultural", "Frontier", "Prison", "Mixed"
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
									let corpABC = [...oldCorps, ...newCorps].sort((a,b)=>(a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0);
									for (let i of corpABC) out+= `<div class='hoverable' onclick='displayInfo("corp","${i.name}")'>${i.name}</div>`;
							out += `</div>
								<button class="collapsible">Worlds</button>
								<div class="collcontent">`;
									let worldABC = world.slice().sort((a,b)=>(a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0);
									for (let i of worldABC) out+= `<div class='hoverable' onclick='displayInfo("world","${i.name}")'>${i.name}</div>`;
							out += `</div>
								<button class="collapsible">Tutorials</button>
								<div class="collcontent">
									Forthcoming...
								</div>
							</td>
							<td id='infoDBText' style='width: 810px; vertical-align: top; overflow-y: auto; position: relative'>
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
						<div id='commPerson'></div>
						<div id='commText' style='padding: 5px'>Galaxy loading...</div>
					</div>
				</div>
			</div>
			<canvas id='shipCanvas' class='' width='${starmapWidth}' height='${starmapHeight}'></canvas>
			<canvas id='starmapCanvas' class='' width='${starmapWidth}' height='${starmapHeight}'></canvas>
			<canvas id='animationCanvas' class='' width='${starmapWidth}' height='${starmapHeight}'></canvas>
			<div id='starlanes'>
				<img id='spaceshipIcon' src='images/icons/spaceship.png'>`;
				for (let i in starlane) {
					out += `<div id='starlane${i}div'>
								<img id='starlane${i}' class='fadable' draggable='false' style='position:absolute; left: ${starlane[i].x}px; top: ${starlane[i].y}px; display: none; animation-delay: ${Math.floor(Math.random() * -differentFadables)}s'>
							</div>`;	// animation-delay is negative so it starts midway
				}
	out += `</div>
			<div id='worlds'>`;
				for (let [i,v] of world.entries()) {
					out += `<div id='planet${i}' class='popup planet' style='left: ${v.x}px; top: ${v.y}px;' onmouseover='popupdisplay(${i})'>
								<img src='images/planets/planet${v.planetImage}.png' draggable='false' style='height: 32px; position: absolute; clip-path: circle(16px at ${16 * (i % 5 + 1)}px 50%); left: -${16 * (i % 5)}px;' onclick='displayCurrentSystem(${i})'>
								<p style='position: absolute; top: 20px; color: white'>
									<b>${v.name}</b>
								</p>
								<p id='planet${i}text' class='popuptext' style='position:absolute'>
									<b>${v.name}</b> <i>(${v.pop})</i><br>
									<span id='planet${i}info'></span>
								</p>
							</div>`;
				}
	out += `</div>
			<div id='spaceship' ondrop='dropGood(event, "ship")' ondragover='allowDrop(event)'></div>
		</div><div id='rightFrame'>
			<div id='worldbox'>
				<div id='worldboxdisplay'>
					<div id='wbdImage'>
						<img id='worldboxImg' class='worldImg' draggable='false'>
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
					<div id='markettab' class='tabcontent' ondrop='dropGood(event, "market")' ondragover='allowDrop(event)'></div>
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