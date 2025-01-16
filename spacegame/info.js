let newsItem = [];
let newsFramework = [];
let lastNewsEvent = 0;


function loadNewsFramework () {
	newsFramework = Array.apply(0, {length: world.length}).map(Number.call, Number);
	newsFramework.push(...newsFramework, ...newCorps.map(v => v.name), ...oldCorps.map(v => v.name));
}

function newsEvent (nTime = time.full) {
	if (newsFramework.length < 1) loadNewsFramework();
	const subject = newsFramework.splice(rnd(newsFramework.length) - 1, 1)[0];
	let headline = "";
	let text = "";
	
	if (Number.isInteger(subject)) {
		var shortSubject = world[subject].name;
		headline = rnd(["Famine on",
			"Influx of Refugees to",
			"Military Lockdown on",
			"Tourists Flocking to",
			"Ancient Colony Discovered on",
			"New Job Opportunities on"]) + " " + shortSubject;
	} else {
		var shortSubject = subject.split(" ", 1);
		let possibleGoods = [];
		goods.forEach(v => {if (v.type == shortSubject) possibleGoods.push(v.name)});
		const good = rnd(possibleGoods);
		headline = shortSubject + " " + rnd(
			[`Stocks Up`, 
			`Caught up in Investigation`, 
			`Faces Scrutiny from Shareholders`, 
			`Turns ${rnd(['Massive', 'Healthy', 'Sizeable', 'Large'])} Profit ${rnd(['after Cutting Costs', 'in ' + (['1st', '2nd', '3rd'][~~(time.day / 92) - 1] || '4th') + ' Quarter', 'with New Leadership'])}`, 
			`to Build New ${good ? good + ' Plant' : rnd(['Facility', 'Offices', 'Residences'])}`, 
			`R&D Has Big Announcement`]);
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