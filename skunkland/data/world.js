const city = [];
const homepage = "https://thursiya.github.io/skunkland/";
const state = {};

loadDoc(homepage + "data/census.txt", buildCityArray);

function buildCityArray(xhr) {
	city.push(...xhr.response.split('\n').filter(v => v).
		map(v => v.replace(/\s*,\s*/g, ',').trim().split(',')).
		map(v => ({ name: v[0], state: v[1], pop: Math.ceil(((Number(v[2]) / 2 + Number(v[3])) * (Number(v[5]) || 1) + Number(v[4]) / 2) * 10) * 100, date: new Date(v[6], Number(v[7]) - 1, v[8]) })).
		map(v => Object.assign(v, { output: { state: v.state ? `<a href="${v.state}">${v.state}</a>` : "<i>Skunkland</i>", pop: v.pop.toLocaleString("en", {useGrouping: true}), date: syear(v.date) } })));
	console.log(city);
}

function buildNationObject(xhr, nation) {
	Object.assign(state, xhr.response.split('\n').filter(v => v).map(v => v.split(',')).
		map(v => ({ name: v[0], type: v[1] || "State", player: v[2] || "None", motto: v[3] || "---", capital: v[4] || "None", bigcity: v[5] || v[4] || "None", 
			demonym: v[6] || v[0], gov: v[7] || v[1] || "None", tallest: { building: v[12], structure: v[13] } })).
		map(v => Object.assign(v, v[8] && { lang: v[8] }, v[9] && { money: v[9] }, v[10] && { faith: v[10] }, v[11] && { animal: v[11] })).find(v => v.name == nation));
	console.log(state);
}

function drawInfoWindow(nation) {//, ntype, motto, capital, bigcity, demonym, government, language, money, faith, animal, tallbuilding, tallstructure) {.
	loadDoc(homepage + "data/nations.txt", buildNationObject, nation);
	
	function subTable(...arr) {
		let stOut = `<tr><td style="padding: 5px;"><table class="info">`;
		arr.forEach(v => stOut += `<tr><td style="${v[0] == "Government" && " font-size: 11px; "}font-weight: bold; width: 90px;">${v[0]}</td><td>${v[1]}</td></tr>`);
		return `${stOut}</table></td></tr>`;
	}
	
	let out = `<table style="width: 300px;"><tr><th>${state.type} of ${state.name}</th></tr>
 		<tr><td><img src="../images/${state.name} Flag (Wool).png" width="150"><br><i>${state.motto || "---"}</i></td></tr>
   		<tr><td style="padding: 0;"><img src="../../maps/regional/${state.name}.jpg" width="298"></td></tr>
		${subTable(["Capital", state.capital], ["Largest City", `${state.bigcity} (${pp(state.bigcity)})`])}
		${subTable(["Demonym", state.demonym])}
  		${subTable(["Government", state.gov])}`;
	const arr = [];
	if (state.lang) arr.push(["Language", state.lang]);
	if (state.money) arr.push(["Currency", state.money]);
	if (state.faith) arr.push(["Religion", state.faith]);
	if (arr[0]) out += subTable(arr);
	if (state.animal) out += subTable(["Animal", state.animal]);
	out += `${subTable(["Tallest Building", state.tallest.building], ["Tallest Structure", state.tallest.structure])}
 		<tr><td><img src="../images/${state.name} Banner.png" width="64"></td></tr></table>`;
	
	document.getElementById("infowindow").innerHTML = out;
}

function loadDoc(url, cFunction, ...params) {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {cFunction(this, ...params);}
	xhttp.open("GET", url);
	xhttp.send();
}

function pp(city) {
	return "Uninhabited";
	if (typeof jobs == 'string') {
		for(var i = 0; i < city.length; i++) {
			if (city[i].indexOf(jobs) > -1) return (document.write(city[i][2]));
		}
		document.write("Uninhabited");
	}
	var homes = beds * 2;
	var tourists = tourbeds / 2;
	var maxpop = (homes + jobs) / 2;
	var p = Math.ceil((maxpop * bonus + tourists) * 10) * 100;
	return p;
}

function regions(nation, rtype, regions, bigsettles, builds, nflag) {
	var out = "<table><tr><th>Flag</th><th>" + rtype + "</th><th>Largest<br>Settlement</th><th>Notable Builds</th></tr>";
		for (var i = 0; i < regions.length; i++) {
			var rname = regions[i];
			if (nflag) rname = nation + " " + regions[i];
			out += "<tr><td><img src='images/" + rname + " Flag.png' height='50' alt='Flag of " + rname + " " + rtype + "'></td>";
			out += "<td><a href='" + nation + "/" + regions[i] + ".php'><b>" + regions[i] + "</b></a></td>";
			out += "<td>" + (bigsettles[i] || "-") + "</td><td>";
			for (var j = 0; j < builds[i].length; j++) {
				out += builds[i][j] + "<br>"
			}
			out += "</td></tr>";
		}
		out += "</table><br>";
		document.write(out);
}
