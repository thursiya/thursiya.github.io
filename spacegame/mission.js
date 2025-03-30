let mission = [];
let oldmission = [];
let normalMissionList = [];

let missionFramework = {};

function loadMissionFramework () {
	missionFramework = {
	delivery: {
		name: "Delivery",
		advert: "Delivery Needed: #CARGO0# to #DEST#.",
		type: "g",
		dest: "rnd,3",
		cargo: ["rnd(dest)"],
		character: ["dest"],
		key: ["distance", "mult(distance,0.5)", "add(time,#KEY1#)", "displayTime(#KEY2#)", "mult(distance,0.8)", "mult(distance,0.4)", "add(#KEY1#,120)"],
		comm: ["#I'm looking for|I need|I'm in search of# #the services of a|a|a# #private|competent|capable|reliable# #carrier|courier|delivery person|hauler# to bring some #CARGO0.type# #CARGO0.name# to <b>#DEST#</b>. My #associate|friend|client#, <b>#CHAR0#</b>, needs the #cargo|shipment|delivery# by <b>#KEY3#</b>.", 1, [["isHere", "emptyRoom(cargohold)"]],
			"I'm transferring the #CARGO0.name# to your cargo hold. You'll be meeting with #CHAR0.firstname# on #DEST# to accept shipment.",
			"CHAR0>Thank you - we've been expecting you. Payment has been transferred.",
			"CHAR0>You're late, but we'll still accept the shipment. Reduced payment has been credited to you - full payment is only given for on time deliveries.",
			"I've received word from #CHAR0.name# that the shipment has still not arrived. It's too late now so we will collect the #CARGO0.name# here and find someone more competent to get them back to us."],
		proceed: [["advStage", "addCall", "addCargo", "addContact", "advStage", "event(setStage(3), #KEY1#)", "event(setStage(4), #KEY6#)"]],
		contact: ["I'm still looking for someone to deliver the #CARGO0#.", 0,
			"#You need to get|Please head# to #DEST#. #CHAR0# is waiting for the #CARGO0#."],
		contactChar: [["I'm #eagerly|patiently|anxiously# #waiting on|awaiting# that #shipment|cargo# of #CARGO0#."]],
		summary: [,"Bring #CARGO0# to #CHAR0# on #DEST#."],
		trigger: [,,["arrived","haveCargo"],,["landed"]],
		reward: [,,["addCall", "removeMission", "credit(#KEY4#,Successful Delivery)", "removeCargo", "rep(5)", "addHistory(,succeed,You made that #CARGO0# delivery for me.,10)", "addHistory(#CHAR0#,fail,You delivered some #CARGO0# to me.)"],
			["addCall", "removeMission", "credit(#KEY5#,Late Delivery)", "removeCargo", "rep(-3)", "addHistory(,succeed,You made that #CARGO0# delivery for me.,-10)", "addHistory(#CHAR0#,fail,You were late delivering some #CARGO0# to me.)"],
			["addCall", "removeMission", "removeCargo", "rep(-10)", "addHistory(,fail,You failed to complete that #CARGO0# delivery job for me.,-15)", "addHistory(#CHAR0#,fail,You were supposed to deliver some #CARGO0# to me.)"]]
	},
	passage: {
		name: "Passage",
		advert: "Passage Needed: party heading to #DEST#.",
		type: "p",
		dest: "rnd,3,Cultural",
		key: ["distance", "mult(distance,.14)", "mult(distance,.16)", "mult(distance,1.25)", "#personalEvent#"],
		addStory: [{personalEvent: ["a conference", "my #niece|nephew#'s birthday", "an important meeting", "a gala opening", "a charity fundraiser", "a corporate retreat", "a symposium", "my friend's wedding"]}],
		init: ["event(travel,removeMission,1,3,clientLanded)"],
		comm: ["I have #KEY4# to attend on <b>#DEST#</b>. I need to get there as #quickly|fast|swiftly# as possible.", 1, [["isHere", "emptyRoom(living)"]],
			"Impressive work - and with time to spare.  Your troubles deserve fair compensation.",
			"I might still make it in time!",
			"I've completely missed my appointment now and I won't waste another second on your plodding ship!",
			"How much longer until we get to #DEST#? I'm already #bored of space travel|missing my 9-5|seizing up from sitting|planning my next trip#.",
			"This isn't exactly the #Executive Hotel|Ritz|Imperial Auberge|Resort# #DEST#, is it? I could #really do with|kill for|sell my firstborn for|honestly use# #a warm bath|a bottle of red|a galactic breakfast|a breath of fresh air# about now.",
			"I really hope I can find some #decent|good|quality# #sushi|injera|dumplings|curry|tacos# on #DEST# - these #soy|synth|instant|freeze-dried# #shakes|kebabs|ramens|dahls|burritos# are #really starting to lose their charm|starting to all taste the same|wreaking havoc on my guts|less than stellar|redefining bland#.",
			"I'm hoping to take a break on #DEST# and see the #great|ancient|vast|underground|artificial|crystal|holographic# #lagoon|forest|ruins|city|network|sea# of #M|J|S|R|D|W##a|a|e|o|u|i##k|b|g|t|v|x##h|p|y|ch|qu|f##in|oo|ala|en|ing#.  I hear it's #breathtaking|worth the trip|a very spiritual experience|very busy|better than any simulation|just been restored#."],
		proceed: [["advStage","addPassenger","event(setStage(2), #KEY1#)","event(setStage(3), #KEY2#)"]],
		contact: ["I'm still looking for someone to take me to #DEST#.", 0,
			"Come talk to me in my cabin. I #haven't gone anywhere!|much prefer talking in person|should leave the comm screen for a bit#."],
		summary: ["","Bring #CLIENTFIRST# to #DEST#."],
		trigger: [,["arrived"],,["landed"]],
		reward: [,["addCall", "removeMission", "credit(#KEY3#,Fast Passage,#CLIENT#)", "removePassenger", "rep(8,#CLIENT#)", "addHistory(#CLIENT#,succeed,You brought me to #DEST# for #KEY4#.,15)", "busy(4)"],
			["addCall", "removeMission", "credit(#KEY0#,Successful Passage,#CLIENT#)", "removePassenger", "rep(5,#CLIENT#)", "addHistory(#CLIENT#,succeed,You brought me to #DEST# for #KEY4#.,10)", "busy(4)"],
			["addCall", "removeMission", "removePassenger", "rep(-10,#CLIENT#)", "addHistory(#CLIENT#,fail,You weren't able to get me to #DEST# on time for #KEY4#.,-15)"]]		
	},
	pickup: {
		name: "Pickup",
		advert: "Pickup Needed: #CARGO0# from #DEST#.",
		type: "g",
		dest: "rnd,3",
		cargo: ["rnd"],
		character: ["dest"],
		key: ["distance", "mult(distance,0.67)", "add(time,#KEY1#)", "displayTime(#KEY2#)", "mult(distance,0.8)", "mult(#KEY2#,-1)"],
		comm: ["#I'm looking for|I need|I'm in search of# #the services of a|a|a# #private|competent|capable|reliable# #carrier|courier|delivery person|hauler# to pick up some #CARGO0.type# #CARGO0# on <b>#DEST#</b>. I need the #cargo|shipment|delivery# by <b>#KEY3#</b>.", 1,
			"My #associate|friend|contact#, <b>#CHAR0#</b>, will meet you on #DEST# with the #CARGO0#.",
			"CHAR0>#CLIENT# told me to expect you. I have the #CARGO0.type# #CARGO0# transferring to your cargo hold now.",
			"Great. I've got the #CARGO0.type# #CARGO0# and credited <b>#KEY4#\u20B5</b> to your account. #Until next time|I look forward to doing business again|Good work|I'll contact you again if I need anything#.",
			"It's too late now so I'll stow the #CARGO0# here and I'll find someone #more competent|else|better qualified|reliable# to get them back to me.",
			"Apparently this request #wasn't high on your list of things to do|was too much for you|was forgotten in your busy life|wasn't worded seriously enough#. Forget about the #CARGO0#. I'll find someone #more competent|else|better qualified|reliable# next time."],
		proceed: [["advStage", "addCall", "addContact", "advStage", "event(setStage(5), #KEY1#)"]],
		contact: ["I'm still looking for someone to pick up my #CARGO0#.", 0,
			"#You need to get|Please head# to #DEST#. #CHAR0# is waiting to #load|hand over|give you# the #CARGO0#.",,
			"#I'm glad to hear|Good,|Excellent,# #you've got|you have|you picked up# the #CARGO0#. Now #head|come|jump# back to #ORIGIN# to meet me."],
		contactChar: [["I'll have the #CARGO0# ready for you when you get to #DEST# #(assuming you have room to take it)|and will load it if you have space#.",,,
			"You need to see #CLIENT# on #ORIGIN#. #We can talk in the future if|Maybe we'll talk after|I'll be informed once# you've delivered the #CARGO0#."]],
		summary: [,"Get #CARGO0# from #DEST# and bring them back to #ORIGIN#."],
		trigger: [,,["arrived","emptyRoom(cargohold)"],["isHere","haveCargo"],["landed"]],
		reward: [,,["addCall", "advStage", "addCargo(,#ORIGIN#)", "event(setStage(4),#KEY5#,haveCargo)", "addHistory(#CHAR0#,succeed,You collected some #CARGO0# from me.)"],
			["addCall", "removeMission", "credit(#KEY4#,Successful Pickup)", "removeCargo", "rep(15)", "addHistory(,succeed,You completed that #CARGO0# pickup job for me., 15)"],
			["addCall", "removeMission", "removeCargo", "rep(-10)", "addHistory(,fail,You failed to complete that #CARGO0# pickup job for me.,-10)"],
			["addCall", "removeMission", "removeCargo", "rep(-15)", "addHistory(,fail,You failed to complete that #CARGO0# pickup job for me.,-15)"]]
	},
	procure: {
		name: "Procure",
		advert: "Looking to Buy #CARGO0#.",
		type: "g",
		cargo: ["rnd(non-specific)"],
		key: ["mult(mult(#CARGO0.price#,add(1000,rnd(400))),0.001)", "mult(mult(#CARGO0.price#,add(850,rnd(100))),0.001)", "mult(add(96,add(time,mult(#KEY0#,.01))),-1)"],
		init: ["event(setStage(5),#KEY2#)"],
		comm: ["#I'm looking to buy|I need|I'm in search of# some <b>#CARGO0.type# #CARGO0#</b> and I'll pay you well for your trouble.", 1,
			"Contact me if you're back on #ORIGIN# soon with #CARGO0.type# #CARGO0# and I'll pay you <b>#KEY0# \u20B5</b> for the goods.",
			"Have you brought me some <b>#CARGO0.type# #CARGO0#</b>? I'm ready to pay <b>#KEY0# \u20B5</b>.", 3, [["isHere", "haveCargo"]], "INC",
			"I'll pay <b>#KEY0# \u20B5</b> for some #CARGO0.type# #CARGO0#. Do you have any for me?", 3, [["isHere", "haveCargo"]],
			"Great. I've been looking for this for a while. Here's the #KEY0# \u20B5 as promised. #Until next time|I look forward to doing business again|Nice doing business with you|I'll contact you again if I need anything#.",
			"I'll give you #KEY1# \u20B5 for it.", 3, [["isHere", "haveCargo"]],
			"Thanks. Next time #try to be on time|I might not be so flexible|get here quicker if you want the deal#."],
		proceed: [["if(haveCargo,advStage)", "advStage", "addCall"],,,
			["advStage", "addCall", "removeMission", "credit(#KEY0#,Successful Procurement)", "removeCargo", "rep(5)", "addHistory(,succeed,You found me some #CARGO0#.,5)"],,
			["advStage", "addCall", "removeMission", "credit(#KEY1#,Late Procurement)", "removeCargo", "addHistory(,succeed,You found me some #CARGO0#.,-5)"]], 
		contact: ["I'm still on #ORIGIN# #look|want|need#ing to #buy|get|acquire# some #CARGO0#.", 2,,,,,
			"You're too late with the #CARGO0# for me but I suppose I could find someone who has use for some.", 5],
		summary: [,"Procure #CARGO0.type# #CARGO0# and bring back to #ORIGIN#."]
	},
	locale1: {
		name: "Selling Illegal Goods",
		advert: "A questionable-looking person is motioning to speak with you.",
		prereq: ["freeSite"],
		cargo: ["rnd(illegal)"],
		locale: ["rnd"],
		key: ["mult(mult(#CARGO0.price#,add(450,rnd(100))),.001)", "mult(#KEY0#,-1)"],
		init: ["event(removeMission,48,24)"],
		comm: ["I've recently come into the possession of some #CARGO0.type# #CARGO0# and I've realised I could make better use of some cash so I'm selling the #CARGO0# at a reduced price. How does #KEY0# \u20B5 sound?", 3, [["emptyRoom(cargohold)", "haveCredits(#KEY0#)"]], "INC",
			"Ah, you're back. I knew you couldn't resist a good deal. Have you got #KEY0# \u20B5 for the #CARGO0.type# #CARGO0#?", 3, [["emptyRoom(cargohold)", "haveCredits(#KEY0#)"]],
			"Nice doing business with you."],
		proceed: [["setStage(2)", "addCall", "removeMission", "credit(#KEY1#,Bought some cheap #CARGO0#)", "addCargo", "addHistory(,,I gave you a great deal on some #CARGO0#.,10)", "busy(2)"]],
		contact: ["I've still got the #CARGO0# but I need to sell quickly. Meet me at #LOC0.name# on #ORIGIN# if you're interested."]
	},
	locale2: {
		name: "Buying Illegal Goods",
		advert: "A questionable-looking person is motioning to speak with you.",
		prereq: ["freeSite"],
		cargo: ["rnd(illegal)"],
		locale: ["rnd"],
		key: ["mult(mult(#CARGO0.price#,add(1450,rnd(100))),.001)"],
		init: ["event(removeMission,96,72)"],
		comm: ["I'm a buyer of fine goods that not everyone on this planet appreciates. I'll pay #KEY0# \u20B5 for any #CARGO0.type# #CARGO0# you might have.", 3, [["haveCargo"]], "INC",
			"Ah, you're back. Have you got what I'm looking for? I'll pay #KEY0# \u20B5 for any #CARGO0.type# #CARGO0# you might have.", 3, [["haveCargo"]],
			"Nice doing business with you."],
		proceed: [["setStage(2)", "addCall", "removeMission", "credit(#KEY0#,Sold some illicit #CARGO0#)", "removeCargo", "addHistory(,,I fenced some #CARGO0# for you.,5)", "busy(2)"]],
		contact: ["I'm still looking to buy but I don't stick around in one place too long. Meet me at #LOC0.name# on #ORIGIN# if you've got something for me."]
	},
	locale3: {
		name: "Donating",
		advert: "An eager-looking person is motioning to speak with you.",
		prereq: ["freeSite"],
		locale: ["rnd"],
		key: ["world(seed)", "seed(Spotted,Horned,Iridescent,Tasseled,Tufted)", "seed(Iguana,Quetzal,Dolphin,Panther,Bear,Toad,Beetle)", "#KEY0# #KEY1# #KEY2#s"],
		init: ["if(haveDonations(1000),setStage(3))"],
		choices: [["Donate 1000 \u20B5", "Donate 100 \u20B5"]],
		comm: ["#I'm representing|I represent# the 'Save the #KEY3# Fund' and we're always looking for individuals who #share our ideals|care about animals# and would be able to #donate|give# to the cause. #No amount is too small|Anything is appreciated#.", 4, "INC", [["haveCredits(1000)"],["haveCredits(100)"]],
			"Ah, you're back. Has the plight of the #KEY3# moved you to share a little with our cause?", 4, [["haveCredits(1000)"],["haveCredits(100)"]],
			"We #real|great#ly appreciate your generous gift and the #KEY3# thank you.",
			"It's so good to see one of our top patrons! Your #charity|benevolence# has saved #at least five|countless|many# #KEY3# already. Any amount you can spare can help save one more.", 4, [["haveCredits(1000)"],["haveCredits(100)"]]],
		proceed: [,["setStage(2)", "addCall", "removeMission", "credit(-1000,Saved many #KEY3#)", "donate(1000)", "addHistory(,,You donated generously to the \"Save the #KEY3# Fund\".,10)"],
			["addCall", "removeMission", "credit(-100,Saved some #KEY3#)", "donate(100)", "addHistory(,,You donated to the \"Save the #KEY3# Fund\".,5)"],
			["setStage(1)", "proceed"],
			["setStage(2)", "proceed"]],
		contact: ["The \"Save the #KEY3# Fund\" can always use more money. I'm still at #LOC0.name# on #ORIGIN# looking for support."]
	},
	/* Gambling Locale --> Needs reworking, use CLIENT.risk in bluffing/betting game
	locale4: {
		name: "Gambling",
		advert: "An excited person steps away momentarily from a loud group and motions for you to join them.",
		prereq: ["freeSite"],
		locale: ["rnd"],
		key: ["#Cosmic|Frontier|Galactic# #Baccarat|Bolide|Stakes#", "#Explore|Exterminate|Expand|Extract#"], //"['Explore', 'Extract', 'Exterminate', 'Terraform', 'Moon', 'Nova', 'Space']", "['Rigelian', 'Sirian', 'Terran', 'Minerals', 'Stardrive', 'Lasers', 'Colony', 'Starbase', 'Corporation', 'Credits', 'Analysis', 'Bureaucracy']
		comm: ["We're just playing a friendly game of #KEY0#. Buy in is 100 \u20B5.", 3 ,[["haveCredits(100)"]],
			"<b>#KEY1#</b> and <b>#KEY2#</b> have been drawn and the wheel's on <b>#KEY3#</b>. You'll need to ante 1000 \u20B5.", 3, [["haveCredits(1000)"]], "INC",
			"Ah, you're back. We're just ready to start a new round; 1000 \u20B5 if you want in.", 3, [["haveCredits(1000)"]],
			"My <b>#KEY7#</b> #beats|bests|is better than# your <b>#KEY6#</b>. #That will be|Time to pay up:|I'll be relieving you of# <b>#KEY8# \u20B5</b>. I'm sorry friend, but it looks like I've won. Come back and play again some time.",
			"You got <b>#KEY6#</b> and that {#KEY8# == 100 ? 'just barely' : ''} beats my <b>#KEY7#</b>{#KEY8# < 500 ? '.' : #KEY8# < 900 ? ' handily.' : ' all to pieces!'} Here's <b>#KEY8#</b> \u20B5. Congratulations!"],
		proceed: [[#KEY6# = #KEY5#[2]; #KEY7# = #KEY5#[3]; #KEY8# = gambling(#KEY4#[(time.full + seed) % 7], #KEY5#) * 1000; commEvent(this, this.key[8] > 0 ? 4 : 3); credit(#KEY8#,${#KEY8# > 0 ? 'Won' : 'Lost'} at #KEY0#); addHistory(,,We played some #KEY0# on #ORIGIN#.,5); updateTime(1)]],
		contact: ["We'll be playing #KEY0# until we get shut down. Meet me at #LOC0.name# on #ORIGIN# if you're ready to lose some credits!"]
	},*/
	main: {
		name: "The Vaccine",
		prereq: ["freeSite(2)"],
		dest: "rnd,1",
		cargo: ["Astromedica Vaccine,,medicine,400,5"],
		character: ["Bar Patron 1", "Bar Patron 2"],
		locale: ["lab,#CLIENTFIRST#'s Lab,hidden", "bar,,hidden"],
		key: ["world(3)"],
		init: ["stockCargo(#DEST#)", "addCall", "advStage"],
		choices: [,,,,["Ask around..."],["I'll keep looking..."]],
		comm: ["I've been looking for you for weeks; where have you been? Word is that Astromedica is ready to release a new vaccine for the #KEY0# plague at any minute on <b>#DEST#</b>.<br><br>I need you to get over there as fast as you can and stock up ... I'll fill you in on more details later.",
			"Great. Now don't be getting any noble ideas about saving the people of #KEY0# just yet - we need to know what's in this vaccine. Bring me back a sample on #DEST# so I can analyze it in my lab.",
			"I've got the meds and I'll get back to you soon with what I've discovered. I know you had to go out of your way for this so here's 200 \u20B5. Try to find some work - this will take a while.",
			"I've finished analyzing the plague medicine you brought me and you'll never believe what I found out.  I'll have to tell you when you get here - this channel isn't secure.  Meet me at my lab as soon as you can.",
			"-1>#CLIENTFIRST#'s lab is in complete disarray - clearly this place has been ransacked and there's no sign of #CLIENTFIRST#. Somebody must have heard about this; somebody must know something...", 5,
			"CHAR0>You're looking for who? Sorry, I just come here to #drink|forget#.", 5,
			"CHAR1>#CLIENT#? That odd #personGeneralN# that works in some kind of lab? Yeah, I might know #CLIENTFIRST#, but you'll have to wait for a game update for me to tell you more..."],
		proceed: [,,,,["revealSite(#ORIGIN#,#LOC1#)", "removeLocale()", "advStage"],["advStage"]],
		contact: ["You need to bring me a sample of that vaccine as quickly as possible. You're the only one I can trust with this.",,,
			"I'm still working on the vaccine. Talk to you soon."],
		summary: [,"Buy some Astromedica Vaccine on #DEST#.",
			"Bring the vaccine back to #CLIENTFIRST# on #ORIGIN#.",
			"Wait for #CLIENTFIRST# to finish analyzing the vaccine.",
			"Report back to #CLIENTFIRST#'s lab on #ORIGIN#.",
			"Discover what happened to #CLIENTFIRST#."],
		trigger: [,["haveCargo"],["isHere"],[]],
		reward: [,["addCall", "advStage"],
			["addCall", "advStage", "removeCargo", "credit(200,For your troubles)", "event(addCall,advStage,updatePerson(#CLIENT#,status,missing),revealSite(#ORIGIN#,#LOC0#),36,24)"],
			[]]
	}
	}
	// Dynamically add additional story content from missions
	for (let i in missionFramework) {
		if ('addStory' in missionFramework[i]) {
			for (let j of missionFramework[i].addStory) Object.assign(storyFramework, j)
		}
		if (i.substr(0, 6) != 'locale' && i.substr(0, 4) != 'main') normalMissionList.push(i);
	}
}

function addMission (missionName, clientID) {
	if (!(missionName in missionFramework)) {alert(`ALERT: The required mission information for '${missionName}' is not available!`); return};
	
	const m = Object.create(missionFramework[missionName]);
	
	// Assign first available id
	m.id = 0;
	for (;;m.id++) if (!mission.find(v => v.id == m.id)) break;
	
	// Set empty client to randomly generated person
	m.client = clientID > -1 ? clientID : choosePerson();
	if (!(m.client > -1)) return false;
	
	m.ref = missionName;
	m.stage = 0;
	m.time = time.full;
	m.expiry = (m.expiry || rnd(4) + 4) + m.time;
	m.timetext = displayTime();
	
	// Set empty origin to client's location
	if (!('origin' in m)) m.origin = person[m.client].location;
	
	// Parse string dest
	if ('dest' in m && isNaN(m.dest)) {
		const d = m.dest.split(",");
		if (d[0] == "rnd") {
			m.dest = adjacentSystem(rnd(+d[1]), m.origin, d[2]);
		}
	}

	if ('character' in m) {
		m.character = m.character.map(v => choosePerson(v == "dest" ? m.dest : undefined));
		if (m.character.includes(-1)) return false;
	}
	
	if ('cargo' in m) m.cargo = m.cargo.map(v => v.substr(0,3) == "rnd" ? rnd(chooseGoods(v.substr(4,7) == "illegal" ? "illegal" : m.client, v.substr(4,4) == "dest" ? m.dest : m.origin, v.substr(4,12) == "non-specific" ? "non-specific" : 0)) : 
		{name: v.split(",")[0], type: v.split(",")[1], file: v.split(",")[2], baseprice: +v.split(",")[3], supply: +v.split(",")[4]});

	if ('locale' in m) {
		m.locale = m.locale.map(v => mTextSwap(v, m)).map(v => addLocale(v.split(",")[0] == "rnd" ? undefined : v.split(",")[0], m.origin, m, v.split(",")[1], v.split(",")[2]));
		if (m.locale.includes(-1)) return false;
	}

	if ('key' in m) {
		const oldData = m.key.slice();
		m.key = [];
		for (let i of oldData) m.key.push(parseValue(m, i));
	}
	
	// Change comm to getter for parsed comm data
	let newComm = [];
	for (let i of m.comm) {
		if (i > -1) newComm[newComm.length - 1].choice = i;
		else if (i == "INC") newComm[newComm.length - 1].inc += 1;
		else {			
			if (Array.isArray(i)) newComm[newComm.length - 1].prereq = i;
			else {
				let speaker = m.client;
				if (i.substr(0,4) == "CHAR") {
					speaker = m.character[+i.match(/CHAR(\d*)>/).pop()];
					i = i.match(/>(.*)/).pop();
				} else if (i.substr(0,2) == "-1") {
					speaker = -1;
					i = i.match(/>(.*)/).pop();
				}
				newComm.push({text: mTextSwap(i, m), mission: m.id, speaker, inc: 0});
			}
		}
	}
	m.commData = newComm;
	Object.defineProperty(m, 'comm', {get() {return this.commData[this.stage]}, configurable: true});

	// Change contact to getter for parsed contact data (most recent data up to current stage)
	if ('contact' in m) {
		let newContact = [];
		for (let i of m.contact) {
			if (i > -1) newContact[newContact.length - 1].preComm = i;
			else newContact.push(i ? {text: mTextSwap(i, m), mission: m.id} : undefined);
		}
		m.contactData = newContact;
		Object.defineProperty(m, 'contact', {get() {return this.contactData[this.stage] || this.contactData.slice(0, this.stage).reverse().find(v => v)}, configurable: true});
	}
	
	if ('contactChar' in m) {
		m.contactCharData = m.contactChar.map((v, i) => v.map(t => {return {text: mTextSwap(t, m), speaker: m.character[i], mission: m.id}}));
		m.contactChar = (who = 0, preText = "") => {let call = m.contactCharData[who][m.stage] || m.contactCharData[who].slice(0, m.stage).reverse().find(v => v); if (call) addCall(call, false, preText);};
	}

	// Change summary to getter for parsed summary data (most recent data up to current stage)
	if ('summary' in m) {
		m.summaryData = m.summary.map(v => mTextSwap(v, m));
		Object.defineProperty(m, 'summary', {get() {return this.summaryData[this.stage] || this.summaryData.slice(0, this.stage).reverse().find(v => v)}, configurable: true});
	}
	
	['choices', 'proceed', 'reject', 'reward', 'trigger'].forEach(prop => {
		if (prop in m) {
			m[`${prop}Data`] = m[prop].slice();
			Object.defineProperty(m, prop, {get() {return this[`${prop}Data`][this.stage] || this[`${prop}Data`].slice(0, this.stage).reverse().find(v => v)}, configurable: true});
		}
	});
	
	if ('advert' in m) m.advert = mTextSwap(m.advert, m);
	
	mission.push(m);
	updateMissionsDisplay();
	if ('init' in m) parseCommands(m.init, m);
	return m;
}

function noticeMission (repeats = 1, ref) {
	const mlist = (ref) ? Object.keys(missionFramework).filter(k => k.substr(0, ref.length) == ref) : normalMissionList;
	for (let i of times(repeats)) {
		const m = addMission(rnd(mlist));
		if (!m) continue;
		world[here].notices.push({advert: m.advert, mission: m.id, time: m.time, expiry: m.expiry});
		world[here].lastNotice = m.time;
	}
	displayNotices();
}

function removeMission (m) {
	if (!(mission.find(v => v == m))) return;
	const oldm = mission.splice(mission.findIndex(v => v == m), 1)[0];
	console.log(`Removing mission ${oldm.name} (${oldm.summary || `for ${person[oldm.client].name}`}) from the mission array.`);
	if (oldm.summary) oldmission.unshift(oldm);
	if ('locale' in oldm) oldm.locale.forEach(v => removeLocale(v, oldm.origin));
	updateMissionsDisplay();
	// Remove all notices with mission = old mission ID
	world.forEach(w => w.notices.slice().forEach(v => {console.log(`oldm.id: ${oldm.id}, Notice ${JSON.stringify(v)}...`);if (v.mission == oldm.id) console.log(`REMOVING!!!`), w.notices.splice(w.notices.findIndex(n => n == v), 1)}));
	displayNotices();
}

function addLocale (which, location, m = {}, name, query) {
	const w = world[location || m.origin || here];
	const availSites = [0, 1, 2, 3].filter(v => !("name" in w.locales[v]));
	if (availSites.length < 1) return -1;
	const site = rnd(availSites);
	const file = which || rnd(["bar", "cafe", "embassy", "factory", "hotel", "house", "lab", "museum", "office", "park", "police", "prison", "spaceport", "store", "temple", "warehouse"].filter(v => !w.locales.some(v2 => v2.type == v)));
	const type = (file == "police") ? "police station" : file;
	const hidden = (query == "hidden");
		
	const localname = rnd([w.name, rnd(w.city)]);
	if (!name) name = parse(rnd(({bar: [`${rndPersonName().split(" ")[0]}'s ${capitalize(type)}`,
			`The #fabricN[!unique].caps|plantN[!general].caps|predatorN.caps# #Club|${capitalize(type)}#`,
			`#gods|mythicalLoc#`],
		embassy: [`${world[rnd(w.links)].name} #embassy.caps#`],
		factory: [`#corp# ${capitalize(type)}`],
		park: [`#${localname}|gods|${rndPersonName(undefined, 'markov').split(" ")[0]}# #Park|Forest#`],
		house: [`${rndPersonName().split(" ")[0]}'s #houseN[!large].caps#`],
		police: [`Precinct ${rnd(99)}`,
			`${localname} ${capitalize(type)}`],
		temple: [`Our #Lady|Lord# of #templeNP|${localname}#`,
			`#templeNP.caps|${localname}# #templeVarieties.caps|# #templeTypes.caps#`,
			`St. ${rndPersonName().split(" ")[0]}#'s| of ${localname}|#`],
		get cafe() {return this.bar},
		get office() {return this.factory},
		get store() {return this.factory},
		get warehouse() {return this.factory}})[file] || [`${localname} ${capitalize(type)}`]));

	w.locales[site] = {name, type, file, hidden, pic: (name.length + name.charCodeAt(0)) % 4, mission: m.id};
	w.locales[site].call = {speaker: -1, text: `<img src="images/locales/${w.locales[site].file}${w.locales[site].pic}.jpg" style="float: left; margin: 0 10px 10px 0"><span class="big">${w.locales[site].name}</span><br><br>${localeFlavour(site)}${'advert' in m ? `<br><br>${m.advert}` : ""}`, choice: 0, mission: m.id};
	displayLocales();
	return site;
}

function removeLocale (site, location = here) {
	const locale = world[location].locales[site];
	delete locale.name;
	displayLocales();
	if (player.locale == site && location == here) player.locale = "";
}

function parseCommands (arr, m) {
	let params;
	const commandArray = {
		"addCall"() {addCall(m.comm, true)},
		"addCargo"() {haveCargo(m.cargo[+params[0] || 0], 'add', 1, params[1] || m.dest)},
		"addContact"() {addContact(params[0] || m.character[0])},
		"addHistory"() {addHistory(params[0] || m.client, params[1], params[2], +params[3])},
		"advStage"() {m.stage += +params[0] || 1},
		"addPassenger"() {havePassenger(m.client, 'add', m.dest)},
		"arrive"() {c.location = c.dest},
		"busy"() {c.busy = time.full + +params[0]},	// currently: makes person busy past current time instead of event execution time, will be fixed with 1 hour at a time event execution
		"credit"() {credit(params[0], params[2] || m.client, params[1])},
		"donate"() {player.donations += +params[0]},
		"event"() {let exe = [], hours, addedHours = 0, prereqs = [];
			for (let j of params) isNaN(j) ? (hours) ? prereqs.push(j) : exe.push(j) : (hours) ? addedHours = +j : hours = +j;
			console.log(`Adding event: addEvent(${exe}, ${m}, ${hours}, ${addedHours}, ${prereqs})`);
			addEvent(exe, m, hours, addedHours, prereqs);},
		"if"() {if (parseValue(m, params[0])) parseCommands([params[1]], m)},
		"proceed"() {parseCommands(m.proceed, m)},
		"removeCargo"() {haveCargo(m.cargo[+params[0] || 0], 'remove')},
		"removeLocale"() {removeLocale(m.locale[+params[0] || 0], +params[1] || m.origin)},
		"removeMission"() {removeMission(m)},
		"removePassenger"() {havePassenger(m.client, 'remove')},
		"rep"() {reputation(params[1] || m.client, +params[0])},
		"revealSite"() {world[world.findIndex(v => v.name == params[0])].locales[+params[1]].hidden = false; displayLocales()},
		"setComm"() {world[+params[0] || m.origin].locales[+params[1] || m.locale[0]].call.setComm = +params[2] || m.stage},
		"setStage"() {m.stage = +params[0]},
		"stockCargo"() {world[world.findIndex(v => v.name == params[0]) || m.origin].goods.push(m.cargo[0])},
		"travel"() {characterTravel(c, m.dest)},
		"updatePerson"() {validatePerson(params[0])[params[1]] = (isNaN(params[2]) ? params[2] : +params[2])}
	};
	const c = ('client' in m) ? person[m.client] : m;
	for (let i of arr) {
		console.log(`DEBUG-PARSECOMMANDS... (c: )`);
		console.log(c);
		console.log(`Original command: ${i}`);
		const command = i.replace(/\(.*\)/, "");
		console.log(`Replaced command: ${command}`);
		
		params = (i.match(/\((.*)\)/)) ? i.match(/\((.*)\)/).pop() : "";
		console.log(`Params: ${params}`);
		let pCount = 0, out = "";
		for (let j of params) {
			if (j == "(") pCount++;
			if (j == ")") pCount--;
			out += (pCount == 0 && j == ",") ? "|*|" : j
		}
		params = out.split("|*|");
		console.log(`params.length > 0: ${params.length > 0}`);
		params = params.length > 0 ? params.map(v => mTextSwap(v, m)) : [];
		(command in commandArray) ? commandArray[command]() : console.log(`Command not parsed: ${command}(${params})`);
	}
	updateMissionsDisplay();
}

function parseValue (m, cmd) {
	const c = ('client' in m) ? person[m.client] : m;
	const command = cmd.replace(/\(.*\)/, "");
	let params = (cmd.match(/\((.*)\)/)) ? cmd.match(/\((.*)\)/).pop() : "";
		let pCount = 0, out = "";
		for (let i of params) {
			if (i == "(") pCount++;
			if (i == ")") pCount--;
			out += (pCount == 0 && i == ",") ? "|*|" : i;
		}
		params = out.split("|*|");
		params = params.length > 0 ? params.map(v => mTextSwap(v, m)) : [];

	switch (command) {
		case "add": return Math.ceil(+(isNaN(params[0]) ? parseValue(m, params[0]) : params[0]) + +(isNaN(params[1]) ? parseValue(m, params[1]) : params[1]));
		case "arrived": return here == m.dest;
		case "clientLanded": return c.location > -1;
		case "haveCredits": return player.credits >= +params[0];
		case "haveDonations": return player.donations >= +params[0];
		case "displayTime": return displayTime(params[0]);
		case "distance": return calculateDistance(world[m.origin], world[m.dest]);
		case "emptyRoom": return emptyRoom(params[0]);
		case "freeSite": return world[here].locales.filter(v => v.name == "").length >= (+params[0] || 1);
		case "haveCargo": return haveCargo(params[0] || m.cargo[0]);
		case "isHere": return here == c.location;
		case "landed": return here > -1;
		case "localeFlavour": return localeFlavour(+params[0], +params[1]);
		case "mult": return Math.ceil((isNaN(params[0]) ? parseValue(m, params[0]) : params[0]) * (isNaN(params[1]) ? parseValue(m, params[1]) : params[1]));
		case "notHome": return c.location != m.home;
		case "rnd": return rnd(+params[0]);
		case "seed": return params[seed % params.length];
		case "time": return time.full;
		case "world": return world[params[0] == "seed" ? seed % world.length : adjacentSystem(rnd(+params[0]), m.origin, params[1])].name;
	}
	return parse(mTextSwap(command, m));
}

function mTextSwap (v, m) {
	function swap (str, s) {
		if (s == "DEST") return world[m.dest].name;
		if (s == "CLIENT") return person[m.client].name;
		if (s == "CLIENTFIRST") return person[m.client].firstname;
		if (s == "ORIGIN") return world[m.origin].name;
		if (s.substr(0, 3) == "KEY") return m.key[+s.substr(3)];
		if (s.substr(0, 5) == "CARGO") {
			const c = m.cargo[s.replace(/CARGO(.*?)/g, "").replace(/\.(.*)/g, "")];
			const t = s.split(".")[1] || 'name';
			if (t == 'name' && !c.altname && illegalGoods(world[m.origin].gov).includes(goods.findIndex(v => v.name == c.name && v.type == c.type))) {
				c.altname = ({"Animal Skins": `"Woolen Rugs"`,
					"Bacteria Farms": `"${rnd(['Scientific', 'Diagnostic'])} Organisms"`,
					"Explosives": `"${rnd(['Fracturing', 'Dispersal'])} Devices"`,
					"Hand Weapons": `"${rnd(['Security', 'Deterrence'])} Devices"`,
					"Liquor": `"${rnd(['Spiritual', 'Pleasant'])} Beverages"`,
					"Luxury Goods": `"${rnd(['Heavenly', 'Generous'])} Amenities"`,
					"Narcotics": `"Alternative Medicines"`,
					"Robots": `"Mobile Computers"`,
					"Slaves": `"${rnd(['Refugees', 'Foreign Workers', 'Entertainers'])}"`})[c.name];
			}
			return (t == 'name') ? c.altname || c.name : c[t];
		}
		if (s.substr(0, 4) == "CHAR") return person[m.character[s.replace(/CHAR(.*?)/g, "").replace(/\.(.*)/g, "")]][s.replace(/(.*?)\./g,"")] || person[m.character[s.replace(/CHAR(.*?)/g, "").replace(/\.(.*)/g, "")]].name;
		if (s.substr(0, 3) == "LOC") return world[m.origin].locales[m.locale[s.replace(/LOC(.*?)/g, "").replace(/\.(.*)/g, "")]][s.replace(/(.*?)\./g,"")] || m.locale[+s.substr(3)];
		return parse(str);
	}
	return v.replace(/#(.*?)#/g, swap).replace(/[!?]\./g, v => v[0]);
}

function checkTriggers () {
	mission.slice().forEach(v => {if (mission.find(m => m.id == v.id)) {
			if (v.trigger && v.trigger.every(t => parseValue(v, t))) {console.log(`Passed triggers for mission${v.id}(${v.advert})`); parseCommands(v.reward, v)}
			else console.log(`Failed triggers for mission${v.id}(${v.advert}).`);}});
}
