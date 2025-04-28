const person = [];
const oldCorps = [];
const newCorps = [];

function Role(location = here, home = location, gender = rnd([0, 1]), status = "active", mood = 39 + rnd(21)) {
	this.gender = gender;
	this.name = rndPersonName(gender);
	this.firstname = this.name.match(/\S+/)[0];
	this.lastname = this.name.match(/\s(.+)/)[1];
	this.location = location;
	this.home = home;
	this.image = (gender == 0 ? "woman-" : "man-") + rnd(["suit", "hat", "shawl", "collar"]);
	this.color = (rnd(6) - 1) * 60;
	this.brightness = this.color == 60 ? 1.4 : this.color == 300 ? 1.9 : 1.0; // Correct for poor implementation of hue-rotate filter (brighten teal->cyan and brown->orange)
	this.status = status;
	this.busy = 0;
	this.mood = mood;
	this.rep = mood;
	this.social = rnd(5); // aloof-outgoing (1-5)
	this.risk = rnd(5);	// careful-risky (1-5)
	this.moral = rnd(5); // selfish-altruistic (1-5)
	this.org = rnd(["", rnd(oldCorps).fullname, rnd(newCorps).fullname, rnd(newCorps).fullname, `${world[home].name} ${rnd(["Government", "University", "Military"])}`, `City of ${rnd(world[home].city)} (${world[home].name})`]);
	this.title = (this.org == "") ? rnd(["Private Citizen", "Legitimate Businessperson", rnd(["Entrepreneur", "Net Celebrity", "Adventurer"])]) : parse("#professionN#");
	this.history = [];
	this.contact = "unknown";
}
	
function rndPersonName(gender = rnd([0, 1]), limiter = (rnd(10) > 9) ? "markov" : "") {
	const lastname = parse(`#nameLast.${gender < 1 ? 'fem' : 'masc'}#`);
	if (limiter == "lastname") return lastname;
	let name = "";
	do {
		let firstname = (limiter == "markov") ? capitalize(markov("nameFirstFemale,nameFirstMale,nameFirstUnisex")) : parse(`#nameFirst[${gender < 1 ? 'fem' : 'masc'}]#`);
		name = `${firstname} ${lastname}`;
		if ((gender == 0 && storyFramework.nameFirstMale.includes(firstname)) || (gender == 1 && storyFramework.nameFirstFemale.includes(firstname))) {
			name = "FAIL";
			limiter = "";
		}
		person.forEach(v => {if (v.name == name) name = "FAIL";});
	} while (name == "FAIL");
	return name;
}

// Converts Role object/number/"fullname" into Role object or false
function validatePerson(who) {
	return (who instanceof Role) ? who : isNaN(who) ? person.find(p => p.name == who) : person[who] || false;
}

function reputation(p, amount) {
	p = validatePerson(p);
	if (!p) return false;
	p.rep += Math.floor(amount);
	if (p.rep > 100) p.rep = 100;
	if (p.rep < 0) p.rep = 0;
	moodSwing(p, amount * 2);
}
function moodSwing(p, amount) {
	p = validatePerson(p);
	if (!p) return false;
	p.mood += Math.floor(amount);
	if (p.mood > 100) p.mood = 100;
	if (p.mood < 0) p.mood = 0;
}
function moodCorrect(hh) {		// Cool mood by 1 point per hour
	person.forEach(p => p.mood += (p.mood != p.rep) ? 0 : 
		(Math.abs(p.rep - p.mood) <= hh) ? (p.rep - p.mood) :
		(p.mood > p.rep) ? -hh : hh );
}

function characterTravel(p, dest) {
	p = validatePerson(p);
	if (p) {
		// Set p to dest (if given), or if away from home, 75% chance to head home, otherwise travel to an adjacent system
		p.dest = (dest > -1) ? dest :
			(p.location != p.home && rnd(4) > 1) ? p.home : adjacentSystem(1, p.location);
		addEvent(["arrive", "busy(2)"], p, Math.ceil(calculateDistance(world[p.location], world[p.dest]) / 8), 4);	// Up to 4h extra travel time
		p.location = "in transit";
	} else {
		person.forEach((p, pId) => {
			if (mission.find(v => v.client == pId || v.character?.includes(pId)) || p.status != 'active' || p.busy > time.full || p.location == "in transit") return;	// skip mission/dead/busy/transiting people
			if (rnd(10) < (p.location == p.home ? 2 : 5)) characterTravel(p); });	// 10%/40% chance to travel if at home/away
	}
}

function choosePerson (where = here, restrictedPeople = []) {
	restrictedPeople.push(...mission.reduce((t, v) => v.type == "p" ? [...t, v.client] : t, []));		// Add all "passage" clients to restricted list
	return rnd(person.reduce((t, v, i) => 
		(v.status == "active" && v.location == where && v.busy <= time.full && !restrictedPeople.includes(i)) ? [...t, i] : t, []));
}

function addContact (p) {
	p = validatePerson(p);
	if (!p) return false;
	if (p.contact == "unknown") p.contact = 0;
	updateContactsDisplay();
}

function addHistory (p, result, type, quality) {
	p = validatePerson(p);
	let text = "";
	if (result == 'reject') {
		text = `You #rejected|turned down|didn't take# a job I offered you.`;
		if (type == "p") text += ` I had to find someone else to take me.`;
		if (type == "g") text += ` I had to find someone else to haul that cargo.`;
	} else {
		text = type;
		if (result == 'succeed') {
			if (quality > 10) text += (p.rep > 75) ? ` I've come to expect exceptional work like that from you.` : ` I was ${p.rep < 50 ? `pleasantly surprised` : `very impressed`} with your work.`;
			if (quality < 0) text += ` #However you were late|It wasn't the quickest but at least it got done|I'd have prefered it done on time though#.`;
		} else if (result == 'fail') if (quality < -10) text += ` I wasn't planning on using your 'services' again.`;
		else result = 'special';
	}
	p.history.unshift({time: time.full, result, text: parse(text)});
}

function Corporation (name, desc = "", type = "Corporation") {
	this.name = name;
	this.desc = desc;
	this.type = type;
	this.fullname = `${name} ${desc ? `${desc} ` : ""}${type}`;
}

function rndCorporationName () {
	let name;
	do {
		if (rnd(3) < 3) {
			let corpA = parse("#corpNamePre.caps#");
			let corpB = parse("#corpNamePost#");
			if (corpA.slice(-1).match(/[AEI]/)) corpA = (corpB[0].match(/[aeiou]/) ? corpA.slice(0, -1) : corpA.slice(0, -1) + corpA.slice(-1).toLowerCase());
			name = corpA + (corpA.slice(-1) == corpB[0] ? corpB.slice(1) : corpB);	// Remove extra letter in same ending/start combos
		} else {
			name = rnd([rndPersonName(0, 'lastname'), parse("#world#"), `${rnd('A')}${rnd([rnd('A'), rnd('A'), '&'])}${rnd('A')}`]);
		}
		newCorps.forEach(v => {if (v.name.slice(0, 4).toLowerCase() == name.slice(0, 4).toLowerCase()) name = "FAIL";});
		if (name.match(/^(ICP|ass|cum|fag|fck|fuc|fuk|fux|gay|hag|jap|jew|jiz|kyk|pee|poo|pud|pus|sex|sob|sxy|tit|vag|wop|wtf|xxx)$/i)) name = "FAIL";
	} while (name == "FAIL");
	return new Corporation(name, rnd(3) > 1 ? "" : parse("#corpDesc.caps#"), rnd(5) > 4 ? "Corporation" : parse("#corpType.caps#"));
}
