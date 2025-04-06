let newsItem = [];
let newsFramework = [];
let lastNewsEvent = 0;

// Generate shuffled array with two copies of each world number and one copy of each corp name (for news topics)
// Consider changing distribution to reflect world pop?
function loadNewsFramework() {
	newsFramework = [...Array(world.length)].map((_, i) => i);
	newsFramework = shuffle([...newsFramework, ...newsFramework, ...newCorps.map(v => v.name), ...oldCorps.map(v => v.name)]);
}

function newsEvent(nTime = time.full) {
	if (newsFramework.length < 1) loadNewsFramework();
	const subject = newsFramework.pop();
	let shortSubject = "";
	let headline = "";
	let text = "";

	// Planet News
	if (Number.isInteger(subject)) {
		shortSubject = world[subject].name;
		headline = `${rnd(["Famine on",
			"Influx of Refugees to",
			"Military Lockdown on",
			"Tourists Flocking to",
			"Ancient Colony Discovered on",
			"New Job Opportunities on"])} ${shortSubject}`;
	// Corporate News
	} else {
		shortSubject = subject.split(" ", 1);
		//const possibleGoods = [];
		//goods.forEach(v => {if (v.type == shortSubject) possibleGoods.push(v.name)});
		//const good = rnd(possibleGoods);
		const good = rnd(goods.reduce((t, v) => v.type == shortSubject ? [...t, v.name] : t, []));
		headline = `${shortSubject} ${rnd(
			[`Stocks Up`, 
			`Caught up in Investigation`, 
			`Faces Scrutiny from Shareholders`, 
			`Turns ${rnd(["Massive", "Healthy", "Sizeable", "Large"])} Profit ${rnd(["after Cutting Costs", `in ${["1st", "2nd", "3rd"][~~(time.day / 92) - 1] || "4th"} Quarter`, "with New Leadership"])}`, 
			`to Build New ${good ? `${good} Plant` : rnd(["Facility", "Offices", "Residences"])}`,
			`R&D Has Big Announcement`])}`;
		text = "";
	}
	
	for (let i = 0; i <= newsItem.length; i++) {
		if (!newsItem[i] || nTime > newsItem[i].time) {
			newsItem.splice(i, 0, {time: nTime, headline, text, subject: shortSubject});
			break;
		}
	}
	if (nTime <= time.full && nTime > lastNewsEvent) lastNewsEvent = nTime;
	updateNewsfeed();
}
