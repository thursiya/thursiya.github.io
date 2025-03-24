//const callQueue = [];
//const timeouts = [];
// Consider changing these two lets into a "const comm = {pick: 0, current: 0};" object. ...and adding comm.queue to replace callQueue
//let commPicker = 0;
//let currentCall = 0;
const comm = { current: 0, pick: 0, queue: [], timeouts: [] };

function displayComm(which, sfxFlag = true) {
	comm.timeouts.forEach(v => { clearTimeout(v) });
	// Handle UI comm button closing comm
	if (!which && document.getElementById('commScreen').style.zIndex > 0) {
		hideComm();
		return;
	}
	if (sfxFlag) selectSFX.play();
	
	comm.pick = which || comm.pick;
	
	// Display chosen comm section
	if (comm.pick < 2) {
		console.log("comm.pick: " + comm.pick);		// DEBUG comm.pick
		if (comm.queue.length) {
			if (comm.pick == 1.1 && comm.current > 0) comm.current--;
			if (comm.pick == 1.2 && comm.current < comm.queue.length - 1) comm.current++;
			if (comm.current < 0) comm.current = 0;
			comm.pick = 1;
			openCall(comm.current);
			return;
		} else {
			comm.pick = 1;
		}
	}
	chooseComm(comm.pick);
}

function chooseComm(which) {
	const section = document.getElementsByClassName('commSection');
	for (const i of times(section.length)) section[i].style.display = (which == section.length - i) ? "block" : "none";
	document.getElementById('commScreen').style.zIndex = 6;
	const tab = document.getElementsByClassName('commTab');
	for (const i of times(tab.length - 4)) tab[i].style.filter = (which == tab.length - i - 3) ? "hue-rotate(225deg) brightness(2)" : "";
	document.getElementById('previousMessage').style.opacity = (comm.current > 0) ? 1 : 0.2;
	const msgBtn = document.getElementById('messagesButton');
	msgBtn.style.filter = (which < 2 && comm.queue.length > 0) ? "hue-rotate(225deg) brightness(2)" : "";
	msgBtn.style.opacity = (comm.queue.length > 0) ? 1 : 0.2;
	document.getElementById('nextMessage').style.opacity = (comm.current < comm.queue.length - 1 && comm.queue.length > 1) ? 1 : 0.2;
	document.getElementById('commButton').style.filter = (comm.queue.length > 0) ? "hue-rotate(225deg) brightness(2)" : "";
}

// callQueue object: {text, (choice), (speaker), (mission), (prereq)}
function addCall(callProto, insertFlag = false, preText = "", postText = "") {
	const call = Object.assign({}, callProto);
	call.text = preText + call.text + postText;
	
	// replace prefixing contact call with standard comm
	if ('preComm' in call && 'mission' in call) {
		const m = mission.find(v => v.id == call.mission);
		m.stage = call.preComm;
		const newText = `${call.text}<br><br>${m.comm.text}`;
		Object.assign(call, m.commData[call.preComm]);
		call.text = newText;
	}
	
	// set missing speaker to mission client or -1 (none) if no mission
	if (!('speaker' in call)) call.speaker = ('mission' in call) ? mission.find(v => v.id == call.mission).client : -1;
	
	if (insertFlag) {
		comm.queue.splice(comm.current + 1, 0, call);
	} else {
		comm.queue.unshift(call);
	}
	if ('inc' in call && 'mission' in call) mission[mission.findIndex(v => v.id == call.mission)].stage += call.inc;
	commSFX.play();
	displayComm(1, false);
}

function openCall(index = 0) {
	console.log(`Opening call ${index}...`);	// DEBUG which call
	console.log(comm.queue[index]);
	comm.current = index;
	const call = comm.queue[comm.current];
	let out = "";
	
	// Display speaker image and info
	const speaker = person[call.speaker];
	if (speaker) {
		out += `<div style="overflow: auto;">
				<img src="images/people/${speaker.image}.png" class="speaker" style="filter: hue-rotate(${speaker.color}deg) brightness(${speaker.brightness})" draggable="false">
				<span class="big"><b>${speaker.name}</b></span><br>
				<span class="reduced">${speaker.title}<br>${speaker.org}</span>
			</div>`;
		speaker.contact = time.full;
		updateContactsDisplay();
	}
	
	// Display conversation
	out += `<div>${comm.queue[index].text}</div><br><div style='text-align: center; clear: both'>`;

	// Display response
	const a = call.text.length % 4;
	switch (call.choice) {
		case 0:		// proceed	(Locale1, Locale2, Locale3, Locale4)
			out += `<button class='commButton' type='button' onclick="proceedCall('locale')">${["Continue", "Go on", "Find out more", "And..."][a]}</button>`;
			break;
		case 1:		// accept/reject	(Delivery, Passage, Pickup)
			out += `<button class='commButton' type='button' onclick='proceedCall()'>${["Agreed", "Make It So", "Okay", "I'm on It"][a]}</button> 
				<button class='commButton' type='button' onclick='rejectCall()'>${["No Thanks", "Sorry", "Not for Me", "Maybe Next Time"][a]}</button>`;
			break;
		case 2:		// agree/end call	(Instance mission same-planet)
			out += `<button class='commButton' type='button' onclick="proceedCall('locale')">${["Sure", "What is it?", "I'm Interested", "Give Me the Details"][a]}</button> 
				<button class='commButton' type='button' onclick='endCall()'>${["Nope", "Not Interested", "I'm Too Busy", "Maybe in the Future"][a]}</button>`;
			break;
		case 3:		// (accept)/end call/reject	(LocaleSellingIllegal, LocaleBuyingIllegal, LocaleGambling)
			out += `<button class='commButton' type='button' onclick='proceedCall()'>${["I'm In", "Sounds Good", "It's a Deal", "Definitely"][a]}</button> 
				<button class='commButton' type='button' onclick='endCall()'>${["Hold On", "I'll Get back to You", "I'll Think about It", "Wait on Me"][a]}</button> 
				<button class='commButton' type='button' onclick='rejectCall()'>${["No Thanks", "Sorry", "Not for Me", "Maybe Next Time"][a]}</button>`;
			break;
		case 4:		// (choice 0)/(choice 1)/.../end call/reject	(LocaleDonating)
			mission.find(v => v.id == call.mission).choices.forEach((v, i) => {
				out += `<button class='commButton' type='button' onclick='proceedCall(${i})'>${v}</button> `; });
			out += `<button class='commButton' type='button' onclick='endCall()'>${["Hold On", "I'll Get back to You", "I'll Think about It", "Wait on Me"][a]}</button> 
				<button class='commButton' type='button' onclick='rejectCall()'>${["No Thanks", "Sorry", "Not for Me", "Maybe Next Time"][a]}</button>`;
			break;
		case 5:		// (choice 0)/(choice 1)/...	(Story mission proceed)
			mission.find(v => v.id == call.mission).choices.forEach((v, i) => {
				out += `<button class='commButton' type='button' onclick='proceedCall(${i})'>${v}</button> `; });
			break;
		default:	// end call
			out += `<button class='commButton' type='button' onclick='endCall()'>${["Gotcha", "Roger", "Understood", "All Right"][a]}</button>`;
	}
	document.getElementById("commCall").innerHTML = `${out}</div>`;
	chooseComm(1);
}

function proceedCall(variant = 0) {
	const call = comm.queue[comm.current];
	const m = mission.find(v => v.id == call.mission);
	console.log(`Proceed Call...`);		// DEBUG callQueue
	console.log(comm.queue);
	if (variant == "locale") {
		addCall('setComm' in call ? m.commData[call.setComm] : m.comm, true);
	} else if ('proceed' in m && m.proceed.length > 0) {
		m.stage += variant;
		if ('prereq' in call) {
			if (call.prereq[variant].every(v => parseValue(m, v))) parseCommands(m.proceed, m);
			else addCall({speaker: m.client, text: "Oh, I see you can't take this on right now. Get back to me if things change."}, true);
		} else parseCommands(m.proceed, m);
	}
	endCall();
}
function rejectCall(flag) {
	const call = comm.queue[comm.current];
	const m = mission.find(v => v.id == call.mission);
	if ([1, 2, 3, 4].includes(call.choice) && m) {		// Reject avail. if choice = 1, 2, or 4
		if ('reject' in m && m.reject.length > 0) {
			parseCommands(m.reject, m);
		} else {
			console.log(`Rejecting mission "${m.summary}" for ${person[m.client].name}...`);	// DEBUG Reject mission
			removeMission(m);		
		}
	}
	endCall();
}
function endCall() {
	click2SFX.play();
	comm.queue.splice(comm.current, 1);
	if (comm.queue.length > 0) {
		openCall(comm.current > comm.queue.length - 1 ? comm.queue.length - 1 : comm.current);
	} else {
		killCalls();
	}
}
function killCalls() {
	// Reject all unanswered propositions
	while (comm.queue.length > 0) rejectCall();
	document.getElementById('commButton').style.filter = "";
	hideComm();
	document.getElementById('commCall').innerHTML = `<h2 style='text-align: center'><i>... The Comm Line is Currently Closed ...</i></h2>`;
}
function hideComm() {
	document.getElementById('commScreen').style.zIndex = -3;
}

function contactPerson(pID, shipFlag) {
	console.log(mission);		// DEBUG mission
	const p = validatePerson(pID);
	if (!p) return false;	
	
	// Redirect to calls in progress if already talking to pID
	const inConv = comm.queue.findIndex(v => v.speaker == pID);
	if (inConv > -1) {
		openCall(inConv); 
		return;
	}
	
	// Open in-person Conversation (on ship)
	const mClient = mission.find(v => v.client == pID);
	if (mClient && shipFlag) {
		addCall(mClient.commData[rnd(4) + 3]);
		return;
	}
	
	// Begin New Call
	const busy = p.busy > time.full;
	// Contacting Person visual
	contactSFX.play();
	chooseComm(1);	
	const screen = document.getElementById('commCall');
	screen.innerHTML = `Contacting: <b>${p.name}</b><br><br><img src='images/buttons/contact.png' style='vertical-align: middle' draggable=false> `;
	const typewriter = (textArr) => comm.timeouts.push(setTimeout(_ => {
		screen.innerHTML += textArr.shift();
		if (textArr.length > 0) typewriter(textArr); }, 800));
	comm.timeouts = [];
	typewriter([" )", " )", " )", " )", " )", `<br><br><i>${busy ? `"Sorry, I'm busy right now. Please try again later."` : "FAILED (No response)"}</i>`]);
	comm.timeouts.push(setTimeout(_ => failSFX.play(), 4500));
	
	// Fail if 'p.status' != 'active'
	if (p.status != 'active') return;
	
	const mChar = mission.find(m => 'character' in m && m.character.some(c => c == pID));
	const callspace = time.full - p.contact;
	const callback = (p.mood / 17) - callspace > 0;
	let preText = callback ? `${rnd(["You just contacted me", "I just heard from you", "We just spoke"])} - did you ${rnd(["forget the directions", "miss something", "need a reminder"])}? ` : "";
	
	// Call mission contactChar if doing a mission involving pID
	if (mChar) return timeouts.push(setTimeout(_ => mChar.contactChar(mChar.character.findIndex(c => c == pID), preText), 4000));

	let call;
	// Call mission contact if doing a mission for pID
	if (mClient) {
		call = mClient.contact;
	// Call person normally (if not busy, sleeping, or despising you)
	} else {
		const sleeping = (callspace == 0) ? false : (time.full + p.location % 4 * 6) % 24 < 6;
		if ((!sleeping || (p.mood > 69 && callspace > (101 - p.mood) * 4)) && p.mood > 24 && !busy) {
			preText = (sleeping) ? `${rnd(["You woke me", "Oh, I was alseep", "<i>Yawn</i> Hello"])}. ` : "";
			if (callback) {
				preText += (p.mood > 60) ? rnd([`Did you think of something else?`, `What is it?`, `Again? I'll still be here tomorrow!`]) : 
					p.mood < 40 ? `Stop wasting my time.` : 
					rnd([`I don't have all day for your calls.`, `We just spoke!`, `Once more, yes?`]);
			} else if (callspace < 720 + rnd(500)) {
				preText += p.mood > 60 ? `Nice to hear from you.` : 
					p.mood < 40 ? `Oh, it's you.` : 
					`Hello again.`;
			} else {
				preText += p.mood > 60 ? `Long time no see.` : `I remember you.`;
			}
			if (callspace > 118 + rnd(121)) preText += ` ${p.history[0].text}`;	// Add history if 5-10 days have passed
			preText += `<br><br>`;
			
			let text = `Not much is going on here. I'll talk to you some other time.`;
			console.log(`DEBUG Default Conversation: Currently I don't have much to say.<br>The last time you contacted me was <b>${callspace}</b> hours ago.<br>My callback has been calculated as: <b>${callback}</b> (Mood: ${p.mood}).`);	// DEBUG
			if (p.location == "in transit") text = `I'm ${callback ? "still" : "currently"} ${rnd(["on a trip", "flying", "making my way"])} to ${world[p.dest].name}.`;
			
			if (p.mood > 39 && p.location == here) {
				const m = addMission(rnd(normalMissionList), pID);
				console.log(`Adding "same location" character mission...`);	// DEBUG mission
				console.log(m);
				text = `Being as we're both on ${world[here].name}, then you might be able to do a job for me. Are you interested?`;
				call = {speaker: pID, text, choice: 2, mission: m.id}
			} else {
				call = {speaker: pID, text};
			}
		}
	}
	// If a call can be made then add a call (that interrupts fail sequence), otherwise will timeout in fail sequence
	if (call) {
		// Person not happy (if contacted again so soon)
		if (callback) moodSwing(pID, -10);
		// Launch call
		comm.timeouts.push(setTimeout(() => {addCall(call, false, preText)}, 4000));
	}
}
