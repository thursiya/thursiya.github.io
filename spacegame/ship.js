let ship = [];



// set 'full' flag to TRUE to include full rooms in count
function emptyRoom (roomtype, full = false) {
	let amount = 0;
	for (let x of ship) for (let s of x) if (s.room == roomtype && (full || !('name' in s))) amount++;
	return amount > 0 ? amount : false;
}


function haveCargo (item, query, amount = 1, dest, price) {
	const matchingHolds = [], emptyHolds = [], coldHolds = [], liveHolds = [];
	//ship.forEach((v, x) => v.forEach((s, y) => {
	for (let [x, v] of ship.entries()) for (let [y, s] of v.entries()) {
		if (s.room == 'cargohold') {
			if ('name' in s) {
				if (s.name == item.name && s.type == item.type && s.id == item.id) matchingHolds.push({x, y});
			} else {
				if (s.config == 'cold') coldHolds.push({x, y});
				if (s.config == 'live') liveHolds.push({x, y});
				emptyHolds.push({x, y});
			}
		}
	}
	console.log(`*** haveCargo(${item.name} (status: ${item.stat}), ${query}, ${amount}, ${dest}, ${price}) ***`);
	console.log(`matchingHolds: ${matchingHolds.length}`);
	console.log(`emptyHolds: ${emptyHolds.length}`);
	console.log(`coldHolds: ${coldHolds.length}`);
	console.log(`liveHolds: ${liveHolds.length}`);
	// Return TRUE if sufficient 'item' is on ship (for no query calls)
	if (!query) return matchingHolds.length >= amount;
	
	// 'add' cargo
	if (query == 'add') {
		const hold = (item.stat == 'cold' && coldHolds.length) ? coldHolds.shift() : (item.stat == 'live' && liveHolds.length) ? liveHolds.shift() : emptyHolds.shift();
		addCargo(item, hold.x, hold.y, price, dest);
		return (amount > 1) ? haveCargo(item, 'add', --amount, dest, price) : true;
	}
	
	// 'remove' cargo
	for (let i of times(amount)) removeCargo(matchingHolds[i].x, matchingHolds[i].y, false);
	
	/*
	let numAffected = 0;
	for (let x of times(ship.length)) {
		for (let y of times(ship[0].length)) {
			const s = ship[x][y];
			if (query == 'add' && s.room == 'cargohold' && !('name' in s)) {
				addCargo(item, x, y, price, dest);
				amount--;
				numAffected++;
				checkTriggers();
				if (amount <= 0) return numAffected;
			}
			if (s.name == item.name && s.type == item.type && s.id == item.id) {
				if (query == 'remove') {
					removeCargo(x, y, false);
					amount--;
					numAffected++;
					checkTriggers();
					if (amount <= 0) return numAffected;
				} else if (query != 'add') return true;	// Default/Undefined search query
			}
		}
	}
	return false;*/
}
function addCargo (item, x, y, price = 'Unknown', dest = 'Unknown', origin = here) {
	console.log(`---- Adding Cargo ----`);
	console.log(item);
	console.log(`Ship[${x}][${y}], Dest: ${dest}, Price: ${price}`);
	if (!item) return false;
	const s = ship[x][y];
	Object.assign(s, {name: item.name, file: item.file, type: item.type, stat: item.stat, id: item.id, price, dest, origin, time: time.full});
	const c = document.getElementById(`ship${x},${y}cargo`);
	c.title = `${capitalize(s.type)} ${s.name}${!["None", "Unknown"].includes(s.dest) ? `\n🢡 ${world[s.dest].name}` : ``}${s.price > 0 ? `\n₵: ${s.price}` : ``}`;
	c.firstChild.src = `images/goods/${s.file}.png`;
	c.parentNode.title = "Filled cargo hold.";
	c.style = "Opacity: 0.8; left: 10px; transition: 2s ease-in-out; visibility: visible"; // Fade in left
	updateManifest();
}
function removeCargo (x, y, sfx = true) {
	if (sfx) forkliftSound();
	delete ship[x][y].name;
	const c = document.getElementById(`ship${x},${y}cargo`);
	console.log(`REMOVING CARGO...`);
	console.log(c);
	c.parentNode.title = "Empty cargo hold.";
	c.style = "Opacity: 0; left: 200px; visibility: hidden";
	updateManifest();
}

// Return TRUE if person[passenger] is on ship
function havePassenger (passenger, query, dest = 'Unknown') {
	const p = validatePerson(passenger);
	if (!p) return false;
	for (let x of times(ship.length)) {
		for (let y of times(ship[0].length)) {
			const s = ship[x][y];
			if (query == 'add' && s.room == 'living' && !('name' in s)) {
				Object.assign(s, {name: passenger, dest, origin: here});
				p.location = -1;
				updateManifest();
				drawShip();
				checkTriggers();
				return true;
			}
			if (s.name == passenger) {
				console.log(`Name match: Ship[${x}][${y}].name = ${s.name}`);
				if (query == 'remove') {
					delete s.name;
					p.location = here;
					updateManifest();
					drawShip();
					console.log(">>> Checking Triggers due to REMOVING PASSENGER");
					checkTriggers();
				}
				return true;
			}
		}
	}
	return false;
}

function explosion (x, y) {
	// maybe just damage x2?
	const s = ship[x][y];
	explosionSFX.play();
	document.getElementById('spaceship').innerHTML += `<img id='explosion' src='images/ship/explosion.png' style='position: absolute; left: ${x * 100 + 75}px; top: ${y * 100 + 50}px; transform: scale(0.5, 0.5) rotate(-90deg); opacity: 0.5; transition: 1s'>`;
	const ex = document.getElementById('explosion');
	console.log(ex);
	setTimeout(() => {ex.style.transform = "scale(2, 2) rotate(90deg)"; ex.style.opacity = "1"; ex.style.filter = "brightness(6)"}, 100);
	setTimeout(() => {ex.style.transition = "2s"; ex.style.transform = "scale(1.75, 1.75) rotate(100deg)"; ex.style.filter = "brightness(-8)"; s.stat = "destroyed"}, 1100); // cannot be repaired, must be removed
	setTimeout(() => {ex.style.transition = "4s"; ex.style.opacity = "0"}, 2100);
	setTimeout(() => {document.getElementById('spaceship').removeChild(document.getElementById('explosion')); drawShip()}, 5100);
	// Insert explosion image @ x, y & transform and opacity shift it
	// s.file = (s.file.match()) ? 			?call damage function?	
}

function damage (x, y) {
	// modify cargo
}

// Graphics
function drawShip() {
	let out = `<div id='shiparea' onclick='clickSelect("ship", this)' style='width: ${starmapWidth - 75}px; height: 700px; position: relative; left: 75px; top: 50px'>`;
	for (let x of times(ship.length)) {
		for (let y of times(ship[0].length)) {
			const s = ship[x][y];
			if ('hull' in s) {
				out += `<div class='hull' ${s.room == "cargohold" ? `ondrop='dropGood(event, "hold")' ondragover='event.preventDefault()' onclick='clickSelect("hold", this)'` : ""} style='background-image: url("images/ship/hull-${s.hull}.png"); left: ${x * 100}px; top: ${y * 100}px'>`;
				if (s.hull == 'full') {
					if (s.room == "cockpit") out += `<div title="Your ship's cockpit - where you live."><img id='cockpit' src='images/ship/cockpit.png' draggable='false' style='position: absolute; left: 2px; top: 2px'></div>`;
					if (s.room == "living") {
						out += `<div title="${'name' in s ? "Uno" : "O"}ccupied living quarters."><img id='cargohold${x},${y}' src='images/ship/living.png' draggable='false' style='position: absolute; left: 2px; top: 2px; filter: hue-rotate(${(x * 7 + y) % 4 * 90}deg)'>`;
						if ('name' in s) {
							const p = validatePerson(s.name);
							if (p) out += `<img class='person' src='images/people/${p.image}.png' title='M${p.gender == 0 ? "s" : "r"}. ${p.lastname}' width='26px' draggable='false' style='filter:hue-rotate(${p.color}deg) brightness(${p.brightness}); animation-delay: -${s.name % 5 * 12}s; cursor: url("images/buttons/contact.png"), auto' onclick='contactPerson(${s.name}, true)'>`;
						}
						out += "</div>";
					}
					if (s.room == "cargohold") {
						out += `<div title='${'name' in s ? "Filled" : "Empty"} cargo hold.'><img id='cargohold${x},${y}' class='' src='images/ship/cargohold.png' draggable='false' style='position: absolute; left: 2px; top: 2px; transform: rotate(${(x * 7 + y) % 4 * 90}deg);${s.config ? 'filter: saturate(8) hue-rotate(' + (s.config == 'live' ? 9 : 18)+ '0deg)' : ''}'>`;
						out += `<div id='ship${x},${y}cargo' class='cargo' draggable='true' ondragstart='drag(event)' ${'name' in s ? `title='${capitalize(s.type)} ${s.name}${!["None", "Unknown"].includes(s.dest) ? `\n🢡 ${world[s.dest].name}` : ``}${s.price > 0 ? `\n₵: ${s.price}` : ``}` : `style='Opacity: 0; left: 200px; visibility: hidden`}'><img id='ship${x},${y}img' class='goods' draggable='false'${'name' in s ? ` src='images/goods/${s.file}.png'`: ``}></div></div>`;
					}
				}
				if (s.stat && ["damaged", "destroyed"].includes(s.stat)) out += `<div><img src='images/ship/${s.stat}.png' draggable='false' style='transform: rotate(${(x * 7 + y) % 4 * 90}deg)'></div>`;
				if (s.room == "laser") out += `<div title="Laser Cannon"><img class='lighting' src='images/ship/lasercannon.png' draggable='false' style='position: absolute; left: 2px; top: 2px'></div>`;
				if (s.room == "sensor") out += `<div title="Sensor"><img class='arcing' src='images/ship/sensor.png' draggable='false' style='position: absolute; left: 2px; top: 2px'></div>`;
				out += "</div>";
			}
		}
	}
	out += "</div>"
	
	//out += "<div style='background-color: white; opacity: 0.9; border-radius: 10px; width: 196px; height: 196px; position: absolute; left: 352px; top: 302px' title='[Hydrogen Fuel Cells]\nOrigin: Traxis\nPrice: 43 \u20B5'><img src='images/goods/hydrogen.png' style='position: absolute; left: 82px; top: 82px'></div>";
	
	document.getElementById('spaceship').innerHTML = out;
}

// Temporary function to handle starting ship
function changeShip() {
	ship[3][1] = {hull: "backcurve"};
	ship[3][5] = {hull: "backcurve"};
	ship[4][1] = {hull: "topright"};
	ship[4][2] = {hull: "full", room: "cargohold", name: goods[17].name, file: goods[17].file, type: goods[17].type, price: 0, dest: "None", origin: here};
	ship[4][3] = {hull: "engine"};
	ship[4][4] = {hull: "full", room: "cargohold", config: "live"};
	ship[4][5] = {hull: "bottomright"};
	ship[5][2] = {hull: "full", room: "living"};
	ship[5][3] = {hull: "full", room: "cargohold", config: "cold"};
	ship[5][4] = {hull: "full", room: "living"};
	ship[6][2] = {hull: "topright", room: "laser"};
	ship[6][3] = {hull: "full", room: "cockpit"};
	ship[6][4] = {hull: "bottomright", room: "sensor"};
	
	updateManifest();
}
