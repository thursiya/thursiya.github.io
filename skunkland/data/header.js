function insertHeader () {
	const homepage = 'https://thursiya.github.io/skunkland/';
	const navitems = ["Home", "Gallery", "Maps", "World", "Newsletters", "Rules", "Tour", "Tools", "Links"];
	let out = "";
	for (let i of navitems) {
		out += `<div class='fl navitem ${i.toLowerCase().substring(0, 4)}'><a href='${homepage}${i == 'Home' ? '' : i.toLowerCase()}'>${i}</a></div>`;
	}
	document.getElementsByTagName('header')[0].innerHTML = `
		<div class='server round shadow'>
			<img src='${homepage}images/clock.png' height='50' style='vertical-align:middle'>
			<span style='font:bold 36px georgia;vertical-align:middle' id='headdate'>${syear(new Date(),'full')}</span>
		</div>

		<div class='header round shadow' align='middle' id='headtitle' style='background-image:url("${homepage}vistas/bgvista${~~((Math.random() * 13) + 1)}.jpg")'>
			<img src='${homepage}images/server_name.gif' align='middle' style='padding-top:50px'>
		</div>

		<div class='navbar round shadow'>
  			${out}	
		</div>`;
}
