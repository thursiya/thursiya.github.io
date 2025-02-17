function insertHeader() {
	const homepage = "https://thursiya.github.io/skunkland/";
	const navitems = ["Home", "Gallery", "Maps", "World", "Newsletters", "Rules", "Tour", "Tools", "Links"];
	let out = "";
	navitems.forEach(v => out += `<a href="${homepage}${v == "Home" ? "" : v.toLowerCase()}"><div class="navitem ${v.toLowerCase().substring(0, 4)}">${v}</div></a>`);
	document.getElementsByTagName("header")[0].innerHTML = `
		<div class="server round shadow">
			<img src="${homepage}images/clock.png" height="50" style="vertical-align: middle">
			<span style="vertical-align: middle">${syear(new Date(),"full")}</span>
		</div>

		<div class="header round shadow" style="background: url(${homepage}images/vistas/bgvista${~~((Math.random() * 13) + 1)}.jpg)">
			<img src="${homepage}images/server_name.gif" style="display: block; margin: auto; padding-top: 50px">
		</div>

		<div class="navbar round shadow">
  			${out}	
		</div>`;
}
