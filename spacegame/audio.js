const selectSFX = new Audio("audio/select.mp3");
selectSFX.volume = 0.5;
const commSFX = new Audio("audio/comm.mp3");
const contactSFX = new Audio("audio/contact.mp3");
const failSFX = new Audio("audio/fail.mp3");
const click1SFX = new Audio("audio/click1.mp3");
const click2SFX = new Audio("audio/click2.mp3");
const saleSFX = new Audio("audio/sale.mp3");
const flightSFX = new Audio("audio/flight.mp3");
const localeSFX = new Audio("audio/locale.mp3");
const repairSFX = new Audio("audio/repair.mp3");
const cargoSFX = new Audio("audio/cargo.mp3");
const explosionSFX = new Audio("audio/explosion.mp3");


function playBGMusic() {
	const bgmusic = document.getElementById('bgMusic');
	bgmusic.src = `https://soundimage.org/wp-content/uploads/2016/${rnd(["08/Trouble-in-a-Digital-City_Looping", "02/Star-Light_Looping", "07/Urban-Jungle-2061_Looping", "12/Himalayan-Mind_Looping"])}.mp3`;
	bgmusic.load();
	bgmusic.play();
}

function muteMusic() {
	const bgmusic = document.getElementById('bgMusic');
	document.getElementById('bgmusicButton').style.opacity = bgmusic.volume == 0 ? 1 : 0.5;
	bgmusic.volume = bgmusic.volume == 0 ? 0.1 : 0;
}

function forkliftSound() {
	cargoSFX.currentTime = rnd(10) - 1;
	cargoSFX.volume = 0;
	cargoSFX.play();
	let cSFX = setInterval(() => {
		if (cargoSFX.volume < 0.5) {
			cargoSFX.volume += 0.1;
		} else {
			clearInterval(cSFX);
		} }, 300);
	int = setTimeout(() => {
		let cSFX = setInterval(() => {
			if (cargoSFX.volume >= 0.1) {
				cargoSFX.volume -= 0.05;
			} else {
				cargoSFX.volume = 0;
				clearInterval(cSFX);
			} }, 200);
		}, 2000);
}
