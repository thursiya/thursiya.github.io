const starmapWidth = 1330; //screen.availWidth - 350;
const starmapHeight = 770;

function loadGame () {
	let out = ``;//<div style='user-select: none'>`;
	out += `<div id='starmap' style='width: ${starmapWidth}px;height: ${starmapHeight}px; position: relative; display: inline-block'></div>`;
	out += `<div id='rightFrame' style='width: 315px; display: inline-block; vertical-align: top; position: relative; background-color: #111'>`;
	out += `<div id='worldbox' style='width: 300px; height: 669px; display: inline-block; position: relative; z-index: 8; vertical-align: top; border-left: 5px solid #009; margin-bottom: 3px; background-color: #000; color: #FFF; padding: 5px'>`;
	out += `<div id='worldboxdisplay'><div id='wbdImage'><img id='worldboxImg' class='worldImg' draggable='false'><div id='localeContainer' class='localeContainer'></div></div>`;
	out += `<div id='wbdText'></div></div>`;
	out += `<div id='worldboxmenu' style='border: 2px solid white; border-radius: 5px; margin-top: 10px; background-color: #444'>`;
	out += `<div class='tab' style='text-align: center; font-size: 120%; background-color: #FFF; color: #000'>`;
	for (let i = 0; i < 4; i++) out += `<button id='${tabsList[i]}TabButton' class='tablinks' onclick='chooseTab(event, ${i})' title='${capitalize(tabsList[i]) + (i == 3 ? " Info" : "")}'><img src='images/buttons/${tabsList[i]}.png' width='22px' draggable='false'></button>`;
	out += "Tax: <b><span id='wbmTaxrate'></span>%</b></div>";
	out += `<div id='markettab' class='tabcontent' ondrop='dropGood(event, "market")' ondragover='allowDrop(event)'></div><div id='shipyardtab' class='tabcontent'></div><div id='noticestab' class='tabcontent'></div><div id='planettab' class='tabcontent'></div></div></div>`;
	out += `<div id='menuButtons' style='border-left: 5px solid #900; background-color: #000; color: #FFF; padding: 1px; margin-bottom: 3px; text-align: center; z-index: 9'>`;
	out += `<img id='commButton' src='images/buttons/message.png' style='display:inline-block; margin: 5px; cursor: pointer' onclick='displayComm()' draggable='false'><img id='canvasButton' src='images/buttons/ship.png' style='display:inline-block; margin: 5px; cursor: pointer' onclick='displayCanvas()' draggable='false'><img id='bgmusicButton' src='images/buttons/music.png' style='display:inline-block; margin: 5px; cursor: pointer' onclick='muteMusic()' draggable='false'></div>`;
	out += `<div id='playerInfo' style='border-left: 5px solid #090; background-color: #000; color: #FFF; padding: 5px'>`;
	out += `<b>\u20B5</b>: <span id='playerInfoCredits' class='big'>${player.credits}</span><span id='playerInfoTime' style='font: italic bold 150% "Lucida Console", Monaco, monospace; float: right'>${time.year}-${time.day}.${("0" + time.hour).slice(-2)}</span></div></div></div>`;
	out += `<audio id='bgMusic' autoplay loop></audio>`;
	document.getElementById('GameWindow').innerHTML = out;//write(out);
	document.getElementById('bgMusic').volume = 0.1;
	
	populateGalaxy();
	if (!adjacentSystem(5)) location.reload();	// Reload page if galaxy is too small
	for (let x = 0; x < 12; x++) {
		ship.push([]);
		for (let y = 0; y < 7; y++) ship[x].push({name: "", file: "", hull: "", price: 0, origin: ""});
	}
	console.log(ship);
	console.log(ship[0][6].file);
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
	
	displayCurrentSystem(here);
	document.getElementById('marketTabButton').click();
	updateTime();
}

function populateGalaxy () {
	var focusList = ["Mining", "Mining", "Agricultural", "Industrial", "Manufacturing", "Terraforming", "Affluent", "Slum", "Slum", "High Tech", "Cultural", "Frontier", "Prison", "Mixed", "Mixed"];
	var scapeList = ["city", "ocean", "lantern", "jungle", "frontier", "rainy", "slum", "affluent", "dark", "town", "crossing", "dock", "field", "outpost", "snow", "statue", "factory", "busy"];
	var syllablesOdds = [1,1,1,1,1,2,2,2,2,3]; // Number of syllables in name odds (2 = 50%, 3 = 40%, 4 = 10%)
	var focuses = focusList.slice(0);
	var scapes = scapeList.slice(0);
	var temp;
	
	// Currently not using 'shipCanvas' (no graphics needed yet)
	console.log("Populating the galaxy...");
	var out = `<div id='commScreen' class='commWindow' style='width: ${starmapWidth * 0.8}px; left: ${starmapWidth * 0.1}px'><div id='commButtons' style='background-color: #333; border-bottom: 3px solid #CC0; padding: 10px; height: 36px'><div style='float:right'>`;
	out += `<img id='infoButton' class='commTab' src='images/buttons/info.png' draggable='false' onclick='displayComm(9)'> &nbsp; <img id='newsButton' class='commTab' src='images/buttons/news.png' draggable='false' onclick='displayComm(8)'> &nbsp; <img id='transactionButton' class='commTab' src='images/buttons/transaction.png' draggable='false' onclick='displayComm(7)'> &nbsp; `;
	out += `<img id='manifestButton' class='commTab' src='images/buttons/manifest.png' draggable='false' onclick='displayComm(6)'> &nbsp; <img id='missionButton' class='commTab' src='images/buttons/mission.png' draggable='false' onclick='displayComm(5)'> &nbsp; <img id='contactsButton' class='commTab' src='images/buttons/address.png' draggable='false' onclick='displayComm(4)'> &nbsp; `;
	out += `<img id='previousMessage' class='commTab' src='images/buttons/next.png' style='transform: rotate(180deg)' draggable='false' onclick='displayComm(3)'><img id='messagesButton' class='commTab' src='images/buttons/message.png' draggable='false' onclick='displayComm(2)'><img id='nextMessage' class='commTab' src='images/buttons/next.png' draggable='false' onclick='displayComm(1)'> &nbsp;`;
	out += `<img src='images/buttons/close.png' class='commTab' draggable='false' onclick='hideComm()'></div></div>`;
	out += `<div style='padding: 5px; clear: both; max-height: 630px; overflow-y: auto'><div id='commPerson'></div><div id='commText' style='padding: 5px'>Galaxy loading...</div></div></div>`;
	out += `<canvas id='shipCanvas' class='' width='${starmapWidth}' height='${starmapHeight}' style='background-image: url("images/backgrounds/starfield.png"); position: absolute; z-index: -3'></canvas>`;
	out += `<canvas id='starmapCanvas' class='' width='${starmapWidth}' height='${starmapHeight}' style='background-image: url("images/backgrounds/starfield.png"); position: absolute; z-index: -2'></canvas>`;
	out += `<canvas id='animationCanvas' class='' width='${starmapWidth}' height='${starmapHeight}' style='position: absolute; z-index: -1'></canvas><div id='starlanes'>`;
	out += `<img id='spaceshipIcon' src='images/icons/spaceship.png' style='position: absolute; z-index: 3; opacity: 0'>`;
	
	var out2 = "<div id='worlds'>";
	for (let i = 0; i < totalPlanets; i++) {
		world.push([]);
		let w = world[i];
		let workingName;
		// Generate random name
		do {
			workingName = generateName(1, "simple");
			for (let j = 0; j < i; j++) if (world[j].name.substring(0, workingName.length) == workingName) workingName = "FAIL";
		} while (workingName == "FAIL");  // Regenerate initial syllable if it matches any other planet name's initial syllable
		w.name = workingName + generateName(syllablesOdds[rnd(syllablesOdds.length) - 1], "simple").toLowerCase();	// set planet name (by adding 0-2 syllables)
		
		// Set coordinates
		temp = horizontalCells * 2 - 1;
		w.x = Math.ceil(Math.random() * (cellWidth - planetWidth - (2 * cellPadding))) + (i % temp * cellWidth + (i % temp < horizontalCells - 1 ? cellWidth / 2 : cellWidth * -6)) + cellPadding; // set x coord
		w.y = Math.ceil(Math.random() * (cellHeight - planetWidth - (2 * cellPadding))) + ((Math.floor(i / temp) * 2 + (i % temp < horizontalCells - 1 ? 0 : 1)) * cellHeight) + cellPadding; // set y coord
		
		// Add locales to world
		//var possibleLocales = localeList.slice(0);
		//var possibleTexts = ["Clive's", "The Restaurant at the End of the Universe", "Our Lady of Perpetual Exemptions", "Terran Embassy", "Abandoned Chip Factory", "Sunrise Park", "Executive Hotel", "Joe's Place", "University of Mecklenburg", "Archeology Museum", "Astromedica HQ", "Local Police", "Deuterium Penitentiary", "Spaceport", "Doggy Magical Department Store", "Eunion Warehouse"];
		temp = [];
		for (let j = 0; j < 4; j++) temp.push({file: "", name: "", comm: [{speaker: -1, text: "", choice: 0}]});
		w.locales = temp;
		
		// Choose Focus
		if (focuses.length < 1) focuses = focusList.slice(0);
		w.focus = focuses.splice(rnd(focuses.length) - 1, 1)[0];
		//"Mining", "Agricultural", "Industrial", "Manufacturing", "Terraforming", "Affluent", "Slum", "High Tech", "Cultural", "Frontier", "Prison", "Mixed"
		
		// Choose Type
		let planetTypes = ["Rocky", "Rocky", "Desert", "Desert", "Ocean"];
		if (w.focus == "Mining") planetTypes.pop();
		if (w.focus.match(/^(Mining|Frontier|Prison)$/i)) planetTypes.push("Ice");
		w.type = rnd(planetTypes);
		
		// Choose Government
		temp = rnd([0, 1, 1, 1, 2, 2, 3, 3, 4, 5]); // 10%, 30%, 20%, 20%, 10%, 10% odds
		w.gov = ["Anarchy", "Corporate", "Democracy", "Feudal", "Military", "Theocracy"][temp];
		w.govdesc = ["lawless", rnd(24) - 1, "democratic", "feudal", "military", "religious"][temp];
		
		// Choose Size (1 to 3)
		w.size = rnd(3);
		
		// Calculate population
		temp = w.focus.match(/^(Mining|Terraforming|Prison|Frontier)$/i) ? 0 : w.focus.match(/^(Agricultural|Industrial|Manufacturing)$/i) ? 9 : 18;
		w.pop = ["Ice", "Ocean", "Rocky", "Desert"].indexOf(w.type) * 3 + w.size + temp;
		temp = rnd(10) - 1;
		w.poptext = w.pop < 10 ? `${w.pop}${temp}0k` : (w.pop < 19 ? `${w.pop - 9}.${temp}M` : `${Math.floor(130 * (w.pop - 18) / (33 - w.pop))}${temp}M`);
		//19-30: 9, 20, 32, 47, 65, 86, 113, 148, 195, 260, 357, 520
		
		// Generate text description
		if (scapes.length < 1) scapes = scapeList.slice(0);
		w.file = scapes.splice(rnd(scapes.length) - 1, 1)[0];
		w.text = generateDescription(i);
		
		// Add economic data
		w.goods = worldGoods(w);
		w.goods.sort((a, b) => a.name == b.name ? a.price - b.price : a.name > b.name ? 1 : -1);// Sort goods by name, then price
		w.goods.forEach(v => v.baseprice = v.price - Math.floor(v.price * (1 - w.pop / 100 + rnd(10) / 100) * v.supply / (v.supply + 10)));	// Range 0.01-0.30 (small worlds = greater price swing)
		w.tax = (rnd(w.gov == "Anarchy" ? 3 : 10) + (w.gov == "Democracy" ? 5 : 0)) / 100;	// Sales tax rate
		
		// Add settlement
		w.city = [];
		for (let i = 0; i < w.pop / 5; i++) w.city.push(parse("#colonyName#"));
			
		out2 += `<div id='planet${i}' class='popup' style='position: absolute; left: ${w.x}px; top: ${w.y}px; display: none; cursor: pointer' onmouseover='popupdisplay(${i})'>`;
		out2 += `<img src='images/planets/planet${rnd(17)}.png' draggable='false' style='transform: rotate(${(rnd(4) - 1) * 90}deg)' onclick='displayCurrentSystem(${i})'>`;
		out2 += `<p style='position: absolute; top: 20px; color: white'><b>${w.name}</b></p>`;
		out2 += `<p id='planet${i}text' class='popuptext' style='position:absolute'><b>${w.name}</b> <i>(${w.pop})</i><br><span id='planet${i}info'></span></p></div>`;
		w.known = -3; // -3: unknown, -2: known, -1: seen, 0+ turns since last visited
	}
	storyFramework.world = [];
	for (let i = 0; i < world.length; i++) {
		temp = [];
		let w = world[i];
		for (let j = 0; j < world.length; j++) {
			if (calculateDistance(i, j) < maxDistance && j != i && world[j].x < starmapWidth) temp.push(j);
		}
		w.links = temp;
		w.links.forEach(v => {if (v > i) starlane[[i, v]] = {name: `${w.name}-${world[v].name} Link`, known: -3, status: rnd(6) - 2, x: Math.round((w.x + world[v].x) / 2), y: Math.round((w.y + world[v].y) / 2), distance: calculateDistance(i, v)}});
		storyFramework.world.push(`${w.name}<${w.focus.toLowerCase()}><${w.pop < 12 ? 'small' : w.pop < 21 ? 'medium' : 'large'}>`);
	}
	for (let i = 0; i < 25; i++) newCorps.push(rndCorporationName());	// Generate 25 new random corporations (in addition to 25 standard corps)
	oldCorps = oldCorps.map(v => new Corporation(v.split(" ")[0], "", v.split(" ")[1]));
	oldCorps[13].fullname = "Independent Consortium of Planets";
	oldCorps[13].type = "Consortium";
	world.forEach(v => {if (v.gov == "Corporate") v.govdesc = oldCorps[(v.govdesc)]});
	storyFramework.corp = [...oldCorps.map(v => v.name), ...newCorps.map(v => v.name)];
	for (let i in starlane) {
		out += `<div id='starlane${i}div'><img id='starlane${i}' class='fadable' draggable='false' style='position:absolute; left: ${starlane[i].x}px; top: ${starlane[i].y}px; display: none; animation-delay: ${Math.floor(Math.random() * -differentFadables)}s'></div>`;	// animation-delay is negative so it starts midway
	}
	out += `</div>${out2}</div><div id='spaceship' ondrop='dropGood(event, "ship")' ondragover='allowDrop(event)' style='width: ${starmapWidth}px; height: ${starmapHeight}px; background-image: url("images/backgrounds/starfield.png"); position: relative; z-index: -3'></div>`;

	
	console.log(world);
	console.log(starlane);	
	document.getElementById("starmap").innerHTML = out;
	
	document.getElementById("planet" + here).style.display = "block";
	let s = document.getElementById('spaceshipIcon');
	s.style.left = `${world[here].x}px`;
	s.style.top = `${world[here].y}px`;
	s.style.transition = '2s';
	world[here].known = 0;
}