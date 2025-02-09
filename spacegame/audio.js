let selectSFX = new Audio("audio/select.mp3");
selectSFX.volume = 0.5;
let commSFX = new Audio("audio/comm.mp3");
let contactSFX = new Audio("audio/contact.mp3");
let failSFX = new Audio("audio/fail.mp3");
let click1SFX = new Audio("audio/click1.mp3");
let click2SFX = new Audio("audio/click2.mp3");
let saleSFX = new Audio("audio/sale.mp3");
let flightSFX = new Audio("audio/flight.mp3");
let localeSFX = new Audio("audio/locale.mp3");
let repairSFX = new Audio("audio/repair.mp3");
let cargoSFX = new Audio("audio/cargo.mp3");
let explosionSFX = new Audio("audio/explosion.mp3");


function playBGMusic () {
	let bgmusic = document.getElementById('bgMusic');
	bgmusic.src = `https://soundimage.org/wp-content/uploads/2016/${rnd(["08/Trouble-in-a-Digital-City_Looping", "02/Star-Light_Looping", "07/Urban-Jungle-2061_Looping", "12/Himalayan-Mind_Looping"])}.mp3`;
	bgmusic.load();
	bgmusic.play();
}

function muteMusic () {
	let bgmusic = document.getElementById('bgMusic');
	document.getElementById('bgmusicButton').style.opacity = bgmusic.volume == 0 ? 1 : 0.5;
	bgmusic.volume = bgmusic.volume == 0 ? 0.1 : 0;
}

function forkliftSound () {
	cargoSFX.currentTime = rnd(10) - 1;
	cargoSFX.volume = 0;
	cargoSFX.play();
	let cSFX = setInterval(() => {if (cargoSFX.volume < 0.5) {cargoSFX.volume += 0.1} else {clearInterval(cSFX)}}, 300);
	int = setTimeout(() => {let cSFX = setInterval(() => {if (cargoSFX.volume >= 0.1) {cargoSFX.volume -= 0.05} else {cargoSFX.volume = 0; clearInterval(cSFX)}}, 200)}, 2000);
}
