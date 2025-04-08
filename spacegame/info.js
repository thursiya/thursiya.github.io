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
	let subject = newsFramework.pop();
	let headline = "";
	let text = "";

	// Planet News
	if (Number.isInteger(subject)) {
		subject = world[subject].name;
		const city = shuffle(world[subject].city);
		headline = `${parse(rnd(["Famine on",
			"Influx of Refugees to",
			"Military Lockdown on",
			"Tourists Flocking to",
			"Ancient Colony Discovered on",
			"New Job Opportunities on",
			"#Zero Gravity|Street|Electronic# #Couture|Fashion|Styles# #All the Rage on|Sweeping|Latest Trend on#",
			"${city[0]} #predatorN.s|spaceN.s|United|Guardians|# Win #Planet|scifiPeople|Worlds# #Cup|Tournament|Trophy# on",
			"#Traffic Congestion|Crime|Lack of Housing# in ${city[0]} #Driving|Pushing# #Citizens|Residents# to #Smaller|Less Developed# #Communities|Settlements# on",
			["Desert", "Rocky"].includes(world[subject].type) ? "#Massive|Huge# Dust Storm #Blankets|Covers|Pummels|Slams#" : "New #Floating|Underwater# #Complex|Development# #Expands|Opens New Opportunities in# ${city[0]}, ",
			"#New Engineering Projects Announced as|# #Monsoon Season Brings|# Widespread Flooding to",
			"#Holographic Entertainment|Virtual Reality|Arts and Culture# #Park|Complex|Hub# Expands on",
			"#Ongoing|# #Protests|Strikes# #over Artificial Gravity Adjustment Policy in|due to Government Corruption in|Paralyzing|in# ${city[0]}, ",
			"New #High-Speed|Express|# #Rail|Tube|Subway# Line Opens between ${city[0]} and ${city[1] || "Spaceport"} on",
			"#Desalination Plant Expected as|# Water Shortage #Hits|on|Continues on#"]))} ${subject}`;
		text = "";	// Not yet implemented
	// Corporate News
	} else {
		const good = rnd(goods.reduce((t, v) => v.type == subject ? [...t, v.name] : t, []));
		headline = `${subject} ${parse(rnd(
			[`Stock #Up|Surges|on the Rise|Outperforming Expectations|Trending Upward#`, 
			`#Caught up|Tangled up|Mired# in #Government|Police|Security|# #Investigation|Probe|Audit#`, 
			`#Faces Scrutiny|under Evaluation|Attracts Criticism|Comes under Fire# from Shareholders`, 
			`Turns #Massive|Healthy|Sizeable|Large# Profit #after Cutting Costs|in ${["1st", "2nd", "3rd"][~~(time.day / 92) - 1] || "4th"} Quarter|with New Leadership#`, 
			`#to Build|Constructing|Establishing|Laying Groundwork for# New ${good ? `${good} Plant` : "#Facility|Offices|Residences#"}`,
			`R&D #Has|Ready to Share|Preparing|Set to Unveil# #Big|Groundbreaking|Major|Significant# #Announcement|Development|News|Update#`]))}`;
		text = "";	// Not yet implemented
	}
	
	newsItem.splice(newsItem.findIndex(v => nTime > v.time), 0, { time: nTime, headline, text, subject });
	if (nTime <= time.full && nTime > lastNewsEvent) lastNewsEvent = nTime;
	updateNewsfeed();
}
