function insertHeader() {
	const homepage = 'https://thursiya.github.io/skunkland/';
	const navitems = ["Home", "Gallery", "Maps", "World", "Newsletters", "Rules", "Tour", "Tools", "Links"];
	let out = "";
	navitems.forEach(v => out += `<div class='navitem ${v.toLowerCase().substring(0, 4)}'><a href='${homepage}${v == 'Home' ? '' : v.toLowerCase()}'>${v}</a></div>`);
	document.getElementsByTagName('header')[0].innerHTML = `
		<div class='server round shadow'>
			<img src='${homepage}images/clock.png' height='50' style='vertical-align:middle'>
			<span style='font:bold 36px georgia;vertical-align:middle'>${syear(new Date(),'full')}</span>
		</div>

		<div class='header round shadow' align='middle' style='background-image:url("${homepage}images/vistas/bgvista${~~((Math.random() * 13) + 1)}.jpg")'>
			<img src='${homepage}images/server_name.gif' align='middle' style='padding-top:50px'>
		</div>

		<div class='navbar round shadow'>
  			${out}	
		</div>`;
}

function loadDoc(url, cFunction) {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {cFunction(this);}
	xhttp.open("GET", url);
	xhttp.send();
}
