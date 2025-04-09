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
		const city = shuffle(world[subject].city);
		const dryWorld = ["Desert", "Rocky"].includes(world[subject].type);
		subject = world[subject].name;
		headline = `${parse(rnd([
			`#Widespread|Severe|Critical|# #Famine|Food Shortage|Hunger Crisis# #on|Strikes|Plagues#`,
			`#Influx|Surge|Mass Arrival|Large Number# of #Migrants|Refugees|Displaced People# #on|Pour into|Flood|Overwhelm#`,
			`#Military|Armed Forces|Government# #Imposes|Enacts|Declares# #Strict Curfews|Martial Law|Lockdown|Border Closures# on`,
			`#Throngs of|Uprecendented Number of|# #Tourists|Vistors|Travelers# #Flocking to|Descend on|Making New Hotspot of|Drawn to#`,
			`#Ancient|Lost|Forgotten|Long-Abandoned# #Colony|Settlement|Outpost# #discover.ed.caps|Unearthed# on`,
			`#New|Emerging|Booming|High Volume of# #Job|Employment|Work# #Opportunities|Prospects|Openings# on`,
			`#Zero Gravity|Street|Electronic# #Couture|Fashion|Styles# #All the Rage on|Sweeping|Latest Trend on#`,
			`${city[0]} #predatorN.s.caps|spaceN.s.caps|United|Guardians# Win #Planet|scifiPeople|Worlds# #Cup|Tournament|Trophy# on`,
			`#Traffic Congestion|Crime|Lack of Housing# in ${city[0]} #Driving|Pushing# #Citizens|Residents# to #Smaller|Less Developed# #Communities|Settlements# on`,
			dryWorld ? `#Massive|Huge# Dust Storm #Blankets|Covers|Pummels|Slams#` : `New #Floating|Underwater# #Complex|Development# #Expands|Opens New Opportunities in# ${city[0]}, `,
			`#New Engineering Projects Announced as|# #Monsoon Season Brings|# Widespread Flooding to`,
			`#Holographic Entertainment|Virtual Reality|Arts and Culture# #Park|Complex|Hub# Expands on`,
			`#Ongoing|Extensive|# #Protests|Strikes|Demonstrations# #over|Due to# #Artificial Gravity Adjustment Policy|Government Corruption|Mass Surveillance# #Paralyzing|Rocking|in# ${city[0]}, `,
			`New #High-Speed|Express|# #Rail|Tube|Subway# Line Opens between ${city[0]} and ${city[1] || `Spaceport`} on`,
			`#Desalination Plant Expected as|Greening Programs Halted as|Severe|# Water #Shortage|Scarcity|Crisis# #Hits|Devastates|Continues on#`]))} ${subject}`;
		text = "";	// Not yet implemented
	// Corporate News
	} else {
		const good = rnd(goods.reduce((t, v) => v.type == subject ? [...t, v.name] : t, []));
		headline = `${subject} ${parse(rnd([
			`Stock #Up|Surges|on the Rise|Outperforming Expectations|Trending Upward#`, 
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
