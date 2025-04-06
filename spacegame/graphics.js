let update;		// Not sure what this is used for
let angle = 0;		// Used in updateGFX

function displayCanvas(whichCanvas = "galaxy") {
	document.getElementById('spaceship').style.zIndex = (whichCanvas == "ship") ? 3 : -3;
	const button = document.getElementById('canvasButton');
	button.src = `images/buttons/${whichCanvas == "ship" ? "galaxy" : "ship"}.png`;
	button.setAttribute('onclick',`displayCanvas("${whichCanvas == "ship" ? "galaxy" : "ship"}")`);
	// Reload market tab (to show/hide trash drop zone)
	displayMarket();
}

function updateGFX(w) {
	const c = document.getElementById("animationCanvas").getContext("2d");
	c.clearRect(0, 0, starmapWidth, starmapHeight);
	angle++;
	if (angle >= 56) angle = 0;
		
	// Animate available starlanes
	c.strokeStyle = "#FF0";
	c.lineWidth = 2;
	c.globalAlpha = 0.4;
	c.setLineDash([4,10]);
	c.lineDashOffset = -(angle * 0.25);
	for (const i of w.links) {
		c.beginPath();
		c.moveTo(w.x + 16, w.y + 16);
		c.lineTo(world[i].x + 16, world[i].y + 16);
		c.stroke();
	}
	
	// Animate planet selector circle
	c.beginPath();
	c.globalAlpha = 1.0;
	c.setLineDash([5, 4]);
	c.arc(w.x + 16, w.y + 16, 20, angle * Math.PI / 113.5, angle + 6.3);
	c.stroke();
}

function animateSpaceShip(origin, dest) {
	const s = document.getElementById('spaceshipIcon');
	s.style.opacity = '1.0';
	s.style.transform = `rotate(${Math.atan2(dest.y - origin.y, dest.x - origin.x)}rad)`;
	setTimeout(() => {s.style.left = `${dest.x}px`; s.style.top = `${dest.y}px`;}, 1000);
	setTimeout(() => {s.style.opacity = "0.0";}, 3500);
}
