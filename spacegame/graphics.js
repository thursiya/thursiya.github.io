let update;
let angle = 0;



function displayCanvas (whichCanvas = "galaxy") {
	document.getElementById('spaceship').style.zIndex = (whichCanvas == "ship") ? 3 : -3;
	const b = document.getElementById('canvasButton');
	b.src = `images/buttons/${whichCanvas == "ship" ? "galaxy" : "ship"}.png`;
	b.setAttribute('onclick',`displayCanvas("${whichCanvas == "ship" ? "galaxy" : "ship"}")`);
	// Reload market tab (to show/hide trash drop zone)
	displayMarket();
}

function updateGFX (w) {
	let c = document.getElementById("animationCanvas").getContext("2d");
	c.clearRect(0, 0, starmapWidth, starmapHeight);
	angle++;
	if (angle >= 56) angle = 0;
		
	// Animate available starlanes
	c.strokeStyle = "#FF0";
	c.lineWidth = 2;
	c.globalAlpha = 0.4;
	c.setLineDash([4,10]);
	c.lineDashOffset = -(angle * 0.25);
	for (let i of times(w.links.length)) {
		c.beginPath();
		c.moveTo(w.x + 16, w.y + 16);
		c.lineTo(world[w.links[i]].x + 16, world[w.links[i]].y + 16);
		c.stroke();
	}
	
	// Animate planet selector circle
	c.beginPath();
	c.globalAlpha = 1.0;
	c.setLineDash([5, 4]);
	c.arc(w.x + 16, w.y + 16, 20, angle * Math.PI / 113.5, angle + 6.3);
	c.stroke();
}

function animateSpaceShip (origin, dest) {
	let s = document.getElementById('spaceshipIcon');
	s.style.opacity = '1.0';
	s.style.transform = `rotate(${Math.atan2(dest.y - origin.y, dest.x - origin.x)}rad)`;
	setTimeout(() => {s.style.left = `${dest.x}px`; s.style.top = `${dest.y}px`;}, 1000);
	setTimeout(() => {s.style.opacity = "0.0";}, 3500);
}