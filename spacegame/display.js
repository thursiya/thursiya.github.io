function displayCurrentSystem (planetID) {
	// Cancel function if to same planet
	if (here == planetID) return false;
	// Cancel function if destination not connected to origin by starlane
	if (world[lastVisited].links.indexOf(planetID) == -1) {alert(world[planetID].name + " is too far away to travel to from " + world[lastVisited].name + "."); return false;}
	
	// Reset player location
	player.locale = "";
	
	// End any open communication
	killCalls();
	
	// Increment each world's age since last visit
	world.forEach(v => (v.known > 0) && v.known++);
	
	// Increment previously visited starlanes' age since last use and hide all starlane icons
	starlane.forEach((s, i) => {
		if (s.known >= 0) s.known++;
		document.getElementById(`starlane${i}`).style.display = 'none';
	});
	const lastLane = findLane(lastVisited, planetID);
	starlane[lastLane].known = 0;	// Reset last used starlane age
	updateTime(starlane[lastLane].distance / travelSpeed, false);	// Add travel time	
	
	// Handle spaceship sprite
	flightSFX.play();
	animateSpaceShip(world[lastVisited], world[planetID]);
	
	systemArrival(planetID);
}

function systemArrival (planetID) {
	const w = world[planetID];
	here = lastVisited = planetID;
	w.known = 0;
	console.log(`----------------- Arriving in ${w.name} (${here}) ----------------`);

	// Update world tooltip text
	let dist;
	world.forEach((v, i) => document.getElementById(`planet${i}info`).innerHTML = `<span style='color: #CCF; font-variant: small-caps'>${v.gov}</span><br><i>` + 
		(v.links.includes(planetID) ? (dist = starlane[findLane(i, planetID)].distance, `Dist: ${dist}<br>(${Math.ceil(dist / travelSpeed)} h)`) : i == planetID ? `Current world` : `This world is not connected to ${w.name} by a starlane.`) + `</i>`);
	
	// Discover all connected worlds
	w.links.forEach(v => {document.getElementById("planet" + v).style.display = "block"; if(world[v].known < -1) world[v].known = -1});
	
	// Queue background music
	playBGMusic();
		
	// Handle arrival
	checkTriggers();

	// Add 1 locale mission
	addMission(`locale${rnd(3)}`);
	
	// Add 2-8 world missions
	noticeMission(w.pop / 6 + rnd(3));
	
	// Reset market stocks & prices
	w.goods.forEach(v => {v.stock = v.supply});
	w.goods.forEach(v => {v.price = Math.floor(v.baseprice * (1 + rnd(Math.floor((36 - w.pop) / 3)) / 100))});	// Prices float around baseprice +2-11% of base price
	
	// Display starlanes
	displayStarlanes();
	
	// Display world info
	displayMarket();
	displayShipyard();
	displayNotices();
	displayPlanet();
	displayLocales();
	
	// Start graphics loop
	update = setInterval(updateGFX, 50, w);
}

function displayStarlanes () {
	const w = world[here];
	// Draw starlanes
	const c = document.getElementById("starmapCanvas").getContext("2d");
	clearInterval(update);
	c.strokeStyle = "#CFC";
	c.lineWidth = 4;
	c.setLineDash([]);
	c.globalAlpha = 0.2;
	for (let v of w.links) {
		c.beginPath();
		c.moveTo(w.x + 16, w.y + 16);
		c.lineTo(world[v].x + 16, world[v].y + 16);
		const lastLane = findLane(v, here);
		if (starlane[lastLane].known < -1) {	// Don't draw starlanes multiple times
			c.stroke();
			starlane[lastLane].known = -1;		// Set drawn starlane to known: -1 (know location)
		}			
	}
	
	// Add starlane icons
	for (let v of w.links) {
		const lane = findLane(v, here);
		if (starlane[lane].status >= 0) {
			const s = document.getElementById('starlane' + lane);
			s.src = `images/icons/${['construction', 'pirates', 'distress', 'construction2', 'mission'][starlane[lane].status]}.png`;
			s.title = ["Construction on this starlane\nis delaying travel by 2h.", "Pirates are known to\nwork on this starlane.", "A ship is in distress some-\nwhere on this starlane.", "Repairs on this starlane are\ndelaying travel by 4h.", "A mission objective\nis on this starlane.", "-"][starlane[lane].status];
			s.style.display = 'block';
		}
	}
}

function displayMarket () {
	let offers = [], demands = [], illegals = [], c = 0, gArr = [];
	function displayMarketWares(arr) {
		function displayWare(forSale = false) {
			if (c % 3 == 0) mText += `</tr><tr>`;
			const g = gArr[0];
			mText += `<td class='tooltip' width='90px'`;
				if (forSale && ['live', 'cold'].includes(g.stat)) mText += ` style='background-color: #${g.stat == 'live' ? '363' : '449'}'`;
			mText += `><div class='wares marketicon' data-good='${g.index}' draggable=${forSale} ${forSale ? `ondragstart='drag(event)' onclick='clickSelect("waremain", this)'` : ""}><img class='marketicon' src='images/goods/${g.file}.png' draggable='false'><span style='float:right'></div> &nbsp;${g.pText}
				<div class='tooltiptext'><table class='markettable hoverable'><tr><th colspan=2><b>${g.name}</b></th></tr>`;
			for (let i of gArr) mText += `<tr class='wares' data-good='${i.index}' draggable=${forSale} ${forSale ? `ondragstart='drag(event)' onclick='clickSelect("ware", this)'` : ""} ${forSale && i.stock < 1 ? "style='filter: brightness(0.5)'" : ""}><td width="100%">&#9655; ${capitalize(i.type)}</td><td>${i.pText}</td></tr>`;
			mText += `</table></div></td>`;
			c++;
			gArr = [];
		}
		const forSale = (arr == offers);
		for (let g of arr) {
			if (gArr.length > 0 && gArr[0].name != g.name) displayWare(forSale);
			gArr.push(g);
		}
		if (arr.length > 0) displayWare(forSale);
	}
	
	world[here].goods.forEach((v, index) => {
		v.index = index;
		v.pText = v.price < 10000 ? v.price : v.price < 100000 ? `${(v.price / 1000).toFixed(1)}k` : `${(v.price / 1000000).toFixed(1)}M`;
		v.stat == 'illegal' ? illegals.push(v) : v.supply > 0 ? offers.push(v) : demands.push(v)});
	
	let mText = ``;
	if (document.getElementById('spaceship').style.zIndex > 0) mText += `<div id='trashzone' ondrop='dropGood(event, "trash")' ondragover='event.preventDefault()' onclick='clickSelect("trash", this)'><img class='middle' src='images/goods/waste-products.png' style='width:50%' draggable='false'></div>`;
	mText += `<div ondrop='dropGood(event, "market")' ondragover='event.preventDefault()' onclick='clickSelect("market", this)'><div id='marketOffers'><table class='market'><tr>`;
	displayMarketWares(offers);
	mText += `</tr></table><div id='marketDemands' style='background-color: #522'><table class='market'><tr>`;
	c += c % 3 == 2 ? 1 : c % 3 == 1 ? 2 : 0;
	displayMarketWares(demands);
	mText += "</tr></table>";
	
	if (illegals.length > 0) {
		mText += `<div id='marketIllegals' style='background-image: url("images/backgrounds/hazard-stripes.png"); background-color: #552'${Math.ceil(c / 3) > 7 ? " class='tooltip'" : ""}><table class='market' style='margin: 0px auto'><tr>`;
		if (Math.ceil(c / 3) < 8) {	// Don't list illlegals if there's no room
			c = 0;
			for (let i = 0; i < illegals.length; i++) {			
				const g = illegals[i];
				if (i == 0 || g.name != illegals[i - 1].name) {
					if (i > 0) mText += "<br><i>ILLEGAL</i></span></td>";
					//if (i > 0 && c % 6 == 0) mText += "</tr><tr>";	// Only relevant if worlds could have more than 6 illegal goods
					mText += `<td class='tooltip' width='36px'><div class='marketicon' style='background-color: #EEE; opacity: 1' draggable='false'><img class='marketicon' src='images/goods/${g.file}.png' draggable='false'></div><span class='tooltiptext'><b>${g.name}</b><br>`;
					c++;
				}
				mText += `&#9655; ${capitalize(g.type)}<br>`;
			}
			mText += "<br><i>ILLEGAL</i></span></td>";
		} else mText += `<td class='tooltiptext' onclick='displayComm(7); displayInfo("gov", "${world[here].gov}")'>ILLEGAL GOODS<br><i>Check government (${world[here].gov}) description</i></td>`;
		mText += "</tr></table>";
	}
	document.getElementById('markettab').innerHTML = mText;
}

function displayShipyard () {
	document.getElementById('shipyardtab').innerHTML = `<br><i>&nbsp; 'Shipyard' not yet implemented... </i><br>&nbsp;`;
}

function displayNotices () {
	let nText = `<p>&nbsp; <i>There are currently no notices</i></p>`;
	// Remove expired notices
	world[here].notices.slice().forEach(v => {if (v.expiry <= time.full) world[here].notices.splice(world[here].notices.findIndex(n => n == v), 1)});
	if (world[here].notices.length > 0) {
		nText = `<table class='menutable hoverable' width='100%'><tr></tr>`;
		world[here].notices.forEach((v, i) => {nText += `<tr style='cursor: pointer' onclick='selectNotice(${i})'><td><span${v.expiry - time.full < 3 ? ` style="color: #F66"` : ``}>&#9655;</span> ${v.advert}</td></tr>`});
		nText += `</table>`;
	}
	document.getElementById('noticestab').innerHTML = nText;
}

function displayPlanet () {
	const w = world[here];
	document.getElementById('worldboxImg').src = `images/scapes/${w.file}scape.jpg`;
	document.getElementById('wbdText').innerHTML = `<span class='huge worldname'>${w.name}</span><span style='float:right; text-align: right'><span style='font-variant: small-caps'>${w.gov.toLowerCase()}</span><br>${w.poptext}</span><br>${w.text}`;
	document.getElementById('wbmTaxrate').innerHTML = (w.tax * 100).toFixed(0);
	let pText = `<table width='100%'>`;
	let pFacts = [["Name", w.name],
				["Government", w.gov],
				["Population", w.poptext],
				["Economy", w.focus],
				["Size", ["Small", "Medium", "Large"][w.size - 1]],
				["Planet Type", w.type],
				["Orbital Period", Math.ceil(seed / (here + 1) % 500 + 60 + here) + " days"],
				["Largest Settlement", w.city[0]]];
	if (w.gov == 'Corporate') pFacts[1][1] += `<br><span class='reduced' onclick='displayComm(7); displayInfo("corp", "${w.govdesc}")'>(${oldCorps.find(v => v.name == w.govdesc).fullname})</span>`;
	for (let i of pFacts) {
		pText += `<tr><td style='vertical-align: top'>${i[0]}</td><td class='big' style='text-align: right'>${i[1]}</td></tr>`
	}
	document.getElementById('planettab').innerHTML = pText + `</table>`;
}

function displayLocales () {
	let out = "";
	for (let [i, loc] of world[here].locales.entries()) if ('name' in loc && !loc.hidden) out += `<img id='locale${i}' class='locale' src='images/locales/${loc.file}.png' title="${loc.name}" draggable='false' style='left: ${[20, 96, 172, 248][i]}px; top: ${[80, 20, 60, 40][(i + here) % 4]}px' onclick='localeClick(${i})'>`;
	document.getElementById('localeContainer').innerHTML = out;
}

function chooseTab (evt, tab) {
	for (let i of document.getElementsByClassName('tablink')) i.className = i.className.replace(" active", "");
	for (let i of document.getElementsByClassName('tabcontent')) i.style.display = "none";
	document.getElementById(tabsList[tab] + 'tab').style.display = "block";
	evt.currentTarget.className += " active";
}



// ------ Comm Displays -------

function displayInfo (type, which) {
	if (!type || !which) return false;
	let out = "";
	if (type == "corp") {
		const c = [...oldCorps, ...newCorps].find(v => v.name == which);
		out = `<h2>${c.fullname}</h2>`;
		let out2 = "";
		goods.forEach(g => {if (g.type == c.name) out2 += `<li onclick='displayInfo("good", "${g.name}")'>${g.name}</li>`});
		if (out2) out += `<p>Associated Goods:</p>${out2}`;
	}
	if (type == "world") {
		const w = world.find(v => v.name == which);
		out = `<img class='rotatingPlanet' src="images/planets/planet${w.planetImage}.png" draggable='false'>
			<div class='rotatingPlanetShadow'></div>
			<p class='huge worldname' style="position:absolute; left:150px"><b>${w.name}</b></p>
			<img src="images/scapes/${w.file}scape.jpg" style='float: right; vertical-align: top' draggable='false'>
			<br style='clear:both'><p>${w.text}</p>
			<table>`;
				for (let i of [["Government", `<span onclick='displayInfo("gov", "${w.gov}")'>${w.gov}</span>${w.gov == 'Corporate' ? ` (Owned by <span onclick='displayInfo("corp", "${w.govdesc}")'>${w.govdesc}</span>)` : ""}`], ["Population", w.poptext.replace(/k/, ",000").replace(/M/, " million").replace(/B/, " billion")], ["Economic Focus", `<span onclick='displayInfo("economy", "${w.focus}")'>${w.focus}</span>`], ["Planet Type", `${['Small','Medium','Large'][w.size - 1]} ${w.type} world`], ["Settlements", w.city.join("<br>")]]) {
					out += `<tr>
						<td style='width: 170px; text-align: right; vertical-align: top'>${i[0]}</td>
						<td class='enlarged'><b>${i[1]}</b></td>
					</tr>`
				}
		out += `</table>`;
	}
	if (type == "gov") {
		const g = illegalGoods(which);
		out = `<h2><img src="images/govs/${which}.png" draggable="false" style="vertical-align:middle"> ${which}</h2><p>Tax Rates: <i>${which == "Anarchy" ? "Low" : which == "Democracy" ? "High" : "Average"}</i></p><p>Illegal Goods:${which == "Anarchy" ? " <i>None</i></p>" : `</p><img src="images/goods/${goods[g[0]].file}.png" draggable="false" style="vertical-align:middle;margin:5px"> ${goods[g[0]].name} (${goods[g[0]].type}`}`;
		for (let i = 1; i < g.length; i++) out += (goods[g[i - 1]].name == goods[g[i]].name) ? `, ${goods[g[i]].type}` : `)<br><img src="images/goods/${goods[g[i]].file}.png" draggable="false" style="vertical-align:middle;margin:5px"> ${goods[g[i]].name} (${goods[g[i]].type}`;
		if (g.length > 0) out += `)`;
		if (which == "Military") out += `<p>Military worlds will demand hand weapons and bacteria farms (if they don't produce them).</p>`;
	}
	if (type == "economy") {
		const e = ({"Affluent": [[72, 17, 55, 60], `Affluent worlds do not normally produce goods unless they are a corporate world, in which case they will produce their own branded perishable goods, consumer goods, liquor, luxury goods, and robots.</p><p>They demand a lot. Affluent society requires lots of high-end vehicles, medicine, robots, animal meat, liquor, luxury goods, consumer goods, government artifacts, and fruit & vegetables. They also need gemstones, grain, hydrogen fuel cells, lumber, top-grade hydroponic farms and perishable goods, and all types of live animals. Democratic worlds will demand better quality goods, while others will pay for upper-end hand weapons and narcotics, large quantities of animal skins, and child, regular, and especially Luxorian slaves.`],
			"Agricultural": [[33, 36, 56, 7, 10, 53, 67, 72, 43], `Agricultural planets supply variable amounts of fruit & vegetables, grain, and either bio-engineered, Terran, or Lacotian live animals, meat, and skins. They also produce some minor narcotics and cheap perishable goods. Agricultural worlds will produce hydroponic farms and liquor (high-grade on democratic worlds, and low-grade on others). Corporate worlds will produce more minor narcotics and more of their own branded goods. Expect small-scale forestry on rocky planets and more hydroponic farms on ocean worlds.</p><p>Demand is for low-grade automobiles and robots, fertilizer, lumber, cheap medicine, and lots of farming equipment. Democratic planets will demand better medicine and robots, while others demand adult forced labour. Agricultural worlds will also buy live animals that are not produced there.`],
			"Cultural": [[54, 62, 72, 17], `Cultural worlds are more likely to attract visitors.</p><p>They produce expensive liquor and luxury goods, and cheap perishable and consumer goods on non-democratic planets. Corporate worlds will produce more of their own branded goods.</p><p>The people of cultural worlds demand a variety of vehicles, animal meat and skins, fancier live animals, upper-end robots, consumer and perishable goods, fruit & vegetables, grain, precious metals, lumber, luxury goods, minor narcotics, and all grades of medicine. Democratic worlds will demand better quality goods, while others will pay for a range of narcotics as well as regular and Luxorian slaves.`],
			"Frontier": [[53, 77, 85, 56, 7, 10, 16, 36, 76, 67, 17, 72], `Frontier worlds produce small amounts of cheap liquor, precious metals, slaves, and either bio-engineered, Terran, or Lacotian live animals, meat, and skins. They may produce a small amount of chemicals, grain, petroleum, minor narcotics, or cheap consumer or perishable goods. Corporate worlds will produce more of their own branded goods.</p><p>The frontier needs fertilizer, fruit & vegetables, synthetic meat, water, low-end automobiles, and basic medicine, probes, and robots. These worlds also demand mid-grade consumer and perishable goods, narcotics and liquor (just better than what would be produced there). Democratic worlds will demand better quality goods and cheap electronics, while others will pay for industrial explosives, low to mid-grade hand weapons, and cheap perishable goods.`],
			"High Tech": [[23, 63, 81, 78, 90, 92, 17, 68, 61, 94], `High Tech worlds produce all types of electronics, medicines, robots, and probes, plus bio-engineered slaves, synthetic meat, low-grade consumer goods, moderate and high-grade narcotics, and high-grade luxury goods. Ocean worlds will also sell some water. Corporate worlds will produce more of their own branded goods.</p><p>Being on the cutting edge of technology creates a populous yearning for all types of vehicles, perishable goods, liquors and animal meats, high-grade consumer goods, low-grade luxury goods, fruit & vegetables, grain, and hydroponic farms. High tech chip factories need chemicals, industrial goods, and lots of precious metals. Democratic worlds will demand better quality goods, while others are able to use bacteria farms and even a few regular or Luxorian slaves.`],
			"Industrial": [[46, 13, 27, 29, 41, 52, 42], `Industrial worlds produce all types of industrial equipment, bacteria farms, and explosives, plus fertilizer, heavy plastics, liquid oxygen, and hydrogen fuel cells. Corporate worlds will produce more of their own branded goods.</p><p>Industrial planets need cheap electronics, low-grade robots, all non-Luxorian slaves, and lots of chemicals, iron ore, minerals, and petroleum to supply their industries. The population demand synthetic meat, low-grade vehicles, consumer goods, medicine, narcotics, liquor, and animal meat, as well as lots of low-grade perishable goods.`],
			"Manufacturing": [[2, 0, 30, 37, 49, 60, 81], `Manufacturing worlds produce all types of automobiles, air processors, farming equipment, hand weapons, industrial and luxury goods. They also make basic manufacturing robots. Corporate worlds will produce more of their own branded goods.</p><p>Manufacturing planets will demand all types of animal and synthetic meat, liquor, low-grade consumer goods, medicine, narcotics, and lots of perishable goods. Their factories will need a regular supply of grain, fruit & vegetables, gemstones, precious metals, liquid oxygen, uneducated or regular slaves, all types of industrial equipment, and lots of low to mid-grade robots.`],
			"Mining": [[16, 34, 51, 66, 76, 77, 59, 94], `Mining worlds produce variable amounts of chemicals, gemstones, iron ore, minerals, petroleum, and precious metals. Expect forestry on desert and especially rocky planets and water extraction on ice worlds.</p><p>Mining infrastructure demands air processors, probes, adult forced labourers (especially bio-engineered), low-grade automobiles, robots, and lots of industrial equipment and industrial explosives. The populous eats mostly cheap perishable goods and some synthetic and cheap animal meat. They need a regular supply of low-grade consumer goods, narcotics, and lots of cheap liquor.`],
			"Mixed": [[17, 59, 94], `Mixed economies could produce and demand anything. They will either demand a variety of consumer goods or produce some consumer goods and demand chemicals, plastics, or lumber. Expect forestry on desert and especially rocky planets and some water sold on ocean worlds.`],
			"Prison": [[17, 51, 66, 86, 59, 94], `Prison worlds produce low-grade consumer goods, iron ore, minerals, and large numbers of forced labourers (especially uneducated and bio-engineered). Expect forestry on desert and especially rocky planets and water extraction on ocean and especially ice worlds. Corporate worlds will produce more of their own branded goods.</p><p>The prison economy buys cheap vehicles, chemicals, heavy plastics, lumber (if not in ready supply), and all types of electronics. The populous subsist off of grain, cheap perishable goods, and lots of synthetic meat.`],
			"Slum": [[17, 73, 60, 85, 59], `Slum economies produce high-grade consumer goods, moderate to high-grade perishable goods and all types of luxury goods. They will sell all types of slaves, especially children and uneducated, and even a rare Luxorian. Expect forestry on desert and especially rocky planets. Corporate worlds will produce more of their own branded goods.</p><p>Slum worlds demand cheap vehicles and perishable goods, chemicals, gemstones, lumber (on ocean or ice planets), heavy plastics, hydrogen fuel cells, grain, low-grade consumer goods, synthetic meat, all types of electronics, and lots of low quality liquor. Democratic worlds will demand slightly better quality goods, while others buy explosives and lots of hand weapons and narcotics (especially high-grade) where legal.`],
			"Terraforming": [[16, 51, 66], `Terraforming worlds produce variable amounts of chemicals, iron ore, and minerals.</p><p>These planets demand air processors, farming equipment, fruit & vegetables, hydroponic farms, probes, liquid oxygen, all types of live animals, low-grade robots, and lots of fertilizer and water. The people need low-grade consumer goods, perishable goods, animal and synthetic meat, and cheap medicine. Democratic worlds will demand some better quality goods, while other worlds will buy bacteria farms, explosives, and regular or bio-engineered slaves.`]})[which];
		out = `<h2>${which} `;
		for (let i of e[0]) out += `<img src="images/goods/${goods[i].file}.png" draggable="false" style="vertical-align: middle"> `;
		out += `</h2><p>${e[1]}</p>`;
	}
	if (type == "good") {
		const g = goods.filter(v => v.name == which);
		out = `<h2><img src="images/goods/${goods.find(g => g.name == which).file}.png" draggable="false" style="vertical-align: middle; width: 64px"> ${which}</h2><p>${g[0].desc}</p>`;
		if ('stat' in g[0]) out += `<p>Status: <b>${capitalize(g[0].stat)}</b> <i class="reduced">(${({"cold": "must be kept in cold storage",
			"dangerous": "damaged cargo poses a threat to ship",
			"live": "must be kept in life support",
			"sensitive": "damaged cargo is not salvageable"})[g[0].stat]})</i></p>`;
		out += `<table class="menutable greenheader hoverable"><tr><th>Variety</th><th>Base Price</th><th>Supply</th><th>Demand</th></tr>`;
		for (let i of g) out += `<tr><td>${i.type}</td><td style="text-align: center">${i.price}</td><td style="text-align: center">${i.produce}</td><td style="text-align: center">${i.demand}</td></tr>`;
		out += `</table><p class="reduced" style="font-variant: small-caps"><i><b>Af</b>fluent, <b>Ag</b>ricultural, <b>C</b>ultural, <b>F</b>rontier, <b>H</b>igh Tech, <b>I</b>ndustrial, <b>Ma</b>nufacturing, <b>Mi</b>ning, <b>P</b>rison, <b>S</b>lum, <b>T</b>erraforming</p>`;
	}
	
	document.getElementById('infoDBText').innerHTML = out;
	document.getElementById('commContent').scrollTop = 0;
}

function updateNewsfeed () {
	let out = "";
	for (let n of newsItem) out += `<tr><td>${displayTime(n.time)}</td><td>${n.headline}</td></tr>`;
	document.getElementById('commNewsfeed').innerHTML = `<table class='menutable redheader hoverable'><tr><th width='120px'>Time</th><th width='500px'>News Headline</th></tr>${out}</table>`;
}

function updateAccountsDisplay () {
	let out = "", p;
	transactionRecord.forEach((v, i) => {
		if (i > 0) p = transactionRecord[i - 1];
		out += `<tr>${(i > 0 && p.time == v.time && p.name == v.name) ? `<td colspan='3' style='text-align: center'>` : `<td>${v.time}</td><td>${v.location}</td><td>${v.name}`}</td><td><i>${v.note}</i></td><td style='text-align: right'>${v.amount}</td></tr>`;
	});
	document.getElementById('commAccounts').innerHTML = `<table class='menutable yellowheader hoverable'><tr><th width='120px'>Time</th><th width='120px'>Location</th><th width='200px'>Name</th><th width='500px'>Note</th><th width='80px'>Amount</th></tr>${out}</table>`;
}

function updateManifest () {
	let out = "", passengers = [], cargo = [];
	for (let x of ship) {
		for (let s of x) {
			if ('name' in s) {
				if (s.room == 'living') passengers.push(s);
				if (s.room == 'cargohold') cargo.push(s);
			}
		}
	}
	if (passengers.length) {
		out += "<table class='menutable blueheader hoverable'><tr><th width='300px'>Passenger</th><th width='150px'>Origin</th><th width='150px'>Destination</th></tr>";
		passengers.forEach(v => {out += `<tr><td>${person[v.name].name}</td><td>${world[v.origin].name}</td><td>${world[v.dest].name}</td></tr>`});
		out += "</table><br><br>";
	}
	if (cargo.length) {
		out += `<table class='menutable greenheader hoverable'><tr><th width='500px'>Cargo</th><th width='120px'>Origin</th><th width='120px'>Destination</th><th width='90px'>Price</th></tr>`;
		cargo.forEach(v => {out += `<tr><td>${capitalize(v.type)} ${v.name}${v.id ? ` (<span style='font-variant: small-caps'>id:</span> <span style='font-family: monospace'>${v.id}</span>)` : ``}</td><td>${world[v.origin].name}</td><td>${Number.isInteger(v.dest) ? world[v.dest].name : v.dest}</td><td style='text-align: right'>${v.price}</td></tr>`});
		out += `</table>`;
	}
	if (!passengers.length && !cargo.length) out = `<h2 style='text-align: center'><i>... Ship is Currently Empty ...</i></h2>`;
	document.getElementById('commManifest').innerHTML = out;
}

function updateMissionsDisplay () {
	let out = "";
	function mText (arr) {
		let missions = "";
		for (let m of arr) if (m.summary) missions += `<tr><td>${m.name}</td><td>${m.timetext}</td><td onclick='contactPerson(${m.client})' style='cursor: url("images/buttons/contact.png"), auto'>${person[m.client].name}</td><td>${m.summary}</td></tr>`;
		return missions;
	}
	let m1 = mText(mission);
	let m2 = mText(oldmission);
	let t = `<table class='menutable redheader hoverable'><tr><th width='170px'>Type</th><th width='120px'>Time</th><th width='200px'>Contact</th><th width='500px'>Summary</th>`;
	out += (m1) ? `${t}${m1}</table>` : `<h2 style='text-align: center'><i>... No Active Missions ...</i></h2>`;
	if (m2) out += `<br><br><div style='text-align: center'><b><i>Old Missions</i></b></div>${t}${m2}</table>`;
	document.getElementById('commMissions').innerHTML = out;
}

function updateContactsDisplay () {
	let out = "", people = [];
	person.forEach((v, i) => {if (v.contact > -1) people.push([v.lastname + v.firstname, `<tr><td onclick='contactPerson(${i})' style='cursor: url("images/buttons/contact.png"), auto'><img src='images/people/${v.image}.png' style='filter: hue-rotate(${v.color}deg) brightness(${v.brightness}); vertical-align: -5px; width: 26px' draggable='false'> &nbsp;${v.name}</td><td>${v.title}</td><td>${v.org}</tr>`])});
	people.sort().forEach(v => {out += v[1]});
	document.getElementById('commContacts').innerHTML = `<table class='menutable blueheader hoverable'><tr><th width='250px'>Contact</th><th width='180px'>Title</th><th width='400px'>Organization</th>${out}</table>`;
}

function displayNews () {
	let out = "";
	newsItem.forEach(v => {out += `<tr><td>${displayTime(v.time)}</td><td>${v.headline}</td></tr>`});
	return `<table class='menutable redheader hoverable'><tr><th width='120px'>Time</th><th width='500px'>News Headline</th></tr>${out}</table>`;
}

function displayTransactions () {
	if (!transactionRecord[0]) return `<h2 style='text-align: center'><i>... No Logged Transactions ...</i></h2>`;
	let out = "", p;
	transactionRecord.forEach((v, i) => {
		if (i > 0) p = transactionRecord[i - 1];
		out += `<tr>${(i > 0 && p.time == v.time && p.name == v.name) ? `<td colspan='3' style='text-align: center'>` : `<td>${v.time}</td><td>${v.location}</td><td>${v.name}`}</td><td><i>${v.note}</i></td><td style='text-align: right'>${v.amount}</td></tr>`;
	});
	return `<table class='menutable yellowheader hoverable'><tr><th width='120px'>Time</th><th width='120px'>Location</th><th width='200px'>Name</th><th width='500px'>Note</th><th width='80px'>Amount</th></tr>${out}</table>`;
}