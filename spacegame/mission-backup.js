var mission = [];
var oldmission = [];
var noticeMissions = [];
//var localeMissions = [];

// mission.NAME.comm[#] {person: Optional (#, defaults to questGiver), text: Required, choice: Optional (1: Agree/Refuse, defaults to endComm)}
// Ditch summary to hide a mission from the mission log (i.e. secret background mission)
let missionFramework = {};
function loadMissionFramework () {
	missionFramework = {
	delivery: {
		name: "Delivery",
		advert: "Delivery Needed: #CARGO0.name# to #DEST#.",
		type: "g",
		prereq () {return emptyRoom('cargohold')},
		dest: "adjacentSystem(rnd(3))",
		cargo: ["rnd(chooseGoods(this.questGiver, this.dest))"],
		character: ['dest'],
		key: ["calculateDistance(world[this.dest], world[here])", "Math.floor(this.key[0] / 2)", "time.full + this.key[1]", "displayTime(this.key[2])"],
		init () {commEvent(this)},
		reward () {addMission('delivery1', this.id)},
		comm: [{text: "I#'m looking for| need|'m in search of##|| the services of# a #private|competent|capable|reliable# #carrier|courier|delivery person|hauler# to bring some #CARGO0.type# #CARGO0.name# to <b>#DEST#</b>. My #associate|friend|client#, <b>#CHAR0#</b>, needs the #cargo|shipment|delivery# by <b>#KEY3#</b>.", choice: 1}]
	},
	delivery1: {
		summary: "'Bring ' + this.cargo[0].name + ' to ' + person[this.character[0]].name + ' on ' + world[this.dest].name + '.'",
		init () {commEvent(this); haveCargo(this.cargo[0], 'add', 1, this.dest); addEvent('this.reward = this.reward2', this, this.key[1]); addEvent('this.reward = this.reward3; this.trigger = this.trigger2', this, this.key[1] + 120)},
		reward () {commEvent(this, 1); removeMission(this.id); haveCargo(this.cargo[0], 'remove'); credit(this.key[0] * 0.8, this.questGiver, 'Successful Delivery'); reputation(this.questGiver, 5); addHistory(this.questGiver, 'succeed', "You made that " + this.cargo[0].name + " delivery for me.", 10); addHistory(this.character[0], "fail", "You delivered some " + this.cargo[0].name + " to me.")},
		reward2 () {var cg = this.cargo[0]; commEvent(this, 2); removeMission(this.id); haveCargo(cg, 'remove'); credit(this.key[0] * 0.4, this.questGiver, 'Late Delivery'); reputation(this.questGiver, -3); addHistory(this.questGiver, 'succeed', "You made that " + this.cargo[0].name + " delivery for me.", -10); addHistory(this.character[0], "fail", "You were late delivering some " + this.cargo[0].name + " to me.")},
		reward3 () {var cg = this.cargo[0]; commEvent(this, 3); removeMission(this.id); haveCargo(cg, 'remove'); reputation(this.questGiver, -10); addHistory(this.questGiver, 'fail', "You failed to complete that " + this.cargo[0].name + " delivery job for me.", -15); addHistory(this.character[0], "fail", "You were supposed to deliver some " + this.cargo[0].name + " to me.")},
		trigger () {return (here == this.dest && haveCargo(this.cargo[0]))},
		trigger2 () {return (here != 'in transit')},
		comm: [{text: "I'm transferring the #CARGO0.name# to your cargo hold. You'll be meeting with #CHAR0.firstname# on #DEST# to accept shipment."},
			{speaker: "CHAR0", text: "Thank you - we've been expecting you. Payment has been transferred."},
			{speaker: "CHAR0", text: "You're late, but we'll still accept the shipment. Reduced payment has been credited to you - full payment is only given for on time deliveries."},
			{text: "I've received word from #CHAR0.name# that the shipment has still not arrived. It's too late now so we will collect the #CARGO0.name# here and find someone more competent to get them back to us."}],
		contact: ["#You need to get|Please head# to #DEST#. #CHAR0.name# is waiting for the #CARGO0#.",
			"I'm #eagerly|patiently|anxiously# #waiting on|awaiting# that #shipment|cargo# of #CARGO0#."]
	},
	locate: {
		
	},
	locate1: {
		//			{text: "You're too late with the #CARGO0# for me but I suppose I could find someone who has use for #CARGO0#.  I'll give you #KEY6#\u20B5 for it.", choice: 1},
	},
	passage: {
		name: "Passage",
		advert: "Passage Needed: party heading to #DEST#.",
		type: "p",
		prereq () {return emptyRoom('living')},
		dest: "adjacentSystem(rnd(3), this.origin, 'Cultural')",	// Calculate in initial addMission (along with range)
		key: ["calculateDistance(world[this.dest], world[here])", "time.full + Math.floor(this.key[0] / 6.5)", "rnd([\"a conference\", \"my \" + rnd([\"niece\", \"nephew\"]) + \"'s birthday\", \"an important meeting\", \"a gala opening\", \"a charity fundraiser\", \"a corporate retreat\", \"a symposium\", \"my friend's wedding\"])"],
		init () {commEvent(this); addEvent("person[this.questGiver].dest = this.dest; person[this.questGiver].location = 'in transit'", this, 1); addEvent('if (havePassenger(this.questGiver) == false) {person[this.questGiver].location = this.dest; person[this.questGiver].busy = this.key[1] + 4}', this, this.key[0] / 7, 4)},
		reward () {addMission('passage1', this.id)},
		comm: [{text: "I have #KEY2# to attend on <b>#DEST#</b>. I need to get there as #quickly|fast|swiftly# as possible.", choice: 1}]
	},
	passage1: {
		summary: "'Bring ' + person[this.questGiver].firstname + ' to ' + world[this.dest].name + '.'",
		init () {havePassenger(this.questGiver, 'add', this.dest); addEvent('this.reward = this.reward2', this, this.key[0] / 7.5); addEvent('this.reward = this.reward3; this.trigger = this.trigger2', this, this.key[0] / 6.5)},	// add failure event calls
		reward () {var qg = this.questGiver; commEvent(this); removeMission(this.id); credit(this.key[0] * 1.25, qg, 'Fast Passage'); havePassenger(qg, 'remove'); reputation(qg, 8); addHistory(this.questGiver, 'succeed', "You brought me to " + world[this.dest].name + " for " + this.key[2] + ".", 15); person[qg].busy = this.key[1] + 4},	// var & order important because havePassenger will call checkTriggers again
		reward2 () {var qg = this.questGiver; commEvent(this, 1); removeMission(this.id); credit(this.key[0], qg, 'Successful Passage'); havePassenger(qg, 'remove'); reputation(qg, 5); addHistory(this.questGiver, 'succeed', "You brought me to " + world[this.dest].name + " for " + this.key[2] + ".", 10); person[qg].busy = this.key[1] + 4},
		reward3 () {var qg = this.questGiver; commEvent(this, 2); removeMission(this.id); havePassenger(qg, 'remove'); reputation(qg, -10); addHistory(this.questGiver, 'fail', "You weren't able to get me to " + world[this.dest].name + " on time for " + this.key[2] + ".", -15)},
		trigger () {return (here == this.dest)},
		trigger2 () {return (here != 'in transit')},
		comm: [{text: "Impressive work - and with time to spare.  Your troubles deserve fair compensation."},
			{text: "I might still make it in time!"},
			{text: "I've completely missed my appointment now and I won't waste another second on your plodding ship!"},
			{text: "How much longer until we get to #DEST#? I'm already #bored of space travel|missing my 9-5|seizing up from sitting|planning my next trip#."},
			{text: "This isn't exactly the #Executive Hotel|Ritz|Imperial Auberge|Resort# #DEST#, is it? I could #really do with|kill for|sell my firstborn for|honestly use# #a warm bath|a bottle of red|a galactic breakfast|a breath of fresh air# about now."},
			{text: "I really hope I can find some #decent|good|quality# #sushi|injera|dumplings|curry|tacos# on #DEST# - these #soy|synth|instant|freeze-dried# #shakes|kebabs|ramens|dahls|burritos# are #really starting to lose their charm|starting to all taste the same|wreaking havoc on my guts|less than stellar|redefining bland#."},
			{text: "I'm hoping to take a break on #DEST# and see the #great|ancient|vast|underground|artificial|crystal|holographic# #lagoon|forest|ruins|city|network|sea# of #M|J|S|R|D|W##a|a|e|o|u|i##k|b|g|t|v|x##h|p|y|ch|qu|f##in|oo|ala|en|ing#.  I hear it's #breathtaking|worth the trip|a very spiritual experience|very busy|better than any simulation|just been restored#."}],
		contact: ["Come talk to me in my cabin. I #haven't gone anywhere!|much prefer talking in person.|should leave the comm screen for a bit.#"]
	},
	pickup: {
		name: "Pickup",
		advert: "Pickup Needed: #CARGO0.name# from #DEST#.",
		type: "g",
		prereq () {return emptyRoom('cargohold', 'any')},
		dest: "adjacentSystem(rnd(3))",
		cargo: ["rnd(chooseGoods(this.questGiver, this.origin))"],
		key: ["calculateDistance(world[this.dest], world[here])", "Math.floor(this.key[0] / 1.5)", "time.full + this.key[1]", "displayTime(this.key[2])", "Math.floor(this.key[0] * 0.8)", false],
		init () {commEvent(this)},
		reward () {addMission('pickup1', this.id)},
		comm: [{text: "I#'m looking for| need|'m in search of##|| the services of# a #private|competent|capable|reliable# #carrier|courier|delivery person|hauler# to pick up some #CARGO0.type# #CARGO0.name# on <b>#DEST#</b>. I need the #cargo|shipment|delivery# by <b>#KEY3#</b>.", choice: 1}]
	},
	pickup1: {
		summary: "'Get ' + this.cargo[0].name + ' from ' + world[this.dest].name + ' and bring them back to ' + world[this.origin].name + '.'",
		character: ['dest'],
		init () {commEvent(this); addEvent('this.reward = this.reward3; this.trigger = this.trigger3', this, this.key[1])},
		reward () {commEvent(this, 1); this.key[5] = true; haveCargo(this.cargo[0], 'add', 1, this.origin); addHistory(this.character[0], "succeed", "You collected some " + this.cargo[0].name + " from me."); this.trigger = this.trigger2; this.reward = this.reward2; this.contact.copyWithin(0, 2)},
		reward2 () {commEvent(this, 2); removeMission(this.id); haveCargo(this.cargo[0], 'remove'); credit(this.key[4], this.questGiver, 'Successful Pickup'); reputation(this.questGiver, 15); addHistory(this.questGiver, 'succeed', "You completed that " + this.cargo[0].name + " pickup job for me.", 15)},
		reward3 () {if (this.key[5] == true && haveCargo(this.cargo[0])) {commEvent(this, 4); reputation(this.questGiver, -10); addHistory(this.questGiver, 'fail', "You failed to complete that " + this.cargo[0].name + " pickup job for me.", -10); removeMission(this.id)} else {commEvent(this, 3); reputation(this.questGiver, -15); addHistory(this.questGiver, 'fail', "You failed to complete that " + this.cargo[0].name + " pickup job for me.", -15); removeMission(this.id); haveCargo(this.cargo[0], 'remove')}},
		trigger () {return (here == this.dest && emptyRoom('cargohold') && this.key[5] == false)},
		trigger2 () {return (here == this.origin && haveCargo(this.cargo[0]) && this.key[5] == true)},
		trigger3 () {return (here != 'in-transit')},
		comm: [{text: "My #associate|friend|contact#, <b>#CHAR0#</b>, will meet you on #DEST# with the #CARGO0.name#."},
			{speaker: "CHAR0", text: "#QG.firstname# told me to expect you.  I have the #CARGO0.type# #CARGO0.name# transferring to your cargo hold now."},
			{text: "Great. I've got the #CARGO0.type# #CARGO0.name# and credited <b>#KEY4#\u20B5</b> to your account. #Until next time|I look forward to doing business again|Good work|I'll contact you again if I need anything#."},
			{text: "Apparently this request was#n't high on your list of things to do| too much for you| forgotten in your busy life|n't worded seriously enough#. Forget about the #CARGO0#. I'll find someone #more competent|else|better qualified|reliable# next time."},
			{text: "It's too late now so I'll stow the #CARGO0.name# here and I'll find someone #more competent|else|better qualified|reliable# to get them back to me."}],
		contact: ["#You need to get|Please head# to #DEST#. #CHAR0.name# is waiting to #load|hand over|give you# the #CARGO0#.",
			"I'll have the #CARGO0# ready for you when you get to #DEST##, assuming you have room to take it| and will load it if you have space#.",
			"#I'm glad to hear|Good,|Excellent,# you#'ve got| have| picked up# the #CARGO0#. Now #head|come|jump# back to #ORIGIN# to meet me.",
			"You need to see #QG# on #ORIGIN#. #We can talk in the future if|Maybe we'll talk after|I'll be informed once# you've delivered the #CARGO0#."]
	},
	locale1: {
		prereq () {return emptyRoom('cargohold') && player.credits >= this.key[2]},
		cargo: ["rnd(chooseGoods('illegal'))"],
		key: ["chooseLocale()", "world[this.origin].locales[this.key[0]].name", "Math.floor(this.cargo[0].price * (450 + rnd(100)) / 1000)", "localeFlavour(this.key[0], this.origin)"],
		init () {world[this.origin].locales[this.key[0]].event = this},
		reward () {commEvent(this, 3); credit(-this.key[2], this.questGiver, "Bought some cheap " + this.cargo[0].name); haveCargo(this.cargo[0], 'add', 1, 'None', this.key[2]); addHistory(this.questGiver, 0, "I gave you a great deal on some " + this.cargo[0].name, 10); person[this.questGiver].busy = time.full + 2; removeMission(this.id)},
		comm: [{speaker: -1, text: "#KEY3#<br><br> A questionable-looking person is motioning to speak with you.", choice: 0},
			{text: "I've recently come into the possession of some #CARGO0.type# #CARGO0# and I've realised I could make better use of some cash so I'm selling the #CARGO0# at a reduced price. How does #KEY2# \u20B5 sound?", choice: 3, inc: 1},
			{text: "Ah, you're back. I knew you couldn't resist a good deal. Have you got #KEY2# \u20B5 for the #CARGO0.type# #CARGO0#?", choice: 3},
			{text: "Nice doing business with you."}],
		contact: ["I've still got the #CARGO0# but I need to sell quickly. Meet me at #KEY1# on #ORIGIN# if you're interested."]
	},
	locale2: {
		prereq () {},
		key: ["chooseLocale()", "world[this.origin].locales[this.key[0]].name", "localeFlavour(this.key[0], this.origin)", "world[seed % 32].name + ' ' + ['Spotted', 'Horned', 'Iridescent', 'Tasseled', 'Tufted'][seed % 5] + ' ' + ['Iguanas', 'Quetzals', 'Dolphins', 'Panthers', 'Bears', 'Toads', 'Beetles'][seed % 7]", "(player.credits < 100) ? player.credits : 100"],
		init () {world[this.origin].locales[this.key[0]].event = this; if (player.donations > 999) this.comm[1] = this.comm[4]},
		reward () {commEvent(this, 3); credit(-1000, this.questGiver, "Saved many " + this.key[3]); player.donations += 1000; addHistory(this.questGiver, 0, "You donated generously to the \"Save the " + this.key[3] + " Fund\"", 10); removeMission(this.id)},
		reward2 () {commEvent(this, 3); credit(-this.key[4], this.questGiver, "Saved some " + this.key[3]); player.donations += this.key[4]; addHistory(this.questGiver, 0, "You donated to the \"Save the " + this.key[3] + " Fund\"", 5); removeMission(this.id)},
		comm: [{speaker: -1, text: "#KEY2#<br><br> An eager-looking person is motioning to speak with you.", choice: 0},
			{text: "#I'm representing|I represent# the 'Save the #KEY3# Fund' and we're always looking for individuals who #share our ideals|care about animals# and would be able to #donate|give# to the cause. #No amount is too small|Anything is appreciated#.", choice: 4, inc: 1},
			{text: "Ah, you're back. Has the plight of the #KEY3# moved you to share a little with our cause?", choice: 4},
			{text: "We #real|great#ly appreciate your generous gift and the #KEY3# thank you."},
			{text: "It's so good to see one of our top patrons. Your #charity|benevolence# has saved #at least five|countless|many# #KEY3# already. Any amount you can spare can help save one more.", choice: 4}],
		contact: ["The \"Save the #KEY3# Fund\" can always use more money. I'm still at #KEY1# on #ORIGIN# looking for support."]
	},
	locale3: {
		prereq () {return haveCargo(this.cargo[0])},
		cargo: ["rnd(chooseGoods('illegal'))"],
		key: ["chooseLocale()", "world[this.origin].locales[this.key[0]].name", "Math.floor(this.cargo[0].price * (1450 + rnd(100)) / 1000)", "localeFlavour(this.key[0], this.origin)"],
		init () {world[this.origin].locales[this.key[0]].event = this},
		reward () {commEvent(this, 3); credit(this.key[2], this.questGiver, "Sold some illicit " + this.cargo[0].name); haveCargo(this.cargo[0], 'remove'); addHistory(this.questGiver, 0, "I fenced some " + this.cargo[0].name + " for you.", 5)},
		comm: [{speaker: -1, text: "#KEY3#<br><br> A questionable-looking person is motioning to speak with you.", choice: 0},
			{text: "I'm a buyer of fine goods that not everyone on this planet appreciates. I'll pay #KEY2# \u20B5 for any #CARGO0.type# #CARGO0# you might have.", choice: 3, inc: 1},
			{text: "Ah, you're back. Have you got what I'm looking for? I'll pay #KEY2# \u20B5 for any #CARGO0.type# #CARGO0# you might have.", choice: 3},
			{text: "Nice doing business with you."}],
		contact: ["I'm still looking to buy but I don't stick around in one place too long. Meet me at #KEY1# on #ORIGIN# if you've got something for me."]
	},
	locale4: {
		prereq () {return player.credits > 999},
		key: ["chooseLocale()", "world[this.origin].locales[this.key[0]].name", "localeFlavour(this.key[0], this.origin)", "rnd(['Cosmic', 'Frontier', generateName(2, 'ja')]) + ' ' + rnd(['Baccarat', 'Bolide', 'Stakes'])", "['Explore', 'Extract', 'Exterminate', 'Terraform', 'Moon', 'Nova', 'Space']", "['Rigelian', 'Sirian', 'Terran', 'Minerals', 'Stardrive', 'Lasers', 'Colony', 'Starbase', 'Corporation', 'Credits', 'Analysis', 'Bureaucracy']"],
		init () {world[this.origin].locales[this.key[0]].event = this},
		reward () {this.key[6] = this.key[5][2]; this.key[7] = this.key[5][3]; this.key[8] = gambling(this.key[4][(time.full + seed) % 7], this.key[5]) * 1000; commEvent(this, this.key[8] > 0 ? 4 : 3); credit(this.key[8], this.questGiver, `${this.key[8] > 0 ? 'Won' : 'Lost'} at ${this.key[3]}`); addHistory(this.questGiver, 0, `We played some ${this.key[3]} on ${world[this.origin].name}.`, 5); updateTime(1)},
		comm: [{speaker: -1, text: "#KEY2#<br><br> An excited person steps away momentarily from a loud group and motions for you to join them.", choice: 0},
			{text: "{mission[this.id].key[5] = this.key[5] = shuffle(this.key[5]), ''}We're just playing a friendly game of #KEY3#. <b>{this.key[5][0]}</b> and <b>{this.key[5][1]}</b> have been drawn and the wheel's on <b>{this.key[4][(time.full + seed) % 7]}</b>. You'll need to ante 1000 \u20B5.", choice: 3},
			{text: "Ah, you're back. We're just ready to start a new round; 1000 \u20B5 if you want in.", choice: 3},
			{text: "My <b>{this.key[7]}</b> #beats|bests|is better than# your <b>{this.key[6]}</b>. #That will be|Time to pay up:|I'll be relieving you of# <b>{Math.abs(this.key[8])} \u20B5</b>. I'm sorry friend, but it looks like I've won. Come back and play again some time."},
			{text: "You got <b>{this.key[6]}</b> and that {this.key[8] == 100 ? 'just barely' : ''} beats my <b>{this.key[7]}</b>{this.key[8] < 500 ? '.' : this.key[8] < 900 ? ' handily.' : ' all to pieces!'} Here's <b>{this.key[8]}</b> \u20B5. Congratulations!"}],
		contact: ["We'll be playing #KEY3# until we get shut down. Meet me at #KEY1# on #ORIGIN# if you're ready to lose some credits!"]
	},
	main: {
		name: "The Vaccine",
		summary: "'Buy some Astromedica Vaccine on ' + world[this.dest].name + '.'",
		prereq () {return (addLocale('two', 'lab') && addLocale('two', 'bar'))},	// 2 free sites and no lab or bar
		dest: "adjacentSystem(1)",
		key: ["world[adjacentSystem(3)].name", "person[this.questGiver].firstname + \"'s Lab\""],
		init () {commEvent(this); addLocale('add', 'lab'); addLocale(1, 'bar'); world[this.dest].goods.push({name: "Astromedica Vaccine", type: "", file: "medicine", baseprice: 400, supply: 5})},
		trigger () {return haveCargo({name: 'Astromedica Vaccine', type: ''})},
		reward () {addMission('main1', this.id)},
		comm: [{text: "I've been looking for you for weeks; where have you been? Word is that Astromedica is ready to release a new vaccine for the #KEY0# plague at any minute on <b>#DEST#</b>.<br><br>I need you to get over there as fast as you can and stock up ... I'll fill you in on more details later."}]
	},
	main1: {
		summary: "'Bring the Astromedica Vaccine back to ' + person[this.questGiver].firstname + ' on ' + world[this.dest].name + '.'",
		dest: "person[this.questGiver].location",
		init () {commEvent(this)},
		trigger () {return (haveCargo({name: 'Astromedica Vaccine', type: ''}) && here == this.dest)},
		reward () {commEvent(this, 1); haveCargo({name: 'Astromedica Vaccine', type: ''}, 'remove', 1); credit(200, this.questGiver, 'For your troubles'); addMission('main2', this.id);},
		comm: [{text: "Great. Now don't be getting any noble ideas about saving the people of #KEY0# just yet - we need to know what's in this vaccine.  Bring me back a sample on #DEST# so I can analyze it in my lab."},
			{text: "I've got the meds and I'll get back to you soon with what I've discovered.  I know you had to go out of your way for this so here's 200 \u20B5.  Try to find some work - this will take a while."}]
	},
	main2: {
		summary: "'Wait for ' + person[this.questGiver].firstname + ' to finish analyzing the vaccine.'",
		init () {addEvent('this.start()', this, 36, 24);},
		start () {commEvent(this); this.summary = "Report back to " + person[this.questGiver].firstname + "'s lab on " + world[this.dest].name + "."; addLocale('reveal', 'lab', this.key[1], this.dest)},	// add Reveal Locale function to make QG's lab visitable
		trigger () {return (here == this.dest && player.locale == this.key[1])},
		reward () {commEvent(this,1); addMission('main3', this.id)},
		comm: [{text: "I've finished analyzing the plague medicine you brought me and you'll never believe what I found out.  I'll have to tell you when you get here - this channel isn't secure.  Meet me at my lab as soon as you can."},
			{speaker: -1, text: "#QG.firstname#'s lab is in complete disarray - clearly this place has been ransacked and there's no sign of #QG.firstname#. Somebody must have heard about this; somebody must know something..."}]
	},
	main3: {
		summary: "'Discover what happened to ' + person[this.questGiver].name + '.'",
		init () {},
		trigger () {}
	},
	tutorial: {
		init () {}
	}
	};
}

function addMission (ref, oldId, giver = -1, localflag = 0) {
	if (giver == -1) {
		var who = choosePerson();
		if (!who) return false;
	}
	if (!(ref in missionFramework)) {alert("ALERT: The required mission information for '" + ref + "' is not available!"); return};
	//if ('prereq' in missionFramework[ref] && !missionFramework[ref].prereq()) {alert("ALERT: Cannot start mission '" + ref + "'; prereqs not met."); return};
	if (oldId > -1) var temp = mission[oldId];
	removeMission(oldId);
	var m = (localflag < 1) ? mission[mission.length] = {} : noticeMissions[noticeMissions.length] = {};
	console.log(m);
	if (oldId > -1) {								// Copy over old mission properties (if present)
		for (var prop in temp) {
			m[prop] = temp[prop];
		}
		delete m.prereq;	// Prereqs are not passed on
	}
	for (var prop in missionFramework[ref]) {	// Copy/overwrite properties from the missionFramework
		if (typeof missionFramework[ref][prop] === 'function') {
			m[prop] = missionFramework[ref][prop];
		} else {
			m[prop] = JSON.parse(JSON.stringify(missionFramework[ref][prop]));
		}
	}
	m.ref = ref;
	m.id = mission.length - 1;
	if (giver > -1) {						// Set questGiver to parameter OR old (transfered) property OR new person
		m.questGiver = giver;
	} else {
		if (!m.questGiver) {
			//var who = choosePerson();
			console.log("Chose person: " + who + " (" + (who ? person[who].name : "N/A") + ")");
			m.questGiver = (who) ? who : person.push(new Role());
		}
	}
	m.time = time.full;
	m.timetext = displayTime();
	m.origin = ('origin' in missionFramework[ref]) ? evalInContext(m.origin, m) : person[m.questGiver].location;
	if ('dest' in missionFramework[ref]) m.dest = evalInContext(m.dest, m);
	if ('cargo' in missionFramework[ref]) m.cargo.forEach((v, i) => {m.cargo[i] = evalInContext(v, m);});
	if ('character' in missionFramework[ref]) m.character.forEach ((v, i) => {m.character[i] = v == 'new' ? person.push(new Role()) - 1 : (v == 'dest' ? person.push(new Role(undefined, undefined, undefined, m.dest, m.dest)) - 1 : v)});
	if ('key' in missionFramework[ref]) m.key.forEach((v, i) => {m.key[i] = evalInContext(v, m);});
	if ('summary' in missionFramework[ref]) m.summary = evalInContext(m.summary, m);
	function swap (str, p1) {
		if (p1.search("KEY") > -1) {
			return m.key[p1.replace("KEY","")];
		} else if (p1.search("CARGO") > -1) {
			var c = m.cargo[p1.replace(/CARGO(.*?)/g, "").replace(/\.(.*)/g, "")];
			var t = (p1.split('.').length > 1) ? p1.replace(/(.*?)\./g,"") : 'name';
			if (!(c.altname) && illegalGoods(world[here].gov).map(v => goods[v].type + goods[v].name).indexOf(c.type + c.name) > -1) {
				if (c.name == 'Animal Skins') c.altname = `"Woolen Rugs"`;
				if (c.name == 'Bacteria Farms') c.altname = `"${rnd(['Scientific', 'Diagnostic'])} Organisms"`;
				if (c.name == 'Explosives') c.altname = `"${rnd(['Fracturing', 'Dispersal'])} Devices"`;
				if (c.name == 'Hand Weapons') c.altname = `"${rnd(['Security', 'Deterrence'])} Devices"`;
				if (c.name == 'Liquor') c.altname = `"${rnd(['Spiritual', 'Pleasant'])} Beverages"`;
				if (c.name == 'Luxury Goods') c.altname = `"${rnd(['Heavenly', 'Generous'])} Amenities"`;
				if (c.name == 'Narcotics') c.altname = `"Alternative Medicines"`;
				if (c.name == 'Robots') c.altname = `"Mobile Computers"`;
				if (c.name == 'Slaves') c.altname = `"${rnd(['Refugees', 'Foreign Workers', 'Entertainers'])}"`;
			}
			return (t == 'name') ? c.altname || c.name : c[t];// || a;
		} else if (p1.search("CHAR") > -1) {
			return person[m.character[p1.replace(/CHAR(.*?)/g, "").replace(/\.(.*)/g, "")]][p1.replace(/(.*?)\./g,"")] || person[m.character[p1.replace(/CHAR(.*?)/g, "").replace(/\.(.*)/g, "")]].name;
		} else if (p1.search("DEST") > -1) {
			return world[m.dest].name;
		} else if (p1.search("ORIGIN") > -1) {
			return world[m.origin].name;
		} else if (p1.search("QG") > -1) {
			return person[m.questGiver][p1.replace("QG.","")] || person[m.questGiver].name;
		} else {
			return rnd(p1.split("|"));
		}		
	}
	if (m.advert) m.advert = m.advert.replace(/#(.*?)#/g, swap);
	if (m.comm) m.comm.forEach(v => {v.text = v.text.replace(/#(.*?)#/g, swap)});
	if (m.contact) m.contact.forEach ((v, i) => {m.contact[i] = v.replace(/#(.*?)#/g, swap)});
	if (localflag == 0) {
		m.init();
	}
	updateMissionsDisplay();
}
function evalInContext(js, context) {
    //# Return the results of the in-line anonymous function we .call with the passed context
    return function() { return eval(js); }.call(context);
}
function removeMission (thisId) {
	if (typeof thisId === 'undefined') {
		return;
	} else if (thisId in mission) {
		console.log("Removing mission [" + thisId + "] from the mission array.");
		if ('summary' in mission[thisId]) oldmission.unshift(mission[thisId]);
		if (mission[thisId].ref.substr(0, 6) == 'locale') removeLocale(mission[thisId].key[0], mission[thisId].origin);
		delete mission[thisId];
		// Clean up mission array
		while (mission.length && !mission[mission.length - 1]) { mission.pop();}// missionId--}
		updateMissionsDisplay();
	} else {
		console.log("WARNING: Old mission [" + thisId + "] could not be found for removal.");
	}
}


// Mission functions
function checkTriggers () {
	console.log("Starting checkTriggers()...");
	for (var ref in mission) {if ('trigger' in mission[ref] && mission[ref].trigger()) {console.log("Calling mission[" + ref + "].reward()"); mission[ref].reward()}};
}
function checkPrereqs (secondaryFlag) {
	console.log("Checking missionFramework prereq values...");
	var possibleMissions = [];
	for (var ref in missionFramework) {if ('prereq' in missionFramework[ref] && missionFramework[ref].prereq()) possibleMissions.push(ref)};
	if (typeof secondaryFlag !== 'undefined') {
		possibleMissions.forEach((v,i) => {if (v.substr(0, 4) == 'main' || v.substr(0, 6) == 'locale') possibleMissions.splice(i,1)});
	}
	if (possibleMissions.length < 1) return false;
	console.log("Possible missions: " + possibleMissions);
	return possibleMissions;
}
function offerMission (giver) {
	var prereqs = checkPrereqs(1);
	if (mission.filter(v => v !== undefined).length < 4 && prereqs) {
		addMission(rnd(prereqs), undefined, giver);
	}	
}
function listMission (repeats = 1, localeFlag) {
	var mlist = [];
	for (let ref in missionFramework) {
		if (localeFlag ? (ref.substr(0, 6) == 'locale') : ('prereq' in missionFramework[ref] && ref.substr(0, 4) != 'main' && ref.substr(0, 6) != 'locale')) mlist.push(ref);
		//if (('prereq' in missionFramework[ref] && ref.substr(0, 4) != 'main' && ref.substr(0, 6) != 'locale') || (ref.substr(0, 6) == 'locale' && localeFlag)) mlist.push(ref);
	}
	for (let i = 0; i < repeats; i++) {
		addMission(rnd(mlist), undefined, undefined, (localeFlag ? 0 : 1));
	}
}
function selectListMission (which) {
	for (let i = 0; i < callQueue.length; i++) {
		if (callQueue[i].speaker == noticeMissions[which].questGiver) {
			openComm(i);
			return;
		}
	}
	if (noticeMissions[which].prereq()) {
		var m = mission[mission.length] = noticeMissions.splice(which, 1)[0];
		m.id = mission.length - 1;
		displayNotices();
		m.init();
	} else {
		commEvent({questGiver: noticeMissions[which].questGiver, comm: [{text: "I'm sorry but you don't currently meet the prerequisites for this job. Try me again later."}]});
	}
}

var localeList = ["bar", "cafe", "embassy", "factory", "forest", "hotel", "house", "lab", "museum", "office", "police", "prison", "spaceport", "store", "temple", "warehouse"];

// query values: 'add', 'any' (true if sites free/sites free & no 'place'), 'reveal' (name first unnamed locale of type 'place'), 'two' (true if at 2+ sites free)
function addLocale (query, place, desc = "", planetid = here) {
	if (query == 1) desc = rndPersonName().split(" ", 1) + "'s " + capitalize(place);
	var sites = world[planetid].locales;
	var possibleSites = [];
	for (let i = 0; i < sites.length; i++) {
		if (sites[i].file == "") {
			possibleSites.push(i);
		} else if (sites[i].file == place) {
			if (query.match(/^(any|two)$/i)) return false;
			if (query == 'reveal' && sites[i].name == "") {
				sites[i].name = desc;
				return;
			}
		}
	}
	if (possibleSites.length < 1) return false;
	if (query == 'any') return true;	// Can add this type of locale
	if (query == 'two') return (possibleSites.length > 1) ? true : false;
	var which = rnd(possibleSites);
	sites[which] = {file: place, name: desc};
	sites[which].event = {comm: [{speaker: -1, text: localeFlavour(which, planetid)}]};
	displayLocales();
	return which;
}
function removeLocale (site, location = here) {
	var l = world[location].locales[site];
	l.name = "";
	l.file = "";
	displayLocales();
	if (player.locale == site && location == here) player.locale = "";
}
function chooseLocale (location = here) {	// add a locale site not already on planet and return its site (0-3)
	var w = world[location];
	var l = w.locales.map(v => v.file);
	var possibleLocales = localeList.filter(v => l.indexOf(v) == -1);
	var choice = rnd(possibleLocales);
	var localname = rnd([w.name, w.city[rnd(w.city.length - 1)]]);
	var choices = [`${localname} ${capitalize(choice)}`];
	var markovName = rndPersonName(undefined, 'markov').split(" ")[0];
	switch (choice) {
		case 'bar': case 'cafe': choices = [`${rndPersonName().split(" ")[0]}'s ${capitalize(choice)}`,
			`The #fabricN[!unique].caps|plantN[!general].caps|predatorN.caps# #Club|${capitalize(choice)}#`,
			`#gods|mythicalLoc#`]; break;
		case 'embassy': choices = [`${world[rnd(w.links)].name} #Consulate|Delegation|Embassy|Mission#`]; break;
		case 'factory': case 'office': case 'store': case 'warehouse': choices = [`#corp# ${capitalize(choice)}`]; break;
		case 'forest': choices = [`#${localname}|gods|${markovName}# #Park|Forest#`]; break;
		case 'house': choices = [`${rndPersonName().split(" ")[0]}'s #houseN[!large].caps#`]; break;
		case 'police': choices = choices.concat(`Precinct ${rnd(99)}`); break;
		case 'temple': choices = [`Our #Lady|Lord# of #templeNP|${localname}#`,
			`#templeNP.caps|${localname}# #templeVarieties.caps|# #templeTypes.caps#`,
			`St. ${rndPersonName().split(" ")[0]}#'s| of ${localname}|#`]; break;
		default:
	}
	var name = parse(rnd(choices));
	return addLocale('add', choice, name, location);
}
function localeFlavour (site, location = here) {
	var l = world[location].locales[site];
	var loc = l.file;
	if (l.file == "police") loc = "police station";
	if (l.file == "forest") loc = "park";
	var which = Math.floor(seed / (location + 1) + site) % 4 + 1;
	
	// ["bar", "cafe", "embassy", "factory", "forest", "hotel", "house", "lab", "museum", "office", "police", "prison", "spaceport", "store", "temple", "warehouse"]
	
	var out = `#{locale: '${loc}', name: "${l.name || `${world[location].name} ${loc}`}", here: '${world[location].name}', thisOwner: '${l.file == 'embassy' ? 'the ambassador' : l.file == 'police' ? 'the chief' : l.file.match(/^[factory|office|spaceport]/) ? 'the company CEO' : 'the owner'}'}.#`;
	let gentext = rnd(["It's a popular place with #groupN.s# and #groupN.s#.", "It's just the sort of place to meet 'interesting' people.", "It remains to be seen what makes this #.locale# stand out from the others on #.here#.", "Not all #.locale.s# are created equal - this one is rather #sizeAdj# and #indoorLocAdj#."]);
	let intro = rnd(4) - 1;
	out += ["The #.locale# is #locate.ed# #locP# #outdoorLocNP.a#. ", 
		"The #.locale# is #a little difficult|not easy# to find. ", 
		"#sizeAdj.a.caps# #neon|conditionAdj|# sign reads '#.name#'. ",
		"This #.locale# is #sandwiched between|stuffed next to|hidden behind# #outdoorLocAdj.a# #outdoorLocN# and #outdoorLocN.a# #outdoorLocPost#. "][intro];
	switch (l.file) {
		case 'bar': out += rnd(["#.name# is known for a #seedy|down and out|questionable# clientele. Outside the sizeable #poorGroupN# population can attest to this fact.",
			"#.name# is one of the better bars around and it's not uncommon to find #personN.s# #activityV.ing# after work here.",
			gentext]); break;
		case 'cafe': out += rnd(["This diner serves up the best #foodNP# on #.here# - or at least that's what they claim.", gentext]); break;
		case 'embassy': out +=  rnd(["#personAdj[!seedy].caps# foreign dignitaries are the main clientele here.", gentext]); break;
		case 'factory': out += rnd(["Surely it's one of many factories on #.here# #producing|churning out|making# #consumer|industrial|farming|corporate# #goods|equipment|items#.", gentext]); break;
		case 'forest': out += rnd(["Few people venture out here. No more than #number# pass by on the path.", gentext]); break;
		case 'hotel': out += rnd(["This is hardly the hotel it used to be. It seems to cater more to #poorGroupN.s# than its original clientele.", gentext]); break;
		case 'house': out += rnd(["It's just a conventional home inside, nothing special.", gentext]); break;
		case 'lab': out += rnd(["The lab is #full of|packed with# the latest equipment. It must have been a #corporate|government|military# lab in the past.", gentext]); break;
		case 'museum': out += rnd(["The current featured exhibit is of #styleAdj# #artN.s# from #world[cultural]#.", gentext]); break;
		case 'office': out += rnd(["#officePP.caps#, #officePP#, #officePP#, and finally #officePP# to arrive.", gentext]); break;
		case 'police': out += rnd(["#poorGroupN[!animal].s.caps# are being processed slowly while #personAdj[!seedy]# cops look on.", gentext]); break;
		case 'prison': out += rnd(["Most days things are very quiet here. Not many people choose to come to a prison.", gentext]); break;
		case 'spaceport': out += rnd(["This spaceport mostly handles #tourists|passengers|cargo#.", gentext]); break;
		case 'store': out += rnd(["#inside.caps# a variety of trinkets are for sale.", gentext]); break;
		case 'temple': out += rnd(["Inside is a welcome refuge from #loud|busy|chaotic# streets outside. #lightAdj.caps# #color[!shade]# light streams through stained glass windows.", gentext]); break;
		case 'warehouse': out += rnd(["This building hasn't been in use for some time.", gentext]); break;
		default:
	}
	let outro = rnd(4) - 1;
	out += [" The #.locale# is #locate.ed# #locP# #outdoorLocNP.a#. ", 
		" #{subj: rnd(['masc', 'fem'])}personAdj.a.caps# #personN.subj# #personDescPost|personPost|# #stateVP#.", 
		" #objectN.a.caps# #stateVP#.",
		" This #.locale# is #sandwiched between|stuffed next to|hidden behind# #outdoorLocAdj.a# #outdoorLocN# and #outdoorLocN.a# #outdoorLocPost#."][outro == intro ? 3 - intro : outro];
	out = `<img src='images/locales/${l.file}${which}.jpg' style='float: left; margin: 0 10px 10px 0'><span class='big'>${l.name}</span><br><br>` + parse(out + "¶");
	
	// Background News Item
	let recentNews = [0];
	let weeksNews = [];
	newsItem.every((v, i) => time.full - v.time < 24 ? recentNews.push(i) : time.full - v.time < 168 ? weeksNews.push(i): false);
	let recentSubject = newsItem[rnd(recentNews)].subject;
	out += `${rnd([`A news screen is sharing`, `A few people are watching`, `The locals are paying attention to`])} some${recentSubject == world[here].name ? ' local news' : `thing about ${recentSubject}`}. `;
	//let refugeeNews = [...recentNews, ...weeksNews].any(v => newsItem[v].headline.match(/(refugees)/i) && newsItem[v].subject == world[here].name);
	if ([...recentNews, ...weeksNews].some(v => newsItem[v].headline.match(/(refugees)/i) && newsItem[v].subject == world[here].name)) out += `There are ${rnd(['many', 'some', 'a lot of'])} refugees gathered in ${rnd(['small groups', 'the area', 'quiter spaces'])}. `;
	//let famineNews = ;
	if ([...recentNews, ...weeksNews].some(v => newsItem[v].headline.match(/(famine)/i) && newsItem[v].subject == world[here].name)) out += `Locals are desperately ${rnd(['begging', 'looking', 'shopping'])} for food. `;
	
	return out;
}

function gambling (wheelvalue, cards) {
	var [a, b, c, d] = cards.map(v => ['Rigelian', 'Sirian', 'Terran', 'Minerals', 'Stardrive', 'Lasers', 'Colony', 'Starbase', 'Corporation', 'Credits', 'Analysis', 'Bureaucracy'].indexOf(v));
	var arr = [0.002, 0.004, 0.003, -1, 1.002, 0, 0.001, 1.001, 1, 0.005, 2, 0.5];	// Space
	if (wheelvalue == 'Explore') arr = [1.001, 1, 0.001, 0, 3, 0.003, -1.001, -1, 1.002, 0.002, 2, 0.5];
	if (wheelvalue == 'Extract') arr = [1.001, 1.002, 1.003, 4, -1, 1, 2.001, 0, 2, 3, 2, 0.5];
	if (wheelvalue == 'Exterminate') arr = [1.002, 1.003, 1.001, 0, 1, 4, -1, 2, 0.001, 0.002, 2, 0.5];
	if (wheelvalue == 'Terraform') arr = [0.002, 0.003, 1.002, 1.003, 1, 0.001, 3, 0, 1.001, -1, 2, 0.5];
	if (wheelvalue == 'Moon') arr = [1.003, 1.001, 1.002, 1.005, 0.001, 0, 1.006, 3, 1.004, 1, 2, 0.5];
	if (wheelvalue == 'Nova') arr = [-1.002, -1.003, -1.001, 0, 4, -1, -2, -1.004, 1, 1.001, 2, 0.5];
	let cv = Math.max(((c > 9 ? 0 : arr[c]) + (a > 9 ? 0 : arr[a])) * (a > 9 ? arr[a] : 1) * (c > 9 ? arr[c] : 1), ((c > 9 ? 0 : arr[c]) + (b > 9 ? 0 : arr[b])) * (b > 9 ? arr[b] : 1) * (c > 9 ? arr[c] : 1));
	let dv = Math.max(((d > 9 ? 0 : arr[d]) + (a > 9 ? 0 : arr[a])) * (a > 9 ? arr[a] : 1) * (d > 9 ? arr[d] : 1), ((d > 9 ? 0 : arr[d]) + (b > 9 ? 0 : arr[b])) * (b > 9 ? arr[b] : 1) * (d > 9 ? arr[d] : 1));
	let diff = ~~(cv - dv);
	return (diff == 0) ? (cv - dv > 0 ? 0.1 : -0.1) : diff > 10 ? 1 : diff < -10 ? -1 : diff / 10;
}