const wumpus = {};
const phi = 1.618033988749895;

function initWumpus () {
	currentApp = "Wumpus";
	gameLog.length = 0;
	document.getElementById("textInput").type = "text";

	Object.keys(wumpus).forEach(key => delete wumpus[key]);
	Object.assign(wumpus, { dist: 0, oldDist: 0,
		room: [[1, 4, 7], [0, 2, 9], [1, 3, 11], [2, 4, 13], [0, 3, 5], [4, 6, 14], [5, 7, 16], [0, 6, 8], [7, 9, 17], [1, 8, 10], [9, 11, 18], [2, 10, 12], [11, 13, 19], [3, 12, 14], [5, 3, 15], [14, 16, 19], [6, 15, 17], [8, 16, 18], [10, 17, 19], [12, 15, 18]],
		coord: [[-1/phi,0,phi], [1/phi,0,phi], [1,-1,1], [0,-phi,1/phi], [-1,-1,1], [-phi,-1/phi,0], [-phi,1/phi,0], [-1,1,1], [0,phi,1/phi], [1,1,1], [phi,1/phi,0], [phi,-1/phi,0], [1,-1,-1], [0,-phi,-1/phi], [-1,-1,-1], [-1/phi,0,-phi], [-1,1,-1], [0,phi,-1/phi], [1,1,-1], [1/phi,0,-phi]] });
	
	const roomsLeft = shuffle(Array.from(wumpus.room, (v, i) => i));
	["wumpus", "player", "bat1", "bat2", "pit1", "pit2"].forEach(v => wumpus[v] = roomsLeft.pop());
		
	updateLog(`<b>WUMPUS</b><br><i>Based on the Creative Computing game</i><br><br>* * * &nbsp; H U N T &nbsp; T H E &nbsp; W U M P U S &nbsp; * * *`);
	updateLog(`<hr>The Wumpus is running to hide...`);
	gameState = "Update Location";
	announceWumpus();
}

function submitWumpus() {
	const data = textInput.value.toUpperCase();
	if (!data) return;
	const num = parseInt(data);
	switch (gameState) {
		case "Action Choice":
			if (data[0] == "M" || data[0] == "S") {
				appendLog(gameState = data[0] == "M" ? "Move" : "Shoot");
				updateLog(`Into which room?`);
			}
			break;
		case "Move":
		case "Shoot":
			if (wumpus.room[wumpus.player].includes(num)) {
				appendLog(num);
				if (num == wumpus.wumpus) {
					updateLog(gameState == "Move" ? `Look out, it's the Wumpus room!!!!<br>Too late. You've been eaten.` : `🎯 Hurrah! One less Wumpus!`);
					gameState = "Restart";
				} else {
					if (gameState == "Move") {
						if ([wumpus.pit1, wumpus.pit2].includes(wumpus.player)) {
							updateLog(`Look out! Bottomless pit! Aaaaaaaaa......`);
							gameState = "Restart";
							break;
						}
						if ([wumpus.bat1, wumpus.bat2].includes(wumpus.player)) {
							gameState = "Bat Transport";
							break;
						}
						wumpus.player = num;
					} else {
						updateLog(`💨 Missed! The Wumpus is moving...`);
						wumpus.wumpus = shuffle([wumpus.wumpus, ...wumpus.room[wumpus.wumpus]]).pop();
						if (wumpus.wumpus == wumpus.player) {
							updateLog(`... Right into this room! You've been eaten.`);
							gameState = "Restart";
							break;
						}
					}
				}
				gameState = "Update Location";
			}
			break;
		default:
			updateLog(`<i>Reload the game to restart</i>`);
	}
	announceWumpus();
}

function announceWumpus() {
	switch (gameState) {
		case "Bat Transport":
			updateLog(`Super Bats!!!<br>Whoooooosh`);
			wumpus.player = shuffle(Array.from(wumpus.room, (v, i) => i)).find(v => ![wumpus.wumpus, wumpus.bat1, wumpus.bat2, wumpus.pit1, wumpus.pit2].includes(v));
		case "Update Location":
			updateLog(`<hr style="width:50%"`);
			wumpus.dist = dist3d(...wumpus.coord[wumpus.player], ...wumpus.coord[wumpus.wumpus]);
			if (wumpus.dist < 1.3) {
				updateLog(`I smell a Wumpus!`);
			} else if (wumpus.oldDist && wumpus.oldDist != wumpus.dist) {
				updateLog(`You are ${wumpus.oldDist > wumpus.dist ? "closer to" : "farther from"} the Wumpus.`);
			}
			if ([wumpus.bat1, wumpus.bat2].some(v => wumpus.room[wumpus.player].includes(v))) updateLog(`I hear bats...`);
			if ([wumpus.pit1, wumpus.pit2].some(v => wumpus.room[wumpus.player].includes(v))) updateLog(`I feel a draft of pits...`);
			wumpus.oldDist = wumpus.dist;
			updateLog(`This is room ${wumpus.player}, adjacent to rooms ${wumpus.room[wumpus.player].join(", ")}.`);
			updateLog(`Move or Shoot?`);
			gameState = "Action Choice";
		default:			
	}
	setInput();
}

function dist3d (x1, y1, z1, x2, y2, z2) {
	return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
}
