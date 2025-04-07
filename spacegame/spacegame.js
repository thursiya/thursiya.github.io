let eventQueue = [];
let transactionRecord = [];
let selectedTimeout = 0;
let clickTimeout = 0;
let here = lastVisited = 0;

let player = {credits: 100, donations: 0, locale: ""};
let time = {
	full: ((200 + (new Date().getFullYear() % 100)) * 10 + Math.ceil(new Date().getMonth() * 5 / 6)) * 8760,	// Set staryear (ex: 2017-April = 2173)
	get year() {return Math.floor(this.full / 8760)},
	get day() {return Math.floor(this.full % 8760 / 24) + 1},
	get hour() {return this.full % 24},
	get date() {return `${this.year}-${this.day}.${("0" + time.hour).slice(-2)}`}
};



// Locale mouse handling functions
function localeClick (i) {
	const loc = world[here].locales[i];
	if (player.locale != i) {
		killCalls();
		localeSFX.play();
		player.locale = i;
		updateTime(1);	
	}
	// Redirect to calls in progress if locale already open/talking to client at locale
	const inConv = comm.queue.findIndex(v => v.mission == loc.mission);
	if (inConv > -1) {openCall(inConv); return}
	addCall(loc.call);
}



// Notice Board Handling
function selectNotice (which) {
	const mID = world[here].notices[which].mission;
	const m = mission.find(m => m.id == mID);
	const c = comm.queue.findIndex(v => v.speaker == m.client);
	if (c > -1) {openCall(c); return}
	addCall(m.comm);
	world[here].notices.splice(which, 1);
	displayNotices();
}



// Drag & drop functions
function drag (ev) {
	//ev.dataTransfer.setData("dragId", ev.target.id || ev.target.getAttribute("data-good"));
	//console.log(ev.dataTransfer.getData("dragID"));
	ev.dataTransfer.setData("dragClass", ev.target.classList);
	ev.dataTransfer.setData("ware", ev.target.getAttribute("data-good"));
	//console.log(ev.target.classList + " _ " + ev.target.getAttribute("data-good"));
	ev.dataTransfer.setData("x-offset", ev.target.parentNode.parentNode.offsetLeft / 100);
	ev.dataTransfer.setData("y-offset", ev.target.parentNode.parentNode.offsetTop / 100);
}
function dropGood (ev, dest) {
    ev.preventDefault();
    //const idData = ev.dataTransfer.getData("dragId");
	const classData = ev.dataTransfer.getData("dragClass").split(" ")[0];
	//const g = world[here].goods;
	//const x2 = ev.currentTarget.offsetLeft / 100;
	//const y2 = ev.currentTarget.offsetTop / 100;
	console.log(`---- Dropping Good ----`);
	console.log(ev);
	console.log("dest: " + dest + ", class: " + classData);
	//console.log(`idData: ${idData}, g: ${g}\nx2: ${x2}, y2: ${y2}`);
	
	const origin = (classData == "cargo") ? {x: ev.dataTransfer.getData("x-offset"), y: ev.dataTransfer.getData("y-offset")} : ev.dataTransfer.getData("ware");
	const target = {x: ev.currentTarget.offsetLeft / 100, y: ev.currentTarget.offsetTop / 100};
	moveGood(classData, dest, origin, target);
		
	/*if (classData == 'cargo') {
		const x = ev.dataTransfer.getData("x-offset");
		const y = ev.dataTransfer.getData("y-offset");
		const s = Object.assign({}, ship[x][y]);
		
		console.log(`Cargo movement values:\nx: ${x}, y: ${y}\nx2: ${x2}, y2: ${y2}\ns: ${JSON.stringify(s)}\nev.currentTarget: ${JSON.stringify(ev.currentTarget)}`);
		
		if (dest == 'hold') {	// Transfer goods between holds on ship
			if (x == x2 && y == y2) return;		// (Good did not move)
			const s2 = Object.assign({}, ship[x2][y2]);
			removeCargo(x, y);
			setTimeout(_ => {addCargo({name: s.name, type: s.type, file: s.file, stat: s.stat}, x2, y2, s.price, s.dest, s.origin)}, 1500);
			if (s2.name) {
				removeCargo(x2, y2, false);
				setTimeout(_ => {addCargo({name: s2.name, type: s2.type, file: s2.file, stat: s2.stat}, x, y, s2.price, s2.dest, s2.origin)}, 1500);
			}
		}
		if (dest == 'market') {
			const whichGood = g.findIndex((v, i) => s.name == g[i].name && s.type == g[i].type && g[i].stat != 'illegal');
			if (whichGood == -1) alert(`Sorry, merchants on ${world[here].name} are not buying ${s.type} ${s.name}.`);
			else {
				removeCargo(x, y);
				if (g[whichGood].supply > 0) g[whichGood].stock += 1;	// Change 1 to # sold with implementation of multi-sell
				const salePrice = Math.ceil(g[whichGood].price * (1 - world[here].tax));
				credit(salePrice, 'market', whichGood);
				checkTriggers();
			}
		}
		if (dest == 'trash') {
			const salePrice = Math.ceil(50 * (1 + world[here].tax));
			if (player.credits >= salePrice) {
				credit(-salePrice, 'trash', s.name);
				removeCargo(x, y);
			}
		}
	}
	if (classData == 'wares' && dest == 'hold') {
		const whichGood = ev.dataTransfer.getData("ware");
		const salePrice = Math.ceil(g[whichGood].price * (1 + world[here].tax));
		console.log(`Purchasing ${whichGood} from market for ${salePrice}. Stock? ${g[whichGood].stock>0}, EmptyHold? ${ship[x2][y2].name == ""}, Credits? ${player.credits >= salePrice}`);
		if (g[whichGood].stock > 0 && !(ship[x2][y2].name) && player.credits >= salePrice) {
			forkliftSound();
			credit(-salePrice, 'market', whichGood);
			if (g[whichGood].supply < 5) g[whichGood].stock -= 1;	// Change 1 to # purchased with implementation of multi-buy
			addCargo(g[whichGood], x2, y2, salePrice, 'None');
			checkTriggers();
		}
	}
	displayMarket();*/
}
function moveGood (classData, dest, origin, target) {
	const g = world[here].goods;

	if (classData == 'cargo') {
		const s = Object.assign({}, ship[origin.x][origin.y]);
		console.log(s);
		if (dest == 'hold') {	// Transfer goods between holds on ship
			if (origin.x == target.x && origin.y == target.y) return;	// (Good did not move)
			const s2 = Object.assign({}, ship[target.x][target.y]);
			removeCargo(origin.x, origin.y);
			setTimeout(_ => {addCargo({name: s.name, type: s.type, file: s.file, stat: s.stat}, target.x, target.y, s.price, s.dest, s.origin)}, 1500);
			if (s2.name) {
				removeCargo(target.x, target.y, false);
				setTimeout(_ => {addCargo({name: s2.name, type: s2.type, file: s2.file, stat: s2.stat}, origin.x, origin.y, s2.price, s2.dest, s2.origin)}, 1500);
			}
		}
		if (dest == 'market') {
			const ware = g.find(v => s.name == v.name && s.type == v.type && v.stat != 'illegal');
			if (ware) {
				const salePrice = Math.ceil(ware.price * (1 - world[here].tax));
				removeCargo(origin.x, origin.y);
				if (ware.supply > 0) ware.stock += 1;	// Change 1 to # sold with implementation of multi-sell
				credit(salePrice, 'market', ware.name);
				checkTriggers();
			} else alert(`Sorry, merchants on ${world[here].name} are not buying ${s.type} ${s.name}.`);
		}
		if (dest == 'trash') {
			const salePrice = Math.ceil(50 * (1 + world[here].tax));
			if (player.credits >= salePrice) {
				credit(-salePrice, 'trash', s.name);
				removeCargo(origin.x, origin.y);
			}
		}
	}
	
	if (classData == 'wares' && dest == 'hold') {
		const ware = g[origin];
		const salePrice = Math.ceil(ware.price * (1 + world[here].tax));
		if (ware.stock > 0 && emptyRoom('cargohold') && player.credits >= salePrice) {
			forkliftSound();
			credit(-salePrice, 'market', ware.name);
			if (ware.supply < 5) ware.stock -= 1;	// Change 1 to # purchased with implementation of multi-buy
			if (target && !(ship[target.x][target.y].name)) addCargo(ware, target.x, target.y, salePrice, 'None');
			else haveCargo(ware, 'add', 1, 'None', salePrice);
			checkTriggers();
		}
	}
	
	displayMarket();
}
// Click backup functionality for mobile
function clickSelect (etype, elem) {
	function resetClickSelect (etype1, elem1) {
		if (etype1 == "hold") elem1.firstChild.children[1].style.filter = '';
		if (etype1 == "scape") elem.nextElementSibling.style = '';
		if (etype1 == "ware") {
			elem1.style = '';
			elem1.parentNode.parentNode.parentNode.previousElementSibling.style.filter = '';
			elem1.parentNode.parentNode.parentNode.style = '';
		}
		clickTimeout = 0;
	}
	
	if (etype == 'waremain') {
		elem = elem.nextElementSibling.firstChild.firstChild.children[1];
		etype = 'ware';
	}
	
	let clickFired = false;
	if (clickTimeout) {
		if (clickTimeout.etype == 'ware' && (elem == clickTimeout.elem || etype == 'ship' || etype == 'hold')) {
			moveGood("wares", "hold", +clickTimeout.elem.dataset.good, etype == 'hold' ? {x: elem.offsetLeft / 100, y: elem.offsetTop / 100} : undefined);
			clickFired = true;
		}
		if (clickTimeout.etype == 'hold') {
			const x = clickTimeout.elem.offsetLeft / 100;
			const y = clickTimeout.elem.offsetTop / 100;
			if (ship[x][y].name) {
				if (etype == 'market' || clickTimeout.elem == elem) {
					moveGood("cargo", "market", {x, y});
					clickFired = true;
				} else if (etype == 'hold') {
					moveGood("cargo", "hold", {x, y}, {x: elem.offsetLeft / 100, y: elem.offsetTop / 100});
					clickFired = true;
				} else if (etype == 'trash') {
					moveGood("cargo", "trash", {x, y});
					clickFired = true;
				}
			}
		}
		if (!clickFired && (etype == 'market' || etype == 'ship')) {
		} else clickTimeout.trigger();
	}
	if (!clickFired) {
		switch (etype) {
			case "hold":
				elem.firstChild.children[1].style.filter = 'brightness(0.5)';
				break;
			case "scape":
				elem.nextElementSibling.style.visibility = 'visible';
				break;
			case "ware":
				elem.style.backgroundColor = '#999';
				elem.parentNode.parentNode.parentNode.previousElementSibling.style.filter = 'brightness(0.5)';
				elem.parentNode.parentNode.parentNode.style.visibility = 'visible';
				break;
			default:
				return;
		}
		const timeoutID = setTimeout(resetClickSelect, 5000, etype, elem);
		clickTimeout = {elem, etype, trigger() {clearTimeout(timeoutID); resetClickSelect(etype, elem)}};
	}	
}



// Game Time/Date/Events Handling
function displayTime (variant) {
	return variant > 0 ? `${Math.floor(variant / 8760)}&#8209;${Math.floor(variant % 8760 / 24) + 1}.${("0" + variant % 24).slice(-2)}` : `${time.year}&#8209;${time.day}.${("0" + time.hour).slice(-2)}`;
}
function updateTime (hh = 0, newNoticeFlag = true) {
	time.full += Math.ceil(hh);
	killCalls();
	moodCorrect(hh);	// Calm emotions
	characterTravel();
	goodsPerish();
	// Remove expired, unclaimed missions
	for (let m of mission.slice()) if (m.stage == 0 && m.expiry <= time.full) removeMission(m);
	// Add new notice missions
	if (newNoticeFlag && world[here].notices.length < 10 && time.full - world[here].lastNotice > world[here].notices.length - (world[here].pop / 6)) noticeMission(1);
	displayNotices();
	document.getElementById('playerInfoTime').innerHTML = displayTime();
	const t = rnd(6);
	while (time.full - lastNewsEvent > (6 + t)) {newsEvent(lastNewsEvent + 6 + t);}
	// Check if any events in the event queue are behind the current time and execute them in chronological order
	for (let e of eventQueue.slice()) {
		if (e.time <= time.full) {
			if (e.prereq.every(v => parseValue(e.context, v))) parseCommands(e.execute, e.context);
			eventQueue.splice(eventQueue.findIndex(v => v == e), 1);
			checkTriggers();
		}
	}
}
function addEvent (execute, context, hoursLater, addedHours = 0, prereq = []) {
	const newTime = hoursLater > -1 ? Math.ceil(time.full + hoursLater + rnd(addedHours)) : hoursLater * -1;	
	for (let i = 0; i <= eventQueue.length; i++) {
		if (!eventQueue[i] || newTime <= eventQueue[i].time) {
			eventQueue.splice(i, 0, {execute, context, prereq, time: newTime});
			break;
		}
	}
}



// Handle money account
function credit (amount, who, what = "") {
	if (who != "market" && who != "trash") who = validatePerson(who).name;
	if (!who) return false;	// 'who' must be declared
	saleSFX.play();
	amount = Math.floor(amount);
	player.credits += amount;
	if (player.credits < 0) player.credits = 0;
	if (who == 'market' || who == 'trash') {
		what = (who == 'market' ? `${amount > 0 ? "Sold" : "Bought"}` : `Disposed of`) + ` ${what} (${Math.floor(world[here].tax * 100)}% tax)`;
		who = `<i>${world[here].name} Market</i>`;
	}
	transactionRecord.unshift({time: displayTime(), location: world[here].name, name: who, amount, note: what}) && updateAccountsDisplay();
	document.getElementById('playerInfoCredits').innerHTML = player.credits;
}



// Return a random system 'distance' jumps away from 'here' (or alternate origin)
function adjacentSystem (distance, origin = here, query) {
	if (distance < 1) return false;
	let jump = [[origin]];
	for (let i = 0; i < distance; i++) {
		jump[i + 1] = [];
		for (let j = 0; j < jump[i].length; j++) {
			for (let k of world[jump[i][j]].links) {
				if (!jump.find((v, i) => jump[i].indexOf(k) > -1)) {
					jump[i + 1].push(k);
					if (i + 1 == distance && world[k].focus == query) jump[i + 1].push(k);	// double odds to fly to 'query' focus worlds
				}
			}
		}
	}
	return rnd(jump[distance]);
}

// Randomly choose 1 item from an array, character from a string, integer in a range, or letter of the alphabet (depending on input)
function rnd(arr) {
	if (!arr || arr.length == 0) return false;
	const randFloat = Math.random();
	// If arr is a number, return a random value in the range 1 to arr
	if (!(isNaN(arr))) return Math.floor(randFloat * Math.abs(Math.trunc(arr)) + 1);
	// Special case: return a random letter of the alphabet
	if (arr === 'A' || arr === 'a') return String.fromCharCode(Math.floor(randFloat * 26 + 1) + (arr === 'A' ? 64 : 96));
	// Default: return a random array element, or character in a string
	return arr[Math.floor(randFloat * arr.length)];
}
function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}
function* times (n) {
	for (let i = 0; i < n; i++) yield i;
}
function shuffle (arr) {
	let newarr = [];
	for (let i = 0; i < arr.length;) {
		newarr.push(arr.splice(rnd(arr.length) - 1, 1)[0]);
	}
	return newarr;
}

// Simple Calculations
function calculateDistance (a, b) {
	return Math.ceil(Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)));
}
function calculateSimpleDistance (a, b) {
	return Math.ceil(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}


function doLanesCross (lane1, lane2) {
	const a = world[lane1.origin], b = world[lane1.dest], p = world[lane2.origin], q = world[lane2.dest];
	if (a == p || a == q || b == p || b == q) return false;
	const apx = p.x - a.x, aby = b.y - a.y, apy = p.y - a.y, abx = b.x - a.x, pqy = q.y - p.y, pqx = q.x - p.x;
	
	const r = apx * aby - apy * abx;
	if (r == 0)	return ((apx < 0) != (p.x - b.x < 0))	|| ((apy < 0) != (p.y - b.y < 0)); // Lines are collinear, and so intersect if they have any overlap	
	
	const s = abx * pqy - aby * pqx;
 	if (s == 0) return false; // Lines are parallel.

	const t = (apx * pqy - apy * pqx) / s;
	const u = r / s;
 
	return (t >= 0) && (t <= 1) && (u >= 0) && (u <= 1);
}

function findLane (w1, w2) {
	return starlane.findIndex(v => (v.origin == w1 && v.dest == w2) || (v.origin == w2 && v.dest == w1));
}




// ----------- Unused Code -------------

// Alternative shuffle algorithm - consider changing ('shuffle' only called from gambling mission)
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = rnd(i + 1) - 1;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function popupdisplay (planetid) {
	// Currently doesn't do anything (work covered by CSS)
	document.getElementById('planet' + planetid + 'text').style.display = 'block';
}

function sound (src) {
    this.sound = document.createElement("audio");
    this.sound.src = "audio/" + src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
	this.sound.setAttribute("loop", "true");
	//this.sound.setAttribute("autoplay", "true");
    this.sound.style.display = "none";
	this.sound.volume = 0.2;
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
	this.load = function(){
        this.sound.load();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}

function* prng (seed) {
	console.log(`Starting seed: ${seed}`);
	let result = seed, digitTotal;
	while(result > 0) {
		digitTotal = 0;
		result += "";
		for (let i of result) {
			digitTotal += +i;
			if (digitTotal > 9) digitTotal = parseInt(digitTotal.toString()[0]) + parseInt(digitTotal.toString()[1]);
        }
		result = (result / (result.substring(digitTotal) + result.substring(0,digitTotal))).toFixed(12).split(".")[1];
		console.log(result);
		//result = +((+result / +(result.substring(digitTotal - 1) + result.substring(0,digitTotal - 1))).toString().split(".")[1].toString().substring(0,12));
		yield result;
    }
}
