const rooms = [[1, 4, 7], [0, 2, 9], [1, 3, 11], [2, 4, 13], [0, 3, 5], [4, 6, 14], [5, 7, 16], [0, 6, 8], [7, 9, 17], [1, 8, 10], [9, 11, 18], [2, 10, 12], [11, 13, 19], [3, 12, 14], [5, 3, 15], [14, 16, 19], [6, 15, 17], [8, 16, 18], [10, 17, 19], [12, 15, 18]];
const phi = 1.618033988749895;
const coords = [[-1/phi,0,phi], [1/phi,0,phi], [1,-1,1], [0,-phi,1/phi], [-1,-1,1], [-phi,-1/phi,0], [-phi,1/phi,0], [-1,1,1], [0,phi,1/phi], [1,1,1], [phi,1/phi,0], [phi,-1/phi,0], [1,-1,-1], [0,-phi,-1/phi], [-1,-1,-1], [-1/phi,0,-phi], [-1,1,-1], [0,phi,-1/phi], [1,1,-1], [1/phi,0,-phi]];

let wumpusLocation, playerLocation, bat1Location, bat2Location, pit1Location, pit2Location;
let wumpusDistance, oldDistance;

function initWumpus () {
	currentApp = "Wumpus";
	gameLog.length = 0;
	document.getElementById("textInput").type = "text";
	
	let roomsLeft = Array.from(rooms, (v, i) => i);
	wumpusLocation = roomsLeft.splice(Math.floor(Math.random() * roomsLeft.length), 1)[0];
	playerLocation = roomsLeft.splice(Math.floor(Math.random() * roomsLeft.length), 1)[0];
	bat1Location = roomsLeft.splice(Math.floor(Math.random() * roomsLeft.length), 1)[0];
	bat2Location = roomsLeft.splice(Math.floor(Math.random() * roomsLeft.length), 1)[0];
	pit1Location = roomsLeft.splice(Math.floor(Math.random() * roomsLeft.length), 1)[0];
	pit2Location = roomsLeft.splice(Math.floor(Math.random() * roomsLeft.length), 1)[0];
	oldDistance = null;
	
	updateLog(`<b>WUMPUS</b><br><i>Based on the Creative Computing game</i><br><br>* * * &nbsp; H U N T &nbsp; T H E &nbsp; W U M P U S &nbsp; * * *`);
	gameState = "Intro";
	announceWumpus();
}

function submitWumpus() {
	let data = textInput.value.toUpperCase();
	if (!data) return;
	switch (gameState) {
		case "Move or Shoot":
			if (data[0] == "M") {
				gameState = "Move";
				gameLog[gameLog.length - 1] += ` <b><i>${gameState}</i></b>`;
			}
			if (data[0] == "S") {
				gameState = "Shoot";
				gameLog[gameLog.length - 1] += ` <b><i>${gameState}</i></b>`;
			}
			break;
		case "Move":
			data = parseInt(data);
			if (rooms[playerLocation].includes(data)) {
				gameLog[gameLog.length - 1] += ` <b><i>${data}</i></b>`;
				oldLocation = playerLocation;
				playerLocation = data;
				gameState = "Update Location";
				if (playerLocation == wumpusLocation) gameState = "Wumpus Snack";
				if ([pit1Location, pit2Location].includes(playerLocation)) gameState = "Pit Fall";
				if ([bat1Location, bat2Location].includes(playerLocation)) gameState = "Bat Transport";
			}
			break;
		case "Shoot":
			data = parseInt(data);
			if (rooms[playerLocation].includes(data)) {
				gameLog[gameLog.length - 1] += ` <b><i>${data}</i></b>`;
				if (data == wumpusLocation) {
					updateLog(`Hurrah! One less Wumpus!`);
					gameState = "Restart";
				} else {
					let rval = Math.floor(Math.random() * 4);
					wumpusLocation = (rval == 3) ? wumpusLocation : rooms[wumpusLocation][rval];
					updateLog(`Missed! The Wumpus is moving...`);
					gameState = "Update Location";
					if (wumpusLocation == playerLocation) {
						updateLog(`... Right into this room! You've been eaten.`);
						gameState = "Restart";
					}
				}
			}
			break;
		case "Restart":
			updateLog(`<i>Reload the game to restart</i>`);
			break;
		default:
			break;
	}
	announceWumpus();
}

function announceWumpus() {
	switch (gameState) {
		case "Intro":
			updateLog(`<hr>The Wumpus is running to hide...`);
		case "Update Location":
			updateLog(`<hr style="width:50%"`);
			wumpusDistance = dist3d(...coords[playerLocation], ...coords[wumpusLocation]);
			if (wumpusDistance < 1.3) {
				updateLog(`I smell a Wumpus!`);
			} else if (oldDistance && oldDistance != wumpusDistance) {
				updateLog(`You are ${oldDistance > wumpusDistance ? "closer to" : "farther from"} the Wumpus.`);
			}
			if ([bat1Location, bat2Location].some(v => rooms[playerLocation].includes(v))) updateLog(`I hear bats...`);
			if ([pit1Location, pit2Location].some(v => rooms[playerLocation].includes(v))) updateLog(`I feel a draft of pits...`);
			oldDistance = wumpusDistance;
			updateLog(`This is room ${playerLocation}, adjacent to rooms ${rooms[playerLocation].join(", ")}.`);
			gameState = "Move or Shoot";
		case "Move or Shoot":
			updateLog(`Move or Shoot?`);
			break;
		case "Move":
		case "Shoot":
			updateLog(`Into which room?`);
			break;
		case "Bat Transport":
			updateLog(`Super Bats!!!<br>Whoooooosh`);
			let roomsLeft = Array.from(rooms, (v, i) => i).filter(v => ![wumpusLocation, bat1Location, bat2Location, pit1Location, pit2Location].includes(v));
			playerLocation = roomsLeft[Math.floor(Math.random() * roomsLeft.length)];
			gameState = "Update Location";
			announceWumpus();
			break;
		case "Pit Fall":
			updateLog(`Look out! Bottomless pit! Aaaaaaaaa......`);
			gameState = "Restart";
			break;
		case "Wumpus Snack":
			updateLog(`Look out, it's the Wumpus room!!!!<br>Too late. You've been eaten.`);
			gameState = "Restart";
			break;
		default:
			break;
	}
	setInput();
}

function dist3d (x1, y1, z1, x2, y2, z2) {
	return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
}